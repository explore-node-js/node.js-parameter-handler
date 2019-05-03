[ci.tests-master-badge]: https://circleci.com/gh/explore-node-js/node.js-parameter-handler/tree/master.svg?style=svg
[ci.tests-master]: https://circleci.com/gh/explore-node-js/node.js-parameter-handler/tree/master
[ci.coverage-master-badge]: https://codecov.io/gh/explore-node-js/node.js-parameter-handler/branch/master/graph/badge.svg
[ci.coverage-master]: https://codecov.io/gh/explore-node-js/node.js-parameter-handler
[npm.package-badge]: https://badge.fury.io/js/node-parameter-handler.svg
[npm.package]: https://www.npmjs.com/package/node-parameter-handler

# node.js parameter handler

can be used as config builder, inspired by [@Incenteev/ParameterHandler](https://github.com/Incenteev/ParameterHandler)
useful for 'legacy' applications, if you're using [react-scripts@3](https://www.npmjs.com/package/react-scripts), consider use .env file instead, as in [this example repository](https://github.com/eugene-matvejev/battleship-game-gui-react-js)

[![build][ci.tests-master-badge]][ci.tests-master]
[![coverage][ci.coverage-master-badge]][ci.coverage-master]
[![coverage][npm.package-badge]][npm.package]

### how to install

`$ npm i node-parameter-handler` or `$ yarn add node-parameter-handler`

### software requirements

* [node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)+ or [yarn](https://yarnpkg.com/)

### used technologies

* [jest](https://facebook.github.io/jest/) - only for tests

### used services

* [circle ci](https://circleci.com/dashboard)
* [codecov](https://codecov.io/)
* [code climate](https://codeclimate.com/)
* [snyk](https://snyk.io/)

### how to execute
* `$ node_modules/.bin/node-parameter-handler`

### how to execute tests

* `$ npm test`
* to execute tests with coverage `npm test -- --coverage`

### how to use

include configs into root _package.json_ into 'extra' node

observe an example of _package.json_

```
{
    ...
    "extra": {
        "node_parameter_handler": [
            {
                "source": "tests/fixtures/settings.json.dist", # source
                "output": "var/settings1.json",                # output
                "envMap": {
                    "touched": "BASE_URL", # json path to ENV VARIABLE
                    "test.touched": "PWD",
                    "test.test.touched": "HOME"
                }
            },
            {
                "source": "tests/fixtures/settings.json.dist", # source
                "output": "var/settings2.json",                # output
                "skipUndefined": true,                         # if variable is not defined do not change
                "envMap": {
                    "touched": "BASE_URL", # json path to ENV VARIABLE
                    "test.touched": "PWD",
                    "test.test.touched": "HOME"
                }
            }
        ]
    }
}
```
