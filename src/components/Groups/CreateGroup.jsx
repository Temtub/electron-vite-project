import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import {ShowMessage} from '../specialMessages/ShowMessage';
import { useCheckSession } from '../../services/hooks/useCheckSession';
import { restful } from "/restApi/index.js"

export function CreateGroup() {
    const [groupName, setGroupName] = useState('');
    const [image, setImage] = useState(null);
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const token = useCheckSession();
    const [userData, setUserData] = useState(null);
    const [selectedFriends, setSelectedFriends] = useState([]);

    useEffect(() => {
        const chargeMessages = async () => {
            if (token) {
                try {
                    let response = await restful("GET", `http://localhost:3001/api/user/${token.data.id}`);
                    setUserData(response);
                } catch (error) {
                    console.error('Failed to fetch messages:', error);
                }
            }
        };

        chargeMessages();
    }, [token]);

    const formManagement = async (event) => {
        event.preventDefault();

        if (!groupName || !image ) {
            setMensaje('Por favor, rellena todos los campos.');
        } else if ( selectedFriends < 2 ) {
            setMensaje('Crea un grupo con al menos tres amigos');
        } else {
            const users = [...selectedFriends, userData._id]
            const data = {
                users,
                name: groupName,
                icon: image
            }
            // SEGUIR CON EL FORMULARIO DE CREACION DE GRUPOS, ENVIAR DATOS A EL BACKEND Y CREAR LA INFO ALLI
            let response = await restful("POST", "http://localhost:3001/api/register", data)
            console.log(response)
            if(!response.status){
                setError(response.msg)
            }else{
                
                navigate("/preferences/"+response.data._id)
            }
        }

    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleFriendChange = (friendId) => {
        setSelectedFriends((prevSelectedFriends) =>
            prevSelectedFriends.includes(friendId)
                ? prevSelectedFriends.filter(id => id !== friendId)
                : [...prevSelectedFriends, friendId]
        );
    };
    console.log(userData)
    return (
        <Container className="loginCard d-flex flex-column flex-md-row">
            <Row className="w-100 w-md-50 justify-content-md-start align-items-start loginSide">
                <Col>
                    <h1>Crea un grupo</h1>
                    <p>Escribe tu nombre, selecciona una imagen y elige a los amigos que quieren que estén contigo en el grupo, recuerda que el grupo será público.</p>
                </Col>

                {msg && <Alert className="alert" key={'info'} variant={'info'}>
                    {msg}
                </Alert>}
            </Row>

            <Row className="w-100 w-md-50 justify-content-md-center">
                <Col xs={12} md={10}>
                    <Form onSubmit={formManagement}>
                        <Form.Group className="formGroup" controlId="formBasicName">
                            <Form.Label className="formLabel">Nombre del grupo:</Form.Label>
                            <Form.Control
                                className="formInput"
                                type="text"
                                placeholder="Enter your name"
                                onChange={(e) => setGroupName(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formImage">
                            <Form.Label className="formLabel">Imagen:</Form.Label>
                            <Form.Control
                                className="formInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>

                        <Form.Group className="formGroup" controlId="formFriends">
                            <Form.Label className="formLabel">Amigos:</Form.Label>
                            {userData && userData.friends.map(friend => (
                                <Form.Check
                                    key={friend}
                                    type="checkbox"
                                    id={`friend-${friend}`}
                                    label={friend}
                                    value={friend}
                                    onChange={() => handleFriendChange(friend)}
                                />
                            ))}
                        </Form.Group>

                        {error && <ShowMessage msg={error} />}

                        <div className="buttonGroup d-flex flex-column-reverse flex-md-row justify-content-between">
                            <Button variant="primary" type="submit" className="btn btnLogin mb-2" id="send">
                                Crear el grupo
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

