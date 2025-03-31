import React, { useState, useEffect } from 'react';
import './style/doctorPatientParaclinicalTestResult.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';
import DropDownBox from '../../common/dropDownBox';

import DoctorPatientParaclinicalTestResultCard from './doctorPatientParaclinicalTestResult/doctorPatientParaclinicalTestResultCard';

function DoctorPatientParaclinicalTestResult() {
    const [patientTestResults, setTestResults] = useState([]);
    const [selectedTestIndex, setSelectedTestIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    // Fetch data from API
    const fetchTestResults = async () => {
        try {
            setIsLoading(true);
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint');
            // const data = await response.json();
            // setTestResults(data);
            
            // Mock data for demonstration
            const mockData = [
                {
                    testName: "Complete Blood Count",
                    dateTime: "2023-03-29 09:15 AM",
                    testFields: [
                        { key: "White Blood Cell Count", label: "WBC", value: "7.5 x10^9/L", normalRange: "4.5-11.0 x10^9/L" },
                        { key: "Red Blood Cell Count", label: "RBC", value: "4.9 x10^12/L", normalRange: "4.5-5.5 x10^12/L" },
                        { key: "Hemoglobin", label: "Hgb", value: "14.2 g/dL", normalRange: "13.5-17.5 g/dL" },
                        { key: "Hematocrit", label: "Hct", value: "42%", normalRange: "41-50%" }
                    ]
                },
                {
                    testName: "Liver Function Test",
                    dateTime: "2023-03-28 02:30 PM",
                    testFields: [
                        { key: "Total Bilirubin", label: "TBIL", value: "0.8 mg/dL", normalRange: "0.3-1.0 mg/dL" },
                        { key: "Alanine Aminotransferase", label: "ALT", value: "30 U/L", normalRange: "7-56 U/L" },
                        { key: "Aspartate Aminotransferase", label: "AST", value: "28 U/L", normalRange: "5-40 U/L" },
                        { key: "Alkaline Phosphatase", label: "ALP", value: "70 U/L", normalRange: "44-147 U/L" }
                    ]
                }
            ];
            
            setTestResults(mockData);
            // Reset selected test to first one when data refreshes
            setSelectedTestIndex(0);
        } catch (error) {
            console.error('Error fetching test results:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchTestResults();
        
        // Set up interval to fetch data every 5 seconds
        const intervalId = setInterval(() => {
            fetchTestResults();
        }, 5000);
        
        return () => clearInterval(intervalId);
    }, []);

    // Generate options for dropdown
    const testOptions = patientTestResults.map((test, index) => ({
        label: `${test.testName} - ${test.dateTime}`,
        value: index.toString()
    }));

    // Handle test selection change
    const handleTestChange = (e) => {
        setSelectedTestIndex(parseInt(e.target.value, 10));
    };
    
    return (
        <BoxContainer className='doctorPatientParaclinicalTestResultBox'>
            <BoxContainerTitle className='doctorPatientParaclinicalTestResult'>
                Patient's Paraclinical Test Results
                {isLoading && <span className="loading-indicator"> Loading...</span>}
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientParaclinicalTestResultContent'>
                {patientTestResults.length > 0 ? (
                    <>
                        <DropDownBox
                            options={testOptions}
                            value={selectedTestIndex.toString()}
                            onChange={handleTestChange}
                        />
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'auto' }}>
                            <h3>{patientTestResults[selectedTestIndex].testName}</h3>
                            <span className="testDateTime">{patientTestResults[selectedTestIndex].dateTime}</span>
                        </div>
                        
                        <DoctorPatientParaclinicalTestResultCard 
                            patientTestResult={patientTestResults[selectedTestIndex]}
                        />
                    </>
                ) : (
                    <div className="no-results">No paraclinical test results available</div>
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientParaclinicalTestResult;