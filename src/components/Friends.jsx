

import FriendBox from "./FriendBox";

function Friends ({data}) {

    console.log(data)

    return(
        <aside className="chats">
            {data.map(person => (
                <FriendBox key={person._id} nameFriend={person.friendName} friendBio={person.friendBio}></FriendBox>
            ))}
        </aside>
    )
}


export default Friends;

