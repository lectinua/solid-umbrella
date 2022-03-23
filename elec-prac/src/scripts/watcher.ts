import electron from 'electron'
import watch from 'node-watch'
import webpack from 'webpack'

const config = require('../../webpack.config')
config.output.path = __dirname

const shell_color = {
    'green': '\x1b[32m',
    'reset': '\x1b[0m'
}

export default function() {
    watch('./src', { recursive: true, filter: /\.(js|ts|html|css|scss)$/ }, (evt, name) => {
        console.log(`${evt}: ${name}`)

        const ext = name.substring(name.lastIndexOf('.') + 1)
        if (ext === 'js' || ext === 'ts' || ext === 'css' || ext == 'scss') {
            compile()
        }
        reload()
    })
}

function compile() {
    webpack(config, (err, stats) => {
        if (stats?.compilation.assets == undefined || err || stats?.hasErrors()) {
            console.error(err || stats?.compilation.errors)
        } else {
            console.log(`compiled ${shell_color.green}successfully${shell_color.reset}`)
            reload()
        }
    })
}

function reload() {
    for (const window_ of electron.BrowserWindow.getAllWindows()) {
        window_.webContents.reloadIgnoringCache();
        for (const view_ of window_.getBrowserViews()) {
            view_.webContents.reloadIgnoringCache();
        }
    }
}