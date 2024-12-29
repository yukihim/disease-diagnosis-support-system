import './style/doctorPrescriptionAndProcedure.css';

function ConfirmButton({ onClick }) {
    return (
        <button className="confirmButton" onClick={onClick}>
            Confirm
        </button>
    );
}

export default ConfirmButton;