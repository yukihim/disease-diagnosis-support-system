import React from 'react';
import './style/receptionistAvailableDoctorContent.css';

import DoctorsImage from './components/doctorsImage';
import DoctorsNameAndRole from './components/doctorsNameAndRole';


const doctorsTableDummyData = [
    { 
        "name": "Dr. John Doe",
        "role": "Cardiologist"
    },
    {
        "name": "Dr. Jane Doe",
        "role": "Dentist"
    },
    {
        "name": "Dr. John Doe",
        "role": "Cardiologist"
    },
    {
        "name": "Dr. Jane Doe",
        "role": "Dentist"
    },
    { 
        "name": "Dr. John Doe",
        "role": "Cardiologist"
    }
];


function ReceptionistAvailableDoctorContent({ doctorsTableData }) {
    const data = doctorsTableData;
    
    return (
        <div className="availableDoctorsTableContentWrapper">
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="availableDoctorsTableContentCell">
                        <DoctorsImage />
                        <DoctorsNameAndRole name={row.name} role={row.role} />
                    </div>
                ))
            ) : (
                <div className="availableDoctorsTableContentWrapper">
                    <div className="availableDoctorsTableContentCell">No data</div>
                </div>
            )}
        </div>
    );
}

export default ReceptionistAvailableDoctorContent;