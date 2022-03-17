import { app, BrowserWindow } from 'electron'
import { init } from './src/scripts/event'
import watcher from './src/scripts/watcher'

let window: BrowserWindow

function createWindow() {
    window = new BrowserWindow({
        width: 600,
        height: 500,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    window.loadFile('src/index.html')
        .then(_ => window.webContents.openDevTools())

    init(window)
    watcher()
}

app.whenReady().then(createWindow)

