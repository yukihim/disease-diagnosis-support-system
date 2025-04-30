import React from 'react';
import './style/doctorPatientDiagnosingSymptoms.css';

import HuggedText from '../../../common/huggedText';

function DoctorPatientDiagnosingSymptoms({ patientSymptoms, setPatientSymptoms }) {
    return (
        <div className="doctorPatientDiagnosingSymptoms">
            <HuggedText text="Symptoms:" font_size="14px" font_weight="600" color="#4E4B66" />
            <input
                className="symptomsInput"
                placeholder="Input the patient symptoms separated by commas ( , ). For example: High fever over 39°C, Coughing."
                value={patientSymptoms}
                onChange={e => setPatientSymptoms(e.target.value)}
                rows={4}
            />
        </div>
    );
}

export default DoctorPatientDiagnosingSymptoms;