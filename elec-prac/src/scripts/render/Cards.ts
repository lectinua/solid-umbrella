import {BaseElement} from '../util/base-element'

export class CardPanel extends BaseElement {
    draw(root: HTMLElement): void {

        const value = root.innerHTML
        root.innerHTML = ''

        const div = document.createElement('div')
        div.classList.add('card-panel', 'grey', 'darken-2')

        const span = document.createElement('span')
        span.classList.add('white-text')
        span.innerHTML = value

        div.appendChild(span)
        root.appendChild(div)
    }
}

