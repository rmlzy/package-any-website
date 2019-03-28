const {prompt} = require('enquirer');
const shell = require('shelljs');
const jsonfile = require('jsonfile');
const uuidv1 = require('uuid/v1');

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
        const uuid = uuidv1();

        const macParams = platform.includes('mac') ? '--mac' : '';
        const linuxParams = platform.includes('windows') ? '--win' : '';
        const winParams = platform.includes('linux') ? '--linux' : '';
        if (platform.length === 0) {
            shell.echo('Choose at least one platform!');
            shell.exit(1);
        }

        try {
            const builderConfigPath = './config/builder.json';
            const builder = jsonfile.readFileSync(builderConfigPath);
            builder.productName = name;
            builder.appId = `com.example.${uuid}`;
            jsonfile.writeFileSync(builderConfigPath, builder, { spaces: 4 });

            const pkgPath = './package.json';
            const pkg = jsonfile.readFileSync(pkgPath);
            pkg.name = uuid;
            jsonfile.writeFileSync(pkgPath, pkg, { spaces: 4 });

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
        shell.exec(`electron-builder --ia32 ${macParams} ${linuxParams} ${winParams} --config ./config/builder.json --version=false`)
    });
