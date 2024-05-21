
import { restful } from "/restApi/index.js"
import FriendBox from "./ChatBox";

function Friends ({data}) {

    console.log(data)

    const getChatsData = async (data) =>{
        let chatsData = await restful("POST", `http://localhost:3001/api/chat/chats`, {chats:data})
        console.log(chatsData)
        return chatsData
    } 

    getChatsData(data)

    return(
        <aside className="chats">
            {/* {data.map(chat => (
                <FriendBox key={chat._id} id={chat._id}></FriendBox>
            ))} */}
        </aside>
    )
}


export default Friends;

