"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var device_component_1 = require("./device.component");
var gate_record_component_1 = require("./gate-record.component");
var verifiable_set_component_1 = require("./verifiable-set.component");
var routes = [{
        path: '',
        children: [
            { path: 'device', component: device_component_1.DeviceComponent, data: { title: '设备管理' } },
            { path: 'gate-record', component: gate_record_component_1.GateRecordComponent, data: { title: '闸机记录' } },
            { path: 'verifiable-set', component: verifiable_set_component_1.VerifiableSetComponent, data: { title: '可验证设置' } },
        ]
    },];
var DeviceManagementRoutingModule = /** @class */ (function () {
    function DeviceManagementRoutingModule() {
    }
    DeviceManagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], DeviceManagementRoutingModule);
    return DeviceManagementRoutingModule;
}());
exports.DeviceManagementRoutingModule = DeviceManagementRoutingModule;
