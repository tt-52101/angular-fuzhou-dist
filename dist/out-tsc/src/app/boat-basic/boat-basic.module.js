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
var boat_basic_routing_module_1 = require("./boat-basic-routing.module");
var boat_component_1 = require("./boat.component");
var route_component_1 = require("./route.component");
var schedule_component_1 = require("./schedule.component");
var wharf_component_1 = require("./wharf.component");
// import { ScheduleAuditComponent } from './schedule-audit.component';
var create_or_edit_boat_component_1 = require("./create-or-edit-boat/create-or-edit-boat.component");
var create_or_edit_route_component_1 = require("./create-or-edit-route/create-or-edit-route.component");
var create_or_edit_schedule_component_1 = require("./create-or-edit-schedule/create-or-edit-schedule.component");
var create_or_edit_wharf_component_1 = require("./create-or-edit-wharf/create-or-edit-wharf.component");
var BoatBasicModule = /** @class */ (function () {
    function BoatBasicModule() {
    }
    BoatBasicModule = __decorate([
        core_1.NgModule({
            declarations: [
                create_or_edit_boat_component_1.CreateOrEditBoatComponent,
                create_or_edit_route_component_1.CreateOrEditRouteComponent,
                create_or_edit_schedule_component_1.CreateOrEditScheduleComponent,
                create_or_edit_wharf_component_1.CreateOrEditWharfComponent,
                boat_component_1.BoatComponent,
                route_component_1.RouteComponent,
                schedule_component_1.ScheduleComponent,
                wharf_component_1.WharfComponent,
            ],
            imports: [
                common_1.CommonModule,
                boat_basic_routing_module_1.BoatBasicRoutingModule,
                shared_module_1.SharedModule,
            ],
            entryComponents: [
                create_or_edit_boat_component_1.CreateOrEditBoatComponent,
                create_or_edit_route_component_1.CreateOrEditRouteComponent,
                create_or_edit_schedule_component_1.CreateOrEditScheduleComponent,
                create_or_edit_wharf_component_1.CreateOrEditWharfComponent,
            ]
        })
    ], BoatBasicModule);
    return BoatBasicModule;
}());
exports.BoatBasicModule = BoatBasicModule;
