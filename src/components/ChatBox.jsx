import { restful } from "/restApi/index.js";
import personaImage from "../assets/images/persona.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ChatBox ({ id }) {

    return (
        <Link to={"/chat/"+id}>
            <div id={id}>
                <div>
                    {/* Aquí puedes agregar contenido para mostrar información del amigo */}
                    <h3>Nombre del Amigo</h3>
                    <p>Información adicional sobre el amigo...</p>
                </div>
            </div>
        </Link>
    );
}

export default ChatBox;
