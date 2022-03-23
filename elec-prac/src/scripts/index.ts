import jquery from 'jquery'
import base from './renderer'
import RenderUtil from './util/render-util'

import '../css/index.scss'
require('materialize-css/dist/js/materialize.min')
require('trix')

import trix from './trix/trix'

jquery(() => {
    base()
    trix()
})

export const $ = jquery
export const _ = RenderUtil