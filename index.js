'use strict';

let fs = require('fs'),
    packageJsonPath = `${process.cwd()}/package.json`,
    packageJsonContent = fs.readFileSync(packageJsonPath),
/** @param {{extra: {node_parameter_handler: []}}} content */
    packageJson = JSON.parse(packageJsonContent),
    Processor = require('./src/processor'),
    processor = new Processor(packageJson.extra.node_parameter_handler, process.cwd());

processor.process();
processor.write();
