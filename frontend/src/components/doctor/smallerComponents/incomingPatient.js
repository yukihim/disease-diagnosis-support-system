import './style/doctorHomepageContent.css';

import { useHistory } from 'react-router-dom';

function IncomingPatient() {
    const history = useHistory();

    function handleClick() {
        // Redirect to /doctor/diagnosis
        history.push("/doctor/diagnosis");
    }

    return (
        <div className="incomingPatientContainer">
            <div className="containerContent">
                <div className="containerTitle">Incoming Patient</div>

                <div>
                    <div className="incomingPatientHeader">
                        <div className="incomingPatientName">Name</div>
                        <div className="incomingPatientGender">Gender</div>
                        <div className="incomingPatientAge">Age</div>
                        <div className="incomingPatientCondition">Condition</div>
                    </div>
                    
                    <div className="incomingPatientContent">
                        <ul onClick={handleClick} style={{ cursor: 'pointer' }}>
                            <li className="incomingPatientName">Phuong Xuong Thinh</li>
                            <li className="incomingPatientGender">Male</li>
                            <li className="incomingPatientAge">18</li>
                            <li className="incomingPatientCondition">Allergies</li>
                        </ul>
                        <ul>
                            <li className="incomingPatientName">Phuong Xuong Thinh</li>
                            <li className="incomingPatientGender">Male</li>
                            <li className="incomingPatientAge">18</li>
                            <li className="incomingPatientCondition">Allergies</li>
                        </ul>
                        <ul>
                            <li className="incomingPatientName">Phuong Xuong Thinh</li>
                            <li className="incomingPatientGender">Male</li>
                            <li className="incomingPatientAge">18</li>
                            <li className="incomingPatientCondition">Allergies</li>
                        </ul>
                        <ul>
                            <li className="incomingPatientName">Phuong Xuong Thinh</li>
                            <li className="incomingPatientGender">Male</li>
                            <li className="incomingPatientAge">18</li>
                            <li className="incomingPatientCondition">Allergies</li>
                        </ul>
                        <ul>
                            <li className="incomingPatientName">Phuong Xuong Thinh</li>
                            <li className="incomingPatientGender">Male</li>
                            <li className="incomingPatientAge">18</li>
                            <li className="incomingPatientCondition">Allergies</li>
                        </ul>
                        <ul>
                            <li className="incomingPatientName">Phuong Xuong Thinh</li>
                            <li className="incomingPatientGender">Male</li>
                            <li className="incomingPatientAge">18</li>
                            <li className="incomingPatientCondition">Allergies</li>
                        </ul>
                        <ul>
                            <li className="incomingPatientName">Phuong Xuong Thinh</li>
                            <li className="incomingPatientGender">Male</li>
                            <li className="incomingPatientAge">18</li>
                            <li className="incomingPatientCondition">Allergies</li>
                        </ul>
                        <ul>
                            <li className="incomingPatientName">Phuong Xuong Thinh</li>
                            <li className="incomingPatientGender">Male</li>
                            <li className="incomingPatientAge">18</li>
                            <li className="incomingPatientCondition">Allergies</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IncomingPatient;