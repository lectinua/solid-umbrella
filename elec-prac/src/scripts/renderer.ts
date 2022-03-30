import $ from 'jquery'
import _ from './util/render-util'
import {define} from './util/base-element'
import {CardPanel} from './render/Cards'

export default function() {
    _.$click(() => _.call('window-close'), $('#btn-close'))

    define({
        'card-panel': CardPanel
    })
}