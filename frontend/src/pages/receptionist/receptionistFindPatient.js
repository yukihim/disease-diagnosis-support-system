// import React from 'react';

// import PageLayout from '../../components/common/pageLayout';

// import ReceptionistPatientIndentification from '../../components/receptionist/findPatient/receptionistPatientIndentification';
// import ReceptionistPatientFound from '../../components/receptionist/findPatient/receptionistPatientFound';

// function ReceptionistFindPatient() {
//     function onChangeSSN() {
//         console.log("SSN changed");
//     }

//     function onChangeHealthInsuranceNumber() {
//         console.log("Health Insurance Number changed");
//     }

//     return (
//         <PageLayout requiredRole="receptionist" useGrid={false}>
//             <ReceptionistPatientIndentification 
//                 onChangeSSN={onChangeSSN}
//                 onChangeHealthInsuranceNumber={onChangeHealthInsuranceNumber}
//             />
//             <ReceptionistPatientFound />
//         </PageLayout>
//     );
// }

// export default ReceptionistFindPatient;














import React, { useState, useEffect } from 'react';

import PageLayout from '../../components/common/pageLayout';

import ReceptionistPatientIndentification from '../../components/receptionist/findPatient/receptionistPatientIndentification';
import ReceptionistPatientFound from '../../components/receptionist/findPatient/receptionistPatientFound';

const allPatientData = [
    { patientName: 'Phuong Xuong Thinh', ssn: '079283868386', healthInsuranceCode: 'HIC-A' },
    { patientName: 'Pham Le Quan', ssn: '060203003132', healthInsuranceCode: 'HIC-B' },
];

function ReceptionistFindPatient() {
    const [ssnFilter, setSsnFilter] = useState('');
    const [healthInsuranceFilter, setHealthInsuranceFilter] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [isListVisible, setIsListVisible] = useState(false); // State to control visibility

    useEffect(() => {
        const shouldBeVisible = !!(ssnFilter || healthInsuranceFilter); // Determine visibility
        setIsListVisible(shouldBeVisible); // Update visibility state

        if (shouldBeVisible) {
            let currentFilteredData = allPatientData;
            if (ssnFilter) {
                currentFilteredData = currentFilteredData.filter(patient =>
                    patient.ssn.toLowerCase().includes(ssnFilter.toLowerCase())
                );
            }
            if (healthInsuranceFilter) {
                currentFilteredData = currentFilteredData.filter(patient =>
                    patient.healthInsuranceCode.toLowerCase().includes(healthInsuranceFilter.toLowerCase())
                );
            }
            setFilteredPatients(currentFilteredData);
        } else {
            // Optionally clear data when not visible, or keep it for faster reappearance
            // setFilteredPatients([]);
        }
    }, [ssnFilter, healthInsuranceFilter]);


    function handleSsnChange(event) {
        setSsnFilter(event.target.value);
    }

    function handleHealthInsuranceChange(event) {
        setHealthInsuranceFilter(event.target.value);
    }

    return (
        <PageLayout requiredRole="receptionist" useGrid={false}>
            <ReceptionistPatientIndentification
                onChangeSSN={handleSsnChange}
                onChangeHealthInsuranceNumber={handleHealthInsuranceChange}
            />
            {/* Always render, but pass visibility prop */}
            <ReceptionistPatientFound
                patientFoundTableData={filteredPatients}
                isVisible={isListVisible} // Pass visibility state
            />
        </PageLayout>
    );
}

export default ReceptionistFindPatient;