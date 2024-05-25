import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate, Link} from 'react-router-dom';

const CustomNavbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        // Delete the token from the localstorage
        localStorage.removeItem('token');

        // Redirectionate to the login
        navigate('/');
    };

    return (

        <Navbar bg="light" expand="lg" className="vertical-navbar navbar d-flex flex-column">

            <Link to="/chat"><i class="fa-regular fa-message"></i></Link>
            <button onClick={() => navigate(-1)}><i class="fa-solid fa-angle-left"></i></button>
            <Link to="/group"><i class="fa-solid fa-people-group"></i></Link>
            <button onClick={logout}><i class="fa-solid fa-circle-xmark"></i></button>
            
        </Navbar>

    );
};

export default CustomNavbar;
