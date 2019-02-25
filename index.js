const {prompt} = require('enquirer');
const shell = require('shelljs');
const jsonfile = require('jsonfile');

prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the client:'
    },
    {
        type: 'input',
        name: 'url',
        message: 'Please enter the url of the website.:'
    },
    {
        type: 'select',
        multiple: true,
        name: 'platform',
        message: 'Choose platforms that need to be packaged:',
        choices: ['mac', 'windows', 'linux']
    }
])
    .then(({name, url, platform}) => {
        const macParams = platform.includes('mac') ? '--mac' : '';
        const linuxParams = platform.includes('windows') ? '--linux' : '';
        const winParams = platform.includes('linux') ? '--win' : '';
        if (platform.length === 0) {
            shell.echo('Choose at least one platform!');
            shell.exit(1);
        }

        try {
            const builderConfigPath = './config/builder.json';
            const builder = jsonfile.readFileSync(builderConfigPath);
            builder.productName = name;
            jsonfile.writeFileSync(builderConfigPath, builder, { spaces: 4 });

            const customConfigPath = './config/customConfig.json';
            const customConfig = jsonfile.readFileSync(customConfigPath);
            customConfig.appUrl = url;
            jsonfile.writeFileSync(customConfigPath, customConfig, { spaces: 4 });
        } catch (e) {
            console.log(e);
            shell.exit(1);
        }

        shell.rm('-rf', 'dist');
        // Package use electron-builder
        shell.exec(`PACK_NAME='${name}' PACK_URL='${url}' electron-builder ${macParams} ${linuxParams} ${winParams} --config ./config/builder.json --version=false`)
    });
