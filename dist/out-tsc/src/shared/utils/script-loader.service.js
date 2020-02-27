"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 加载第三方脚本的service
var ScriptLoaderService = /** @class */ (function () {
    function ScriptLoaderService() {
        this.scripts = {};
    }
    ScriptLoaderService.prototype.load = function () {
        var _this = this;
        var scripts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            scripts[_i] = arguments[_i];
        }
        this.scripts = scripts;
        var promises = [];
        scripts.forEach(function (script) { return promises.push(_this.loadScript(script)); });
        return Promise.all(promises);
    };
    ScriptLoaderService.prototype.loadScript = function (name) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = name;
            if (script.readyState) { //IE
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        resolve({ script: name, loaded: true, status: 'Loaded' });
                    }
                };
            }
            else { //Others
                script.onload = function () {
                    resolve({ script: name, loaded: true, status: 'Loaded' });
                };
            }
            script.onerror = function (error) { return resolve({ script: name, loaded: false, status: 'Loaded' }); };
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    };
    return ScriptLoaderService;
}());
exports.ScriptLoaderService = ScriptLoaderService;
