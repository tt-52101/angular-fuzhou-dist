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
var travel_management_routing_module_1 = require("./travel-management-routing.module");
var travel_agency_component_1 = require("./travel-agency.component");
var recharge_record_component_1 = require("./recharge-record.component");
var travel_ticket_detail_component_1 = require("./travel-ticket-detail.component");
var create_or_edit_travel_agency_component_1 = require("./create-or-edit-travel-agency/create-or-edit-travel-agency.component");
var create_or_edit_recharge_record_component_1 = require("./create-or-edit-recharge-record/create-or-edit-recharge-record.component");
var create_or_edit_travel_ticket_detail_component_1 = require("./create-or-edit-travel-ticket-detail/create-or-edit-travel-ticket-detail.component");
var TravelManagementModule = /** @class */ (function () {
    function TravelManagementModule() {
    }
    TravelManagementModule = __decorate([
        core_1.NgModule({
            declarations: [
                travel_agency_component_1.TravelAgencyComponent,
                create_or_edit_travel_agency_component_1.CreateOrEditTravelAgencyComponent,
                recharge_record_component_1.RechargeRecordComponent,
                create_or_edit_recharge_record_component_1.CreateOrEditRechargeRecordComponent,
                travel_ticket_detail_component_1.TravelTicketDetailComponent,
                create_or_edit_travel_ticket_detail_component_1.CreateOrEditTravelTicketDetailComponent,
            ],
            imports: [
                common_1.CommonModule,
                travel_management_routing_module_1.TravelManagementRoutingModule,
                shared_module_1.SharedModule,
            ],
            entryComponents: [
                create_or_edit_travel_agency_component_1.CreateOrEditTravelAgencyComponent,
                create_or_edit_recharge_record_component_1.CreateOrEditRechargeRecordComponent,
                create_or_edit_travel_ticket_detail_component_1.CreateOrEditTravelTicketDetailComponent,
            ]
        })
    ], TravelManagementModule);
    return TravelManagementModule;
}());
exports.TravelManagementModule = TravelManagementModule;
