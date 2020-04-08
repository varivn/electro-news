const electron = require('electron');
const  { app, BrowserWindow } = electron;

let win;

app.on('ready', () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width:850,
        height:500
    })
    win.loadFile('index.html');
})