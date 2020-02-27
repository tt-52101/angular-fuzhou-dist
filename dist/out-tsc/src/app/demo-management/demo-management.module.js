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
var abp_module_1 = require("abp-ng2-module/dist/src/abp.module");
var shared_module_1 = require("@shared/shared.module");
var ngx_simplemde_1 = require("ngx-simplemde");
var demo_management_routing_module_1 = require("./demo-management-routing.module");
var demoui_component_1 = require("./demo-ui/demoui.component");
var COMPONENTS = [];
var COMPONENTS_NOROUNT = [];
var DemoManagementModule = /** @class */ (function () {
    function DemoManagementModule() {
    }
    DemoManagementModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                demo_management_routing_module_1.DemoManagementRoutingModule,
                shared_module_1.SharedModule,
                abp_module_1.AbpModule,
                ngx_simplemde_1.SimplemdeModule.forRoot({
                    style: 'antd',
                    delay: 1,
                    options: { toolbar: ['bold', 'italic', 'heading', '|', 'quote'] }
                })
            ],
            declarations: __spreadArrays(COMPONENTS, COMPONENTS_NOROUNT, [demoui_component_1.DemoUiComponent]),
            entryComponents: COMPONENTS_NOROUNT
        })
    ], DemoManagementModule);
    return DemoManagementModule;
}());
exports.DemoManagementModule = DemoManagementModule;
