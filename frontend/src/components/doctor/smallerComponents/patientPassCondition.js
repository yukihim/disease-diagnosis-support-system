import './style/doctorDiagnosingPatientContent.css';

function PatientPassCondition() {
    return (
        <div className="patientInformationContainer">
            <div className="containerContent">
                <div className="containerTitle">Patient's Pass Condition</div>

                <div className="patientInformationFirstRow">
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">Name:</div>
                            <div className="value">Pham Phuong Le Xuong Thinh</div>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">Age:</div>
                            <div className="value">22</div>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">Gender:</div>
                            <div className="value">Male</div>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">Phone number:</div>
                            <div className="value">0798012792</div>
                        </div>
                    </div>
                </div>

                <div className="patientInformationSecondRow">
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">SSN:</div>
                            <div className="value">079283868386</div>
                        </div>
                    </div>
                    <div className="box2">
                        <div className="boxDetails">
                            <div className="attribute">Health Insurance Number:</div>
                            <div className="value">0798012792</div>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">Job:</div>
                            <div className="value">Student</div>
                        </div>
                    </div>
                </div>

                <div className="patientInformationThirdRow">
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">Address:</div>
                            <div className="value">168 Ly Thuong Kiet Street</div>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">District:</div>
                            <div className="value">D. 10</div>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">City:</div>
                            <div className="value">Ho Chi Minh City</div>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="boxDetails">
                            <div className="attribute">Country:</div>
                            <div className="value">Viet Nam</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPassCondition;