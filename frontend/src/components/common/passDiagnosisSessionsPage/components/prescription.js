import React from 'react'; // Removed useState, useEffect
import './style/prescription.css';

import BoxContainer from '../../boxContainer';
import BoxContainerTitle from '../../boxContainerTitle';
import BoxContainerContent from '../../boxContainerContent';

import DoctorPrescriptionAndProcedurePrescriptionsCardHeader from '../../../doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedurePrescriptionsCard/doctorPrescriptionAndProcedurePrescriptionsCardHeader';
import PrescriptionContent from './prescriptionTable/prescriptionContent';

const patientPrescriptionTableHeader = [
    { name: 'Medicine', width: '190px' },
    { name: 'Morning', width: '85px' },
    { name: 'Noon', width: '85px' },
    { name: 'Afternoon', width: '85px' },
    { name: 'Evening', width: '85px' },
    { name: 'Duration', width: '120px' }, // Changed from 'durations'
    { name: 'Note', width: '500px' }
];

// Accept prescriptionData prop
function Prescription({ prescriptionData = [] }) { // Default to empty array

    // Removed internal state and fetch logic

    return (
        <BoxContainer className='prescriptionBox'>
            <BoxContainerTitle className='prescription'>
                Prescription
            </BoxContainerTitle>

            <BoxContainerContent className='prescriptionContent'>
                {/* Check if data exists before rendering table */}
                {prescriptionData && prescriptionData.length > 0 ? (
                    <>
                        <DoctorPrescriptionAndProcedurePrescriptionsCardHeader patientPrescriptionTableHeader={patientPrescriptionTableHeader} />
                        <PrescriptionContent
                            patientPrescriptionTableHeader={patientPrescriptionTableHeader}
                            prescriptionTableData={prescriptionData} // Pass data prop
                        />
                    </>
                ) : (
                    <div className="no-data" style={{ textAlign: 'center', padding: '20px', color: '#818181' }}>
                        Prescription data is not available for this session.
                    </div>
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default Prescription;