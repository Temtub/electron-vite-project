import React, { useState, useEffect } from 'react';

const ConfigButton = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest('.dropdown')) {
                setDropdownVisible(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    const logout = () => {
        // Delete the token from the localstorage
        localStorage.removeItem('token');

        // Redirectionate to the login
        navigate('/');
    };
    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">⚙️</button>
            {dropdownVisible && (
                <div className='dropdown-content p-2 d-flex flex-column justify-content-between'>
                    <div className='d-flex flex-row justify-content-between dropdownClickHover'>
                        <label htmlFor='modeCheckbox' onClick={toggleDarkMode}>Modo oscuro</label>
                        <div className="checkbox-wrapper-2">
                            <input id='modeCheckbox' type="checkbox" className="sc-gJwTLC ikxBAC"/>
                        </div>
                    </div>
                    <p className='dropdownClickHover' title='Cerrar sesión' onClick={logout}>Cerrar sesión</p>

                </div>
            )}
        </div>
    );
};

export default ConfigButton;
