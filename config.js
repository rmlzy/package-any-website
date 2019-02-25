const electron = require('electron');
const {app, BrowserWindow} = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700
    });

    mainWindow.setTitle('南极智云');
    mainWindow.loadURL('http://ygt.uat.nanjids.com');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
