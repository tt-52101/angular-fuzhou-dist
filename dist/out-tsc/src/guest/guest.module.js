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
var guest_routing_module_1 = require("guest/guest-routing.module");
var shared_module_1 = require("@shared/shared.module");
var http_1 = require("@angular/common/http");
var abp_module_1 = require("@abp/abp.module");
var guestdisplay_component_1 = require("./guestdisplay.component");
var GuestModule = /** @class */ (function () {
    function GuestModule() {
    }
    GuestModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                guest_routing_module_1.GuestRoutingModule,
                shared_module_1.SharedModule,
                abp_module_1.AbpModule,
            ],
            declarations: [guestdisplay_component_1.GuestdisplayComponent],
            entryComponents: [],
            providers: []
        })
    ], GuestModule);
    return GuestModule;
}());
exports.GuestModule = GuestModule;
