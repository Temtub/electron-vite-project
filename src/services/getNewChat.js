import {restful} from "/restApi/index.js"

export const getNewChat = (user) =>{
    
    let data = {
        user : user
    }

    let response = restful("POST", "/api/user/newChat", data)

    return response
}

