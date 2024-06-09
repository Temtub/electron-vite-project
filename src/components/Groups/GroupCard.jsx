import Card from 'react-bootstrap/Card';

import { getUserDataByToken } from '../../services/getUserDataByToken';
import { useState, useEffect } from 'react';
import { restful } from "/restApi/index.js"
import { useCheckSession } from "../../services/hooks/useCheckSession"
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { ErrorProvider, useErrorContext } from 'Components/Context/ErrorContext';
export function GroupCard({ group }) {

    const userData = useCheckSession()
    const navigate = useNavigate()
    const { setError } = useErrorContext()

    const joinGroup = async (event) => {
        const chatId = event.currentTarget.id
        const userId = userData.data.id
        let response
        try{
            response = await restful("POST", `/api/chat/addUserToChat`, { userId, chatId })
        }catch(err){
            console.log(err)
            setError("Ha ocurrido un problema interno, lo sentimos.")
        }
        navigate("/chat/" + response.data.chat._id)
    }

    return (
        <Card className="mb-3 w-100 w-md-50 w-lg-25">
            <Card.Body>
                <div className='groupCard__imgCont'>
                    <Card.Img className='groupCard__img' src={group.chat.icon} alt={`${group.chat.name} icon`} />
                </div>
                <Card.Title>{group.chat.name}</Card.Title>
                <Card.Text>
                    NºUsuarios: {group.totalParticipants}
                </Card.Text>
                <Button className='groupCard__button' id={group._id} onClick={joinGroup}>Unirse</Button>
            </Card.Body>
        </Card>
    );
}