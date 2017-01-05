# node.js-parameter-handler
parameter handler


# how to use


```
# package.json
{
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
