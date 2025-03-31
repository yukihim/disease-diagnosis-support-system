import React from 'react';
import './style/preliminaryDiagnosis.css';

import HuggedText from '../../../../common/huggedText';

function PreliminaryDiagnosis({ preliminaryDiagnosis, setPreliminaryDiagnosis }) {
    return (
        <div className="preliminaryDiagnosis">
            <HuggedText text="Preliminary Diagnosis:" font_size="14px" font_weight="600" color="#000000" />
            <textarea
                className="preliminaryDiagnosisInput"
                placeholder="Input your preliminary Diagnosis"
                value={preliminaryDiagnosis}
                onChange={e => setPreliminaryDiagnosis(e.target.value)}
                rows={4}
            />
        </div>
    );
}

export default PreliminaryDiagnosis;