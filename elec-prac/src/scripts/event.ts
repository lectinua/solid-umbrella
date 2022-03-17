import { ipcMain, BrowserWindow } from 'electron'

export function init(window: BrowserWindow) {
    ipcMain.on('window-close', (e, payload) => {
        window.close()
        e.sender.send('window-close-r', 'test')
    })
}