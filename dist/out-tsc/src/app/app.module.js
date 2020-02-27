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
var app_routing_module_1 = require("@app/app-routing.module");
var shared_module_1 = require("@shared/shared.module");
var http_1 = require("@angular/common/http");
var abp_module_1 = require("@abp/abp.module");
var layout_module_1 = require("@layout/layout.module");
var auth_1 = require("@shared/auth");
var notifications_component_1 = require("./notifications/notifications.component");
var UserNotificationHelper_1 = require("@shared/helpers/UserNotificationHelper");
var app_shared_module_1 = require("./app-shared/app-shared.module");
var ngx_quill_1 = require("ngx-quill");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                layout_module_1.LayoutModule,
                shared_module_1.SharedModule,
                abp_module_1.AbpModule,
                ngx_quill_1.QuillModule.forRoot(),
                app_shared_module_1.AppSharedModule.forRoot()
            ],
            declarations: [notifications_component_1.NotificationsComponent],
            entryComponents: [],
            providers: [auth_1.ImpersonationService, UserNotificationHelper_1.UserNotificationHelper]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
