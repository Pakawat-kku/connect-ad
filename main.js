const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const ipc = ipcMain

const LdapClient = require('ldapjs-client');
var client;

Authen()

async function Authen(){
  client = new LdapClient({ url: 'ldap://10.200.180.202' });
  try {
    await client.bind('Sathon\\Childoper' , 'P@ssw0rd')
    console.log('client', client);
    search()
  } catch (e) {
    console.log('Bind failed');
  }
}

// search()

async function search(){
  var dn = 'dc=Sathon,dc=BKK,dc=LOCAL'
  try {
    const options = {
      filter: '(&(objectClass=user)(cn=*))',
      scope: 'sub',
      attributes: ['uid', 'dn', 'cn','email']
    };
  
    const entries = await client.search(dn, options);
    console.log('entries', entries);

  } catch (e) {
    console.log(e);

  }
}

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

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})