import {ipcRenderer} from 'electron'

export default class RenderUtil {
    static call(channel: string, payload?: any, callback?: (payload: any) => void) {
        ipcRenderer.send(channel, payload)
        ipcRenderer.once(channel, (evt, payload) => {
            if (callback) {
                callback(payload)
            }
        })
    }

    static $click($obj: JQuery, callback: () => void) {
        $obj.on('click', callback)
    }
}