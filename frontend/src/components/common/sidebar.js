import './style/sidebar.css';

// import React, { useState } from 'react';

import HomepageIcon from '../../assets/images/Homepage_Icon.png';
import CalendarIcon from '../../assets/images/Calendar_Icon.png';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarContainer" style={{backgroundColor: "#008080"}}>
                <img src={HomepageIcon} alt="Homepage Icon" className="sidebar__homepageIcon" />
            </div>
            <div className="sidebarContainer">
                <img src={CalendarIcon} alt="Calendar Icon" className="sidebar__calendarIcon" />
            </div>
        </div>
    );
}

export default Sidebar;