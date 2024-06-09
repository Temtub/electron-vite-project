import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { json } from 'react-router';
import xmpp from 'simple-xmpp';
import electron from 'electron';
const fs = require('fs');

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']


async function createWindow() {
  const iconPath = path.join(__dirname, '../src/assets/icons/logo.ico');

  // Verifica si el archivo de ícono existe
  if (!fs.existsSync(iconPath)) {
    console.error('Ícono no encontrado en la ruta especificada:', iconPath);
  }

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 500,
    icon: iconPath,
    title: 'Bienvenido de nuevo.',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
    closable: true,
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
  win.setTitle("Bienvenido de nuevo")
  setTimeout(() => {
    win.setTitle('ChatExpress');
  }, 2000);
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function createXmppSession(name: string, password: string) {
  console.log("PORFAVOORRRR", name, password)

  xmpp.connect({
    jid: `${name}@ip-172-31-18-153.eu-north-1.compute.internal`,
    password: password,
    host: "13.60.59.64",
    port: 5222 // Puerto predeterminado para XMPP
  });

  xmpp.on("online", () => {
    console.log("Estamos conectados 🚕")
  })

  xmpp.on("error", err => {
    console.error(err);
  });

}

interface Message {
  _id: string,
  sender: string,
  content: string,
  time: Date,
  users: Array<Array<string>>
};

function sendMessageToOneUser(message: Message) {
  console.log(message.users);

  let name

  if (message.users.length > 2) {
    message.users.forEach(user => {

      if (user[0] == message.sender) {
        console.log("Sender")
      } else {
        console.log("Other")
        xmpp.send(`${user[1]}@ip-172-31-18-153.eu-north-1.compute.internal`, JSON.stringify(message));
      }
    });
  }

  if (message.users[0][0] == message.sender) {
    name = message.users[1][1]
  } else {
    name = message.users[0][1]
  }

  xmpp.send(`${name}@ip-172-31-18-153.eu-north-1.compute.internal`, JSON.stringify(message));
}


function sendMessageToRenderer(message: any) {

  if (win) {
    win.webContents.send('xmpp-message', message);
  }
}

xmpp.on("chat", (from, message) => {

  sendMessageToRenderer(message);
});



ipcMain.handle("call-Xmpp-Connection", (event, name: string, password: string) => {
  return createXmppSession(name, password);
})

ipcMain.handle("send-Xmpp-toUser", (event, message: Message) => {
  return sendMessageToOneUser(message);
})

app.whenReady().then(createWindow)
