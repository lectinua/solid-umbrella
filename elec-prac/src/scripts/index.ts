import jquery from 'jquery'
import base from './renderer'
import RenderUtil from './util/render-util'

jquery(() => {
    base()
})

export const $ = jquery
export const _ = RenderUtil