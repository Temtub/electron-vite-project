import React, { createContext, useContext, useState, useEffect } from 'react';
import * as XMPP from 'stanza.io';

const XmppContext = createContext();

export const XmppProvider = ({ children }) => {

    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    });

    return (
        <XmppContext.Provider value={{ setCredentials }}>
            {children}
        </XmppContext.Provider>
    );
};

export const useXmppContext = () => {
    return useContext(XmppContext);
};