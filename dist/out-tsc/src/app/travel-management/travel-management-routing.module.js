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
var travel_agency_component_1 = require("./travel-agency.component");
var recharge_record_component_1 = require("./recharge-record.component");
var travel_ticket_detail_component_1 = require("./travel-ticket-detail.component");
var routes = [{
        path: '',
        children: [
            { path: 'travel-agency', component: travel_agency_component_1.TravelAgencyComponent, data: { title: '旅行社信息管理' } },
            { path: 'recharge-record', component: recharge_record_component_1.RechargeRecordComponent, data: { title: '旅行社充值管理' } },
            { path: 'travel-ticket-detail', component: travel_ticket_detail_component_1.TravelTicketDetailComponent, data: { title: '旅行社购票明细' } },
        ]
    },];
var TravelManagementRoutingModule = /** @class */ (function () {
    function TravelManagementRoutingModule() {
    }
    TravelManagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], TravelManagementRoutingModule);
    return TravelManagementRoutingModule;
}());
exports.TravelManagementRoutingModule = TravelManagementRoutingModule;
