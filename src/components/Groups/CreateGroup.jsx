import { Container, Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function CreateGroup() {

    const formManagement = () =>{

    }
    return (

        <main>

            <h1>Crear </h1>

            <Row className="w-100 w-md-50 justify-content-md-center">
                <Col xs={12} md={10}>
                    <Form onSubmit={formManagement}>
                        <Form.Group className="formGroup" controlId="formBasicName">
                            <Form.Label className="formLabel">Nombre del grupo:</Form.Label>
                            <Form.Control
                                className="formInput"
                                type="text"
                                placeholder="Enter your name"
                                onChange={(e) => setUser(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formBasicPassword">
                            <Form.Label className="formLabel">Contraseña:</Form.Label>
                            <Form.Control
                                className="formInput"
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </Form.Group>


                        <div className="buttonGroup d-flex flex-column flex-md-row justify-content-between">
                            <Link to="/register" className="btn mb-2 mb-md-0">
                                Registrarse
                            </Link>
                            <Button variant="primary" type="submit" className="btn btnLogin" id="send">
                                Iniciar sesión
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </main>

    )
}