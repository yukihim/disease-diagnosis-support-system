import os
import joblib
import json
import pandas as pd
import numpy as np
import time
import re
import ast # For safely evaluating the LLM string output
from flask import Flask, request, jsonify
from collections import defaultdict

# --- NEW: Gemini API ---
import google.generativeai as genai

# --- Configuration ---
MODEL_DIR = './saved_model2/'
EVIDENCE_JSON_PATH = os.path.join('Dataset', 'release_evidences.json') # Path to your original evidence JSON
EVIDENCE_INFO_PATH = os.path.join(MODEL_DIR, 'evidence_info.json') # Path to info generated during training

# --- Load necessary ML objects ---
print("--- Loading ML Prediction Components ---")
try:
    model_path = os.path.join(MODEL_DIR, 'best_disease_model.joblib'); model = joblib.load(model_path); print(f"Loaded model from {model_path}")
    scaler_path = os.path.join(MODEL_DIR, 'feature_scaler.joblib'); scaler = joblib.load(scaler_path) if os.path.exists(scaler_path) else None; print(f"Scaler loaded: {'Yes' if scaler else 'No'}")
    sex_encoder_path = os.path.join(MODEL_DIR, 'sex_encoder.joblib'); sex_encoder = joblib.load(sex_encoder_path)
    target_encoder_path = os.path.join(MODEL_DIR, 'target_encoder.joblib'); target_encoder = joblib.load(target_encoder_path); class_names = target_encoder.classes_; print("Loaded encoders.")
    columns_path = os.path.join(MODEL_DIR, 'feature_columns.json');
    with open(columns_path, 'r') as f: all_feature_columns = json.load(f); print("Loaded feature columns list.")
    scaled_cols_path = os.path.join(MODEL_DIR, 'scaled_feature_columns.json'); cols_scaled_during_fit = None
    if os.path.exists(scaled_cols_path):
        with open(scaled_cols_path, 'r') as f: cols_scaled_during_fit = json.load(f); print("Loaded scaled columns list.")
    else: print("Scaled columns list not found - scaling might fail.")

    # --- Load FULL evidence data (Needed for reliable numerical check) ---
    if os.path.exists(EVIDENCE_JSON_PATH):
         with open(EVIDENCE_JSON_PATH, 'r', encoding='utf-8') as f:
              full_evidence_data = json.load(f)
         print(f"Loaded full evidence data from {EVIDENCE_JSON_PATH} for numerical check.")
    else:
        print(f"*** CRITICAL WARNING: Full evidence JSON not found at {EVIDENCE_JSON_PATH}. Numerical symptom check will likely fail. ***")
        full_evidence_data = None

    # Load training evidence info (Used as fallback if full is missing, less reliable)
    if os.path.exists(EVIDENCE_INFO_PATH):
        with open(EVIDENCE_INFO_PATH, 'r') as f: evidence_info_from_training = json.load(f); print("Loaded training evidence info.")
    else:
        evidence_info_from_training = None
        print(f"Warning: Training evidence info not found at {EVIDENCE_INFO_PATH}")

except FileNotFoundError as e: print(f"\n***\nError loading critical ML component: {e}"); exit()
except Exception as e: print(f"\n***\nError loading ML components: {e}"); exit()

# --- NEW: Configure Gemini ---
try:
    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
    # GEMINI_API_KEY = "AIzaSyC5bXfXbB5RRUr3RfKC-tGTALhT-7k0grY"
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY environment variable not set.")
    # --- Ensure you replace YOUR_API_KEY in your environment ---

    genai.configure(api_key=GEMINI_API_KEY)
    # Adjust model name if necessary - 'gemini-1.5-flash-latest' is often preferred for speed/cost
    # gemini_model = genai.GenerativeModel('gemini-2.0-flash')
    GEMINI_MODEL = os.environ.get("GEMINI_MODEL")
    gemini_model = genai.GenerativeModel(GEMINI_MODEL)

    print("Gemini API configured successfully.")
except Exception as e:
    print(f"\n***\nError configuring Gemini API: {e}")
    print("Please ensure the google-generativeai library is installed and GEMINI_API_KEY environment variable is set.")
    exit()


# --- VERIFIED FIX 2: Pre-process Evidence Info for Numerical Check using FULL data ---
print("Pre-processing FULL evidence data for prediction function's numerical check...")
processed_evidence_for_pred = {}
numerical_c_codes_for_pred = set()

