
import {restful } from "/restApi/index.js"
export const getUserDataByToken = async (token) =>{
    let response = await restful("POST", "/api/login/token", {token} )

    return response
}