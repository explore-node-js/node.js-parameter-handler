const fs = require('fs');
const deepmerge = require('deepmerge');
const File = require('./file');
const chalk = require('chalk');
const overwriteFieldValue = require('node-object-field-resolver');

module.exports = class Processor {
    constructor(config, cwd) {
        this.config = config;
        this.cwd = cwd;
    }

    process() {
        this.files = [];
        console.log(chalk.yellow(`>>> PROCESSING FILES`));

        this.config.forEach((config) => {
            let file = this.processFile(config);

            this.files.push(file);
            console.log(chalk.yellow(`>>>>> ${file.getSourcePath()}`));
        })
    }

    write() {
        console.log(chalk.green(`>>> WRITING FILES`));

        this.files.forEach(file => {
            console.log(chalk.green(`>>>>> ${file.getOutputPath()}`));

            fs.writeFile(
                file.getOutputPath(),
                JSON.stringify(file.getContent(), null, 2),
                { encoding: 'UTF-8'},
                (e) => { console.log(chalk.red(` >>>>> error ${e}`)); }
            );
        });
    }

    /**
     * @param {{envMap: {}, source: string, output: string}} config
     *
     * @returns {File}
     */
    processFile({source, output, envMap, skipUndefined}) {
        const file = new File();

        const pathSource = this.resolvePath(source);
        const pathOutput = this.resolvePath(output);

        const packageJsonPath = this.resolvePath(pathSource);
        const packageJsonContent = fs.readFileSync(packageJsonPath);

        /** @param {{extra: {}}} content */
        const packageJson = JSON.parse(packageJsonContent);
        const solvedJson = Processor.resolveOverwritten(envMap, skipUndefined);
        const completedJson = deepmerge(packageJson, solvedJson);

        file.setSourcePath(pathSource)
            .setOutputPath(pathOutput)
            .setContent(completedJson);

        return file;
    }

    /**
     * @param {string} path
     */
    resolvePath(path) {
        if ('/' === path.charAt(0)) {
            return path;
        }

        return `${this.cwd}/${path}`;
    }

    static resolveOverwritten(envMap, skipUndefined) {
        const obj = {};

        Object.keys(envMap).forEach((abstractPath) => {
            const envVariable = envMap[abstractPath];
            const value = Processor.getEnvironmentValue(envVariable);

            (undefined !== value || !skipUndefined) && overwriteFieldValue(abstractPath, value, obj);
        });

        return obj;
    }

    static getEnvironmentValue(i) {
        return process.env[i] || undefined;
    }
};
