module.exports = class File {
    constructor() {
        this.sourcePath = '';
        this.outputPath = '';
        this.content = '';
    }

    /**
     * @returns {string}
     */
    getSourcePath() {
        return this.sourcePath;
    }

    /**
     * @param {string} path
     *
     * @returns {File}
     */
    setSourcePath(path) {
        this.sourcePath = path;

        return this;
    }

    /**
     * @returns {string}
     */
    getOutputPath() {
        return this.outputPath;
    }

    /**
     * @param {string} path
     *
     * @returns {File}
     */
    setOutputPath(path) {
        this.outputPath = path;

        return this;
    }

    /**
     * @returns {string}
     */
    getContent() {
        return this.content;
    }

    /**
     * @param {string} content
     *
     * @returns {File}
     */
    setContent(content) {
        this.content = content;

        return this;
    }
};
