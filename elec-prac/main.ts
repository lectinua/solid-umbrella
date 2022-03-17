import { app, BrowserWindow } from 'electron'
import { bindEvents } from './src/scripts/event'
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
        .then(_ => {
            window.webContents.openDevTools()
            bindEvents(window)
        })

    watcher()
}

app.whenReady().then(createWindow)

