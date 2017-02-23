# node.js parameter handler
node.js parameter handler [config builder]

## how to install
```
$ npm install node-parameter-handler
```
## how to execute
```
$ node node_modules/node-parameter-handler
```
## how to execute tests
```
$ npm test
```
execute test and get coverage:
```
$ npm test -- --coverage
```

## how to use
include configs into root package.json into 'extra' node

obverve below sample of package.json

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
