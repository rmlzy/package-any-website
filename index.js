const {prompt} = require('enquirer');
const shell = require('shelljs');

prompt([
    {
        type: 'input',
        name: 'name',
        message: '请输入客户端的名称:'
    },
    {
        type: 'input',
        name: 'url',
        message: '请输入网站的 URL:'
    },
    {
        type: 'select',
        multiple: true,
        name: 'platform',
        message: '请选择需要打包的平台:',
        choices: ['mac', 'windows', 'linux']
    }
])
    .then(({name, url, platform}) => {
        console.log(platform);
    });

if (!shell.which('electron-builder')) {
    shell.echo('Please run: sudo npm i -g electron-builder');
    shell.exit(1);
}
shell.rm('-rf', 'dist');
shell.exec(`electron-builder --config config.js --mac --win --linux`);
