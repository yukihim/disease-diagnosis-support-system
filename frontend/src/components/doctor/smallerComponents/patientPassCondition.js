import './style/doctorDiagnosingPatientContent.css';

function PatientPassCondition() {
    return (
        <div className="patientPassInformationContainer">
            <div className="containerContent">
                <div className="containerTitle">Patient's Pass Condition</div>

                <div>
                    <div className="patientPassInformationHeader">
                        <div className="patientPassInformationCondition">Condition</div>
                        <div className="patientPassInformationSeverity">Severity</div>
                        <div className="patientPassInformationNearestDateDiagnosed">Nearest Date Diagnosed</div>
                        <div className="patientPassInformationStatus">Status</div>
                    </div>

                    <div className="patientPassInformationContent">
                        <hr />
                        <ul>
                            <li className="patientPassInformationCondition">Diabetes</li>
                            <li className="patientPassInformationSeverity">Moderate</li>
                            <li className="patientPassInformationNearestDateDiagnosed">2020-03-15</li>
                            <li className="patientPassInformationStatus">Under Control</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="patientPassInformationCondition">Diabetes</li>
                            <li className="patientPassInformationSeverity">Moderate</li>
                            <li className="patientPassInformationNearestDateDiagnosed">2019-03-15</li>
                            <li className="patientPassInformationStatus">Under Control</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="patientPassInformationCondition">Hypertension</li>
                            <li className="patientPassInformationSeverity">Severe</li>
                            <li className="patientPassInformationNearestDateDiagnosed">2018-06-22</li>
                            <li className="patientPassInformationStatus">Active</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="patientPassInformationCondition">Asthma</li>
                            <li className="patientPassInformationSeverity">Mild</li>
                            <li className="patientPassInformationNearestDateDiagnosed">2015-09-10</li>
                            <li className="patientPassInformationStatus">Resolved</li>
                        </ul>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPassCondition;