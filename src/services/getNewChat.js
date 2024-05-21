import {restful} from "/restApi/index.js"

export const getNewChat = (user) =>{
    
    let data = {
        user : user
    }

    let response = restful("POST", "http://localhost:3001/api/user/newChat", data)

    return response
}

