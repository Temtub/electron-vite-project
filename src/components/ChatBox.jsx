import { restful } from "/restApi/index.js";
import personaImage from "../assets/images/persona.jpg";
import { Link } from "react-router-dom";
import { useCheckSession } from "../services/hooks/useCheckSession";
import { useEffect, useState } from "react";

function ChatBox ({ id, chatName, friends = [], users }) {

    const userData = useCheckSession();
    const [name, setName] = useState("")

    const addFriend = async (event) =>{
        let idFriend
        let idUser = userData.data.id
        
        if(event.target.nodeName == 'I'){
            idFriend = event.target.parentElement.id
        }else{
            idFriend = event.target.id
        }
        let response = await restful("POST", `http://localhost:3001/api/user/addFriendToUser`, {friendId:idFriend, userId:idUser})
    }


    useEffect(()=>{
        const getName = async () =>{
            if(!userData){
                return
            }
            let response
            if(userData.data.id === users[0]){
                response = await restful("GET", `http://localhost:3001/api/user/${users[1]}`)
            }else{
                response = await restful("GET", `http://localhost:3001/api/user/${users[0]}`)
            } 
            setName(response.name)
        }

        getName()
    }, [userData])
    

    return (
        <div className="chatBox">
            <Link to={"/chat/"+id}>
                <div>
                    <h3>{( users.length == 2 ? name : chatName)}</h3>
                    
                    <p>Información adicional sobre el amigo...</p>
                </div>

            </Link>
        </div>
    );
}

export default ChatBox;
