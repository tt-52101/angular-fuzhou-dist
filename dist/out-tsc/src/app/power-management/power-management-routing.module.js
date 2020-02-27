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
var menu_component_1 = require("./menu/menu.component");
var power_component_1 = require("./power/power.component");
// import { PowerRoleComponent } from './power-role/power-role.component';
var routes = [
    {
        path: '',
        children: [
            { path: 'menu', component: menu_component_1.MenuComponent, data: { title: '菜单管理' } },
            { path: 'power', component: power_component_1.PowerComponent, data: { title: '权限管理' } },
        ]
    },
];
var PowerManagementRoutingModule = /** @class */ (function () {
    function PowerManagementRoutingModule() {
    }
    PowerManagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PowerManagementRoutingModule);
    return PowerManagementRoutingModule;
}());
exports.PowerManagementRoutingModule = PowerManagementRoutingModule;
