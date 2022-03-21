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

        const tab = this.attributes.getNamedItem('tab')
        const tabIndent = this.attributes.getNamedItem('tab-indent')
        let indent: number = 2
        if (tab !== null) {
            const tabCount = parseInt(tab.value)
            const regex = new RegExp(`\n${_.repeat('\t', tabCount)}`, "gi")
            if (tabIndent !== null) {
                indent = parseInt(tabIndent.value)
            }
            this.innerHTML = _.text2html(this.innerHTML.replace(regex, '\n'), indent)
        }

        this.draw(this)
    }

    abstract draw(root: HTMLElement): void
}