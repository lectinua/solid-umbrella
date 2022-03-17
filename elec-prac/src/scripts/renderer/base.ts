import $ from 'jquery'
import _ from '../util/render-util'

export default function() {
    _.$click($('#btn-close'), () => _.call('window-close'))
}