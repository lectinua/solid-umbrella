import _ from '../util/utility'

interface CustomElementMap {
    [name: string]: CustomElementConstructor
}

export function define(map: CustomElementMap) {
    for (const name in map) {
        window.customElements.define(name, map[name])
    }
}

export abstract class BaseElement extends HTMLElement {
    public constructor() {
        super()

        const tab = this.getAttribute('tab')
        const tabIndent = this.getAttribute('tab-indent')
        if (tab !== null) {
            const tabCount = parseInt(tab)
            const regex = new RegExp(`\n${_.repeat('\t', tabCount)}`, "gi")
            this.innerHTML = _.text2html(this.innerHTML.replace(regex, '\n'),
                tabIndent !== null ? parseInt(tabIndent) : 2)
        }

        this.draw()
    }

    abstract draw(/*root: HTMLElement = this*/): void
}