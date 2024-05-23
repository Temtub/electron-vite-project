import { restful } from "/restApi/index.js";
import personaImage from "../assets/images/persona.jpg";

async function FriendBox ({ id }) {
    // Supongamos que aquí tienes lógica para obtener información del amigo basada en su ID.

    return (
        <>
            <div id={id}>
                <img src={personaImage} alt="Friend" />
                <div>
                    {/* Aquí puedes agregar contenido para mostrar información del amigo */}
                    <h3>Nombre del Amigo</h3>
                    <p>Información adicional sobre el amigo...</p>
                </div>
            </div>
        </>
    );
}

export default FriendBox;
