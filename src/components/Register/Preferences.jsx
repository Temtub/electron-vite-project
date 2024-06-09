import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { ShowMessage } from "Components/specialMessages/ShowMessage";
import { restful } from "/restApi/index.js";
import { useNavigate } from "react-router-dom";

export function Preferences() {
    const { userId } = useParams();
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [biografia, setBiografia] = useState("");
    const [error, setError] = useState("");
    const [imagenPerfil, setImagenPerfil] = useState(null);
    const [gustos, setGustos] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const intereses = [
        "Programación",
        "Idiomas",
        "Videojuegos",
        "Deportes",
        "Música",
        "Cine",
        "Lectura",
        "Viajes",
        "Arte",
        "Cocina",
    ];

    const ciudadesEspana = [
        "A Coruña", "Albacete", "Alcalá de Henares", "Alcobendas", "Alcorcón", "Algeciras", "Alicante",
        "Almería", "Avilés", "Badajoz", "Badalona", "Barakaldo", "Barcelona", "Bilbao", "Burgos",
        "Cáceres", "Cádiz", "Cartagena", "Castellón de la Plana", "Ceuta", "Córdoba", "Dos Hermanas",
        "Elche", "Gandía", "Getafe", "Gijón", "Girona", "Granada", "Guadalajara", "Hospitalet de Llobregat",
        "Huelva", "Jaén", "Jerez de la Frontera", "Las Palmas de Gran Canaria", "Las Rozas de Madrid",
        "Lleida", "Logroño", "Lugo", "Madrid", "Marbella", "Mataró", "Melilla", "Mérida", "Móstoles",
        "Murcia", "Oviedo", "Palencia", "Palma", "Pamplona", "Parla", "Pontevedra", "Pozuelo de Alarcón",
        "Reus", "Sabadell", "Salamanca", "San Cristóbal de La Laguna", "San Fernando", "San Sebastián",
        "Santa Coloma de Gramenet", "Santa Cruz de Tenerife", "Santander", "Santiago de Compostela",
        "Segovia", "Sevilla", "Tarragona", "Telde", "Terrassa", "Toledo", "Torremolinos", "Torrejón de Ardoz",
        "Valencia", "Valladolid", "Vélez-Málaga", "Vigo", "Vitoria-Gasteiz", "Zaragoza"
    ];

    const handleGustosChange = (e) => {
        const { value, checked } = e.target;
        setGustos((prevGustos) =>
            checked ? [...prevGustos, value] : prevGustos.filter((gusto) => gusto !== value)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fechaNacimiento || !localidad || !biografia) {
            setError("Rellena los datos");
            return;
        }
        if (biografia.length > 30) {
            setError("La biografía no puede superar los 30 carácteres");
            return;
        }
        if (gustos.length < 3) {
            setError("Escoge al menos 3 gustos");
            return;
        }

        setIsSubmitting(true);

        const data = {
            birth_date: fechaNacimiento,
            location: localidad,
            bio: biografia,
            likes: gustos,
            iconUrl: imagenPerfil,
            userId: userId
        };

        try {
            const response = await restful("POST", `http://localhost:3001/api/user/addDataToUser`, data);
            console.log(response)
            if (!response.status) {
                setError(response.msg);
            } else {
                navigate("/¡¡¡Bienvenido, ya solo queda iniciar sesión!!!");
            }
        } catch (error) {
            setError("Error al enviar los datos. Inténtalo de nuevo más tarde.");
        } finally {
            setIsSubmitting(false);
        }

        setError("Ha ocurrido un error interno, lo sentimos mucho.");
    };

    const handleImageChange = (e) => {
        setImagenPerfil(e.target.files[0]);
    };

    console.log(error)
    return (
        <Container className="loginCard d-flex flex-column flex-md-row">
            <Row className="formText w-100 m-1 justify-content-md-center align-items-start">
                <Col>
                    <h1>Háblanos de ti...</h1>
                    <p>Rellena este formulario para terminar de conocerte y saber con quien juntarte...</p>
                </Col>
                <Form.Group className="formGroup p-0 pe-4" controlId="formBasicGustos">
                    <Form.Label className="formLabel">Gustos:</Form.Label>
                    <div className="formCheckGroup">
                        {intereses.map((interes, index) => {
                            const checkboxId = `checkbox-${index}`;
                            return (
                                <div key={index}>
                                    <input
                                        className="me-3"
                                        type="checkbox"
                                        id={checkboxId}
                                        value={interes}
                                        onChange={handleGustosChange}
                                    />
                                    <label htmlFor={checkboxId}>{interes}</label>
                                </div>
                            );
                        })}
                    </div>
                </Form.Group>
            </Row>

            <Row className="formRegister w-100 justify-content-md-center">
                <Col xs={12} md={12}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="formGroup" controlId="formBasicFechaNacimiento">
                            <Form.Label className="formLabel">Fecha de Nacimiento:</Form.Label>
                            <Form.Control
                                className="formInput"
                                type="date"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formBasicLocalidad">
                            <Form.Label className="formLabel">Localidad:</Form.Label>
                            <Form.Control
                                className="formInput"
                                as="select"
                                value={localidad}
                                onChange={(e) => setLocalidad(e.target.value)}
                            >
                                <option value="">Selecciona una localidad</option>
                                {ciudadesEspana && ciudadesEspana.map((ciudad, index) => (
                                    <option key={index} value={ciudad}>{ciudad}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formBasicBiografia">
                            <Form.Label className="formLabel">Biografía:</Form.Label>
                            <Form.Control
                                className="formInput"
                                as="textarea"
                                rows={3}
                                placeholder="Enter your biography"
                                value={biografia}
                                onChange={(e) => setBiografia(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formBasicImage">
                            <Form.Label className="formLabel">Imagen de Perfil:</Form.Label>
                            <Form.Control
                                className="formInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>

                        {error && <ShowMessage msg={error}></ShowMessage>}

                        <div className="buttonGroup d-flex flex-column-reverse flex-md-row justify-content-between">
                            <Button
                                variant="primary"
                                type="submit"
                                className="btn btnLogin mb-2"
                                id="send"
                                disabled={isSubmitting}
                            >
                                Continuar
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
