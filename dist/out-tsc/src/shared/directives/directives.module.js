"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var auto_focus_directive_1 = require("./auto-focus/auto-focus.directive");
var min_value_validator_directive_1 = require("./validation/min-value-validator.directive");
var password_complexity_validator_directive_1 = require("./validation/password-complexity-validator.directive");
var equal_validator_directive_1 = require("./validation/equal-validator.directive");
var expression_validator_directive_1 = require("./validation/expression-validator.directive");
var max_value_validator_directive_1 = require("./validation/max-value-validator.directive");
var ThirdDirectives = [
    auto_focus_directive_1.AutoFocusDirective,
    equal_validator_directive_1.EqualValidator,
    min_value_validator_directive_1.MinValueValidator,
    password_complexity_validator_directive_1.PasswordComplexityValidator,
    expression_validator_directive_1.ExpressionValidator,
    max_value_validator_directive_1.MaxValueValidator,
];
var DirectivesModule = /** @class */ (function () {
    /**自定义指令模块 */
    function DirectivesModule() {
    }
    DirectivesModule_1 = DirectivesModule;
    DirectivesModule.forRoot = function () {
        return { ngModule: DirectivesModule_1 };
    };
    var DirectivesModule_1;
    DirectivesModule = DirectivesModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: __spreadArrays(ThirdDirectives),
            exports: __spreadArrays(ThirdDirectives),
        })
        /**自定义指令模块 */
    ], DirectivesModule);
    return DirectivesModule;
}());
exports.DirectivesModule = DirectivesModule;
