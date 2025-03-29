import { app, BrowserWindow } from 'electron';
import path from 'node:path';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    const secureDevUrl = MAIN_WINDOW_VITE_DEV_SERVER_URL.replace(
      'http://',
      'https://'
    );
    mainWindow.loadURL(secureDevUrl);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.webContents.openDevTools();
};
app.commandLine.appendSwitch('ignore-certificate-errors');

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
