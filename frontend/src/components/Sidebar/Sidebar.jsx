import React, { useState } from 'react';
import './Sidebar.css';

export const Sidebar = ({ switchTextureTest }) => 
{
    const [isOpen, setIsOpen] = useState(false);

    const toggleSideBar = () => 
    {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`side-nav-bar ${isOpen ? 'open' : ''}`}>
            <div className="toggle-arrow" onClick={toggleSideBar}>
                {isOpen ? '<' : '>'}
            </div>
            <div className="content">
                <button onClick={switchTextureTest}>Switch Texture</button>
            </div>
        </div>
    );
};
