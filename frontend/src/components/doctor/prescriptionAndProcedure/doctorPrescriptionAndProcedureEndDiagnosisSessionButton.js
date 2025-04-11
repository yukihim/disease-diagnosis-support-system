import React from 'react';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import Button from '../../common/button';
import ButtonText from '../../common/buttonText';

import DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination from './doctorPrescriptionAndProcedureEndDiagnosisSessionButton/doctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination';

function DoctorPrescriptionAndProcedureEndDiagnosisSessionButton({ onClickEndDiagnosisSession }) {
    return (
        <BoxContainer className='doctorPrescriptionAndProcedurePrescriptionsCardBox'>
            <BoxContainerTitle className='doctorPrescriptionAndProcedurePrescriptionsCard'>
                End Diagnosis Session
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPrescriptionAndProcedurePrescriptionsCardContent'>
                {/* Add Follow-up Examination Date if any */}
                <DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination />

                {/* End Diagnosis Session Button */}
                <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickEndDiagnosisSession}>
                    <ButtonText>
                        End Diagnosis Session
                    </ButtonText>
                </Button>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPrescriptionAndProcedureEndDiagnosisSessionButton;