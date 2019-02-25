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
        const macParams = platform.includes('mac') ? '--mac' : '';
        const linuxParams = platform.includes('windows') ? '--linux' : '';
        const winParams = platform.includes('linux') ? '--win' : '';
        if (platform.length === 0) {
            shell.echo('请至少输入一个平台!');
            shell.exit(1);
        }
        shell.exec(`PACK_NAME='${name}' PACK_URL='${url}' electron-builder ${macParams} ${linuxParams} ${winParams}`)
    });
