import './style/boxContainerContent.css';

function BoxContainerContent ({ children, className = '' }) {
  return (
    <div className={`boxContainerContent ${className}`}>
        {children}
    </div>
  );
}

export default BoxContainerContent;