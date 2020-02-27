"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./environment");
exports.environment = Object.assign({}, environment_1.environment, {
    SERVER_URL: "./",
    production: true,
    useHash: true,
    hmr: false,
});
