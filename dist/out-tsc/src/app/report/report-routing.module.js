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
var salerticket_component_1 = require("./salerticket/salerticket.component");
var salerdaily_component_1 = require("./salerdaily/salerdaily.component");
var paymethod_component_1 = require("./paymethod/paymethod.component");
var source_component_1 = require("./source/source.component");
var travel_component_1 = require("./travel/travel.component");
var ota_component_1 = require("./ota/ota.component");
var route_component_1 = require("./route/route.component");
var schedule_component_1 = require("./schedule/schedule.component");
var check_component_1 = require("./check/check.component");
var routes = [{
        path: '',
        children: [
            { path: 'salerticket', component: salerticket_component_1.SalerTicketComponent, data: { title: '销售员售票统计' } },
            { path: 'salerdaily', component: salerdaily_component_1.SalerDailyComponent, data: { title: '销售员日结统计' } },
            { path: 'paymethod', component: paymethod_component_1.PayMethodComponent, data: { title: '支付方式统计' } },
            { path: 'source', component: source_component_1.SourceComponent, data: { title: '订单来源统计' } },
            { path: 'travel', component: travel_component_1.TravelComponent, data: { title: '旅行社售票统计' } },
            { path: 'ota', component: ota_component_1.OtaComponent, data: { title: 'OTA售票统计' } },
            { path: 'route', component: route_component_1.RouteComponent, data: { title: '航线售票统计' } },
            { path: 'schedule', component: schedule_component_1.ScheduleComponent, data: { title: '航班售票统计' } },
            { path: 'check', component: check_component_1.CheckComponent, data: { title: '航班检票统计' } },
        ]
    },];
var ReportRoutingModule = /** @class */ (function () {
    function ReportRoutingModule() {
    }
    ReportRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ReportRoutingModule);
    return ReportRoutingModule;
}());
exports.ReportRoutingModule = ReportRoutingModule;
