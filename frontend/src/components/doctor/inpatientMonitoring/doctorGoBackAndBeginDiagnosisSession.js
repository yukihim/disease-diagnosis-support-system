import React from 'react';

import GoBackButton from '../../common/goBackButton';
import BeginDiagnosisSessionButton from './doctorGoBackAndBeginDiagnosisSession/beginDiagnosisSessionButton';

function DoctorGoBackAndBeginDiagnosisSession({ userRole, patientName }) {
    if (userRole === 'doctor') {
        return (
            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", gap: "20px" }}>
                <GoBackButton />
                <BeginDiagnosisSessionButton patientName={patientName} />
            </div>
        );
    } else {
        return (
            <div style={{ display: "flex", width: "100%" }}>
                <GoBackButton />
            </div>
        );
    }
}

export default DoctorGoBackAndBeginDiagnosisSession;