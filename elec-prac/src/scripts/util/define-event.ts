import {BrowserWindow, IpcMainEvent, ipcMain} from 'electron'

type eventAction = (window: BrowserWindow, evt: IpcMainEvent, payload: any) => void

export class BaseEvent {
    readonly channel: string
    readonly action?: eventAction
    readonly receive?: any
    constructor(channel: string, action?: eventAction, receive?: any) {
        this.channel = channel
        this.action = action
        this.receive = receive
    }
    bind(window: BrowserWindow) {
        ipcMain.on(this.channel, (evt, payload) => {
            if (this.action !== undefined) {
                this.action(window, evt, payload)
            }
            if (this.receive !== undefined) {
                evt.reply(this.channel, this.receive)
                // evt.sender.send(this.channel, this.receive)
            }
        })
    }
}