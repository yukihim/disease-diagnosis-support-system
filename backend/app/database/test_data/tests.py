"""
Author: nhoxtin15
Model Description:
    
Date Created: 25/04/2025
Last Updated: 25/04/2025
"""

from ..models import Tests, Test_names, Test_types, Test_parameters

import os
file_path = os.path.join(os.path.dirname(__file__), 'csv', 'tests.csv')


list_test_data_test_name = {
    'Blood Tests': [
        {
            "name": "Complete Blood Count", 
            "parameters": [
                {"key": "Hemoglobin (Hgb)", "label": "Hgb", "unit": "g/dL", "range": {"low": 12.0, "high": 18.0}},
                {"key": "Hematocrit (Hct)", "label": "Hct", "unit": "%", "range": {"low": 36.0, "high": 50.0}},
                {"key": "White Blood Cell Count (WBC)", "label": "WBC", "unit": "cells/mm³", "range": {"low": 4500, "high": 11000}},
                {"key": "Platelet Count", "label": "PLT", "unit": "cells/mm³", "range": {"low": 150000, "high": 350000}},
            ]
        },
    
        {
            "name": "Basic Metabolic Panel", 
            "parameters": [
                {"key": "Serum Creatinine", "label": "Creatinine", "unit": "mg/dL", "range": {"low": 0.6, "high": 1.2}},
                {"key": "Glucose", "label": "Glucose", "unit": "mg/dL", "range": {"low": 70.0, "high": 110.0}},
                {"key": "Calcium", "label": "Calcium", "unit": "mg/dL", "range": {"low": 8.2, "high": 10.2}},
                {"key": "Sodium", "label": "Sodium", "unit": "mEq/L", "range": {"low": 135, "high": 145}},
                {"key": "Potassium", "label": "Potassium", "unit": "mEq/L", "range": {"low": 3.5, "high": 5.0}},
                {"key": "Chloride", "label": "Chloride", "unit": "mEq/L", "range": {"low": 98, "high": 107}},
                {"key": "Bicarbonate (CO2)", "label": "CO2", "unit": "mEq/L", "range": {"low": 22, "high": 29}},
            ]
        },
        {
            "name": "Lipid Panel", 
            "parameters": [
                {"key": "Total Cholesterol", "label": "Total Chol", "unit": "mg/dL", "range": {"low": 125.0, "high": 200.0}},
                {"key": "LDL Cholesterol", "label": "LDL", "unit": "mg/dL", "range": {"low": 0.0, "high": 130.0}},
                {"key": "HDL Cholesterol", "label": "HDL", "unit": "mg/dL", "range": {"low": 40.0, "high": 60.0}},
                {"key": "Triglycerides", "label": "Trig", "unit": "mg/dL", "range": {"low": 0.0, "high": 150.0}},
            ]
        },
        {
            "name": "HbA1c (Diabetes Screen)", 
            "parameters": [
                {"key": "Hemoglobin A1c", "label": "HbA1c", "unit": "%", "range": {"low": 4.0, "high": 6.0}},
            ]
        },
        {
            "name": "Liver Function Tests", 
            "parameters": [
                {"key": "Alanine Aminotransferase (ALT)", "label": "ALT", "unit": "U/L", "range": {"low": 10.0, "high": 40.0}},
                {"key": "Aspartate Aminotransferase (AST)", "label": "AST", "unit": "U/L", "range": {"low": 10.0, "high": 30.0}},
                {"key": "Alkaline Phosphatase (ALP)", "label": "ALP", "unit": "IU/L", "range": {"low": 30.0, "high": 120.0}},
                {"key": "Total Bilirubin", "label": "TBIL", "unit": "mg/dL", "range": {"low": 0.3, "high": 1.2}},
                {"key": "Direct Bilirubin", "label": "DBIL", "unit": "mg/dL", "range": {"low": 0.1, "high": 0.3}},
                {"key": "Albumin", "label": "Albumin", "unit": "g/dL", "range": {"low": 3.5, "high": 5.0}},
            ]
        },
        {
            "name": "C-Reactive Protein (CRP)", 
            "parameters": [
                {"key": "CRP", "label": "CRP", "unit": "mg/L", "range": {"low": 0.08, "high": 3.1}},
            ]
        },
        {
            "name": "Ferritin", 
            "parameters": [
                {"key": "Ferritin", "label": "Ferritin", "unit": "ng/mL", "range": {"low": 15.0, "high": 200.0}},
            ]
        },
        {
            "name": "Erythrocyte Sedimentation Rate (ESR)", 
            "parameters": [
                {"key": "ESR", "label": "ESR", "unit": "mm/h", "range": {"low": 0.0, "high": 20.0}},
            ]
        },
        
    ],
    'Urine and Stool Tests': [
        {
            "name": "Urinalysis",
            "parameters": [
                {"key": "Protein", "label": "Protein", "unit": "mg/dL", "range": {"low": 0.0, "high": 15.0}},
                {"key": "Glucose", "label": "Glucose", "unit": "mg/dL", "range": {"low": 0.0, "high": 15.0}}, # Changed from presence
                {"key": "Ketones", "label": "Ketones", "unit": "mg/dL", "range": {"low": 0.0, "high": 5.0}},
                {"key": "Blood", "label": "Blood", "unit": "presence", "range": {"low": "negative", "high": "negative"}},
                # Added pH and SG from original backend mock for completeness, adjust if needed
                {"key": "pH", "label": "pH", "unit": "", "range": {"low": 5.0, "high": 8.0}},
                {"key": "Specific Gravity", "label": "SG", "unit": "", "range": {"low": 1.005, "high": 1.030}},
            ]
        },
        {
            "name": "Urine Culture",
            "parameters": [
            {"key": "Bacterial Growth", "label": "Growth", "unit": "CFU/mL", "range": {"low": 0, "high": 10000}},
            {"key": "Pathogen Identified", "label": "Pathogen", "unit": "string", "range": {}},
            ]
        },
        {
            "name": "Stool Occult Blood Test",
            "parameters": [
            {"key": "Occult Blood", "label": "Occult Blood", "unit": "presence", "range": {"low": "negative", "high": "negative"}},
            ]
        },
        {
            "name": "Stool Culture",
            "parameters": [
                {"key": "Pathogen Identified", "label": "Pathogen", "unit": "string", "range": {}},
            ]
        },
    ],
    'Imaging': [
        {
            "name": "X-Ray",
            "parameters": [
                {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
            ]
        },
        {
            "name": "Magnetic Resonance Imaging (MRI)",
            "parameters": [
            {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
        ]
        },
        {
            "name": "Computed Tomography (CT) Scan",
            "parameters": [
                {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
            ]
        },
        {
            "name": "Ultrasound",
            "parameters": [
                {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
            ]
        },
        {
            "name": "Positron Emission Tomography (PET)",
            "parameters": [
                {"key": "Findings", "label": "Findings", "unit": "string", "range": {}},
            ]
        },
        {
            "name": "Optical Coherence Tomography (OCT)",
            "parameters": [
                {"key": "Retinal Nerve Fiber Layer Thickness", "label": "RNFL", "unit": "µm", "range": {"low": 80.0, "high": 110.0}},
            ]
        },
    ],
    'Cadiac Tests': [
        {
            "name": "Electrocardiogram (ECG/EKG)",
            "parameters": [
            {"key": "Heart Rate", "label": "HR", "unit": "bpm", "range": {"low": 60, "high": 100}},
            {"key": "PR Interval", "label": "PR", "unit": "ms", "range": {"low": 120, "high": 200}},
            {"key": "QRS Duration", "label": "QRS", "unit": "ms", "range": {"low": 80, "high": 120}},
            # Added Rhythm from original backend mock for completeness
            {"key": "Rhythm", "label": "Rhythm", "unit": "string", "range": {}},
        ]
        },
        {
            "name": "Echocardiogram",
            "parameters": [
                {"key": "Ejection Fraction", "label": "EF", "unit": "%", "range": {"low": 55.0, "high": 70.0}},
            {"key": "Left Ventricular Size", "label": "LV Size", "unit": "cm", "range": {"low": 3.5, "high": 5.7}},
        ]
        },
        {
            "name": "Stress Test",
            "parameters": [
            {"key": "Exercise Duration", "label": "Duration", "unit": "minutes", "range": {}}, # No standard range
            {"key": "Max Heart Rate Achieved", "label": "Max HR", "unit": "bpm", "range": {}}, # No standard range
            ]
        },
    ],
    'Neurological & Specialized Tests': [
        {
            "name": "Evoked Potentials",
            "parameters": [
                {"key": "Visual Evoked Potential Latency", "label": "VEP Latency", "unit": "ms", "range": {"low": 90.0, "high": 110.0}},
                {"key": "Somatosensory Evoked Potential Latency", "label": "SSEP Latency", "unit": "ms", "range": {}}, # No standard range
            ]
        },
        {
            "name": "Cerebrospinal Fluid (CSF) Analysis",
            "parameters": [
                {"key": "White Blood Cell Count", "label": "WBC (CSF)", "unit": "cells/mm³", "range": {"low": 0, "high": 5}},
                {"key": "Protein", "label": "Protein (CSF)", "unit": "mg/dL", "range": {"low": 15.0, "high": 45.0}},
                {"key": "Glucose", "label": "Glucose (CSF)", "unit": "mg/dL", "range": {"low": 50.0, "high": 80.0}},
                {"key": "Oligoclonal Bands", "label": "Oligo Bands", "unit": "presence", "range": {"low": "negative", "high": "negative"}},
            ]
        },
        {
            "name": "Biopsy",
            "parameters": [
                {"key": "Histopathological Findings", "label": "Findings", "unit": "string", "range": {}},
            ]
        },
        {
            "name": "Enzyme-linked Immunosorbent Assay (ELISA)",
            "parameters": [
                {"key": "Antibody Level", "label": "Antibody Lvl", "unit": "IU/mL", "range": {}}, # No standard range
            ]
        },
    ],
}



def create_tests_name():

    for test_type, tests in list_test_data_test_name.items():
        for test in tests:
            

            from ... import db
            
            new_test_type = Test_types(
                test_type=test_type,
            )
            db.session.add(new_test_type)

            new_test_name = Test_names(
                test_type=new_test_type,
                test_name=test["name"],
                test_format="json" if test_type != "Imaging" else "image",
            )
            db.session.add(new_test_name)

            for parameter in test["parameters"]:
                new_test_parameter = Test_parameters(
                    test_name=new_test_name,
                    parameter_name=parameter["key"],
                    parameter_label=parameter["label"],
                    parameter_unit=parameter["unit"],
                    parameter_normal_low=str(parameter["range"]["low"]) if "range" in parameter and "low" in parameter["range"] else None,
                    parameter_normal_high=str(parameter["range"]["high"]) if "range" in parameter and "high" in parameter["range"] else None,
                )
                
                db.session.add(new_test_parameter)
            
            
            
    db.session.commit()

def create_tests():
    from ... import db
    import pandas as pd
    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')

    for test in list_test_data:
        for key, value in test.items():
            if pd.isna(value):
                test[key] = None
        
        test_name = Test_names.query.filter_by(test_name=test["test_name"]).first()
        if not test_name:
            raise ValueError("test_name not found")
        test_type = test_name.test_type
        test_format = test_name.test_format
        
        new_test = Tests(
            test_date=test["test_date"],
            test_name=test_name,
            paraclinical_technician_id=test["paraclinical_technician_id"],
            state=test["state"],
            note=test["note"],
        )
        db.session.add(new_test)
    db.session.commit()
    return True


def create_test_data():
    
    create_tests_name()
    create_tests()





from .test_data_generator import list_function

list_function.append(create_test_data)

