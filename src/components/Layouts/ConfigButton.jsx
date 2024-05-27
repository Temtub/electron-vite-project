import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../styles/ThemeContext'; // Ajusta la ruta según tu estructura de archivos

const ConfigButton = () => {

    const { toggleTheme } = useTheme();

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleToggleTheme = () => {
        console.log('Toggle button clicked');

        toggleTheme();
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">⚙️</button>
            {dropdownVisible && (
                <div className="dropdown-content p-2 d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row justify-content-between dropdownClickHover">
                        <label htmlFor="modeCheckbox">Modo oscuro</label>
                        <div className="checkbox-wrapper-2">
                            <input 
                                id="modeCheckbox" 
                                type="checkbox" 
                                className="sc-gJwTLC ikxBAC" 
                                onChange={handleToggleTheme}
                            />
                        </div>
                    </div>
                    <p className="dropdownClickHover" title="Cerrar sesión" onClick={logout}>
                        Cerrar sesión
                    </p>
                </div>
            )}
        </div>
    );
};

export default ConfigButton;
