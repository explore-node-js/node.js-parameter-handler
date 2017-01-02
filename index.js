'use strict';

let fs = require('fs');

// let packageJsonPath = `${process.cwd()}/package.json`,
let packageJsonPath = `${process.cwd()}/tests/fixtures/package.json`,
    packageJsonContent = fs.readFileSync(packageJsonPath);

/** @param {{extra: {node_parameter_handler: []}}} content */
let packageJson = JSON.parse(packageJsonContent),
    Processor = require('./src/processor'),
    processor = new Processor(packageJson.extra.node_parameter_handler, process.cwd());

processor.process();
processor.write();