"use strict";

const File = require('../src/file');

describe('file', () => {
    describe('::constructor', () => {
        it('fields [content|sourcePath|outputPath] should be defined', () => {
            const file = new File();

            expect(file.content).toBeDefined();
            expect(file.sourcePath).toBeDefined();
            expect(file.outputPath).toBeDefined();
        })
    });

    describe('::(get|set)Content', () => {
        it('getter should return content, what been set though setter', () => {
            const file = new File();
            const content = 'test content';

            file.setContent(content);

            expect(file.getContent()).toMatch(content);
        })
    });

    describe('::(get|set)SourcePath', () => {
        it('getter should return content, what been set though setter', () => {
            const file = new File();
            const content = 'test content';

            file.setSourcePath(content);

            expect(file.getSourcePath()).toMatch(content);
        })
    });

    describe('::(get|set)OutputPath', () => {
        it('getter should return content, what been set though setter', () => {
            const file = new File();
            const content = 'test content';

            file.setOutputPath(content);

            expect(file.getOutputPath()).toMatch(content);
        })
    });
});
