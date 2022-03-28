import {BaseElement} from '../util/base-element'

export class CardPanel extends BaseElement {
    draw(/*root: HTMLElement = this*/): void {

        let colors = ['grey', 'darken-2']
        let textColors = ['black-text']
        const color = this.getAttribute('color')
        if (color !== null && color.length > 0) {
            colors = color.split(' ')
            const textColor = colors.filter(x => x.includes('text'))
            if (textColor !== null && textColor.length > 0) {
                textColors = textColor
            }
        }

        const value = this.innerHTML
        this.innerHTML = ''

        const div = document.createElement('div')
        div.classList.add('card-panel', ...colors)

        div.id = this.id
        this.removeAttribute('id')

        const span = document.createElement('span')
        span.classList.add(...textColors)
        span.innerHTML = value

        div.appendChild(span)
        this.replaceWith(div)
    }
}

