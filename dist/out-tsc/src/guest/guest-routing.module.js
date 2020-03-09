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
var guestdisplay_component_1 = require("./guestdisplay.component");
var GuestRoutingModule = /** @class */ (function () {
    function GuestRoutingModule() {
    }
    GuestRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        children: [
                            { path: 'guestdisplay', component: guestdisplay_component_1.GuestdisplayComponent, data: { title: '客显界面' } },
                        ],
                    },
                ]),
            ],
            exports: [router_1.RouterModule],
        })
    ], GuestRoutingModule);
    return GuestRoutingModule;
}());
exports.GuestRoutingModule = GuestRoutingModule;
