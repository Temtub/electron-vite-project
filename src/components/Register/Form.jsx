import { useState } from "react";
import { restful } from "/restApi/index"

function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [emptyValue, setEmptyValue ] = useState(false)
    const [diffPassword, setDiffPassword ] = useState(false)
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!nombre || !email || !password || !confirmPassword) {
            setMensaje('Por favor, rellena todos los campos.');
        } else if (password !== confirmPassword) {
            setMensaje('Las passwords no coinciden.');
        } else {
            const data = {
                user : nombre,
                pass : password,
                email : email
            }
            let response = await restful("POST", "http://localhost:3001/api/register", data)
            console.log(response)
        }

      };
    return (

        <main>

            <h1>Registrate</h1>

            {mensaje && <p>{mensaje}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                />

                <label htmlFor="password">password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    
                />
                <label htmlFor="password">Repite la password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    
                />

                <button type="submit">Registrarse</button>
            </form>
        </main>
    )
}


export default Register