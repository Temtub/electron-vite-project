import { restful } from "/restApi/index.js";
import personaImage from "../assets/images/persona.jpg";
import { Link } from "react-router-dom";

function FriendBox ({ id, name, friends }) {

    const addFriend = (event) =>{
        let idFriend = event.target.id

        let response = restful("POST", `http://localhost:3001/api/chat/get20groups/`, {idFriend, idUser})

    }


    return (
        <div className="chatBox">
            <Link to={"/chat/"+id}>
                <div>
                    <h3>{name}</h3>
                    <p>Información adicional sobre el amigo...</p>
                </div>

                <button id={id} onClick={addFriend}><i className="fa-solid fa-user-plus"></i></button>
            </Link>
        </div>
    );
}

export default FriendBox;
