import jquery from 'jquery'
import base from './renderer'
import RenderUtil from './util/render-util'

import '../css/index.scss'
import Observer from './util/observer'
require('materialize-css/dist/js/materialize.min')

jquery(() => {
    base()
})

export const $ = jquery
export const _ = RenderUtil
export const observer: Observer = new Observer()