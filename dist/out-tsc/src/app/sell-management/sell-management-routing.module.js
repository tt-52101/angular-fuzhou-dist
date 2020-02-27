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
var selltickets_component_1 = require("./selltickets/selltickets.component");
var internetticket_component_1 = require("./internetticket/internetticket.component");
var refundticket_component_1 = require("./refundticket/refundticket.component");
var controlticket_component_1 = require("./controlticket/controlticket.component");
var customer_component_1 = require("./customer/customer.component");
var routes = [
    {
        path: '',
        children: [
            { path: 'selltickets', component: selltickets_component_1.SellTicketsComponent, data: { title: '航班售票' } },
            { path: 'internetticket', component: internetticket_component_1.InternetTicketComponent, data: { title: '网络取票' } },
            { path: 'refundticket', component: refundticket_component_1.RefundTicketComponent, data: { title: '退票管理' } },
            { path: 'controlticket', component: controlticket_component_1.ControlTicketComponent, data: { title: '控票管理' } },
            { path: 'customer', component: customer_component_1.CustomerComponent, data: { title: '游客信息管理' } },
        ]
    }
];
var SellManagementRoutingModule = /** @class */ (function () {
    function SellManagementRoutingModule() {
    }
    SellManagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], SellManagementRoutingModule);
    return SellManagementRoutingModule;
}());
exports.SellManagementRoutingModule = SellManagementRoutingModule;