# Use full_evidence_data FIRST if available for accuracy
data_source_for_check = full_evidence_data if full_evidence_data else evidence_info_from_training

if data_source_for_check:
    print(f"Using {'full evidence data' if full_evidence_data else 'training evidence info'} for numerical check.") # DEBUG Line
    for code, details in data_source_for_check.items():
        e_code = details.get('name', code)
        if not isinstance(e_code, str) or not e_code.startswith('E_'): continue

        processed_evidence_for_pred[e_code] = {'is_numerical_c': False} # Default

        possible_values = details.get('possible-values')
        data_type = details.get('data_type')

        if data_type == 'C' and isinstance(possible_values, (list, tuple)) and possible_values and \
           not any(isinstance(v, str) and v.startswith('V_') for v in possible_values):
             try:
                 _ = [float(v) for v in possible_values]
                 processed_evidence_for_pred[e_code]['is_numerical_c'] = True
                 numerical_c_codes_for_pred.add(e_code)
             except (ValueError, TypeError):
                 # This case should be rare if the JSON is well-formed for numerical C
                 print(f"Warning: Code {e_code} is type C but possible-values aren't purely numeric: {possible_values}. Treating as non-numerical.")
else:
     print("*** Error: Cannot determine numerical codes - No evidence data source available for check.")

print(f"Found {len(numerical_c_codes_for_pred)} numerical C-type codes for prediction processing.")
if not numerical_c_codes_for_pred and full_evidence_data:
     print("DEBUG: No numerical codes found. Check 'possible-values' and 'data_type' for codes like E_56 in release_evidences.json")
# --- End Pre-processing ---



# --- REVISED Function to build the prompt for Gemini ---
# --- ADD full_evidence_data as an argument ---
def build_gemini_prompt(user_symptoms_list, full_evidence_data):
    """Constructs the prompt for the Gemini API, including full evidence data."""

    # --- Convert evidence data to JSON string for the prompt ---
    evidence_json_string = ""
    if full_evidence_data:
        try:
            # Pretty print for better readability in the prompt (optional)
            evidence_json_string = json.dumps(full_evidence_data, indent=2)
        except Exception as e:
            print(f"Warning: Could not serialize full_evidence_data to JSON: {e}")
            evidence_json_string = "{ /* Error serializing evidence data */ }"
    else:
        evidence_json_string = "{ /* Evidence data not loaded */ }"

    # --- Provide Clear Instructions ---
    # --- ADD a section for the full evidence JSON ---
    instructions = f"""
        You are a highly diligent AI assistant specialized in mapping patient-reported symptoms OR medical history items to specific medical evidence codes. Your task is to analyze the provided list of {len(user_symptoms_list)} input items (symptoms, history questions, statements) and convert **each and every one** into its corresponding code(s) based on the defined evidence structure provided below.

        **Output Format Rules (CRITICAL):**
        1.  You MUST output **only** a valid Python list of strings.
        2.  **Crucially, you MUST attempt to map EVERY item from the input list.** Do NOT omit any input symptom; find the best possible code match using the FULL EVIDENCE DATA below. If an input symptom maps to multiple codes (e.g., a symptom and its location), include all. The output list will likely contain at least as many codes as the input symptom list.
        3.  Each string in the list must be a valid evidence code format based on the context and evidence data.
        4.  For simple boolean symptoms OR history items (like fever, cough, history of smoking), use the format: `"E_code"` (e.g., `"E_91"`, `"E_79"`). Map inputs even if phrased as questions if they match an evidence code's question text.
        5.  For items specifying a location, characteristic, or category (Multivalue 'M' or Categorical 'C' with V_ codes), use the format: `"E_code_@_V_code"` (e.g., `"E_55_@_V_17"` for 'groin(L)' related to pain). Find the correct V_code in the evidence data.
        6.  For items providing a numerical value (like a pain scale, data_type 'C' with numerical possible-values), use the format: `"E_code_@_Value"` (e.g., `"E_56_@_5"` for pain intensity 5). Check the evidence data for data_type 'C' and numerical possible-values.
        7.  **If a specific value/location cannot be determined but the general concept matches (e.g., "pain somewhere weird" matches E_53/E_55 concept), output the relevant BOOLEAN base code (e.g., "E_53" for general pain).** Do NOT invent V_codes or numerical values.
        8.  Ensure the final output starts with `[` and ends with `]`. Example for 3 input symptoms: `['E_91', 'E_79', 'E_55_@_V_17', 'E_56_@_5']` (Note: 4 codes for 3 inputs is possible).

        **FULL EVIDENCE DATA (Use this as the primary source for mapping):**
        ```json
        {evidence_json_string}
        ```

        **Mapping Examples (Illustrative, rely on FULL EVIDENCE DATA above):**
        *   "fever" -> `"E_91"`
        *   "left groin pain" -> `"E_55_@_V_17"`
        *   "pain intensity 7" -> `"E_56_@_7"`
        *   "intense headache" -> `"E_55_@_V_89"`
        *   "headache level 9" -> `["E_55_@_V_89", "E_56_@_9"]`
        *   "lesion on left forearm" -> `["E_129", "E_133_@_V_28"]`
        *   "lesion pain 4" -> `"E_134_@_4"`
        *   "swelling in right ankle" -> `["E_151", "E_152_@_V_34"]`
        *   "cough" -> `"E_201"`
        *   "sore throat" -> `"E_97"`
        *   "difficulty breathing" -> `"E_66"`
        *   "nausea" -> `"E_148"`
        *   "vomiting" -> `["E_148", "E_211"]`
        *   "chills" -> `"E_94"`
        *   "dizzy" -> `"E_76"`
        *   "I smoke cigarettes" OR "smoker" -> `"E_79"`
        *   "pain somewhere, related to reason for consulting" -> `"E_53"`
        *   "Pain characteristic: heavy" -> `"E_54_@_V_183"`
        *   "Pain location: back of the neck" -> `"E_55_@_V_26"`
        *   "Pain intensity 8" -> `"E_56_@_8"`
        *   "Lesion location: side of the neck(G)" -> `"E_133_@_V_54"`
        *   "loss of appetite / get full quickly" -> `"E_161"`
        *   "Travel out of country: N" -> `"E_204_@_V_10"`
        *   "smoke cigarettes?" -> `"E_79"`
        *   "history of asthma" -> `"E_124"`
        *   "pain in my leg somewhere" -> `"E_53"`
        *   "some kind of skin rash" -> `"E_129"`
        *   "pain was pretty bad" -> `"E_53"`

        **(Use the FULL EVIDENCE DATA above to map EVERY input item below to its best possible code(s) according to the rules).**

        **User Symptoms to Map ({len(user_symptoms_list)} items):**
    """
    # (Rest of the function remains the same)
    symptom_list_str = "\n".join([f"- {s}" for s in user_symptoms_list])
    prompt = instructions + "\n" + symptom_list_str + "\n\n**Mapped Evidence Codes (Python List Format Only):**\n"
    # print(f"DEBUG: Prompt length: {len(prompt)}") # Optional: Check prompt size
    return prompt


