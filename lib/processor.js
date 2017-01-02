"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _file = require("./file");

var _file2 = _interopRequireDefault(_file);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _deepmerge = require("deepmerge");

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Processor = function () {
    // config;
    // cwd;
    // files;

    function Processor(config, cwd) {
        var files = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        _classCallCheck(this, Processor);
    }

    _createClass(Processor, [{
        key: "process",
        value: function process() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.config[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var config = _step.value;

                    var file = this.processFile(config);

                    this.files.push(file);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "processFile",
        value: function processFile(config) {
            var file = new _file2.default();

            var pathSource = this.resolvePath(config.source),
                pathOutput = this.resolvePath(config.output);

            var packageJsonPath = this.resolvePath(pathSource),
                packageJsonContent = _fs2.default.readFileSync(packageJsonPath);

            /** @param {{extra: {}}} content */
            var packageJson = JSON.parse(packageJsonContent),
                solvedJson = this.resolveOverwritten(config),
                completedJson = this.constructor.getMergedData(packageJson, solvedJson);

            file.source = pathSource;
            file.output = pathOutput;
            file.contex = completedJson;

            return file;
        }

        /**
         * @param {string} path
         */

    }, {
        key: "resolvePath",
        value: function resolvePath(path) {
            if ('/' === path.charAt(0)) {
                return path;
            }

            return this.cwd + "/" + path;
        }
    }, {
        key: "resolveOverwritten",
        value: function resolveOverwritten(params) {
            var object = {};

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(params)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var abstractPath = _step2.value;

                    var envVariable = params[abstractPath],
                        value = this.constructor.getEnvironmentValue(envVariable);

                    this.constructor.overwriteObjectFieldValue(abstractPath, value, object);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }], [{
        key: "getEnvironmentValue",
        value: function getEnvironmentValue(index) {
            return process.env[index] || undefined;
        }
    }, {
        key: "getMergedData",
        value: function getMergedData(data, overwrittenData) {
            return (0, _deepmerge2.default)(data, overwrittenData);
        }
    }, {
        key: "overwriteObjectFieldValue",
        value: function overwriteObjectFieldValue(abstractPath, value, object, delimiter) {
            if (undefined === value) {
                return;
            }

            delimiter = undefined !== delimiter ? delimiter : '.';

            var indexes = abstractPath.split(delimiter),
                lastPartIndex = indexes.length - 1;

            for (var i = 0; i <= lastPartIndex; i++) {
                var index = indexes[i];

                if (i === lastPartIndex) {
                    object[index] = value;
                    break;
                }

                if (undefined === object[index]) {
                    object[index] = {};
                }

                object = object[index];
            }
        }
    }]);

    return Processor;
}();

exports.default = Processor;