import { app, BrowserWindow } from 'electron'
import path from 'path'

let window: BrowserWindow

function createWindow() {
    window = new BrowserWindow({
        width: 600,
        height: 500,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    })
    window.loadFile('src/index.html')
}

app.whenReady().then(createWindow)

require('electron-reloader')(module)