# --- VERIFIED FIX 1: Function to call Gemini and parse result with Markdown stripping ---
# --- Pass full_evidence_data to build_gemini_prompt ---
def map_symptoms_with_gemini(user_symptoms_list):
    """Calls Gemini API to map symptoms and parses the result."""
    if not user_symptoms_list:
        return [], []

    # Pass the loaded full_evidence_data to the prompt builder
    prompt = build_gemini_prompt(user_symptoms_list, full_evidence_data)
    print("\n--- Calling Gemini for Symptom Mapping ---")
    # print(f"Prompt being sent to Gemini:\n{prompt}") # DEBUG: Uncomment carefully, prompt is large!

    try:
        # ... rest of map_symptoms_with_gemini function remains the same ...
        response = gemini_model.generate_content(
            prompt,
             safety_settings=[
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
             ]
            )

        raw_output = response.text.strip()
        print(f"Raw Gemini Output:\n{raw_output}") # DEBUG

        # --- FIX 1: Strip Markdown Fences --- START ---
        cleaned_output = raw_output
        # Remove potential leading/trailing ```python or ```
        cleaned_output = re.sub(r'^```python\s*', '', cleaned_output)
        cleaned_output = re.sub(r'^```\s*', '', cleaned_output)
        cleaned_output = re.sub(r'\s*```$', '', cleaned_output)
        cleaned_output = cleaned_output.strip() # Ensure no leading/trailing whitespace remains
        # --- FIX 1: Strip Markdown Fences --- END ---

        print(f"Cleaned Gemini Output for Parsing:\n{cleaned_output}") # DEBUG

        # Attempt to parse the CLEANED output string as a Python list
        try:
            parsed_list = ast.literal_eval(cleaned_output) # Use cleaned_output
            if isinstance(parsed_list, list) and all(isinstance(item, str) for item in parsed_list):
                 validated_list = []
                 malformed_codes = []
                 for item in parsed_list:
                     # Use the regex expecting _@_
                     if re.match(r'^E_\d+(_@_.*)?$', item):
                         validated_list.append(item)
                     else:
                         malformed_codes.append(item)
                 if malformed_codes:
                      print(f"Warning: Gemini produced malformed codes (expected E_xxx or E_xxx_@_Value): {malformed_codes}")
                 print(f"Successfully Parsed & Validated Gemini Output: {validated_list}")
                 unmatched_symptoms = [] # Simplified
                 return validated_list, unmatched_symptoms
            else:
                print("Error: Gemini output was not a valid list of strings after cleaning.")
                return None, ["LLM output format error (not list of strings)"]
        except (ValueError, SyntaxError) as parse_error:
            print(f"Error parsing cleaned Gemini output as Python list: {parse_error}")
            # Ensure we log the string that failed parsing
            print(f"Output string that failed parsing: '{cleaned_output}'")
            return None, [f"LLM output parsing error: {parse_error}"]
        except Exception as e:
            print(f"Unexpected error parsing Gemini output: {e}")
            return None, ["LLM output processing error"]

    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None, [f"LLM API call failed: {e}"]








