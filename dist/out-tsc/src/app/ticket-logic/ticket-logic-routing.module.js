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
var account_component_1 = require("./account.component");
var account_detail_component_1 = require("./account-detail.component");
var activity_component_1 = require("./activity.component");
var activity_detail_component_1 = require("./activity-detail.component");
var activity_temp_component_1 = require("./activity-temp.component");
var activity_temp_detail_component_1 = require("./activity-temp-detail.component");
var price_audit_component_1 = require("./price-audit.component");
var ticket_component_1 = require("./ticket.component");
var ticket_detail_component_1 = require("./ticket-detail.component");
var ticket_detail_history_component_1 = require("./ticket-detail-history.component");
var ticket_introduce_component_1 = require("./ticket-introduce.component");
var ticket_price_component_1 = require("./ticket-price.component");
var ticket_station_component_1 = require("./ticket-station.component");
var ticket_station_enable_component_1 = require("./ticket-station-enable.component");
var ticket_user_enable_component_1 = require("./ticket-user-enable.component");
var scenic_spot_component_1 = require("./scenic-spot.component");
var collect_component_1 = require("./collect.component");
// Collect
// collect
var routes = [{
        path: '',
        children: [
            { path: 'account', component: account_component_1.AccountComponent, data: { title: '账单管理' } },
            { path: 'account-detail', component: account_detail_component_1.AccountDetailComponent, data: { title: '结账单明细' } },
            { path: 'activity', component: activity_component_1.ActivityComponent, data: { title: '订单管理' } },
            { path: 'activity-detail', component: activity_detail_component_1.ActivityDetailComponent, data: { title: '单据明细' } },
            { path: 'activity-temp', component: activity_temp_component_1.ActivityTempComponent, data: { title: '暂存订单' } },
            { path: 'activity-temp-detail', component: activity_temp_detail_component_1.ActivityTempDetailComponent, data: { title: '暂存订单明细' } },
            { path: 'price-audit', component: price_audit_component_1.PriceAuditComponent, data: { title: '票价审核' } },
            { path: 'ticket', component: ticket_component_1.TicketComponent, data: { title: '票型管理' } },
            { path: 'ticket-detail', component: ticket_detail_component_1.TicketDetailComponent, data: { title: '票据详情' } },
            { path: 'ticket-detail-history', component: ticket_detail_history_component_1.TicketDetailHistoryComponent, data: { title: '验票记录管理' } },
            { path: 'ticket-introduce', component: ticket_introduce_component_1.TicketIntroduceComponent, data: { title: '票型介绍' } },
            { path: 'ticket-price', component: ticket_price_component_1.TicketPriceComponent, data: { title: '票种价格' } },
            { path: 'ticket-station', component: ticket_station_component_1.TicketStationComponent, data: { title: '售票站点' } },
            { path: 'ticket-station-enable', component: ticket_station_enable_component_1.TicketStationEnableComponent, data: { title: '站点可售票' } },
            { path: 'ticket-user-enable', component: ticket_user_enable_component_1.TicketUserEnableComponent, data: { title: '人员可售票' } },
            { path: 'scenic-spot', component: scenic_spot_component_1.ScenicSpotComponent, data: { title: '景区' } },
            { path: 'collect', component: collect_component_1.CollectComponent, data: { title: '财务收款' } },
        ]
    },];
var TicketLogicRoutingModule = /** @class */ (function () {
    function TicketLogicRoutingModule() {
    }
    TicketLogicRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], TicketLogicRoutingModule);
    return TicketLogicRoutingModule;
}());
exports.TicketLogicRoutingModule = TicketLogicRoutingModule;
