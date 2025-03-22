import './style/boxContainerTitle.css';

function BoxContainerTitle ({ children, className = '' }) {
  return (
    <div className={`boxContainerTitle ${className}`}>
        {children}
    </div>
  );
}

export default BoxContainerTitle;