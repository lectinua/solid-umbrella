class StringUtil {
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
                case 'yy': return StringUtil.padZero(d.getFullYear() % 1000, 2)
                case 'mm': return StringUtil.padZero(d.getMonth() + 1, 2)
                case 'dd': return StringUtil.padZero(d.getDate(), 2)
                case 'hh24': return StringUtil.padZero(d.getHours(), 2)
                case 'hh': return StringUtil.padZero(d.getHours() > 12 ? d.getHours() - 12 : d.getHours(), 2)
                case 'mi': return StringUtil.padZero(d.getMinutes(), 2)
                case 'ss': return StringUtil.padZero(d.getSeconds(), 2)
                case 'a/p': return d.getHours() < 12 ? 'AM' : 'PM'
                case 'm10i': return StringUtil.padZero((Math.floor(d.getMinutes() / 10) * 10).toString(), 2)
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
            .replace(/\t/gi, StringUtil.repeat('&nbsp;', 2))
    }
}

class ArrayUtil {
    static each(array: Array<any> | Object, fn: Function): void {
        for (const k in array) {
            fn(k)
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
}

class OtherUtil {
    static argv(name?: string): Object | string {
        const argv = require('minimist')(process.argv.slice(2))
        if (name === undefined) {
            return argv
        }
        return argv[name]
    }
}

export default Object.assign(StringUtil, ArrayUtil, OtherUtil)