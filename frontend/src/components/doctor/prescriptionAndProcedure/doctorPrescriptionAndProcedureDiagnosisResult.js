import React from 'react'; // Removed useState, useEffect
import './style/doctorPrescriptionAndProcedureDiagnosisResult.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

// Assuming this component correctly displays symptoms passed as a string prop
import DoctorFinalizingDiagnosisForPatientSymptoms from '../finalizingDiagnosis/doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientSymptoms';
import DoctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis from './doctorPrescriptionAndProcedureDiagnosisResult/doctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis';

// Accept props from parent
function DoctorPrescriptionAndProcedureDiagnosisResult({ patientSymptoms, finalDiagnosis }) {

    // Removed internal state and useEffect for fetching mock data
    // Removed fetchPatientSymptoms and fetchFinalDiagnosis functions

    return (
        <BoxContainer className='doctorPrescriptionAndProcedureDiagnosisResultBox'>
            <BoxContainerTitle className='doctorPrescriptionAndProcedureDiagnosisResult'>
                Diagnosis Result {/* Changed title */}
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPrescriptionAndProcedureDiagnosisResultContent'>
                {/* Symptoms - Display passed prop */}
                <DoctorFinalizingDiagnosisForPatientSymptoms patientSymptoms={patientSymptoms || "No symptoms recorded."} />

                {/* Final Diagnosis - Display passed prop */}
                <DoctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis patientFinalDiagnosis={finalDiagnosis || "No final diagnosis recorded."} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPrescriptionAndProcedureDiagnosisResult;