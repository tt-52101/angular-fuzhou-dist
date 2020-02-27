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
var branch_component_1 = require("./branch.component");
var branch_user_component_1 = require("./branch-user.component");
var date_dictionary_component_1 = require("./date-dictionary.component");
var pay_method_component_1 = require("./pay-method.component");
var routes = [{
        path: '',
        children: [
            { path: 'branch', component: branch_component_1.BranchComponent, data: { title: '机构管理' } },
            { path: 'branch-user', component: branch_user_component_1.BranchUserComponent, data: { title: '机构用户管理' } },
            { path: 'date-dictionary', component: date_dictionary_component_1.DateDictionaryComponent, data: { title: '数据字典' } },
            { path: 'pay-method', component: pay_method_component_1.PayMethodComponent, data: { title: '支付方式' } },
        ]
    },];
var BasicConfigRoutingModule = /** @class */ (function () {
    function BasicConfigRoutingModule() {
    }
    BasicConfigRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], BasicConfigRoutingModule);
    return BasicConfigRoutingModule;
}());
exports.BasicConfigRoutingModule = BasicConfigRoutingModule;
