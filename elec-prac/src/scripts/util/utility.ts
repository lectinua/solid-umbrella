export default class Utility {

    static padZero(value: number | string, length: number) {
        const len = length - value.toString().length
        let s = '', i = 0
        while (i++ < len) { s += '0'}
        return s + value.toString()
    }

    static toDateString(d: Date, f: string = 'yyyy.mm.dd') {
        return f.replace(/(yyyy|yy|mm|dd|E|hh24|hh|mi|ss|a\/p|m10i)/gi, function($1) {
            switch ($1) {
                case 'yyyy': return d.getFullYear().toString()
                case 'yy': return Utility.padZero(d.getFullYear() % 1000, 2)
                case 'mm': return Utility.padZero(d.getMonth() + 1, 2)
                case 'dd': return Utility.padZero(d.getDate(), 2)
                case 'hh24': return Utility.padZero(d.getHours(), 2)
                case 'hh': return Utility.padZero(d.getHours() > 12 ? d.getHours() - 12 : d.getHours(), 2)
                case 'mi': return Utility.padZero(d.getMinutes(), 2)
                case 'ss': return Utility.padZero(d.getSeconds(), 2)
                case 'a/p': return d.getHours() < 12 ? 'AM' : 'PM'
                case 'm10i': return Utility.padZero((Math.floor(d.getMinutes() / 10) * 10).toString(), 2)
                default: return $1
            }
        })
    }

    static repeat(value: string, times: number): string {
        let v = ''
        for (let i = 0; i < times; i++) {
            v += value
        }
        return v
    }

    static text2html(text: string, tabSize: number = 2): string {
        return text.trim()
            .replace(/\n/gi, '<br>')
            .replace(/\t/gi, Utility.repeat('&nbsp;', 2))
    }

    static each(array: Array<any> | Object, fn: Function): void {
        for (const k in array) {
            // @ts-ignore
            fn(array[k], k)
        }
    }

    static map(array: Array<any> | Object, fn: Function): Array<any> {
        let arr = []
        for (const k in array) {
            // @ts-ignore
            arr.push(fn(array[k], k))
        }
        return arr
    }

    static includes(array: Array<any> | Object, item: any) {
        for(const k in array) {
            // @ts-ignore
            if(array[k] == item) {
                return true;
            }
        }
        return false;
    }

    static argv(name?: string): Object | string {
        const argv = require('minimist')(process.argv.slice(2))
        if (name === undefined) {
            return argv
        }
        return argv[name]
    }

    static doSomething(trigger: boolean, action: Function) {
        if (trigger) action()
    }

    static isNull(value: any) {
        return value === undefined || value === null
    }
}