const windowManager = require('./windowManager');
const { app, ipcMain } = require('electron');
const Forge = require('DiscordForge');
const Client = new Forge.Client({ selfBot: true });
const path = require('path');
const url = require('url');
let mainWindow

app.on('ready', () => {
  mainWindow = windowManager.createWindow();

});

ipcMain.on('login', (e, username) => {
  Client.login(username).catch(console.log);
});

Client.on('ready', () => {
  let indexLoc = `file:///${path.join(__dirname, 'views/index.html')}`;
    console.log(mainWindow.webContents.getURL().split("/").join(path.sep) === indexLoc.split("/").join(path.sep))
  if (mainWindow.webContents.getURL().split("/").join(path.sep) !== indexLoc.split("/").join(path.sep)) {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    windowManager.createWindow()
  }
})
