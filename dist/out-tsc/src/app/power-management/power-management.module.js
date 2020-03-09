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
var power_management_routing_module_1 = require("./power-management-routing.module");
var menu_component_1 = require("./menu/menu.component");
var create_or_edit_menu_component_1 = require("./menu/create-or-edit-menu/create-or-edit-menu.component");
var power_component_1 = require("./power/power.component");
var create_or_edit_power_component_1 = require("./power/create-or-edit-power/create-or-edit-power.component");
var batch_create_power_component_1 = require("./power/batch-create-power/batch-create-power.component");
// import { PowerRoleComponent } from './power-role/power-role.component';
// import { CreateOrEditPowerRoleComponent } from './power-role/create-or-edit-power-role/create-or-edit-power-role.component';
var shared_module_1 = require("@shared/shared.module");
var PowerManagementModule = /** @class */ (function () {
    function PowerManagementModule() {
    }
    PowerManagementModule = __decorate([
        core_1.NgModule({
            declarations: [
                menu_component_1.MenuComponent,
                create_or_edit_menu_component_1.CreateOrEditMenuComponent,
                power_component_1.PowerComponent,
                create_or_edit_power_component_1.CreateOrEditPowerComponent,
                batch_create_power_component_1.BatchCreatePowerComponent,
            ],
            imports: [
                common_1.CommonModule,
                power_management_routing_module_1.PowerManagementRoutingModule,
                shared_module_1.SharedModule,
            ],
            entryComponents: [
                create_or_edit_menu_component_1.CreateOrEditMenuComponent,
                create_or_edit_power_component_1.CreateOrEditPowerComponent,
                batch_create_power_component_1.BatchCreatePowerComponent,
            ]
        })
    ], PowerManagementModule);
    return PowerManagementModule;
}());
exports.PowerManagementModule = PowerManagementModule;
