import { useState } from "react"
import { Link } from "react-router-dom"

import { restful } from "/restApi/index"

function Login () {

    const [ user, setUser ] = useState("")
    const [ pass, setPass ] = useState("")

    const formManagement = async (e) =>{
        e.preventDefault()

        const data = {
            user : user,
            pass : pass
        }
        let response = await restful("POST", "http://localhost:3001/api/login", data)
        console.log(response)
    }   

    return(

        <main>

            <h1>Login</h1>

            <form action="" onSubmit={formManagement}>
                <label htmlFor="name">Correo:</label>
                <input onChange={(e)=>{ setUser(e.target.value)} } type="text" name="" id="name" />

                <label htmlFor="pass">Contraseña:</label>
                <input onChange={(e)=>{ setPass(e.target.value)} } type="password" name="" id="pass" />
                <input type="submit" name="" id="send" />
                <Link to={"/register"}>Registrarse</Link>
            </form>
        </main>
    )
}

export default Login