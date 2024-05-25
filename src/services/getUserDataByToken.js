
import {restful } from "/restApi/index.js"
export const getUserDataByToken = async (token) =>{
    let response = await restful("POST", "http://localhost:3001/api/login/token", {token} )

    return response
}