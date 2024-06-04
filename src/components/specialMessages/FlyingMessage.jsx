

export function FlyingMessage({msg, color}){

    return(
        <div className="flyingMesage">
            
            <p className={`${color} m-0 flyingMesage__text`}><i className="fa-solid fa-info"></i>{msg}</p>
        </div>
    )
}