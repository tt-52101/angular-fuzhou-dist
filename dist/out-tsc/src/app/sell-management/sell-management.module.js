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
var sell_management_routing_module_1 = require("./sell-management-routing.module");
var http_1 = require("@angular/common/http");
var shared_module_1 = require("@shared/shared.module");
var abp_module_1 = require("@abp/abp.module");
var selltickets_component_1 = require("./selltickets/selltickets.component");
var create_or_edit_passenger_component_1 = require("./selltickets/create-or-edit-passenger/create-or-edit-passenger.component");
var internetticket_component_1 = require("./internetticket/internetticket.component");
var refundticket_component_1 = require("./refundticket/refundticket.component");
var controlticket_component_1 = require("./controlticket/controlticket.component");
var edit_control_component_1 = require("./controlticket/edit-control/edit-control.component");
var customer_component_1 = require("./customer/customer.component");
var create_or_edit_customer_component_1 = require("./customer/create-or-edit-customer/create-or-edit-customer.component");
var timeformat_pipe_1 = require("../common/timeformat.pipe");
var SellManagementModule = /** @class */ (function () {
    function SellManagementModule() {
    }
    SellManagementModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                sell_management_routing_module_1.SellManagementRoutingModule,
                shared_module_1.SharedModule,
                abp_module_1.AbpModule,
            ],
            declarations: [
                timeformat_pipe_1.TimeFormat,
                selltickets_component_1.SellTicketsComponent,
                create_or_edit_passenger_component_1.CreateOrEditPassengerComponent,
                edit_control_component_1.EditControlComponent,
                internetticket_component_1.InternetTicketComponent,
                refundticket_component_1.RefundTicketComponent,
                controlticket_component_1.ControlTicketComponent,
                customer_component_1.CustomerComponent,
                create_or_edit_customer_component_1.CreateOrEditCustomerComponent
            ],
            entryComponents: [
                create_or_edit_passenger_component_1.CreateOrEditPassengerComponent,
                edit_control_component_1.EditControlComponent,
                create_or_edit_customer_component_1.CreateOrEditCustomerComponent,
            ],
            providers: []
        })
    ], SellManagementModule);
    return SellManagementModule;
}());
exports.SellManagementModule = SellManagementModule;
