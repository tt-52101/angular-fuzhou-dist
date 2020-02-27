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
var basic_config_routing_module_1 = require("./basic-config-routing.module");
var branch_component_1 = require("./branch.component");
var branch_user_component_1 = require("./branch-user.component");
var date_dictionary_component_1 = require("./date-dictionary.component");
var pay_method_component_1 = require("./pay-method.component");
var create_or_edit_branch_component_1 = require("./create-or-edit-branch/create-or-edit-branch.component");
var create_or_edit_branch_user_component_1 = require("./create-or-edit-branch-user/create-or-edit-branch-user.component");
var create_or_edit_date_dictionary_component_1 = require("./create-or-edit-date-dictionary/create-or-edit-date-dictionary.component");
var create_or_edit_pay_method_component_1 = require("./create-or-edit-pay-method/create-or-edit-pay-method.component");
var BasicConfigModule = /** @class */ (function () {
    function BasicConfigModule() {
    }
    BasicConfigModule = __decorate([
        core_1.NgModule({
            declarations: [
                branch_component_1.BranchComponent,
                branch_user_component_1.BranchUserComponent,
                date_dictionary_component_1.DateDictionaryComponent,
                pay_method_component_1.PayMethodComponent,
                create_or_edit_branch_component_1.CreateOrEditBranchComponent,
                create_or_edit_branch_user_component_1.CreateOrEditBranchUserComponent,
                create_or_edit_date_dictionary_component_1.CreateOrEditDateDictionaryComponent,
                create_or_edit_pay_method_component_1.CreateOrEditPayMethodComponent,
            ],
            imports: [
                common_1.CommonModule,
                basic_config_routing_module_1.BasicConfigRoutingModule,
                shared_module_1.SharedModule,
            ],
            entryComponents: [
                create_or_edit_branch_component_1.CreateOrEditBranchComponent,
                create_or_edit_branch_user_component_1.CreateOrEditBranchUserComponent,
                create_or_edit_date_dictionary_component_1.CreateOrEditDateDictionaryComponent,
                create_or_edit_pay_method_component_1.CreateOrEditPayMethodComponent,
            ]
        })
    ], BasicConfigModule);
    return BasicConfigModule;
}());
exports.BasicConfigModule = BasicConfigModule;
