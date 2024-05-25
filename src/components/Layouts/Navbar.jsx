import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        // Delete the token from the localstorage
        localStorage.removeItem('token');

        // Redirectionate to the login
        navigate('/');
    };

    return (
        <Navbar bg="light" expand="lg" className='mb-5'>
            <Container>
                <Navbar.Brand href="/">ChatApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        <Nav.Link href="/chat">Chat</Nav.Link>
                        <NavDropdown title="Opciones" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Configuraciones</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Salir</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
