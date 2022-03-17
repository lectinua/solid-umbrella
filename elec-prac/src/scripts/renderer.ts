import { ipcRenderer } from 'electron'
import $ from 'jquery'

export function index() {
    const $btnClose = $('#btn-close')

    $btnClose.on('click', () => {
        console.log('??')
        ipcRenderer.send('window-close')
    })
}