import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { restful } from "/restApi/index"

// COmponents
import { ShowMessage } from "Components/specialMessages/ShowMessage";

function Login() {
    let response;
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")

    const [correctLogin, setCorrectLogin] = useState(false)

    const [error, setError] = useState("")

    const formManagement = async (e) => {
        e.preventDefault()

        if (!user || !pass) {
            setError("Rellene todos los datos")
            return
        }
        const data = {
            user: user,
            pass: pass
        }
        // Check that the user exists
        try {
            response = await restful("POST", "http://localhost:3001/api/login", data)

        } catch (err) {
            setError("Ha ocurrido un error, pruebe más tarde.")
        }

        // if all went correct makes the login
        if (response.status) {
            // Save the token in the local storage
            localStorage.setItem('token', response.token)
            setCorrectLogin(true)
        }
        else {
            setError(response.msg)
        }
    }

    // Check correct login
    useEffect(() => {
        if (correctLogin) {
            navigate('/chat');
        }
    }, [correctLogin]);

    return (
        <Container className="loginCard d-flex flex-column flex-md-row">
            <Row className="w-100 w-md-50 justify-content-md-start align-items-start loginSide">
                <Col>
                    <h1>Inicia sesión</h1>
                    <p>Escribe tu nombre y tu contraseña</p>
                </Col>
            </Row>

            <Row className="w-100 w-md-50 justify-content-md-center">
                <Col xs={12} md={10}>
                    <Form onSubmit={formManagement}>
                        <Form.Group className="formGroup" controlId="formBasicName">
                            <Form.Label className="formLabel">Nombre:</Form.Label>
                            <Form.Control
                                className="formInput"
                                type="text"
                                placeholder="Enter your name"
                                onChange={(e) => setUser(e.target.value)}
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

                        {error && <ShowMessage msg={error}></ShowMessage>}

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

            <div className="containerRabbit d-none d-md-flex justify-content-center mt-3">
                <img className="bottom-image" src="../src/assets/images/conejo.png" alt="Rabbit" />
                <div className="speech-bubble">
                    <p>¡Bienvenido de nuevo!</p>
                </div>
            </div>
        </Container>
    );
};



export default Login