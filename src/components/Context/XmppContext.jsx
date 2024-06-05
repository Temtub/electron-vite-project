import React, { createContext, useContext, useState, useEffect } from 'react';
import XMPP from 'stanza.io';

const XmppContext = createContext();

export const useXmpp = () => useContext(XmppContext);

export const XmppProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const xmppClient = XMPP.createClient({
            jid: 'user1@localhost',
            password: 'password1',
            transports: {
                websocket: 'ws://localhost:5280/xmpp-websocket',
                bosh: 'http://localhost:5280/http-bind'
            }
        });

        xmppClient.on('session:started', () => {
            console.log('Conectado a ejabberd');
            xmppClient.sendPresence();
        });

        xmppClient.on('message', (msg) => {
            if (msg.body) {
                try {
                    const jsonContent = JSON.parse(msg.body);
                    setMessages(prevMessages => [...prevMessages, jsonContent]);
                    console.log('Mensaje recibido:', jsonContent);
                } catch (e) {
                    console.error('Error al parsear el mensaje JSON:', e);
                }
            }
        });

        xmppClient.on('disconnected', () => {
            console.log('Desconectado de ejabberd');
        });

        xmppClient.on('error', (err) => {
            console.error('Error en la conexión XMPP:', err);
        });

        xmppClient.connect();
        setClient(xmppClient);

        return () => {
            xmppClient.disconnect();
        };
    }, []);

    const sendMessage = (recipient, jsonContent) => {
        if (client) {
            const jsonMessage = JSON.stringify(jsonContent);
            client.sendMessage({
                to: recipient,
                type: 'chat',
                body: jsonMessage
            });
        }
    };

    return (
        <XmppContext.Provider value={{ sendMessage, messages }}>
            {children}
        </XmppContext.Provider>
    );
};
