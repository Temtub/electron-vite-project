import { useEffect, useState } from "react"
import { restful } from "/restApi/index.js"
import { useCheckSession } from "../../services/hooks/useCheckSession"
import { useNavigate } from "react-router"
import { GroupList } from "./GroupList"
import { ChargingGroupList } from "./ChargingGroupList"
import { Link } from "react-router-dom"
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

        <div>

            <h1>Grupos</h1>
        
            <button onClick={()=>{navigate("/createGroup")}} title='Añade un nuevo grupo' className='serchChatButton' ><i className="fa-solid fa-plus"></i></button>

            {groups ? <GroupList groups={groups}/> : <ChargingGroupList/>}
        </div>
    )
}