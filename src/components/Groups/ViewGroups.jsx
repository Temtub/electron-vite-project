import { useEffect, useState } from "react"
import { restful } from "/restApi/index.js"
import { useCheckSession } from "../../services/hooks/useCheckSession"
import { useNavigate } from "react-router"
import { GroupList } from "./GroupList"
import { ChargingGroupList } from "./ChargingGroupList"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
export function ViewGroups() {
    
    const userData = useCheckSession()
    const navigate = useNavigate()

    const [groups, setGroups] = useState({})
    const [error, setError] = useState("")

    useEffect(() => {
        // const userId = userData.data.id
        const get20groups = async (userId) => {
            let response = await restful("POST", `http://localhost:3001/api/chat/get20groups/`, {userId})

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

    return (

        <div className="w-100">

            <h1>Grupos</h1>
        
            <Button onClick={()=>{navigate("/createGroup")}} title='Añade un nuevo grupo' className='searchChatButton' ><i className="fa-solid fa-plus"></i></Button>

            {groups ? <GroupList groups={groups}/> : <ChargingGroupList/>}
        </div>
    )
}