import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { restful } from "/restApi/index.js"

export function FriendCheck({friendId, handleFriendChange}) {

    const [friendName, setFriendName] = useState("")

    useEffect(()=>{
        const getFriendName = async (friendId) =>{

            const response = await restful("GET", `/api/user/${friendId}`)
            console.log(response)
            setFriendName(response.name)
        }
        getFriendName(friendId)
    }, [friendId])

    return (
        <Form.Check
            key={friendId}
            type="checkbox"
            id={`friend-${friendId}`}
            label={friendName}
            value={friendId}
            onChange={() => handleFriendChange(friendId)}
        />
    )
}