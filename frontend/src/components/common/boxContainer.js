import './style/boxContainer.css';

function BoxContainer ({ children, className = '' }) {
  return (
    <div className={`boxContainer ${className}`}>
      {children}
    </div>
  );
}

export default BoxContainer;