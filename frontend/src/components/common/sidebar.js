import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './style/sidebar.css';

// Import sidebar control icons
import ActiveSidebarButtonIcon from '../../assets/icons/ActiveSidebarButtonIcon.png';
import InActiveSidebarButtonIcon from '../../assets/icons/InActiveSidebarButtonIcon.png';

// Import tab icons
import ActiveHomepageIcon from '../../assets/icons/ActiveHomepageIcon.png';
import InActiveHomepageIcon from '../../assets/icons/InActiveHomepageIcon.png';
import ActiveCalendarIcon from '../../assets/icons/ActiveCalendarIcon.png';
import InActiveCalendarIcon from '../../assets/icons/InActiveCalendarIcon.png';

// Example brand logo (replace with your actual image)
import BrandLogo from '../../assets/logos/logo152.png';

const tabData = {
    'receptionist': ['homepage', 'calendar'],
    'nurse': ['homepage', 'calendar'],
    'doctor': ['homepage', 'calendar'],
    'paraclinical': ['homepage', 'calendar'],
    'admin': ['homepage'],
};

function Sidebar({ userRole }) {
    const [activeTab, setActiveTab] = useState('homepage');
    const [expanded, setExpanded] = useState(() => {
        // Initialize from localStorage if available, default to false
        const savedState = localStorage.getItem('sidebarExpanded');
        return savedState !== null ? JSON.parse(savedState) : false;
    });
    const location = useLocation();
    const history = useHistory(); // Initialize the history object

    // Get the authorized tabs for the current user role using useMemo.
    const allowedTabs = useMemo(() => tabData[userRole] || [], [userRole]);

    // Determine which tab is active based on the current route (only if permitted)
    useEffect(() => {
        const path = location.pathname;
        // Find the first allowed tab that matches the current path segment
        const currentTab = allowedTabs.find(tab => path.includes(tab));

        if (currentTab) {
            setActiveTab(currentTab);
        } else if (allowedTabs.includes('homepage')) { // Default to homepage if current path doesn't match any allowed tab
            setActiveTab('homepage');
        }
        // No need to include allowedTabs in dependencies anymore due to useMemo
    }, [location.pathname, allowedTabs]); // Keep allowedTabs here as its identity is stable thanks to useMemo

    const handleExpandSidebar = () => {
        const newExpandedState = !expanded;
        setExpanded(newExpandedState);
        // Save to localStorage
        localStorage.setItem('sidebarExpanded', JSON.stringify(newExpandedState));
    };

    // Helper function to handle navigation (only if tab is authorized)
    const handleNavigation = (tab) => {
        if (allowedTabs.includes(tab)) {
            setActiveTab(tab);

            // This will now work properly since history is initialized
            history.push(`/${userRole.toLowerCase()}/${tab}`);
        }
    };

    return (
        <div className={`sidebar ${expanded ? "expanded" : ""}`}>
            {/* Collapsed state sidebar item for sidebar toggle */}
            <div
                className="stateIconHolder"
                onClick={() => handleNavigation('homepage')}
            >
                <div className="iconHolder">
                    <img src={InActiveSidebarButtonIcon} alt="Sidebar Icon" />
                </div>
            </div>
            {/* Expanded state sidebar header */}
            <div
                className="expandStateIconHolder"
                style={{
                    padding: "0px",
                    width: "174px"
                }}
            >
                <div className="brandingLogoHolder" onClick={() => handleNavigation('homepage')}>
                    <img src={BrandLogo} alt="Brand Logo" className="brandLogo" />
                    <div className="asidocText">AsiDoc</div>
                </div>
                <div className="iconHolder" onClick={handleExpandSidebar} style={{ cursor: "pointer" }}>
                    <img src={expanded ? ActiveSidebarButtonIcon : InActiveSidebarButtonIcon} alt="Sidebar Icon" />
                </div>
            </div>




            {/* Homepage Tab */}
            {allowedTabs.includes('homepage') && (
                <>
                    {/* Collapsed state for Homepage */}
                    <div
                        className={`stateIconHolder ${activeTab !== 'homepage' ? "" : " activeSmall"}`}
                        onClick={() => handleNavigation('homepage')}
                    >
                        <div className="iconHolder">
                            <img
                                src={activeTab === 'homepage' ? ActiveHomepageIcon : InActiveHomepageIcon}
                                alt="Homepage Icon"
                            />
                        </div>
                    </div>
                    {/* Expanded state for Homepage */}
                    <div
                        className={`expandStateIconHolder ${activeTab !== 'homepage' ? "inactive-tab" : "activeBig"}`}
                        style={activeTab === 'homepage' ? {} : { cursor: "pointer" }}
                        onClick={() => handleNavigation('homepage')}
                    >
                        <div className="iconHolder">
                            <img
                                src={activeTab === 'homepage' ? ActiveHomepageIcon : InActiveHomepageIcon}
                                alt="Homepage Icon"
                            />
                        </div>
                        <div
                            className="tabContentText"
                            style={activeTab === 'homepage' ? { color: "#FFFFFF" } : {}}
                        >
                            Homepage
                        </div>
                    </div>
                </>
            )}




            {/* Calendar Tab */}
            {allowedTabs.includes('calendar') && (
                <>
                    {/* Collapsed state for Calendar */}
                    <div
                        className={`stateIconHolder ${activeTab !== 'calendar' ? "" : " activeSmall"}`}
                        onClick={() => handleNavigation('calendar')}
                    >
                        <div className="iconHolder">
                            <img
                                src={activeTab === 'calendar' ? ActiveCalendarIcon : InActiveCalendarIcon}
                                alt="Calendar Icon"
                                className="sidebar__calendarIcon"
                            />
                        </div>
                    </div>
                    {/* Expanded state for Calendar */}
                    <div
                        className={`expandStateIconHolder ${activeTab !== 'calendar' ? "inactive-tab" : "activeBig"}`}
                        style={activeTab === 'calendar' ? {} : { cursor: "pointer" }}
                        onClick={() => handleNavigation('calendar')}
                    >
                        <div className="iconHolder">
                            <img
                                src={activeTab === 'calendar' ? ActiveCalendarIcon : InActiveCalendarIcon}
                                alt="Calendar Icon"
                                className="sidebar__calendarIcon"
                            />
                        </div>
                        <div
                            className="tabContentText"
                            style={activeTab === 'calendar' ? { color: "#FFFFFF" } : {}}
                        >
                            Calendar
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Sidebar;