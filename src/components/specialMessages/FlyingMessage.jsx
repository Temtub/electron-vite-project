import React, { useState, useEffect } from 'react';
import { useErrorContext } from 'Components/Context/ErrorContext';

export function FlyingMessage({ msg, color }) {
    const [visible, setVisible] = useState(true);
    const { setError } = useErrorContext();

    useEffect(() => {
        // Show the message
        setVisible(true);

        // Everey 5 seconds set the message to not seen and change the message
        const timer = setTimeout(() => {
            setVisible(false);
            setError(false)
        }, 5000);

        return () => clearTimeout(timer);
    }, [msg]);

    const closeMessage = () => {
        setVisible(false);
    };

    return (
        visible && (
            <div id="msg" className="flyingMessage">
                <i onClick={closeMessage} className="flyingMessage__close fa-regular fa-circle-xmark"></i>
                <p className={`${color} m-0 flyingMessage__text`}>
                    <i className="fa-solid fa-info"></i> {msg}
                </p>
            </div>
        )
    );
}
