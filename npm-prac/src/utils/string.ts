export default class String {

    private static dateSpliter: string = '.';

    static includes(src: string, search: string) {
        return src.indexOf(search) > -1;
    }

    static padZero(value, length: number): string {
        const len = length - value.toString().length;
        let s = '', i = 0;
        while (i++ < len) { s += '0'};
        return s + value.toString();
    }

    static toDateString(d: Date, f: string = 'yyyy' + String.dateSpliter + 'mm' + String.dateSpliter +'dd') {
        return f.replace(/(yyyy|yy|mm|dd|E|hh24|hh|mi|ss|a\/p|m10i)/gi, function($1) {
            switch ($1) {
                case 'yyyy': return d.getFullYear().toString();
                case 'yy': return String.padZero(d.getFullYear() % 1000, 2);
                case 'mm': return String.padZero(d.getMonth() + 1, 2);
                case 'dd': return String.padZero(d.getDate(), 2);
                case 'hh24': return String.padZero(d.getHours(), 2);
                case 'hh': return String.padZero(d.getHours() > 12 ? d.getHours() - 12 : d.getHours(), 2);
                case 'mi': return String.padZero(d.getMinutes(), 2);
                case 'ss': return String.padZero(d.getSeconds(), 2);
                case 'a/p': return d.getHours() < 12 ? 'AM' : 'PM';
                case 'm10i': return String.padZero((Math.floor(d.getMinutes() / 10) * 10).toString(), 2);
                default: return $1;
            }
        });
    }
}