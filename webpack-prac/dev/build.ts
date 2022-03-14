import _ from '../src/util/utility'
import shelljs from "shelljs"
import webpack from 'webpack'
import notifier from 'node-notifier'

const openurl = require('openurl')
const ora = require('ora')
const config = require('../webpack.config')

const redLine = _.repeat('\x1b[31m=', 30) + '\x1b[0m'

let argv_remove = _.argv('remove')
let start: Date, end: Date

export default function build(remove: boolean = false) {
    start = new Date()
    const spinner = ora({
        text: `build start [ ${_.toDateString(start, 'yyyy.mm.dd hh24:mi:ss')} ]\n`,
        color: 'magenta',
        // isSilent: true
    }).start()

    if (remove || argv_remove === 'true') {
        shelljs.rm('-rf', 'dist/*')
    }

    webpack(config, (err: Error | undefined, stats: webpack.Stats | undefined) => {

        const assets = stats?.compilation.assets
        end = new Date()
        const interval = new Date(end.getTime() - start.getTime())

        if (assets == undefined || err || stats?.hasErrors()) {
            spinner.stop()
            console.log(redLine)
            console.error(err || stats?.compilation.errors)
            console.log(redLine)
            spinner.fail(`build failed [ ${_.toDateString(end, 'yyyy.mm.dd hh24:mi:ss')} (time ${_.toDateString(interval, 'mi:ss')}) ]`)
            return
        }

        spinner.succeed(`build completed [ ${_.toDateString(end, 'yyyy.mm.dd hh24:mi:ss')} (time ${_.toDateString(interval, 'mi:ss')}) ]`)

        const names = _.map(assets, (asset: any, name: string) => name).join(', ')
        const message = /*total: ${assets.length} */`files ( ${names} )`

        notifier.notify({
            title: 'Build completed',
            message: message,
            timeout: 3,
            sound: false
        }, (err: Error | null, res: string) => {
            if (res === 'activate') {
                openurl.open(config.output.path)
            }
        })
    })
}

build()