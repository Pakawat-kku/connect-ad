const { ipcRenderer } = require("electron");
const ipc  = ipcRenderer

closeApp.addEventListener('click', ()=> {

    console.log(ipc);
    console.log('tttt');
    ipc.send('CloseTheApp')
})

