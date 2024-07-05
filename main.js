const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const ipc = ipcMain

const LdapClient = require('ldapjs-client');

// const { Client } = require('ldapts');

// const client = new Client({
//   url: 'ldaps://10.200.180.45',
//   timeout: 0,
//   connectTimeout: 0,
//   tlsOptions: {
//     minVersion: 'TLSv1.2',
//   },
//   strictDN: true,
// });
// var client = new LdapClient({ url: 'ldap://10.200.180.45' });
// console.log('client', client);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    titleBarStyle : 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devtools : true,
      nodeIntegration: true,
      contextIsolation : false,

    }
  })

  mainWindow.loadFile('src/index.html')

  ipc.on('CloseTheApp', ()=>{
      console.log('event Comming');
      mainWindow.close()
  })

}

// ddd();

async function ddd() {

  console.log('client', client);
  var l = await client.bind('cn=root', 'p@ssw0rd');
  console.log('l',l);

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})