import './style/doctorDiagnosingPatientContent.css';

function FinalizeDiagnosisButton({ onClick }) {
    return (
        <button className="fifthRowButtons" style={ { marginLeft: 'auto' } } onClick={onClick}>
            Finalize Diagnosis
        </button>
    );
}

export default FinalizeDiagnosisButton;