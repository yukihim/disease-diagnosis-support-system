import './style/doctorDiagnosingPatientContent.css';

function PatientSymptoms() {
    return (
        <div className="PatientSymptomsContainer">
            <div className="containerContent">
                <div className="containerTitle">Patient's Symptoms</div>

                <div className="reasonToVisit">
                    <div className="attribute_reasonToVisit">Reason To Visit:</div>
                    <div className="value_reasonToVisit">High fever, Coughing.</div>
                </div>

                <div className="symptoms">
                    <div className="attribute_symptoms">Symptoms:</div>
                    <input className="value_symptoms" placeholder="Input the patient symptoms  separated by  commas ( , ). For example: High fever over 39°C, Coughing." />
                </div>

                <div className="lastRow">
                    <div className="systemRecommendation">
                        <div className="title">
                            System Recommendation:
                        </div>
                        <div className="tableHeader">
                            <div className="diseaseName">Disease</div>
                            <div className="diseaseProbabilities">Probabilities</div>
                        </div>

                        <div className="recommendationBox">
                            <div className="value_systemRecommendation">
                                <div className="diseaseName">Common Cold</div>
                                <div className="diseaseProbabilities">40%</div>
                            </div>
                            <hr />
                            <div className="value_systemRecommendation">
                                <div className="diseaseName">Common Cold</div>
                                <div className="diseaseProbabilities">40%</div>
                            </div>
                            <hr />
                            <div className="value_systemRecommendation">
                                <div className="diseaseName">Common Cold</div>
                                <div className="diseaseProbabilities">40%</div>
                            </div>
                            <hr />
                            <div className="value_systemRecommendation">
                                <div className="diseaseName">Common Cold</div>
                                <div className="diseaseProbabilities">40%</div>
                            </div>
                            <hr />
                            <div className="value_systemRecommendation">
                                <div className="diseaseName">Common Cold</div>
                                <div className="diseaseProbabilities">40%</div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="preliminaryDiagnosis">
                        <div className="title">
                            Preliminary Diagnosis:
                        </div>
                        <div className="value_preliminaryDiagnosis">
                            <textarea className="preliminaryDiagnosisInput" placeholder="Input your preliminary diagnosis." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientSymptoms;