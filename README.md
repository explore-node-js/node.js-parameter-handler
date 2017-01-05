# node.js-parameter-handler
parameter handler

## how to install
```
npm install node-parameter-handler
```


## how to execute tests
```
npm test
```
with coverage
```
npm test -- --coverage
```

## how to use
include configs into root package.json into 'extra' node

obverve below sample of package.json

```
# package.json
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
