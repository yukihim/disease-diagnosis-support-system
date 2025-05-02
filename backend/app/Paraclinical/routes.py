from . import app
# Remove unused imports if overview and test modules are not used by these new routes
# from . import overview, test
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify
import random # For generating mock data
from datetime import datetime # For age calculation
import math # For precision calculation

# --- Mock Data ---

# Define states consistent with frontend
PATIENT_STATES = {
    "RESULT_READY": "Test Result Ready",
    "WAITING_RESULT": "Waiting For Result",
    "WAITING_TEST": "Waiting For Test" # Assuming this maps to 'Waiting For Test' in frontend logic
}

# Patient database - Synchronized with Receptionist mock data
# DOB format: MM-DD-YYYY
mock_patients_db = {
    "patient_001": {
        "patientID": "patient_001", # Using userID as patientID for simplicity here
        "patientName": "Nguyen Van A",
        "ssn": "079200001111",
        "hic": "HIC-A",
        "dob": "05-10-1985",
        "gender": "Male",
        "phone": "0912345678",
        "height": "175",
        "weight": "70",
        "job": "Engineer",
        "address": "123 Main St, Hanoi",
        "followUpDate": "04-30-2025"
    },
    "patient_002": {
        "patientID": "patient_002",
        "patientName": "Tran Thi B",
        "ssn": "079200002222",
        "hic": "HIC-B",
        "dob": "11-25-1992",
        "gender": "Female",
        "phone": "0987654321",
        "height": "160",
        "weight": "55",
        "job": "Teacher",
        "address": "456 Oak Ave, HCMC",
        "followUpDate": ""
    },
    "abc-xyz-123": { # Matching test value from Receptionist
        "patientID": "abc-xyz-123",
        "patientName": "Le Van C (Test)",
        "ssn": "079283868386", # Matching test value
        "hic": "HIC-C",
        "dob": "01-15-1978",
        "gender": "Male",
        "phone": "0909913313",
        "height": "180",
        "weight": "85",
        "job": "Manager",
        "address": "789 Pine Ln, Danang",
        "followUpDate": "04-29-2025"
    },
    # Add back other patients if needed for Paraclinical specific scenarios,
    # ensuring unique IDs and consistent structure.
    # Example: Adding back John Doe, Jane Smith etc. with consistent IDs
    "patient_jd": {
        "patientID": "patient_jd",
        "patientName": "John Doe",
        "ssn": "111223333",
        "hic": "HIC-JD",
        "dob": "01-15-1979",
        "gender": "Male",
        "phone": "0912345010",
        "height": "180",
        "weight": "80",
        "job": "Unknown",
        "address": "10 Unknown St",
        "followUpDate": ""
    },
    "patient_js": {
        "patientID": "patient_js",
        "patientName": "Jane Smith",
        "ssn": "444556666",
        "hic": "HIC-JS",
        "dob": "03-20-1992",
        "gender": "Female",
        "phone": "0912345011",
        "height": "165",
        "weight": "60",
        "job": "Unknown",
        "address": "11 Unknown St",
        "followUpDate": ""
    },
    "patient_mj": {
        "patientID": "patient_mj",
        "patientName": "Mike Johnson",
        "ssn": "777889999",
        "hic": "HIC-MJ",
        "dob": "06-10-1996",
        "gender": "Male",
        "phone": "0912345012",
        "height": "178",
        "weight": "75",
        "job": "Unknown",
        "address": "12 Unknown St",
        "followUpDate": ""
    },
    "patient_sw": {
        "patientID": "patient_sw",
        "patientName": "Sarah Williams",
        "ssn": "121314151",
        "hic": "HIC-SW",
        "dob": "09-05-1970",
        "gender": "Female",
        "phone": "0912345013",
        "height": "162",
        "weight": "65",
        "job": "Unknown",
        "address": "13 Unknown St",
        "followUpDate": ""
    },
    "patient_rb": {
        "patientID": "patient_rb",
        "patientName": "Robert Brown",
        "ssn": "161718191",
        "hic": "HIC-RB",
        "dob": "11-25-1957",
        "gender": "Male",
        "phone": "0912345014",
        "height": "173",
        "weight": "82",
        "job": "Retired",
        "address": "14 Unknown St",
        "followUpDate": ""
    },
    "patient_ed": {
        "patientID": "patient_ed",
        "patientName": "Emily Davis",
        "ssn": "202122232",
        "hic": "HIC-ED",
        "dob": "04-15-2005",
        "gender": "Female",
        "phone": "0912345015",
        "height": "168",
        "weight": "58",
        "job": "Student",
        "address": "15 Unknown St",
        "followUpDate": ""
    },
    "patient_dw": {
        "patientID": "patient_dw",
        "patientName": "David Wilson",
        "ssn": "242526272",
        "hic": "HIC-DW",
        "dob": "07-30-1983",
        "gender": "Male",
        "phone": "0912345016",
        "height": "182",
        "weight": "88",
        "job": "Unknown",
        "address": "16 Unknown St",
        "followUpDate": ""
    }
    # Note: The original 'patient_pxt', 'px1' etc. IDs are removed unless you map them
    # to the new structure (e.g., patient_001, patient_002) or add them back explicitly.
}

