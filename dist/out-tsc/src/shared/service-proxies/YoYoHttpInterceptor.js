"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abpHttpInterceptor_1 = require("abp-ng2-module/dist/src/abpHttpInterceptor");
var YoYoHttpInterceptor = /** @class */ (function (_super) {
    __extends(YoYoHttpInterceptor, _super);
    function YoYoHttpInterceptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YoYoHttpInterceptor.prototype.addAspNetCoreCultureHeader = function (headers) {
        var cookieLangValue = abp.localization.currentLanguage.name;
        if (cookieLangValue && headers && !headers.has('.AspNetCore.Culture')) {
            headers = headers.set('.AspNetCore.Culture', cookieLangValue);
        }
        return headers;
    };
    return YoYoHttpInterceptor;
}(abpHttpInterceptor_1.AbpHttpInterceptor));
exports.YoYoHttpInterceptor = YoYoHttpInterceptor;
