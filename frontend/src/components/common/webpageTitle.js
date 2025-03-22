import './style/webpageTitle.css';

function WebpageTitle({ userName, userRole, children }) {
  return (
    <div className="webpageTitle">
      <div className="welcomeText">
        Welcome {userRole && userRole.charAt(0).toUpperCase() + userRole.slice(1)} {userName}
      </div>

      {/* For button if needded */}
      {children}
    </div>
  );
}

export default WebpageTitle;