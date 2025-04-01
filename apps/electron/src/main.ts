import { app, BrowserWindow, ipcMain, session } from 'electron';
import path from 'path';

let loginWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  loginWindow.loadURL('https://localhost:3000/');
}

function createMainWindowWithCookies(cookies: Electron.Cookie[]) {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  Promise.all(
    cookies.map((cookie) =>
      mainWindow!.webContents.session.cookies.set({
        url: 'https://localhost:3000',
        ...cookie,
      })
    )
  ).then(() => {
    mainWindow!.loadURL('https://localhost:3000');
    loginWindow?.close();
    loginWindow = null;
  });
}

app.whenReady().then(() => {
  createLoginWindow();
});

ipcMain.on('login-success', async () => {
  const cookies = await loginWindow!.webContents.session.cookies.get({
    url: 'http://localhost:3000',
  });

  createMainWindowWithCookies(cookies);
});
