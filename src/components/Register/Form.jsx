import { useState } from "react";
import { Link } from 'react-router-dom';
import { restful } from "/restApi/index"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ShowMessage } from "Components/specialMessages/ShowMessage";
import { useNavigate } from "react-router-dom";

function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emptyValue, setEmptyValue] = useState(false);
    const [diffPassword, setDiffPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const PASSWORDEXPRESSION = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nombre || !email || !password || !confirmPassword) {
            setError('Por favor, rellena todos los campos.');
        } else if (password !== confirmPassword) {
            setError('Las passwords no coinciden.');
        } else if (!PASSWORDEXPRESSION.test(password)) {
            setError('La contraseña ha de tener una mayúscula, una minúscula, un número, un símbolo como mínimo y una longitud de 8 carácteres como mínimo.');
        } else {
            setIsSubmitting(true);
            const data = {
                user: nombre,
                pass: password,
                email: email
            };
            try {
                let response = await restful("POST", "/api/register", data);
                console.log(response)
                if (!response.status) {

                    setError(response.msg);
                } else {
                    navigate("/preferences/" + response.data._id);
                }
            } catch (error) {
                setError('Error al registrarse. Inténtalo de nuevo más tarde.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <Container className="loginCard d-flex flex-column flex-lg-row">
            <Row className="formText justify-content-md-center align-items-start">
                <Col>
                    <h1>Regístrate</h1>
                </Col>
            </Row>

            <Row className="formRegister  m-3 justify-content-md-center">
                <Col xs={12} md={12}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="formGroup" controlId="formBasicName">
                            <Form.Label className="formLabel">Nickname:</Form.Label>

                            <Form.Control
                                className="formInput"
                                type="text"
                                placeholder="Enter your name"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formBasicEmail">
                            <Form.Label className="formLabel">Email:</Form.Label>
                            <Form.Control
                                className="formInput"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Row className="d-flex flex-column flex-xxl-row">
                            <Col xs={12} xxl={6}>
                                <Form.Group className="formGroup" controlId="formBasicPassword">
                                    <Form.Label className="formLabel">Contraseña:</Form.Label>
                                    <Form.Control
                                        className="formInput"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12} xxl={6}>
                                <Form.Group className="formGroup" controlId="formBasicConfirmPassword">
                                    <Form.Label className="formLabel">Repite la contraseña:</Form.Label>
                                    <Form.Control
                                        className="formInput"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {error && <ShowMessage msg={error}></ShowMessage>}

                        <div className="buttonGroup d-flex flex-column-reverse flex-xxl-row justify-content-between">
                            <Link to="/" className="btn mb-2 ">
                                Iniciar sesión
                            </Link>
                            <Button
                                variant="primary"
                                type="submit"
                                className="btn btnLogin mb-2"
                                id="send"
                                disabled={isSubmitting}
                            >
                                Registrarse
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
