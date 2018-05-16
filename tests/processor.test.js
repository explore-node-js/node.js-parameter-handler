"use strict";

const Processor = require('../src/processor');
const config = require('./fixtures/package.json').extra.node_parameter_handler;
const cwd = process.cwd();

describe('processor', () => {
    describe('::resolvePath', () => {
        const processor = new Processor(config, cwd);

        [ '/', 'test', 'test/', 'test/test', '/test/test' ].forEach((path) => {
            it(`should be converted '${path}' to absolute path`, () => {
                expect(processor.resolvePath(path)).toMatch(/^\/.*/);
            });
        });
    });

    describe('::getEnvironmentValue', () => {
        [
            { env: 'NODE_ENV', expected: 'test' },
            { env: 'NODE_ENV_NOT_EXISTS', expected: undefined },
        ].forEach(({ env, expected }) => {
            it(`should be return '${expected}' when read value of '${env}' env. variable`, () => {
                expect(Processor.getEnvironmentValue(env)).toBe(expected);
            });
        });
    });

    describe('::process', () => {
        const processor = new Processor(config, cwd);

        it(`match snapshot`, () => {
            processor.process();
            expect(processor.files).toMatchSnapshot();
        });
    });
});
