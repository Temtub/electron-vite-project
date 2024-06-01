import { useEffect, useState } from "react"
import { GroupCard } from "./GroupCard"
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';


export function GroupList({ groups }) {

    const [error, setError] = useState("")

    return (
        <Container>
            <h3>Lista de grupos</h3>
            <Row>
                {Array.isArray(groups) && groups.map(group => (
                    <Col key={group._id} xs={12} md={6} lg={4}>
                        <GroupCard group={group} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}