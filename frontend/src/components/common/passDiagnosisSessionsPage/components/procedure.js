import React from 'react'; // Removed useState, useEffect
import './style/procedure.css';

import BoxContainer from '../../boxContainer';
import BoxContainerTitle from '../../boxContainerTitle';
import BoxContainerContent from '../../boxContainerContent';

import DoctorPrescriptionAndProcedureProceduresCardHeader from '../../../doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureProceduresCard/doctorPrescriptionAndProcedureProceduresCardHeader';
import ProcedureTable from './procedureTable/procedureTable'; // Assuming this component exists and accepts data

const patientProcedureTableHeader = [
    { name: 'Procedure', width: '400px' }, // Corresponds to 'procedureName' from backend
    { name: 'Date/Time', width: '250px' }, // Corresponds to 'dateTime' from backend
    { name: 'Note', width: '500px' } // Corresponds to 'note' from backend
];

// Accept procedureData prop
function Procedure({ procedureData = [] }) { // Default to empty array

    // Removed internal state and fetch logic

    return (
        <BoxContainer className='procedureBox'>
            <BoxContainerTitle className='procedure'>
                Procedure
            </BoxContainerTitle>

            <BoxContainerContent className='procedureContent'>
                {/* Check if data exists before rendering table */}
                {procedureData && procedureData.length > 0 ? (
                    <>
                        <DoctorPrescriptionAndProcedureProceduresCardHeader patientProcedureTableHeader={patientProcedureTableHeader} />
                        <ProcedureTable
                            patientProcedureTableHeader={patientProcedureTableHeader}
                            procedureTableData={procedureData} // Pass data prop
                        />
                    </>
                ) : (
                    <div className="no-data" style={{ textAlign: 'center', padding: '20px', color: '#818181' }}>
                        Procedure data is not available for this session.
                    </div>
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default Procedure;