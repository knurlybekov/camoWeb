import React, { useEffect, useState } from 'react';
import { Environment3D } from '../components/3DEnvironment/Environment3D';
import './CSS/Home.css';
import { useLocation } from 'react-router-dom';

export const Home = () => {
    const [show3D, setShow3D] = useState(false);
    const location = useLocation();

      // Listen for changes in location pathname
    useEffect(() => 
    {
        // Check if the current path is '/home' (or any specific path where you want to show the 3D component)
        // If yes, set show3D to true, otherwise set it to false
        setShow3D(location.pathname === '/home');
    }, [location.pathname]);

    return (
        <div>
            <h2>Here</h2>
                <div className='hero-image'>
                    {show3D && <Environment3D/>}
                </div>
            <h2>Here</h2>
        </div>
    )
}
