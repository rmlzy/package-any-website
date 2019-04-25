const electron = require('electron');
const builderConfig = require('../config/builder');
const customConfig = require('../config/customConfig');
const MenuBuilder = require('./menu');

const { productName } = builderConfig;
const { appUrl } = customConfig;

const { app, BrowserWindow } = electron;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1250,
        height: 768,
        minWidth: 1250,
        minHeight: 768
    });

    mainWindow.setTitle(productName);

    // 无缓存加载
    mainWindow.loadURL(appUrl, {
        "extraHeaders": "pragma: no-cache\nclientKey: a-special-key\n"
    });

    // 开启控制台
    // mainWindow.webContents.openDevTools();

    // 暂时关闭目录
    // const menuBuilder = new MenuBuilder(mainWindow);
    // menuBuilder.buildMenu();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

// 窗口全部关闭时, 杀掉进程
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
