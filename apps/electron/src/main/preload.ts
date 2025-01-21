/*const { contextBridge, ipcRenderer } = require('electron');

const apikey = 'myapi';

const api = {
  doThing: () => {
    ipcRenderer.send('do-a-thing');
    return 'do a thing';
  },
  showMessageBox: (message: any) => {
    ipcRenderer.send('show-message-box', { message });
    return new Promise((resolve) => {
      ipcRenderer.once('show-message-box-response', (event, args) => {
        resolve(args);
      });
    });
  },
};

contextBridge.exposeInMainWorld(apikey, api);
*/
console.log('preload.ts loaded');
