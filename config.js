const electron = require('electron');
const MenuBuilder = require('./menu');

const {app, BrowserWindow} = electron;
let mainWindow;

console.log(MenuBuilder);

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    mainWindow.setTitle('南极智云');
    mainWindow.loadURL('http://ygt.uat.nanjids.com');

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
