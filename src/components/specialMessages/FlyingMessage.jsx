

export function FlyingMessage({msg, color}){

    return(
        <div className="flyingMesage">
            
            <p className={color}><i className="fa-solid fa-info"></i>{msg}</p>
        </div>
    )
}