# Helper function to calculate age
def calculate_age(dob_str):
    if not dob_str:
        return None
    try:
        # Assuming MM-DD-YYYY format
        dob = datetime.strptime(dob_str, "%m-%d-%Y")
        today = datetime.today()
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        return age
    except ValueError:
        return None # Invalid date format

# Function to merge patient details with session details
def create_incoming_patient_entry(session_id, patient_id, room, state_key, note):
    patient_details = mock_patients_db.get(patient_id)
    if not patient_details:
        print(f"Warning: Patient ID '{patient_id}' not found in mock_patients_db for session '{session_id}'")
        return None # Or return a default structure

    age = calculate_age(patient_details.get("dob"))

    return {
        "sessionID": session_id,
        "patientID": patient_id, # Include patientID
        "name": patient_details.get("patientName"),
        "sex": patient_details.get("gender"), # Map gender to sex if needed by frontend
        "age": age if age is not None else "N/A", # Use calculated age
        "dob": patient_details.get("dob"),
        "ssn": patient_details.get("ssn"),
        "hic": patient_details.get("hic"),
        "phone": patient_details.get("phone"),
        "height": patient_details.get("height"),
        "weight": patient_details.get("weight"),
        "job": patient_details.get("job"),
        "address": patient_details.get("address"),
        "from": room, # Session specific
        "state": PATIENT_STATES.get(state_key, "Unknown State"), # Session specific
        "note": note # Session specific
    }

# Rebuild mock_incoming_patients using the helper function and SYNCHRONIZED patient IDs
mock_incoming_patients = [
    # Using patient_001, patient_002, abc-xyz-123 from synchronized DB
    create_incoming_patient_entry("sess_pxt_001", "patient_001", "R. 304", "RESULT_READY", "Patient needs urgent care"), # Was patient_pxt
    create_incoming_patient_entry("sess_pxb_006", "patient_002", "R. 304", "WAITING_RESULT", "No note"), # Was patient_pxb -> using patient_002 as example
    create_incoming_patient_entry("sess_pxc_007", "abc-xyz-123", "R. 304", "WAITING_TEST", "Testing blood"), # Was patient_pxc -> using abc-xyz-123 as example
    # Using other patient IDs added back to the synchronized DB
    create_incoming_patient_entry("sess_jd_010", "patient_jd", "R. 305", "WAITING_TEST", "Allergic to penicillin"),
    create_incoming_patient_entry("sess_js_011", "patient_js", "R. 306", "WAITING_TEST", "MRI needed"),
    create_incoming_patient_entry("sess_mj_012", "patient_mj", "R. 307", "WAITING_TEST", "High fever"),
    create_incoming_patient_entry("sess_sw_013", "patient_sw", "R. 308", "WAITING_TEST", "Blood test required"),
    create_incoming_patient_entry("sess_rb_014", "patient_rb", "R. 309", "WAITING_TEST", "Chronic condition check"),
    create_incoming_patient_entry("sess_ed_015", "patient_ed", "R. 310", "WAITING_TEST", "X-ray needed"),
    create_incoming_patient_entry("sess_dw_016", "patient_dw", "R. 311", "WAITING_TEST", "Follow-up scan"),
]
# Filter out any None entries if create_incoming_patient_entry failed
mock_incoming_patients = [p for p in mock_incoming_patients if p is not None]


