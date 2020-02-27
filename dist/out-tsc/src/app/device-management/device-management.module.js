"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("@shared/shared.module");
var device_management_routing_module_1 = require("./device-management-routing.module");
var device_component_1 = require("./device.component");
var gate_record_component_1 = require("./gate-record.component");
var verifiable_set_component_1 = require("./verifiable-set.component");
var create_or_edit_device_component_1 = require("./create-or-edit-device/create-or-edit-device.component");
var create_or_edit_gate_record_component_1 = require("./create-or-edit-gate-record/create-or-edit-gate-record.component");
var create_or_edit_verifiable_set_component_1 = require("./create-or-edit-verifiable-set/create-or-edit-verifiable-set.component");
var DeviceManagementModule = /** @class */ (function () {
    function DeviceManagementModule() {
    }
    DeviceManagementModule = __decorate([
        core_1.NgModule({
            declarations: [
                device_component_1.DeviceComponent,
                gate_record_component_1.GateRecordComponent,
                verifiable_set_component_1.VerifiableSetComponent,
                create_or_edit_device_component_1.CreateOrEditDeviceComponent,
                create_or_edit_gate_record_component_1.CreateOrEditGateRecordComponent,
                create_or_edit_verifiable_set_component_1.CreateOrEditVerifiableSetComponent
            ],
            imports: [
                common_1.CommonModule,
                device_management_routing_module_1.DeviceManagementRoutingModule,
                shared_module_1.SharedModule,
            ],
            entryComponents: [
                create_or_edit_device_component_1.CreateOrEditDeviceComponent,
                create_or_edit_gate_record_component_1.CreateOrEditGateRecordComponent,
                create_or_edit_verifiable_set_component_1.CreateOrEditVerifiableSetComponent,
            ]
        })
    ], DeviceManagementModule);
    return DeviceManagementModule;
}());
exports.DeviceManagementModule = DeviceManagementModule;
