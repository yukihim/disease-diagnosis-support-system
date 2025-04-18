import React from 'react';
import './style/sortIcon.css';

// Import sort icons
// import SortAscendingIcon from '../../assets/images/common/sort_asc.png';
// import SortDescendingIcon from '../../assets/images/common/sort_desc.png';
// import SortDefaultIcon from '../../assets/images/common/sort_default.png';
import SortAscendingIcon from '../../assets/icons/AscendingSortingIcon.png';
import SortDescendingIcon from '../../assets/icons/DescendingSortingIcon.png';
import SortDefaultIcon from '../../assets/icons/SortingIcon.png';

function SortIcon({ direction, onClick }) {
    // Determine which icon to display based on the sort direction
    const iconSrc = direction === 'asc' ? SortAscendingIcon : 
                    direction === 'desc' ? SortDescendingIcon : 
                    SortDefaultIcon;
    
    const altText = direction === 'asc' ? 'Sort ascending' :
                   direction === 'desc' ? 'Sort descending' :
                   'Sort';
                   
    return (
        <div className="sortIconWrapper" onClick={onClick}>
            <img 
                src={iconSrc} 
                alt={altText} 
                className="sortIcon"
            />
        </div>
    );
}

export default SortIcon;