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
var system_routing_module_1 = require("./system-routing.module");
var check_record_component_1 = require("./check-record.component");
var create_or_edit_check_record_component_1 = require("./create-or-edit-check-record/create-or-edit-check-record.component");
var SystemModule = /** @class */ (function () {
    function SystemModule() {
    }
    SystemModule = __decorate([
        core_1.NgModule({
            declarations: [
                check_record_component_1.CheckRecordComponent,
                create_or_edit_check_record_component_1.CreateOrEditCheckRecordComponent,
            ],
            imports: [
                common_1.CommonModule,
                system_routing_module_1.SystemRoutingModule,
                shared_module_1.SharedModule,
            ],
            entryComponents: [
                create_or_edit_check_record_component_1.CreateOrEditCheckRecordComponent
            ]
        })
    ], SystemModule);
    return SystemModule;
}());
exports.SystemModule = SystemModule;
//system 
//System
