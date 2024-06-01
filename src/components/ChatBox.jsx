import { restful } from "/restApi/index.js";
import personaImage from "../assets/images/persona.jpg";
import { Link } from "react-router-dom";
import { useCheckSession } from "../services/hooks/useCheckSession";
import { useEffect, useState } from "react";

function ChatBox({ id, chatName, friends = [], users, icon }) {

    const userData = useCheckSession();
    const [name, setName] = useState("")

    const addFriend = async (event) => {
        let idFriend
        let idUser = userData.data.id

        if (event.target.nodeName == 'I') {
            idFriend = event.target.parentElement.id
        } else {
            idFriend = event.target.id
        }
        let response = await restful("POST", `http://localhost:3001/api/user/addFriendToUser`, { friendId: idFriend, userId: idUser })
    }


    useEffect(() => {
        const getName = async () => {
            if (!userData) {
                return
            }
            let response
            if (friends.length <= 2) {
                setName(chatName)
            }
            else if (userData.data.id === users[0]) {
                response = await restful("GET", `http://localhost:3001/api/user/${users[1]}`)
                setName(response.name)
            } else {
                response = await restful("GET", `http://localhost:3001/api/user/${users[0]}`)
                setName(response.name)
            }
            console.log(name)
        }

        getName()
    }, [userData])

    return (
        <Link to={"/chat/" + id} className="chatBox d-flex flex-row align-items-center">
            {icon ? (
                <img className="chatBox__Img" src={icon} alt="Icono de grupo" />
            ) : (
                <img className="chatBox__Img" src="../src/assets/images/noPhotouser.jpg" alt="Icono de usuario" />
            )}
            <div className="chatBox__link">
                <div>
                    <h3 className="chatBox__title">{name}</h3>
                </div>
            </div>
        </Link>
    );
}

export default ChatBox;
