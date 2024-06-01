import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ShowMessage } from '../specialMessages/ShowMessage';
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
    const navigate = useNavigate();

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

        if (!groupName || !image) {
            setMsg('Por favor, rellena todos los campos.');
        } else if (selectedFriends.length < 2) {
            setMsg('Crea un grupo con al menos tres amigos');
        } else {
            const users = [...selectedFriends, userData._id];
            const data = {
                users,
                name: groupName,
                icon: image
            };

            // Enviar datos al backend para crear el grupo
            let response = await restful("POST", "http://localhost:3001/api/chat/createGroup", data);
            if (!response.status) {
                setError(response.msg);
            } else {
                navigate("/chat/"+response._id);
            }
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleFriendChange = (friendId) => {
        setSelectedFriends((prevSelectedFriends) =>
            prevSelectedFriends.includes(friendId)
                ? prevSelectedFriends.filter(id => id !== friendId)
                : [...prevSelectedFriends, friendId]
        );
    };

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
