import {BrowserWindow} from 'electron'
import {BaseEvent} from './define/event'

const events: BaseEvent[] = [
    new BaseEvent('window-close', window => window.close())
]
const eventNames = events.map(e => e.channel)

export function bindEvents(window: BrowserWindow) {
    events.forEach(e => { e.bind(window); console.log(e.channel) })
    new BaseEvent('get-event-names', undefined, eventNames).bind(window)
}