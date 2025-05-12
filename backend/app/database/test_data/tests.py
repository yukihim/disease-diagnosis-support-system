"""
Author: nhoxtin15
Model Description:
    
Date Created: 25/04/2025
Last Updated: 25/04/2025
"""

from ..models import Tests, Test_names, Test_types

import os
file_path = os.path.join(os.path.dirname(__file__), 'csv', 'tests.csv')



#insert test_type
list_test_data_test_type = [
'Blood Tests',
'Urine and Stool Tests',
'Imaging',
'Cadiac Tests',
'Neurological & Specialized Tests',
'Other Specialized Tests',
]
from ..models import Test_types
def create_tests_type():
    for test_type in list_test_data_test_type:
        new_test_type = Test_types(
            test_type=test_type,
        )
        from ... import db
        db.session.add(new_test_type)
    db.session.commit()
    return True

list_test_data_test_name ={
    'Blood Tests': [
        'Complete Blood Count (CBC)',
        'Basic Metabolic Panel (BMP)',
        'Lipid Panel',
        'HbA1c (Diabetes Screen)',
        'Liver Function Tests (LFTs)',
        'C-Reactive Protein (CRP)',
        'Ferritin',
        'Thyroid Stimulating Hormone (TSH)',
        'Blood Uea Nitrogen (BUN)',
        'Serum Creatinine',
    ],
    'Urine and Stool Tests': [
        'Urinalysis (UA)',
        'Urine Culture',
        'Stool Occult Blood Test',
        'Stool Culture',
    ],
    'Imaging': [
        'X-ray',
        'Magnetic Resonance Imaging (MRI)',
        'Computed Tomography (CT) Scan',
        'Ultrasound',
        'Positron Emission Tomography (PET)',
        'Optical Coherence Tomography (OCT)',
    ],
    'Cadiac Tests': [
        'Electrocardiogram (ECG/EKG)',
        'Echocardiogram',
        'Stress Test',
    ],
    'Neurological & Specialized Tests': [
        'Evoked Potentials',
        'Cerebrospinal Fluid (CSF) Analysis',
        'Biospy',
        'Enzyme-linked Immunosorbent Assay (ELISA)'
    ]
}

def create_tests_name():

    for test_type, test_names in list_test_data_test_name.items():
        for test_name in test_names:
            new_test_name = Test_names(
                test_type=test_type,
                test_name=test_name,
                test_format="json" if test_type != "Imaging" else "image",
            )
            from ... import db
            db.session.add(new_test_name)
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
        new_test = Tests(
            test_date=test["test_date"],
            test_type=test["test_type"],
            test_name=test["test_name"],
            paraclinical_technician_id=test["paraclinical_technician_id"],
            status=test["status"],
            note=test["note"],
        )
        db.session.add(new_test)
    db.session.commit()
    return True


def create_test_data():
    create_tests_type()
    # wait for 5 seconds

    import time
    time.sleep(5)
    create_tests_name()
    create_tests()





from .test_data_generator import list_function

list_function.append(create_test_data)

