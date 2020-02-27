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
var auth_route_guard_1 = require("@shared/auth/auth-route-guard");
var layout_default_component_1 = require("@layout/default/layout-default.component");
var routes = [{
        path: '',
        component: layout_default_component_1.LayoutDefaultComponent,
        canActivate: [auth_route_guard_1.AppRouteGuard],
        canActivateChild: [auth_route_guard_1.AppRouteGuard],
        children: [{
                path: 'main',
                loadChildren: 'app/main/main.module#MainModule',
                data: { preload: true }
            },
            {
                path: 'ticket-logic',
                loadChildren: 'app/ticket-logic/ticket-logic.module#TicketLogicModule',
                data: { preload: true }
            },
            {
                path: 'sell-management',
                loadChildren: 'app/sell-management/sell-management.module#SellManagementModule',
                data: { preload: true }
            },
            {
                path: 'boat-basic',
                loadChildren: 'app/boat-basic/boat-basic.module#BoatBasicModule',
                data: { preload: true }
            },
            {
                path: 'report',
                loadChildren: 'app/report/report.module#ReportModule',
                data: { preload: true }
            },
            {
                path: 'travel-management',
                loadChildren: 'app/travel-management/travel-management.module#TravelManagementModule',
                data: { preload: true }
            },
            {
                path: 'device-management',
                loadChildren: 'app/device-management/device-management.module#DeviceManagementModule',
                data: { preload: true }
            },
            {
                path: 'admin',
                loadChildren: 'app/admin/admin.module#AdminModule',
                data: { preload: true }
            },
            {
                path: 'system',
                loadChildren: 'app/system/system.module#SystemModule',
                data: { preload: true }
            },
            {
                path: 'basic-config',
                loadChildren: 'app/basic-config/basic-config.module#BasicConfigModule',
                data: { preload: true }
            },
            {
                path: 'power-management',
                loadChildren: 'app/power-management/power-management.module#PowerManagementModule',
                data: { preload: true }
            },
        ]
    }];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
