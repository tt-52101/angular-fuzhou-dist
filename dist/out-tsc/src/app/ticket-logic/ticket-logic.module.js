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
var ticket_logic_routing_module_1 = require("./ticket-logic-routing.module");
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
var create_or_edit_account_component_1 = require("./create-or-edit-account/create-or-edit-account.component");
var create_or_edit_account_detail_component_1 = require("./create-or-edit-account-detail/create-or-edit-account-detail.component");
var create_or_edit_activity_component_1 = require("./create-or-edit-activity/create-or-edit-activity.component");
var create_or_edit_activity_detail_component_1 = require("./create-or-edit-activity-detail/create-or-edit-activity-detail.component");
var create_or_edit_activity_temp_component_1 = require("./create-or-edit-activity-temp/create-or-edit-activity-temp.component");
var create_or_edit_activity_temp_detail_component_1 = require("./create-or-edit-activity-temp-detail/create-or-edit-activity-temp-detail.component");
var create_or_edit_price_audit_component_1 = require("./create-or-edit-price-audit/create-or-edit-price-audit.component");
var create_or_edit_ticket_component_1 = require("./create-or-edit-ticket/create-or-edit-ticket.component");
var create_or_edit_ticket_detail_component_1 = require("./create-or-edit-ticket-detail/create-or-edit-ticket-detail.component");
var create_or_edit_ticket_detail_history_component_1 = require("./create-or-edit-ticket-detail-history/create-or-edit-ticket-detail-history.component");
var create_or_edit_ticket_introduce_component_1 = require("./create-or-edit-ticket-introduce/create-or-edit-ticket-introduce.component");
var create_or_edit_ticket_price_component_1 = require("./create-or-edit-ticket-price/create-or-edit-ticket-price.component");
var create_or_edit_ticket_station_component_1 = require("./create-or-edit-ticket-station/create-or-edit-ticket-station.component");
var create_or_edit_ticket_station_enable_component_1 = require("./create-or-edit-ticket-station-enable/create-or-edit-ticket-station-enable.component");
var create_or_edit_ticket_user_enable_component_1 = require("./create-or-edit-ticket-user-enable/create-or-edit-ticket-user-enable.component");
var create_or_edit_scenic_spot_component_1 = require("./create-or-edit-scenic-spot/create-or-edit-scenic-spot.component");
var datezone_pipe_1 = require("../common/datezone.pipe");
var TicketLogicModule = /** @class */ (function () {
    function TicketLogicModule() {
    }
    TicketLogicModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ticket_logic_routing_module_1.TicketLogicRoutingModule,
                shared_module_1.SharedModule,
            ],
            declarations: [
                datezone_pipe_1.Datezone,
                account_component_1.AccountComponent,
                account_detail_component_1.AccountDetailComponent,
                activity_component_1.ActivityComponent,
                activity_detail_component_1.ActivityDetailComponent,
                activity_temp_component_1.ActivityTempComponent,
                activity_temp_detail_component_1.ActivityTempDetailComponent,
                price_audit_component_1.PriceAuditComponent,
                ticket_component_1.TicketComponent,
                ticket_detail_component_1.TicketDetailComponent,
                ticket_detail_history_component_1.TicketDetailHistoryComponent,
                ticket_introduce_component_1.TicketIntroduceComponent,
                ticket_price_component_1.TicketPriceComponent,
                ticket_station_component_1.TicketStationComponent,
                ticket_station_enable_component_1.TicketStationEnableComponent,
                ticket_user_enable_component_1.TicketUserEnableComponent,
                scenic_spot_component_1.ScenicSpotComponent,
                collect_component_1.CollectComponent,
                create_or_edit_account_component_1.CreateOrEditAccountComponent,
                create_or_edit_account_detail_component_1.CreateOrEditAccountDetailComponent,
                create_or_edit_activity_component_1.CreateOrEditActivityComponent,
                create_or_edit_activity_detail_component_1.CreateOrEditActivityDetailComponent,
                create_or_edit_activity_temp_component_1.CreateOrEditActivityTempComponent,
                create_or_edit_activity_temp_detail_component_1.CreateOrEditActivityTempDetailComponent,
                create_or_edit_price_audit_component_1.CreateOrEditPriceAuditComponent,
                create_or_edit_ticket_component_1.CreateOrEditTicketComponent,
                create_or_edit_ticket_detail_component_1.CreateOrEditTicketDetailComponent,
                create_or_edit_ticket_detail_history_component_1.CreateOrEditTicketDetailHistoryComponent,
                create_or_edit_ticket_introduce_component_1.CreateOrEditTicketIntroduceComponent,
                create_or_edit_ticket_price_component_1.CreateOrEditTicketPriceComponent,
                create_or_edit_ticket_station_component_1.CreateOrEditTicketStationComponent,
                create_or_edit_ticket_station_enable_component_1.CreateOrEditTicketStationEnableComponent,
                create_or_edit_ticket_user_enable_component_1.CreateOrEditTicketUserEnableComponent,
                create_or_edit_scenic_spot_component_1.CreateOrEditScenicSpotComponent,
            ],
            entryComponents: [
                create_or_edit_account_component_1.CreateOrEditAccountComponent,
                create_or_edit_account_detail_component_1.CreateOrEditAccountDetailComponent,
                create_or_edit_activity_component_1.CreateOrEditActivityComponent,
                create_or_edit_activity_detail_component_1.CreateOrEditActivityDetailComponent,
                create_or_edit_activity_temp_component_1.CreateOrEditActivityTempComponent,
                create_or_edit_activity_temp_detail_component_1.CreateOrEditActivityTempDetailComponent,
                create_or_edit_price_audit_component_1.CreateOrEditPriceAuditComponent,
                create_or_edit_ticket_component_1.CreateOrEditTicketComponent,
                create_or_edit_ticket_detail_component_1.CreateOrEditTicketDetailComponent,
                create_or_edit_ticket_detail_history_component_1.CreateOrEditTicketDetailHistoryComponent,
                create_or_edit_ticket_introduce_component_1.CreateOrEditTicketIntroduceComponent,
                create_or_edit_ticket_price_component_1.CreateOrEditTicketPriceComponent,
                create_or_edit_ticket_station_component_1.CreateOrEditTicketStationComponent,
                create_or_edit_ticket_station_enable_component_1.CreateOrEditTicketStationEnableComponent,
                create_or_edit_ticket_user_enable_component_1.CreateOrEditTicketUserEnableComponent,
                create_or_edit_scenic_spot_component_1.CreateOrEditScenicSpotComponent,
            ]
        })
    ], TicketLogicModule);
    return TicketLogicModule;
}());
exports.TicketLogicModule = TicketLogicModule;
