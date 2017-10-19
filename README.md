[circle.ci-master-badge]: https://circleci.com/gh/explore-node-js/node.js-parameter-handler/tree/master.svg?style=svg
[circle.ci-master-link]: https://circleci.com/gh/explore-node-js/node.js-parameter-handler/tree/master
[codecov.io-master-badge]: https://codecov.io/gh/explore-node-js/node.js-parameter-handler/branch/master/graph/badge.svg
[codecov.io-master-link]: https://codecov.io/gh/explore-node-js/node.js-parameter-handler

|                  | master                            
|---               |---
| __tests__        |
| _< Circle CI >_  | [![build][circle.ci-master-badge]][circle.ci-master-link]
| __coverage__     |
| _< codecov.io >_ | [![coverage][codecov.io-master-badge]][codecov.io-master-link]

# node.js parameter handler
can be used as config builder, inspired by [@Incenteev/ParameterHandler](https://github.com/Incenteev/ParameterHandler)

## how to install
`$ npm install node-parameter-handler` or `$ yarn add node-parameter-handler`

## how to execute
`$ node node_modules/node-parameter-handler`

## used technologies
 * jest _[for tests only]_
 
## how to execute tests
 `npm test` or, to execute tests with coverage `npm test -- --coverage`

## how to use
include configs into root _package.json_ into 'extra' node

obverve below sample of _package.json_

```
{
    ...
    "extra": {
        "node_parameter_handler": [
            {
                "source": "tests/fixtures/settings.json.dist", # source 
                "output": "var/settings.json",                 # output
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
