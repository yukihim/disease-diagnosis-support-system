import './style/doctorDiagnosingPatientContent.css';

function PatientPassSession() {
    return (
        <div className="patientPassSessionContainer">
            <div className="containerContent">
                <div className="containerTitle">Patient's Pass Condition</div>

                <div>
                    <div className="patientPassSessionHeader">
                        <div className="patientPassSessionSessionDate">Session Date</div>
                        <div className="patientPassSessionHospital">Hospital</div>
                        <div className="patientPassSessionPurpose">Purpose</div>
                    </div>

                    <div className="patientPassSessionContent">
                        <hr />
                        <ul>
                            <li className="patientPassSessionSessionDate">2024-12-01</li>
                            <li className="patientPassSessionHospital">City General Hospital</li>
                            <li className="patientPassSessionPurpose">High fever, running nose</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="patientPassSessionSessionDate">2024-11-15</li>
                            <li className="patientPassSessionHospital">Green Valley Clinic</li>
                            <li className="patientPassSessionPurpose">Review Hyper Tension</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="patientPassSessionSessionDate">2024-10-20</li>
                            <li className="patientPassSessionHospital">Riverside Medical Center</li>
                            <li className="patientPassSessionPurpose">Asthma management</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="patientPassSessionSessionDate">2024-10-20</li>
                            <li className="patientPassSessionHospital">Riverside Medical Center</li>
                            <li className="patientPassSessionPurpose">Asthma management</li>
                        </ul>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPassSession;