import { ipcRenderer, contextBridge } from 'electron'

interface Message {
  _id: string,
  sender: string,
  content: string,
  time: Date,
  users: Array<Array<string>>
};

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  callXmppConnect(name: string, password: string) { return ipcRenderer.invoke("call-Xmpp-Connection", name, password) },
  sendMessageToOneUser(message: Message) { return ipcRenderer.invoke("send-Xmpp-toUser", message) },

})

contextBridge.exposeInMainWorld('electron', {
  receiveXMPPMessage: (callback: any) => ipcRenderer.on('xmpp-message', callback)
});

