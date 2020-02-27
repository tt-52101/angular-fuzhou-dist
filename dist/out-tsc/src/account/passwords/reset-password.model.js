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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var ResetPasswordModel = /** @class */ (function (_super) {
    __extends(ResetPasswordModel, _super);
    function ResetPasswordModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResetPasswordModel;
}(service_proxies_1.ResetPasswordInput));
exports.ResetPasswordModel = ResetPasswordModel;
