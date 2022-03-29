import {ipcRenderer} from 'electron'
import {writeFile, readFile} from 'fs'
import clipboard from 'clipboardy'

export default class RenderUtil {
    static call(channel: string, payload?: any, callback?: (payload: any) => void) {
        ipcRenderer.send(channel, payload)
        ipcRenderer.once(channel, (evt, payload) => {
            if (callback) {
                callback(payload)
            }
        })
    }

    static $click(callback: () => void, ...$objs: JQuery[]) {
        $objs.forEach($obj => $obj.bind('click', callback))
    }

    static $enter(callback: () => void, ...$objs: JQuery[]) {
        $objs.forEach($obj => {
            $obj.bind('keydown', e => {
                if (e.key === 'Enter')
                    callback()
            })
        })
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

    static copy(value: string) {
        clipboard.writeSync(value)
    }

    static paste(): string {
        return clipboard.readSync()
    }
}