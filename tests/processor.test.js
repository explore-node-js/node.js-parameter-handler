"use strict";

const Processor = require('../src/processor');
const config = require('./fixtures/package.json').extra.node_parameter_handler;
const cwd = process.cwd();

describe('processor', () => {
    describe('::resolvePath', () => {
        const processor = new Processor(config, cwd);

        [ '/', 'test', 'test/', 'test/test', '/test/test' ].forEach(path => {
            it(`should be converted '${path}' to absolute path`, () => {
                expect(processor.resolvePath(path)).toMatch(/^\/.*/);
            })
        });
    })
});
