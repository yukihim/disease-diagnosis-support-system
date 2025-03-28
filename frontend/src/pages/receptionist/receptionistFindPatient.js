import React from 'react';

import PageLayout from '../../components/common/pageLayout';

import ReceptionistPatientIndentification from '../../components/receptionist/findPatient/receptionistPatientIndentification';
import ReceptionistPatientFound from '../../components/receptionist/findPatient/receptionistPatientFound';

function ReceptionistFindPatient() {
    function onChangeSSN() {
        console.log("SSN changed");
    }

    function onChangeHealthInsuranceNumber() {
        console.log("Health Insurance Number changed");
    }

    return (
        <PageLayout requiredRole="receptionist" useGrid={false}>
            <ReceptionistPatientIndentification 
                onChangeSSN={onChangeSSN}
                onChangeHealthInsuranceNumber={onChangeHealthInsuranceNumber}
            />
            <ReceptionistPatientFound />
        </PageLayout>
    );
}

export default ReceptionistFindPatient;