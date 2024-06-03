import { useEffect, useState } from "react"
import { GroupCard } from "./GroupCard"
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { getUserDataByToken } from "../../services/getUserDataByToken";

export function GroupList({ groups }) {

    const userToken = localStorage.getItem("token");
    const [error, setError] = useState("")
    const [userId, setUserId] = useState("")

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userdata = await getUserDataByToken(userToken);
                if (!userdata.status) {
                    console.log("Reenviado");
                    return navigate('/Se ha cerrado sesión automaticamente');
                }

                const userId = userdata.data.data.id;
                setUserId(userId);

            } catch (error) {
                console.error("Error initializing chat:", error);
            }
        };

        getUserData();
    }, [userToken]);

    console.log(groups)
    const filteredGroups = Array.isArray(groups) ? groups.filter(group => !group.chat.users.includes(userId)) : [];

    return (
        <Container>
            <h3>Lista de grupos</h3>
            <Row>
                {filteredGroups.map(group => (
                    <Col key={group._id} xs={12} md={6} lg={4}>
                        <GroupCard group={group} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}