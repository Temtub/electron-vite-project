import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

import ConfigButton from './ConfigButton.jsx';


const CustomNavbar = () => {

    

    return (

        <Navbar expand="lg" className="vertical-navbar navbar d-flex flex-column justify-content-between">

            <div className='d-flex flex-column align-items-center '>

                <button title='Atrás' className='navbar__button' onClick={() => navigate(-1)}><i className="fa-solid fa-angle-left"></i></button>
                <Link title='Chats' to="/chat"><i className="fa-regular fa-message"></i></Link>
                <Link title='Grupos' to="/group"><i className="fa-solid fa-people-group"></i></Link>
            </div>


            {/* <div className="dropdown" id='dropdown'>
                <button onClick={toggleDropdown} className="dropbtn">⚙️</button>
                <div id="myDropdown" className="dropdown-content p-2 d-flex flex-column justify-content-between">
                    <div className='d-flex flex-row justify-content-between dropdownClickHover'>
                        <label htmlFor='modeCheckbox' onClick={toggleDarkMode}>Modo oscuro</label>
                        <div className="checkbox-wrapper-2">
                            <input id='modeCheckbox' type="checkbox" className="sc-gJwTLC ikxBAC"/>
                        </div>
                    </div>

                    <p className='dropdownClickHover' title='Cerrar sesión' onClick={logout}>Cerrar sesión</p>

                </div>
            </div> */}

            <ConfigButton></ConfigButton>
        </Navbar>

    );
};

export default CustomNavbar;
