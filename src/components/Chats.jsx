

function Chats ({chats}) {

    console.log(chats)
    return(

        <aside>

            { chats.forEach(person => {
                <p>{ person.friendName }</p>
            })}

        </aside>
    )
}


export default Chats;

