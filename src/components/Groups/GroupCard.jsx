import Card from 'react-bootstrap/Card';

import { getUserDataByToken } from '../../services/getUserDataByToken';
import { useState, useEffect } from 'react';

import { restful } from "/restApi/index.js"
import { useCheckSession } from "../../services/hooks/useCheckSession"
import { useNavigate } from 'react-router';
export function GroupCard({ group }) {

    const userData = useCheckSession()
    const navigate = useNavigate()

    const joinGroup = async (event) => {
        const chatId = event.currentTarget.id
        const userId = userData.data.id
        console.log(userId)
        console.log(chatId)
        
        let response = await restful("POST", `http://localhost:3001/api/chat/addUserToChat`, { userId, chatId })
        console.log(response)
    }

    // console.log(group)
    return (
        <Card className="mb-3" >
            <Card.Body>
                <Card.Title>{group.chat.name}</Card.Title>
                <Card.Text>
                    NºUsuarios: {group.totalParticipants}
                </Card.Text>
                <button id={group._id} onClick={joinGroup}>Unirse</button>
            </Card.Body>
        </Card>
    );
}