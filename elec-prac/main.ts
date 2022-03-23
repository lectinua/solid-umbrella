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
        },
        maximizable: false,
        resizable: false
    })
    window.loadFile('src/html/index.html')
        .then(_ => bindEvents(window))
        .catch(err => { if (err.code !== 'ERR_ABORTED') throw err })

    window.webContents.openDevTools()

    watcher()
}

app.whenReady().then(createWindow)

