import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import { restful } from "/restApi/index"

function Login () {
    const navigate = useNavigate();
    const [ user, setUser ] = useState("")
    const [ pass, setPass ] = useState("")

    const [ correctLogin, setCorrectLogin ] = useState(false)

    const formManagement = async (e) =>{
        e.preventDefault()

        const data = {
            user : user,
            pass : pass
        }
        // Check thath the user exists
        let response = await restful("POST", "http://localhost:3001/api/login", data)
        console.log(response)

        // if all went correct makes the login
        if(response.status){
            // Save the token in the local storage
            localStorage.setItem('token', response.token)
            setCorrectLogin(true)
        }
        else{
            // Manejar errores
        }
    }   

    // Check correct login
    useEffect(() => {
        if (correctLogin) {
          navigate('/chat');
        }
    }, [correctLogin]);

    return(

        <main>

            <h1>Login</h1>

            <form action="" onSubmit={formManagement}>
                <label htmlFor="name">Nombre:</label>
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