# --- process_patient_for_prediction_adv (Using _@_) (No changes needed from last version) ---
def process_patient_for_prediction_adv(age, sex, evidence_code_value_list):
    """Prepares the patient data DataFrame for the ML model."""
    start_time_proc = time.time()
    patient_df = pd.DataFrame(0.0, index=[0], columns=all_feature_columns, dtype=np.float32)

    for item in evidence_code_value_list:
        feature_col_name = None
        value_to_set = 1.0

        if '_@_' in item: # Use the correct separator
            parts = item.split('_@_', 1)
            base_code = parts[0]
            value_str = parts[1]

            # Use the pre-processed check for numerical codes
            if base_code in processed_evidence_for_pred and processed_evidence_for_pred[base_code]['is_numerical_c']:
                try:
                    num_val = float(value_str)
                    feature_col_name = base_code
                    value_to_set = num_val
                except ValueError:
                    print(f"Warning: Could not convert value '{value_str}' to float for numerical code '{base_code}'. Treating as categorical.")
                    feature_col_name = item
                    value_to_set = 1.0
            else: # Categorical _@_ (like E_55_@_V_17)
                feature_col_name = item
                value_to_set = 1.0
        else: # Binary code (like E_91)
            feature_col_name = item
            value_to_set = 1.0

        if feature_col_name and feature_col_name in patient_df.columns:
            patient_df.at[0, feature_col_name] = np.float32(value_to_set)
        elif feature_col_name:
            print(f"Warning: Code '{feature_col_name}' from LLM/input not found in model's feature columns. Skipping.")

    # --- Process AGE and SEX ---
    if 'AGE' in patient_df.columns:
        patient_df.at[0, 'AGE'] = np.float32(age)
    else: print("Warning: 'AGE' column not found in model features.")

    try:
        sex_input = pd.DataFrame({'SEX': [sex]}, index=[0])
        sex_encoded = sex_encoder.transform(sex_input[['SEX']])
        sex_cols = sex_encoder.get_feature_names_out(['SEX'])
        for i, col_name in enumerate(sex_cols):
            if col_name in patient_df.columns:
                patient_df.at[0, col_name] = np.float32(sex_encoded[0, i])
            else: print(f"Warning: Sex feature '{col_name}' not found in model features.")
    except Exception as e:
        print(f"Error encoding SEX '{sex}': {e}.")
        return None, f"Invalid SEX value: {sex}"

    # --- Apply Scaling ---
    if scaler and cols_scaled_during_fit:
        valid_cols_to_scale = [col for col in cols_scaled_during_fit if col in patient_df.columns]
        if valid_cols_to_scale:
            df_to_scale = patient_df[valid_cols_to_scale]
            try:
                scaled_values = scaler.transform(df_to_scale)
                patient_df[valid_cols_to_scale] = scaled_values
            except Exception as e:
                print(f"Error applying scaler: {e}")
                return None, "Scaler application failed"
    elif scaler and not cols_scaled_during_fit:
        print("Warning: Scaler loaded but list of scaled columns from training missing.")

    # --- Final Column Alignment ---
    try:
        patient_df = patient_df[all_feature_columns]
    except KeyError as e:
        print(f"Error aligning columns: Missing column {e}")
        return None, f"Internal error: Missing expected feature column {e}"
    except Exception as e:
         print(f"Error during final column alignment: {e}")
         return None, "Internal error: Failed to align feature columns for prediction."

    return patient_df, None


