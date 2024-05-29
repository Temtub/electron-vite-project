import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

import ConfigButton from './ConfigButton.jsx';


const CustomNavbar = () => {

  const navigate = useNavigate();
    

    return (

        <Navbar expand="lg" className="vertical-navbar navbar d-flex flex-column justify-content-between">

            <div className='d-flex flex-column align-items-center justify-content-between nabarButtons mt-3'>

                <button title='Atrás' className='navbar__button' onClick={() => navigate(-1)}><i className="fa-solid fa-angle-left"></i></button>
                <Link title='Chats' to="/chat"><i className="fa-regular fa-message navbar__button"></i></Link>
                <Link title='Grupos' to="/group"><i className="fa-solid fa-people-group navbar__button"></i></Link>
            </div>

            <ConfigButton></ConfigButton>
        </Navbar>

    );
};

export default CustomNavbar;
