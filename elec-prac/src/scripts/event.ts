import {BrowserWindow} from 'electron'
import {BaseEvent} from './util/define-event'
import _ from './util/utility'

const events: BaseEvent[] = [
    new BaseEvent('window-close', window => window.close()),
    new BaseEvent('open-page', (window, evt, payload) => {
        _.doSomething(!_.isNull(payload), () => window.loadFile(`src/html/${payload.replace(/\./gi, '/')}.html`))
    })
]
const eventNames = events.map(e => e.channel)

export function bindEvents(window: BrowserWindow) {
    events.forEach(e => e.bind(window))
    new BaseEvent('get-event-names', undefined, eventNames).bind(window)
}