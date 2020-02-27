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
var boat_component_1 = require("./boat.component");
var route_component_1 = require("./route.component");
var schedule_component_1 = require("./schedule.component");
var wharf_component_1 = require("./wharf.component");
// import { ScheduleAuditComponent } from './schedule-audit.component';
var routes = [{
        path: '',
        children: [
            { path: 'boat', component: boat_component_1.BoatComponent, data: { title: '游船管理' } },
            { path: 'route', component: route_component_1.RouteComponent, data: { title: '航线管理' } },
            { path: 'schedule', component: schedule_component_1.ScheduleComponent, data: { title: '航班管理' } },
            { path: 'wharf', component: wharf_component_1.WharfComponent, data: { title: '码头管理' } },
        ]
    },];
var BoatBasicRoutingModule = /** @class */ (function () {
    function BoatBasicRoutingModule() {
    }
    BoatBasicRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], BoatBasicRoutingModule);
    return BoatBasicRoutingModule;
}());
exports.BoatBasicRoutingModule = BoatBasicRoutingModule;
