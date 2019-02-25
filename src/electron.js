const electron = require('electron');
const builderConfig = require('../config/builder');
const customConfig = require('../config/customConfig');
const MenuBuilder = require('./menu');

const { productName } = builderConfig;
const { appUrl } = customConfig;

const {app, BrowserWindow} = electron;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    mainWindow.setTitle(productName);
    mainWindow.loadURL(appUrl);

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
