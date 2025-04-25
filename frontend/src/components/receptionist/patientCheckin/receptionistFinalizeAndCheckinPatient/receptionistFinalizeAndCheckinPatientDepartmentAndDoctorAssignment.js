import React from 'react';
import './style/receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment.css';

import ChooseBox from '../../../common/chooseBox';

function ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment({ followUpDoctor, followUpDepartment }) {
    const [selectedDepartment, setSelectedDepartment] = React.useState(followUpDepartment);
    const [selectedDoctor, setSelectedDoctor] = React.useState(followUpDoctor);
    
    return (
        <div className="receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment">
            {/* Department */}
            <ChooseBox
                text="Choose Department:"
                options={[
                    { label: 'Lão - Ngoại', value: 'Lão - Ngoại' },
                    { label: 'Lão - Nội', value: 'Lão - Nội' },
                    { label: 'Cấp cứu hồi sức', value: 'Cấp cứu hồi sức' },
                ]}
                selectedValue={selectedDepartment}
                setSelectedValue={setSelectedDepartment}
            />

            {/* Doctor */}
            <ChooseBox
                text="Choose Doctor:"
                options={[
                    { label: 'Dr. A', value: 'Dr. A' },
                    { label: 'Dr. B', value: 'Dr. B' },
                    { label: 'Dr. C', value: 'Dr. C' },
                ]}
                selectedValue={selectedDoctor}
                setSelectedValue={setSelectedDoctor}
            />
        </div>
    );
}

export default ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment;