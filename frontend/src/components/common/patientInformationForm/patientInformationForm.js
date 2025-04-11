// import React from 'react';
// import './style/patientInformationForm.css';

// import SpecificInformationItemWrapper from '../specificInformationItemWrapper';

// const patientFields = [
//     { key: "Name", label: "Name" },
//     { key: "DOB", label: "DOB" },
//     { key: "Gender", label: "Gender" },
//     { key: "Phone Number", label: "Phone Number" },
//     { key: "SSN", label: "SSN" },
//     { key: "Health Insurance Code", label: "Health Insurance Code" },
//     { key: "Job", label: "Job" },
//     { key: "Address", label: "Address" },
//     { key: "Height (cm)", label: "Height (cm)" },
//     { key: "Weight (kg)", label: "Weight (kg)" },
// ];

// function PatientInformationForm({ patientInformation }) {
//     return (
//         <div className="patientInformationForm">
//             {patientFields.map(field => (
//                 <SpecificInformationItemWrapper
//                     key={field.key}
//                     item={field.label}
//                     itemValue={patientInformation[field.key]}
//                 />
//             ))}
//         </div>
//     );
// }

// export default PatientInformationForm;





import React from 'react';
import './style/patientInformationForm.css';

import SpecificInformationItemWrapper from '../specificInformationItemWrapper';

const patientFields = [
    { key: "Name", label: "Name" },
    { key: "Type", label: "Type" },
    { key: "DOB", label: "DOB" },
    { key: "Gender", label: "Gender" },
    { key: "Phone Number", label: "Phone Number" },
    { key: "SSN", label: "SSN" },
    { key: "Health Insurance Code", label: "Health Insurance Code" },
    { key: "Job", label: "Job" },
    { key: "Address", label: "Address" },
    { key: "Height (cm)", label: "Height (cm)" },
    { key: "Weight (kg)", label: "Weight (kg)" },
];

function PatientInformationForm({ patientInformation }) {
    return (
        <div className="patientInformationForm">
            {patientFields.map(field => (
                <SpecificInformationItemWrapper
                    key={field.key}
                    item={field.label}
                    itemValue={patientInformation[field.key]}
                />
            ))}
        </div>
    );
}

export default PatientInformationForm;