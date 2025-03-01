import { app, BrowserWindow } from 'electron';
import path from 'node:path';

const nativeModule = require(
  path.join(__dirname, '../../../native/build/Release/module.node')
);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  console.log(nativeModule);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
  /* 
  mainWindow.loadURL('http://localhost:5173');
  logMessage('렌더러 로드 );*/
  mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  process.env.LANG = 'en_US.UTF-8';

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
