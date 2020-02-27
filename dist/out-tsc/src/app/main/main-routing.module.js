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
var dashboard_component_1 = require("@app/main/dashboard/dashboard.component");
var about_component_1 = require("./about/about.component");
var test_component_1 = require("./test/test.component");
var routes = [
    {
        path: '',
        children: [
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent, data: { title: '运营状态' } },
            { path: 'about', component: about_component_1.AboutComponent },
            { path: 'test', component: test_component_1.TestComponent },
            {
                path: 'books',
                loadChildren: 'app/main/books/books.module#BooksModule',
                data: { preload: true }
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    }
];
var MainRoutingModule = /** @class */ (function () {
    function MainRoutingModule() {
    }
    MainRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], MainRoutingModule);
    return MainRoutingModule;
}());
exports.MainRoutingModule = MainRoutingModule;
