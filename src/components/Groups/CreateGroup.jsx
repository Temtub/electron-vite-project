import { Container, Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCheckSession } from '../../services/hooks/useCheckSession';
import { SelectOfUsers } from './SelectOfusers';

export function CreateGroup() {

    const userData = useCheckSession()

    const formManagement = () => {

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

                        <SelectOfUsers friends={(userData ? userData.data.friends :  [])}></SelectOfUsers>


                        <div className="buttonGroup d-flex flex-column flex-md-row justify-content-between">
                            <Button variant="primary" type="submit" className="btn btnLogin" id="send">
                                Crear grupo
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </main>

    )
}