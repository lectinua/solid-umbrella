import {ipcRenderer} from 'electron'
import {writeFile, readFile} from 'fs'

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

    static write(filepath: string, value: string, callback: (error: Error | null) => void) {
        writeFile(filepath, value, 'utf-8', err => {
            if (err) console.error(err)
            callback(err)
        })
    }

    static read(filepath: string, callback: (error: Error | null, data: string) => void) {
        readFile(filepath, 'utf-8', (err, data) => {
            if (err) console.error(err)
            callback(err, data)
        })
    }
}