# --- Flask App Initialization ---
app = Flask(__name__)

# --- API Endpoint (No changes needed from last version) ---
@app.route('/predict', methods=['POST'])
def predict():
    start_request_time = time.time()
    print(f"\nReceived request at {time.strftime('%Y-%m-%d %H:%M:%S')}")
    try:
        data = request.get_json();
        if not data: return jsonify({"error": "Bad Request: No JSON data received."}), 400
        print(f"Request data: {data}")
        age = data.get('age'); sex = data.get('sex'); user_symptoms = data.get('symptoms')
        if age is None or sex is None or user_symptoms is None: missing = [k for k in ['age', 'sex', 'symptoms'] if k not in data]; return jsonify({"error": f"Bad Request: Missing fields: {', '.join(missing)}"}), 400
        if not isinstance(user_symptoms, list) or not all(isinstance(s, str) for s in user_symptoms): return jsonify({"error": "Bad Request: 'symptoms' must be a list of strings."}), 400
        if not isinstance(age, (int, float)) or age <= 0: return jsonify({"error": "Bad Request: 'age' must be positive."}), 400
        if sex not in sex_encoder.categories_[0]: return jsonify({"error": f"Bad Request: 'sex' must be one of {list(sex_encoder.categories_[0])}."}), 400
    except Exception as e: print(f"Error parsing request: {e}"); return jsonify({"error": "Bad Request: Invalid JSON."}), 400

    # *** STEP 1: Use Gemini to map symptoms to codes ***
    evidence_codes_and_values, mapping_errors = map_symptoms_with_gemini(user_symptoms)

    if evidence_codes_and_values is None:
        error_detail = ", ".join(mapping_errors) if mapping_errors else "Unknown mapping error"
        print(f"Symptom mapping failed: {error_detail}")
        return jsonify({"error": f"Symptom mapping failed: {error_detail}"}), 500

    print(f"Gemini mapped codes: {evidence_codes_and_values}")

    # *** STEP 2: Process patient data using the codes from Gemini ***
    processed_input_df, error_msg = process_patient_for_prediction_adv(age, sex, evidence_codes_and_values)

    if processed_input_df is None:
        print(f"Processing error after mapping: {error_msg}")
        return jsonify({"error": f"Internal Server Error: {error_msg}"}), 500

    # *** STEP 3: Make prediction using the loaded ML model ***
    try:
        print("Making prediction with ML model...")
        if hasattr(model, 'feature_names_in_'): model_expected_features = model.feature_names_in_
        elif hasattr(model, 'get_booster') and hasattr(model.get_booster(), 'feature_names'): model_expected_features = model.get_booster().feature_names
        else: model_expected_features = all_feature_columns

        final_input_df = processed_input_df[model_expected_features]
        pred_encoded = model.predict(final_input_df)
        probabilities = model.predict_proba(final_input_df)
        print("Prediction successful.")
    except ValueError as ve: print(f"Prediction ValueError: {ve}"); return jsonify({"error": "Internal Server Error: Prediction feature mismatch."}), 500
    except KeyError as ke: print(f"Prediction KeyError: Missing feature {ke} expected by model."); return jsonify({"error": f"Internal Server Error: Feature mismatch during prediction ({ke})."}), 500
    except Exception as e: print(f"Prediction Error: {e}"); return jsonify({"error": "Internal Server Error: Prediction failed."}), 500

    # *** STEP 4: Format and return the response ***
    predicted_disease_name = target_encoder.inverse_transform(pred_encoded)[0]
    prob_dict = {class_names[i]: round(float(prob), 6) for i, prob in enumerate(probabilities[0])}
    sorted_probs = sorted(prob_dict.items(), key=lambda item: item[1], reverse=True)

    response = {
        "predicted_disease": predicted_disease_name,
        "probabilities": sorted_probs,
        "processed_symptoms_codes": evidence_codes_and_values,
    }
    end_request_time = time.time()
    print(f"Request processed in {end_request_time - start_request_time:.4f} seconds.")
    return jsonify(response), 200


# --- Run the App ---
if __name__ == '__main__':
    print("\nStarting Flask App...")
    app.run(host='0.0.0.0', port=5000, debug=True) # Set debug=False for production