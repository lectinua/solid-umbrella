import _ from './utility'

type Reference = () => any
type OnChangeCallback = (prev: any, curr: any) => void
interface Observable {
    index: number
    ref: Reference
    onChange: OnChangeCallback
    prev_value: any
}

export default class Observer {
    lastIndex: number = 0
    map: Observable[] = []

    constructor(...args: { ref: Reference, onChange: OnChangeCallback }[]) {
        args.forEach(arg => this.add(arg.ref, arg.onChange))
        setInterval(this.process, 100, this)
    }

    add(ref: Reference, onChange: OnChangeCallback) {
        if (ref !== undefined && typeof ref === 'function' &&
            onChange !== undefined && typeof onChange == 'function') {
            const index = this.lastIndex
            this.lastIndex = index + 1
            this.map.push({
                index: index,
                ref: ref,
                onChange: onChange,
                prev_value: ref()
            })
            return index
        } else {
            throw TypeError()
        }
    }

    remove(index: number) {
        this.map = this.map.filter(item => item.index == index)
    }

    process(_this: Observer) {
        if (_this.map.length > 0)
            _.each(_this.map, _this.observe)
    }

    observe(item: Observable) {
        const curr_value = item.ref()
        if (curr_value != item.prev_value) {
            console.log('changed:', item.prev_value, '>>', curr_value)
            item.onChange(item.prev_value, curr_value)
            item.prev_value = curr_value
        }
    }
}