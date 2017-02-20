const fs = require('fs');
const deepmerge = require('deepmerge');
const File = require('./file');
const overwriteFieldValue = require('node-object-field-resolver');

module.exports = class Processor {
    constructor(config, cwd) {
        this.config = config;
        this.cwd = cwd;
    }

    process() {
        this.files = [];

        this.config.forEach(config => {
            let file = this.processFile(config);

            this.files.push(file);
        })
    }

    write() {
        this.files.forEach(file => fs.writeFile(file.getOutputPath(), JSON.stringify(file.getContent(), null, 2), 'UTF-8'));
    }

    /**
     * @param {{envMap: {}, output: string, source: string}} config
     *
     * @returns {*}
     */
    processFile(config) {
        const file = new File();

        const pathSource = this.resolvePath(config.source);
        const pathOutput = this.resolvePath(config.output);

        const packageJsonPath = this.resolvePath(pathSource);
        const packageJsonContent = fs.readFileSync(packageJsonPath);

        /** @param {{extra: {}}} content */
        const packageJson = JSON.parse(packageJsonContent);
        const solvedJson = this.resolveOverwritten(config.envMap);
        const completedJson = this.constructor.getMergedData(packageJson, solvedJson);

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

    resolveOverwritten(envMapping) {
        const object = {};

        for (const abstractPath of Object.keys(envMapping)) {
            const envVariable = envMapping[abstractPath];
            const value = this.constructor.getEnvironmentValue(envVariable);

            overwriteFieldValue(abstractPath, value, object);
        }

        return object;
    }

    static getEnvironmentValue(index) {
        return process.env[index] || undefined;
    }

    static getMergedData(data, overwrittenData) {
        return deepmerge(data, overwrittenData);
    }
};
