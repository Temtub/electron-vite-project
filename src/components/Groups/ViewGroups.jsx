import { useEffect, useState } from "react"
import { restful } from "/restApi/index.js"
import { useCheckSession } from "../../services/hooks/useCheckSession"
import { useNavigate } from "react-router"
import { GroupList } from "./GroupList"
import { ChargingGroupList } from "./ChargingGroupList"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FlyingMessage } from 'Components/specialMessages/FlyingMessage';
import { ErrorProvider, useErrorContext } from "Components/Context/ErrorContext"
export function ViewGroups() {
    
    const userData = useCheckSession()
    const navigate = useNavigate()

    const [groups, setGroups] = useState({})
    const [message, setMessage] = useState("")
    const { error, setError} = useErrorContext()

    useEffect(() => {
        // const userId = userData.data.id
        const get20groups = async (userId) => {
            let response
            try {
                response = await restful("POST", `/api/chat/get20groups/`, {userId})
                
            } catch (error) {
                setError("Ha ocurrido un error interno, lo sentimos.")
            }

            if(!response.status){
                setError("Ha ocurrido un error...")
            }
            else{
                setGroups(response.data)
            }
        }
        if(userData){
            const userId = userData.data.id
            get20groups(userId)
        }


    }, [userData])

    console.log(error)
    return (

        <div className="w-100 viewGroup">

            <h1>Grupos</h1>
        
            <Button onClick={()=>{navigate("/createGroup")}} title='Añade un nuevo grupo' className='searchChatButton' ><i className="fa-solid fa-plus"></i></Button>

            {groups ? <GroupList groups={groups}/> : <ChargingGroupList/>}
            
            { error && <FlyingMessage msg={error}></FlyingMessage>}

        </div>
    )
}