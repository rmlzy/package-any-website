const electron = require('electron');
const builderConfig = require('../config/builder');
const customConfig = require('../config/customConfig');
const MenuBuilder = require('./menu');

const {productName} = builderConfig;
const {appUrl} = customConfig;

const {app, BrowserWindow} = electron;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1250,
        height: 768,
        minHeight: 1250,
        minWidth: 768
    });

    mainWindow.setTitle(productName);
    mainWindow.loadURL(appUrl);

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
