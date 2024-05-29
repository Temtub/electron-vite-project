import { Container, Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';

export function SelectOfUsers({ friends }) {
    const [selectedFriends, setSelectedFriends] = useState([]);

    const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedFriends(selectedOptions);
    };

    const getNamesOfFriends = () => {


    }
    
    return (

        <Form.Group className="formGroup" controlId="formBasicFriends">
            <Form.Label className="formLabel">Añade amigos:</Form.Label>
            <Form.Control
                as="select"
                className="formInput"
                multiple
                value={selectedFriends}
                onChange={handleSelectChange}
            >
                {friends && friends.map((friend, index) => (
                    <option key={index} value={friend}>
                        {friend}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    )
}