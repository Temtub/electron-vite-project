

function FriendBox ({friendBio, nameFriend, image}) {

    return(

        <div>
            <img src="../assets/images/persona.jpg" alt="img" />

            <div>
                <p>{ nameFriend } </p>
                <p>{ friendBio }</p>
            </div>
        </div>
    )
}

export default FriendBox;
