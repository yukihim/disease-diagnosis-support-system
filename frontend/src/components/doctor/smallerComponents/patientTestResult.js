import './style/doctorDiagnosingPatientContent.css';

function PatientTestResult() {
    return (
        <div className="PatientTestResultContainer">
            <div className="containerContent">
                <div className="containerTitle">Patient's Test Result</div>

                <div>
                    <div className="PatientTestResultHeader">
                        <div className="PatientTestResultSessionTestType">Test Type</div>
                        <div className="PatientTestResultStatus">Status</div>
                    </div>

                    <div className="PatientTestResultContent">
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#D6A600' } }>Waiting</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#0000FF' } }>Testing</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#009951' } }>Done</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#009951' } }>Done</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#009951' } }>Done</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#009951' } }>Done</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#009951' } }>Done</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#009951' } }>Done</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#009951' } }>Done</li>
                        </ul>
                        <hr />
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#009951' } }>Done</li>
                        </ul>
                        <hr />
                        
                        <ul>
                            <li className="PatientTestResultSessionTestType">Blood test</li>
                            <li className="PatientTestResultStatus" style={ { color: '#009951' } }>Done</li>
                        </ul>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientTestResult;