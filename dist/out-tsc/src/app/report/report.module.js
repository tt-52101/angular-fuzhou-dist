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
var report_routing_module_1 = require("./report-routing.module");
var salerticket_component_1 = require("./salerticket/salerticket.component");
var salerdaily_component_1 = require("./salerdaily/salerdaily.component");
var paymethod_component_1 = require("./paymethod/paymethod.component");
var source_component_1 = require("./source/source.component");
var travel_component_1 = require("./travel/travel.component");
var ota_component_1 = require("./ota/ota.component");
var route_component_1 = require("./route/route.component");
var schedule_component_1 = require("./schedule/schedule.component");
var check_component_1 = require("./check/check.component");
var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        core_1.NgModule({
            declarations: [
                salerticket_component_1.SalerTicketComponent,
                salerdaily_component_1.SalerDailyComponent,
                paymethod_component_1.PayMethodComponent,
                source_component_1.SourceComponent,
                travel_component_1.TravelComponent,
                ota_component_1.OtaComponent,
                route_component_1.RouteComponent,
                schedule_component_1.ScheduleComponent,
                check_component_1.CheckComponent,
            ],
            imports: [
                common_1.CommonModule,
                report_routing_module_1.ReportRoutingModule,
                shared_module_1.SharedModule,
            ],
            entryComponents: []
        })
    ], ReportModule);
    return ReportModule;
}());
exports.ReportModule = ReportModule;