# --- Detailed Test Structure (Similar to Frontend Mock) ---
# This structure defines the parameters for each test type.
mock_test_definitions = {
    # --- Blood Tests ---
    "Complete Blood Count": {
        "testName": "Complete Blood Count",
        "testFields": [
            {"key": "Hemoglobin (Hgb)", "label": "Hgb", "unit": "g/dL", "range": {"low": 12.0, "high": 18.0}},
            {"key": "Hematocrit (Hct)", "label": "Hct", "unit": "%", "range": {"low": 36.0, "high": 50.0}},
            {"key": "White Blood Cell Count (WBC)", "label": "WBC", "unit": "cells/mm³", "range": {"low": 4500, "high": 11000}},
            {"key": "Platelet Count", "label": "PLT", "unit": "cells/mm³", "range": {"low": 150000, "high": 350000}},
        ]
    },
    "Basic Metabolic Panel": { # Renamed from Blood Chemistry for clarity, added BMP fields
        "testName": "Basic Metabolic Panel",
        "testFields": [
            {"key": "Blood Urea Nitrogen (BUN)", "label": "BUN", "unit": "mg/dL", "range": {"low": 8.0, "high": 23.0}},
            {"key": "Serum Creatinine", "label": "Creatinine", "unit": "mg/dL", "range": {"low": 0.6, "high": 1.2}},
            {"key": "Glucose", "label": "Glucose", "unit": "mg/dL", "range": {"low": 70.0, "high": 110.0}},
            {"key": "Calcium", "label": "Calcium", "unit": "mg/dL", "range": {"low": 8.2, "high": 10.2}},
            {"key": "Sodium", "label": "Sodium", "unit": "mEq/L", "range": {"low": 135, "high": 145}},
            {"key": "Potassium", "label": "Potassium", "unit": "mEq/L", "range": {"low": 3.5, "high": 5.0}},
            {"key": "Chloride", "label": "Chloride", "unit": "mEq/L", "range": {"low": 98, "high": 107}},
            {"key": "Bicarbonate (CO2)", "label": "CO2", "unit": "mEq/L", "range": {"low": 22, "high": 29}},
        ]
    },
    "Lipid Panel": {
        "testName": "Lipid Panel",
        "testFields": [
            {"key": "Total Cholesterol", "label": "Total Chol", "unit": "mg/dL", "range": {"low": 125.0, "high": 200.0}},
            {"key": "LDL Cholesterol", "label": "LDL", "unit": "mg/dL", "range": {"low": 0.0, "high": 130.0}},
            {"key": "HDL Cholesterol", "label": "HDL", "unit": "mg/dL", "range": {"low": 40.0, "high": 60.0}},
            {"key": "Triglycerides", "label": "Trig", "unit": "mg/dL", "range": {"low": 0.0, "high": 150.0}},
        ]
    },
    "HbA1c (Diabetes Screen)": {
        "testName": "HbA1c (Diabetes Screen)",
        "testFields": [
            {"key": "Hemoglobin A1c", "label": "HbA1c", "unit": "%", "range": {"low": 4.0, "high": 6.0}},
        ]
    },
    "Liver Function Tests": { # Renamed from "Liver Function Test"
        "testName": "Liver Function Tests",
        "testFields": [
            {"key": "Alanine Aminotransferase (ALT)", "label": "ALT", "unit": "U/L", "range": {"low": 10.0, "high": 40.0}},
            {"key": "Aspartate Aminotransferase (AST)", "label": "AST", "unit": "U/L", "range": {"low": 10.0, "high": 30.0}},
            {"key": "Alkaline Phosphatase (ALP)", "label": "ALP", "unit": "IU/L", "range": {"low": 30.0, "high": 120.0}},
            {"key": "Total Bilirubin", "label": "TBIL", "unit": "mg/dL", "range": {"low": 0.3, "high": 1.2}},
            {"key": "Direct Bilirubin", "label": "DBIL", "unit": "mg/dL", "range": {"low": 0.1, "high": 0.3}},
            {"key": "Albumin", "label": "Albumin", "unit": "g/dL", "range": {"low": 3.5, "high": 5.0}},
        ]
    },
    "C-Reactive Protein (CRP)": {
        "testName": "C-Reactive Protein (CRP)",
        "testFields": [
            {"key": "CRP", "label": "CRP", "unit": "mg/L", "range": {"low": 0.08, "high": 3.1}},
        ]
    },
    "Ferritin": {
        "testName": "Ferritin",
        "testFields": [
            {"key": "Ferritin", "label": "Ferritin", "unit": "ng/mL", "range": {"low": 15.0, "high": 200.0}},
        ]
    },

    # --- Urine & Stool Tests ---
    "Urinalysis": { # Updated Urinalysis
        "testName": "Urinalysis",
        "testFields": [
            {"key": "Protein", "label": "Protein", "unit": "mg/dL", "range": {"low": 0.0, "high": 15.0}},
            {"key": "Glucose", "label": "Glucose", "unit": "mg/dL", "range": {"low": 0.0, "high": 15.0}}, # Changed from presence
            {"key": "Ketones", "label": "Ketones", "unit": "mg/dL", "range": {"low": 0.0, "high": 5.0}},
            {"key": "Blood", "label": "Blood", "unit": "presence", "range": {"low": "negative", "high": "negative"}},
            # Added pH and SG from original backend mock for completeness, adjust if needed
            {"key": "pH", "label": "pH", "unit": "", "range": {"low": 5.0, "high": 8.0}},
            {"key": "Specific Gravity", "label": "SG", "unit": "", "range": {"low": 1.005, "high": 1.030}},
        ]
    },
    "Urine Culture": {
        "testName": "Urine Culture",
        "testFields": [
            {"key": "Bacterial Growth", "label": "Growth", "unit": "CFU/mL", "range": {"low": 0, "high": 10000}},
            {"key": "Pathogen Identified", "label": "Pathogen", "unit": "string", "range": {}},
        ]
    },
    "Stool Occult Blood Test": {
        "testName": "Stool Occult Blood Test",
        "testFields": [
            {"key": "Occult Blood", "label": "Occult Blood", "unit": "presence", "range": {"low": "negative", "high": "negative"}},
        ]
    },
    "Stool Culture": {
        "testName": "Stool Culture",
        "testFields": [
            {"key": "Pathogen Identified", "label": "Pathogen", "unit": "string", "range": {}},
        ]
    },

    # --- Imaging ---
    "X-Ray": {
        "testName": "X-Ray",
        "testFields": [
            {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
        ]
    },
    "Magnetic Resonance Imaging (MRI)": {
        "testName": "Magnetic Resonance Imaging (MRI)",
        "testFields": [
            {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
        ]
    },
    "Computed Tomography (CT) Scan": {
        "testName": "Computed Tomography (CT) Scan",
        "testFields": [
            {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
        ]
    },
    "Ultrasound": {
        "testName": "Ultrasound",
        "testFields": [
            {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
        ]
    },
    "Positron Emission Tomography (PET)": {
        "testName": "Positron Emission Tomography (PET)",
        "testFields": [
            {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
        ]
    },
    "Optical Coherence Tomography (OCT)": {
        "testName": "Optical Coherence Tomography (OCT)",
        "testFields": [
            {"key": "Retinal Nerve Fiber Layer Thickness", "label": "RNFL", "unit": "µm", "range": {"low": 80.0, "high": 110.0}},
        ]
    },

    # --- Cardiac Tests ---
    "Electrocardiogram (ECG/EKG)": { # Renamed from EKG
        "testName": "Electrocardiogram (ECG/EKG)",
        "testFields": [
            {"key": "Heart Rate", "label": "HR", "unit": "bpm", "range": {"low": 60, "high": 100}},
            {"key": "PR Interval", "label": "PR", "unit": "ms", "range": {"low": 120, "high": 200}},
            {"key": "QRS Duration", "label": "QRS", "unit": "ms", "range": {"low": 80, "high": 120}},
            # Added Rhythm from original backend mock for completeness
            {"key": "Rhythm", "label": "Rhythm", "unit": "string", "range": {}},
        ]
    },
    "Echocardiogram": {
        "testName": "Echocardiogram",
        "testFields": [
            {"key": "Ejection Fraction", "label": "EF", "unit": "%", "range": {"low": 55.0, "high": 70.0}},
            {"key": "Left Ventricular Size", "label": "LV Size", "unit": "cm", "range": {"low": 3.5, "high": 5.7}},
        ]
    },
    "Stress Test": {
        "testName": "Stress Test",
        "testFields": [
            {"key": "Exercise Duration", "label": "Duration", "unit": "minutes", "range": {}}, # No standard range
            {"key": "Max Heart Rate Achieved", "label": "Max HR", "unit": "bpm", "range": {}}, # No standard range
        ]
    },

    # --- Neurological & Specialized Tests ---
    "Evoked Potentials": {
        "testName": "Evoked Potentials",
        "testFields": [
            {"key": "Visual Evoked Potential Latency", "label": "VEP Latency", "unit": "ms", "range": {"low": 90.0, "high": 110.0}},
            {"key": "Somatosensory Evoked Potential Latency", "label": "SSEP Latency", "unit": "ms", "range": {}}, # No standard range
        ]
    },
    "Cerebrospinal Fluid (CSF) Analysis": {
        "testName": "Cerebrospinal Fluid (CSF) Analysis",
        "testFields": [
            {"key": "White Blood Cell Count", "label": "WBC (CSF)", "unit": "cells/mm³", "range": {"low": 0, "high": 5}},
            {"key": "Protein", "label": "Protein (CSF)", "unit": "mg/dL", "range": {"low": 15.0, "high": 45.0}},
            {"key": "Glucose", "label": "Glucose (CSF)", "unit": "mg/dL", "range": {"low": 50.0, "high": 80.0}},
            {"key": "Oligoclonal Bands", "label": "Oligo Bands", "unit": "presence", "range": {"low": "negative", "high": "negative"}},
        ]
    },
    "Biopsy": {
        "testName": "Biopsy",
        "testFields": [
            {"key": "Histopathological Findings", "label": "Findings", "unit": "string", "range": {}},
        ]
    },
    "Enzyme-linked Immunosorbent Assay (ELISA)": {
        "testName": "Enzyme-linked Immunosorbent Assay (ELISA)",
        "testFields": [
            {"key": "Antibody Level", "label": "Antibody Lvl", "unit": "IU/mL", "range": {}}, # No standard range
        ]
    },

    # --- Other Specialized Tests ---
    "Allergy Panel (IgE)": {
        "testName": "Allergy Panel (IgE)",
        "testFields": [
            {"key": "Total IgE", "label": "Total IgE", "unit": "IU/mL", "range": {"low": 0.0, "high": 100.0}},
            {"key": "Specific IgE", "label": "Specific IgE", "unit": "IU/mL", "range": {}}, # No standard range
        ]
    },
    "Genetic Screening": {
        "testName": "Genetic Screening",
        "testFields": [
            {"key": "Mutation Detected", "label": "Mutation", "unit": "string", "range": {}},
        ]
    },
    "Pulmonary Function Tests (PFTs)": {
        "testName": "Pulmonary Function Tests (PFTs)",
        "testFields": [
            {"key": "Forced Vital Capacity (FVC)", "label": "FVC", "unit": "L", "range": {"low": 3.0, "high": 5.0}},
            {"key": "Forced Expiratory Volume in 1 second (FEV1)", "label": "FEV1", "unit": "L", "range": {"low": 2.5, "high": 4.0}},
            {"key": "FEV1/FVC Ratio", "label": "FEV1/FVC", "unit": "%", "range": {"low": 70.0, "high": 85.0}},
        ]
    },
    # --- Added from original backend mock, remove if not needed ---
    "Blood Chemistry": { # Kept original Blood Chemistry as it might be used elsewhere
        "testName": "Blood Chemistry",
        "testFields": [
            {"key": "Sodium", "label": "Na", "unit": "mEq/L", "range": {"low": 135, "high": 145}},
            {"key": "Potassium", "label": "K", "unit": "mEq/L", "range": {"low": 3.5, "high": 5.0}},
            {"key": "Glucose", "label": "Glucose", "unit": "mg/dL", "range": {"low": 70, "high": 100}}, # Different range than BMP Glucose
            {"key": "BUN", "label": "BUN", "unit": "mg/dL", "range": {"low": 7, "high": 20}}, # Different range than BMP BUN
            {"key": "Troponin T", "label": "Troponin T", "unit": "ng/mL", "range": {"low": 0.00, "high": 0.04}},
            {"key": "CK-MB", "label": "CK-MB", "unit": "ng/mL", "range": {"low": 0.0, "high": 5.0}},
        ]
    },
}

# --- Random Value Generation (Moved from Frontend) ---
def generate_random_value_py(range_dict):
    """Generates a random value based on the provided range dictionary."""
    if not range_dict: # Handle cases like EKG Rhythm
        return "Normal" # Or other appropriate default

    low = range_dict.get('low')
    high = range_dict.get('high')

    # Numeric range
    if isinstance(low, (int, float)) and isinstance(high, (int, float)):
        lower_bound = float(low)
        upper_bound = float(high)
        value = lower_bound + random.random() * (upper_bound - lower_bound)
        abnormal_chance = random.random()

        # Determine precision based on range difference or typical clinical values
        range_diff = upper_bound - lower_bound
        if range_diff == 0: # Avoid division by zero if low == high
             precision = 1
        elif abs(lower_bound) > 1000 or abs(upper_bound) > 1000: # Large numbers (like Platelets)
            precision = 0
        elif range_diff < 1:
            precision = 2
        elif range_diff < 100:
            precision = 1
        else:
            precision = 0

        # Introduce some abnormal values
        if abnormal_chance > 0.9: # High abnormal
            # Ensure deviation is reasonable, avoid negative results for naturally positive values
            deviation = max(0.1, abs(upper_bound * 0.2))
            return f"{upper_bound + random.random() * deviation:.{precision}f}"
        elif abnormal_chance > 0.8: # Low abnormal
            # Ensure deviation is reasonable
            deviation = max(0.1, abs(lower_bound * 0.2))
            # Prevent going below zero if lower bound is zero or positive
            result = lower_bound - random.random() * deviation
            if lower_bound >= 0:
                result = max(0, result) # Ensure non-negative if range starts >= 0
            return f"{result:.{precision}f}"

        # Normal value with calculated precision
        return f"{value:.{precision}f}"

    # Handle non-numeric ranges (like 'presence')
    if low == 'negative' and high == 'negative':
        return 'positive' if random.random() > 0.9 else 'negative' # 10% chance positive

    # Handle string types or ranges without low/high defined
    if not low and not high:
        # Could add more specific logic based on unit or key if needed
        return "Normal" # Default for string/undefined range

    return "N/A" # Fallback


# --- Mock Session Test Assignments ---
# Map session IDs to the list of test names they require.
# This replaces the less structured mock_test_related_info
mock_session_tests = {
    "sess_pxt_001": ["Blood Chemistry"], # Result Ready
    "sess_pxb_006": ["Liver Function Test"], # Waiting Result
    "sess_pxc_007": ["Complete Blood Count"], # Waiting Test
    "sess_jd_010": ["Blood Chemistry"], # Waiting Test
    "sess_js_011": ["EKG"], # Waiting Test (Example)
    "sess_mj_012": ["Urinalysis"], # Waiting Test (Example)
    "sess_sw_013": ["Complete Blood Count"], # Waiting Test
    "sess_rb_014": ["Blood Chemistry", "Liver Function Test"], # Waiting Test (Multiple)
    "sess_ed_015": ["Urinalysis"], # Waiting Test
    "sess_dw_016": ["EKG"], # Waiting Test
    # Add mappings for other sessions as needed
}

# --- Routes ---

# 7.4.7.1 LandingPage: Get Incoming Patient For Test List
@app.route('/landing_page/incoming_patient', methods=['GET'])
@jwt_required()
def get_incoming_patient_list():
    """
    Retrieves a list of incoming patients waiting for or undergoing tests,
    including detailed patient information.
    Supports filtering by state and pagination.
    """
    try:
        response_data = {
            "incomingPatient": mock_incoming_patients,
        }

        return jsonify(response_data), 200
    except Exception as e:
        print(f"Error in get_incoming_patient_list: {e}") # Log the error
        return jsonify({"message": "An error occurred retrieving incoming patient list."}), 500


# 7.4.7.2 PatientTest: Get Test Related Information (Test Structure)
@app.route('/patient_test/<string:sessionID>', methods=['GET'])
@jwt_required()
def get_test_related_information(sessionID):
    """
    Retrieves the structure (test names and fields) of tests assigned
    to a specific patient session. Includes results if state is 'Test Result Ready'.
    """
    try:
        assigned_test_names = mock_session_tests.get(sessionID)

        # Find patient state for this session
        patient_entry = next((p for p in mock_incoming_patients if p['sessionID'] == sessionID), None)
        patient_state = patient_entry.get('state') if patient_entry else None
        is_result_ready = patient_state == PATIENT_STATES["RESULT_READY"]

        if assigned_test_names is None:
            # If session exists but has no tests assigned (unlikely in this flow, but possible)
            # Or if session ID is invalid
            if patient_entry: # Session exists
                 return jsonify({"patientTests": []}), 200 # Valid session, no tests assigned
            else:
                 return jsonify({"message": f"Session ID not found: {sessionID}"}), 404


        # Retrieve the full structure for each assigned test name
        test_structures = []
        for test_name in assigned_test_names:
            structure = mock_test_definitions.get(test_name)
            if structure:
                processed_fields = []
                for field in structure.get("testFields", []):
                    field_copy = {k: v for k, v in field.items()} # Make a copy
                    if is_result_ready:
                        # Generate and add the value if results are ready
                        value = generate_random_value_py(field.get("range"))
                        field_copy['value'] = value
                    # else: # No need for else, value is just not added
                    processed_fields.append(field_copy)

                structure_copy = {
                    "testName": structure["testName"],
                    "testFields": processed_fields # Use the list that may or may not contain 'value'
                }
                test_structures.append(structure_copy)
            else:
                print(f"Warning: Test definition not found for '{test_name}' in session '{sessionID}'")


        # Return the list of test structures (potentially with values)
        return jsonify({"patientTests": test_structures}), 200

    except Exception as e:
        print(f"Error retrieving test structure for {sessionID}: {e}") # Log the error
        return jsonify({"message": "An error occurred retrieving test related information."}), 500

# 7.4.7.3 PatientTest: Get Device Measuring (Generate Results) & Update State
@app.route('/patient_test/<string:sessionID>/measuring', methods=['GET'])
@jwt_required()
def get_device_measuring(sessionID):
    """
    Generates and retrieves mock measurements for a specific test type
    within a patient session using the backend random generator.
    Updates the patient's state to 'Test Result Ready' upon success.
    """
    try:
        # Use 'testName' to align with frontend and mock_test_definitions keys
        test_name = request.args.get('testName')

        if not test_name:
            return jsonify({"message": "Missing 'testName' query parameter."}), 400

        # Find the patient entry first to check state and existence
        patient_index = -1
        for i, patient in enumerate(mock_incoming_patients):
            if patient['sessionID'] == sessionID:
                patient_index = i
                break

        if patient_index == -1:
             return jsonify({"message": f"Session ID not found: {sessionID}"}), 404

        # Optional: Check if already 'Test Result Ready' - maybe prevent re-measuring?
        # current_state = mock_incoming_patients[patient_index].get('state')
        # if current_state == PATIENT_STATES["RESULT_READY"]:
        #     return jsonify({"message": "Results are already ready for this session."}), 400 # Or just return existing results?

        # Check if the test name is validly assigned to this session
        assigned_tests = mock_session_tests.get(sessionID)
        if assigned_tests is None or test_name not in assigned_tests:
             # Session exists (checked above), but this test isn't assigned or test name is wrong
             return jsonify({"message": f"Test '{test_name}' not assigned or invalid for session ID '{sessionID}'"}), 404

        # Get the definition for the requested test name
        test_definition = mock_test_definitions.get(test_name)
        if not test_definition:
            # This case should ideally not happen if mock_session_tests is consistent with mock_test_definitions
            print(f"Error: Test definition inconsistency for {test_name}")
            return jsonify({"message": f"Internal Error: Test definition not found for test name: {test_name}"}), 500

        # Generate measurements for each field in the test definition
        generated_measurements = []
        for field in test_definition.get("testFields", []):
            value = generate_random_value_py(field.get("range"))
            generated_measurements.append({
                "key": field.get("key"), # Send back the key for matching
                "label": field.get("label"), # Send back label for potential use
                "value": value
            })

        # --- Update patient state ---
        # This assumes that generating measurements for *one* test marks the *entire session* as ready.
        # If multiple tests need completion, this logic would need adjustment.
        mock_incoming_patients[patient_index]['state'] = PATIENT_STATES["RESULT_READY"]
        print(f"Updated state for session {sessionID} to {PATIENT_STATES['RESULT_READY']}") # Log state change

        return jsonify({"measurements": generated_measurements}), 200

    except Exception as e:
        print(f"Error generating measurements for {sessionID}, test {test_name}: {e}") # Log the error
        # Avoid changing state if an error occurred during measurement generation
        return jsonify({"message": "An error occurred generating device measurements."}), 500