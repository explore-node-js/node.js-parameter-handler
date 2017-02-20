let fs = require('fs'),
    deepmerge = require('deepmerge'),
    File = require('./file');

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
        let file = new File();

        let pathSource = this.resolvePath(config.source),
            pathOutput = this.resolvePath(config.output);

        let packageJsonPath = this.resolvePath(pathSource),
            packageJsonContent = fs.readFileSync(packageJsonPath);

        /** @param {{extra: {}}} content */
        let packageJson = JSON.parse(packageJsonContent),
            solvedJson = this.resolveOverwritten(config.envMap),
            completedJson = this.constructor.getMergedData(packageJson, solvedJson);

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
        let object = {};

        for (let abstractPath of Object.keys(envMapping)) {
            let envVariable = envMapping[abstractPath],
                value = this.constructor.getEnvironmentValue(envVariable);

            this.constructor.overwriteObjectFieldValue(abstractPath, value, object)
        }

        return object;
    }

    static getEnvironmentValue(index) {
        return process.env[index] || undefined;
    }

    static getMergedData(data, overwrittenData) {
        return deepmerge(data, overwrittenData);
    }

    static overwriteObjectFieldValue(abstractPath, value, object, delimiter) {
        if (undefined === value) {
            return;
        }

        delimiter = undefined !== delimiter ? delimiter : '.';

        let indexes = abstractPath.split(delimiter),
            lastPartIndex = indexes.length - 1;

        for (let i = 0; i <= lastPartIndex; i++) {
            let index = indexes[i];

            if (i === lastPartIndex) {
                object[index] = value;
                break;
            }

            if (undefined === object[index]) {
                object[index] = {};
            }

            object = object[index];
        }
    }
};
