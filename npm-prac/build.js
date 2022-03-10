// noinspection JSUnresolvedFunction
// ref: https://webpack.js.org/api/stats/
// ora 최신 버전은 require 미지원

const Shell = require('shelljs');
const Ora = require('ora');
const Webpack = require('webpack');
const Conf = require('./webpack.config');
const Notifier = require('node-notifier');
const Path = require("path");
const OpenUrl = require('openurl');

function padZero(value, length) {
    const len = length - value.toString().length;
    let s = '', i = 0;
    while (i++ < len) { s += '0'};
    return s + value.toString();
}

function getCurrDate() {
    const today = new Date();
    return `${today.getFullYear()}.${padZero(today.getMonth(), 2)}.${padZero(today.getDay(), 2)} ${padZero(today.getHours(), 2)}:${padZero(today.getMinutes(), 2)}:${padZero(today.getSeconds(), 2)}`;
}

const spinner = Ora({
    text: `build start [ ${getCurrDate()} ]\n`,
    color: 'magenta',
    // isSilent: true
}).start();

Shell.rm('-rf', 'dist/*');

Webpack(Conf,  function(err, stats) {
    if (err || stats.hasErrors()) {
        spinner.stop();
        console.error(err || stats.compilation.errors);
        spinner.fail(`build failed [ ${getCurrDate()} ]`);
        return;
    }

    const htmlWebpackPlugin = Conf.plugins.find(plugin => plugin.constructor.name == 'HtmlWebpackPlugin');
    let openUrl = undefined;
    if (htmlWebpackPlugin != null) {
        openUrl = Path.resolve(__dirname, 'dist', htmlWebpackPlugin.userOptions.filename.toString());
    }

    const {assets} = stats.toJson();
    spinner.succeed(`build completed [ ${getCurrDate()} ]`);

    let names = assets.map(asset => asset.name).join(', ');
    const message = `total: ${assets.length} files ( ${names} )`;

    console.log(message);
    Notifier.notify({
        title: 'Build completed',
        message: message,
        timeout: 3,
        sound: false,
        // icon: 'Terminal Icon' // options: png & smaller than 1024x1024 & less than 200kb & absolute path
    }, (err, res) => {
        if (res == 'activate') {
            OpenUrl.open(openUrl, () => {
                console.log(`open: ${openUrl}`);
            });
        }
    });
});