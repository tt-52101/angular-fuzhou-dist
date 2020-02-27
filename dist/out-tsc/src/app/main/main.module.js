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
var main_routing_module_1 = require("./main-routing.module");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var http_1 = require("@angular/common/http");
var shared_module_1 = require("@shared/shared.module");
var abp_module_1 = require("@abp/abp.module");
var about_component_1 = require("./about/about.component");
var advertising_component_1 = require("./advertising/advertising.component");
var test_component_1 = require("./test/test.component");
var create_or_edit_component_1 = require("./test/create-or-edit/create-or-edit.component");
var ngx_quill_1 = require("ngx-quill");
var MainModule = /** @class */ (function () {
    function MainModule() {
    }
    MainModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                main_routing_module_1.MainRoutingModule,
                shared_module_1.SharedModule,
                abp_module_1.AbpModule,
                ngx_quill_1.QuillModule
            ],
            declarations: [
                dashboard_component_1.DashboardComponent,
                about_component_1.AboutComponent,
                test_component_1.TestComponent,
                advertising_component_1.AdvertisingComponent,
                create_or_edit_component_1.CreateOrEditComponent
            ],
            entryComponents: [
                advertising_component_1.AdvertisingComponent,
                create_or_edit_component_1.CreateOrEditComponent
            ],
            providers: []
        })
    ], MainModule);
    return MainModule;
}());
exports.MainModule = MainModule;
