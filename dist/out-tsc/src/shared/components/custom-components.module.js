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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var no_data_component_1 = require("@shared/components/no-data/no-data.component");
var validation_messages_component_1 = require("./validation-messages/validation-messages.component");
var COMPONENTS = [
    no_data_component_1.NoDataComponent,
    validation_messages_component_1.ValidationMessagesComponent
];
var CustomComponentModule = /** @class */ (function () {
    /**自定义组件模块 */
    function CustomComponentModule() {
    }
    CustomComponentModule_1 = CustomComponentModule;
    CustomComponentModule.forRoot = function () {
        return { ngModule: CustomComponentModule_1 };
    };
    var CustomComponentModule_1;
    CustomComponentModule = CustomComponentModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: __spreadArrays(COMPONENTS),
            exports: __spreadArrays(COMPONENTS),
        })
        /**自定义组件模块 */
    ], CustomComponentModule);
    return CustomComponentModule;
}());
exports.CustomComponentModule = CustomComponentModule;
