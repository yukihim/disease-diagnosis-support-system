import React from 'react';
import './style/receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment.css';

import ChooseBox from './components/chooseBox';

function ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment() {
    const [selectedValue, setSelectedValue] = React.useState("");
    
    return (
        <div className="receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment">
            {/* Department */}
            <ChooseBox
                text="Choose Department:"
                options={[
                    { label: 'Lão - Ngoại', value: 'dept1' },
                    { label: 'Lão - Nội', value: 'dept2' },
                    { label: 'Cấp cứu hồi sức', value: 'dept3' },
                ]}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
            />

            {/* Doctor */}
            <ChooseBox
                text="Choose Doctor:"
                options={[
                    { label: 'Dr. A', value: 'doc1' },
                    { label: 'Dr. B', value: 'doc2' },
                    { label: 'Dr. C', value: 'doc3' },
                ]}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
            />
        </div>
    );
}

export default ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment;