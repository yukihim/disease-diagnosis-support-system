import './style/button.css';

function Button({ children, onClick, className }) {
  return (
    <div className={`button ${className}`} onClick={onClick} >
        {children}
    </div>
  );
}

export default Button;