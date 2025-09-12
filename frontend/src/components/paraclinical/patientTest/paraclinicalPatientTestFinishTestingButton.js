import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import Button from '../../common/button';
import ButtonText from '../../common/buttonText';
import API_BASE_URL from '../../../config';

function ParaclinicalPatientTestFinishTestingButton({ patientState }) {
    const history = useHistory();
    const location = useLocation();
    const sessionID = location.state?.sessionID;

    const onClickGoBack = async () => {
        const token = Cookies.get('token');
        if (!token) {
            
            return;
        }

        const response = await fetch(`${API_BASE_URL}/paraclinical/patient_test/${sessionID}/end_test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert("Testing Finished");
            history.push('/paraclinical/homepage');
        } else {
            alert('Failed to finish testing');
        }
        
        

        // history.push('/paraclinical/homepage');
    };

    return (
        <>
            {patientState === 7 && (
                <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickGoBack}>
                    <ButtonText>
                        Finish Testing
                    </ButtonText>
                </Button>
            )}
        </>
    );
}

export default ParaclinicalPatientTestFinishTestingButton;