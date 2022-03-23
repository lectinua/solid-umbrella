import {BaseElement} from '../util/base-element'

export class CardPanel extends BaseElement {
    draw(root: HTMLElement): void {

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

        const value = root.innerHTML
        root.innerHTML = ''

        const div = document.createElement('div')
        div.classList.add('card-panel', ...colors)

        const span = document.createElement('span')
        span.classList.add(...textColors)
        span.innerHTML = value

        div.appendChild(span)
        root.appendChild(div)
    }
}

