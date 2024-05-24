import { restful } from "/restApi/index.js";
import personaImage from "../assets/images/persona.jpg";
import { Link } from "react-router-dom";

function FriendBox ({ id, name }) {
    // Supongamos que aquí tienes lógica para obtener información del amigo basada en su ID.

    return (
        <>
            <Link to={"/chat/"+id} id={id}>
                <div>
                    {/* Aquí puedes agregar contenido para mostrar información del amigo */}
                    <h3>{name}</h3>
                    <p>Información adicional sobre el amigo...</p>
                </div>
            </Link>
        </>
    );
}

export default FriendBox;
