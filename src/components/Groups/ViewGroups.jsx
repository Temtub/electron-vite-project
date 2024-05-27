import { useEffect, useState } from "react"
import { restful } from "/restApi/index.js"

import { GroupList } from "./GroupList"
import { ChargingGroupList } from "./ChargingGroupList"
export function ViewGroups() {
    const [groups, setGroups] = useState({})
    const [error, setError] = useState("")

    useEffect(() => {

        const get20groups = async () => {
            let response = await restful("GET", `http://localhost:3001/api/chat/get20groups/`)
            // console.log(response.data)

            if(!response.status){
                setError("Ha ocurrido un error...")
            }
            else{
                setGroups(response.data)
            }
        }

        get20groups()
    }, [])

    return (

        <div>

            <h1>Grupos</h1>

            {groups ? <GroupList groups={groups}/> : <ChargingGroupList/>}
        </div>
    )
}