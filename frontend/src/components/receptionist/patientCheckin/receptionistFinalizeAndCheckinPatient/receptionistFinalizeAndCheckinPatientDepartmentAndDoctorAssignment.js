import React from 'react';
import './style/receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment.css';

import ChooseBox from '../../../common/chooseBox';

function ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment() {
    const [selectedDepartment, setSelectedDepartment] = React.useState("");
    const [selectedDoctor, setSelectedDoctor] = React.useState("");
    
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
                selectedValue={selectedDepartment}
                setSelectedValue={setSelectedDepartment}
            />

            {/* Doctor */}
            <ChooseBox
                text="Choose Doctor:"
                options={[
                    { label: 'Dr. A', value: 'doc1' },
                    { label: 'Dr. B', value: 'doc2' },
                    { label: 'Dr. C', value: 'doc3' },
                ]}
                selectedValue={selectedDoctor}
                setSelectedValue={setSelectedDoctor}
            />
        </div>
    );
}

export default ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment;