// Module to create native browser window.
const { BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');

function createWindow() {
  // Create the browser window.
  let mainWindow = new BrowserWindow({ width: 800, height: 600, frame: false, icon: './assets/DiscordForge.png' });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/login.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
  return mainWindow;
}

module.exports = {
  createWindow: createWindow,
};
