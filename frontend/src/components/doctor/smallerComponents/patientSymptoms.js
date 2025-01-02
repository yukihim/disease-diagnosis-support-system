import './style/doctorDiagnosingPatientContent.css';
import React, { useState, useEffect } from 'react';

function PatientSymptoms({ symptoms, setSymptoms, preDiagnosis, setPreDiagnosis }) {
    const [showRecommendationBox, setShowRecommendationBox] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const handleSymptomsChange = (e) => {
        setSymptoms(e.target.value);
        setShowRecommendationBox(false);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout(() => {
            setShowRecommendationBox(true);
        }, 4000));
    };

    const handlePreDiagnosisChange = (e) => {
        setPreDiagnosis(e.target.value);
    }

    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);

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
                    <input
                        className="value_symptoms"
                        value={symptoms}
                        onChange={handleSymptomsChange}
                        placeholder="Input the patient symptoms separated by commas ( , ). For example: High fever over 39°C, Coughing."
                    />
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

                        {showRecommendationBox && (
                            <div className="recommendationBox">
                                <div className="value_systemRecommendation">
                                    <div className="diseaseName">Common Cold</div>
                                    <div className="diseaseProbabilities">40%</div>
                                </div>
                                <hr />
                                <div className="value_systemRecommendation">
                                    <div className="diseaseName">Influenza (Flu)</div>
                                    <div className="diseaseProbabilities">20%</div>
                                </div>
                                <hr />
                                <div className="value_systemRecommendation">
                                    <div className="diseaseName">Strep Throat</div>
                                    <div className="diseaseProbabilities">20%</div>
                                </div>
                                <hr />
                                <div className="value_systemRecommendation">
                                    <div className="diseaseName">Covid</div>
                                    <div className="diseaseProbabilities">10%</div>
                                </div>
                                <hr />
                                <div className="value_systemRecommendation">
                                    <div className="diseaseName">Tonsillitis</div>
                                    <div className="diseaseProbabilities">10%</div>
                                </div>
                                <hr />
                            </div>
                        )}
                    </div>
                    <div className="preliminaryDiagnosis">
                        <div className="title">
                            Preliminary Diagnosis:
                        </div>
                        <div className="value_preliminaryDiagnosis">
                            <textarea className="preliminaryDiagnosisInput" value={preDiagnosis} onChange={handlePreDiagnosisChange} placeholder="Input your preliminary diagnosis." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientSymptoms;