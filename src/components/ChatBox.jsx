import { restful } from "/restApi/index.js";
import personaImage from "../assets/images/persona.jpg";
import { Link } from "react-router-dom";

function FriendBox ({ id, name }) {

    return (
        <div className="chatBox">
            <Link to={"/chat/"+id} id={id}>
                <div>
                    <h3>{name}</h3>
                    <p>Información adicional sobre el amigo...</p>
                </div>
            </Link>
        </div>
    );
}

export default FriendBox;
