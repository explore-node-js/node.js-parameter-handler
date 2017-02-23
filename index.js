'use strict';

const fs = require('fs');
const chalk = require('chalk');
const Processor = require('./src/processor');

let packageJsonPath = `${process.cwd()}/package.json`,
    packageJsonContent = fs.readFileSync(packageJsonPath),
    /** @param {{extra: {node_parameter_handler: []}}} content */
    packageJson = JSON.parse(packageJsonContent);

try {
    if (undefined === packageJson.extra) {
        throw `node 'extra' is not defined`;
    }
    if (undefined === packageJson.extra.node_parameter_handler) {
        throw `node 'node_parameter_handler' in 'extra' is not defined`;
    }
    if (!Array.isArray(packageJson.extra.node_parameter_handler)) {
        throw `node 'node_parameter_handler' in 'extra' is not array`;
    }

    const processor = new Processor(packageJson.extra.node_parameter_handler, process.cwd());

    processor.process();
    processor.write();
} catch (e) {
    console.log(chalk.red(`
        ${e}
        
        example of package.json:
        {
            ...
            "extra": {
                "node_parameter_handler": [
                    ...
                    {
                        "source": "src/parameters.json.dist",
                        "output": "src/parameters.json",
                        "envMap": {
                            "node_path": "ENV_VARIABLE"
                        }
                    }
                ]
            }            
        }
    `));
}
