import $ from 'jquery'
import _ from './util/render-util'
import {define} from './util/base-element'
import {CardPanel} from './render/Cards'

export default function() {
    const $close = $('#btn-close')
    _.$click($close, () => _.call('window-close'))

    define({
        'card-panel': CardPanel
    })
}