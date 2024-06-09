import { useState, useEffect } from 'react';
import { useErrorContext } from "../Context/ErrorContext"

export function FlyingMessage({ msg, color }) {
    const [visible, setVisible] = useState(true);
    const { error, setError } = useErrorContext()


    console.log("Llega")

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            closeBox();
        }, 5000);

        return () => {
            clearTimeout(timer); 
        };
    }, []);

    if (!visible) return null;

    const closeBox = () => {
        setVisible(false)
        setError("")
    }

    if (error) {
        console.log("Aqui")
        return (
            <div className={"flyingMessage"}>
                <p className={`${color} m-0 flyingMessage__text`}>
                    <i className="fa-solid fa-info"></i>{msg}
                    <button className="close-btn" onClick={() => closeBox()}>×</button>
                </p>
            </div>
        );
    }
    else {
        console.log("Asdasd")
        return
    }
}
