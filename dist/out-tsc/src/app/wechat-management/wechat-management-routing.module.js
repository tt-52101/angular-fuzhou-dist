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
var wechat_app_config_component_1 = require("./wechat-app-configs/wechat-app-config.component");
var create_or_edit_wechat_menu_component_1 = require("./create-or-edit-wechat-menu/create-or-edit-wechat-menu.component");
var wechat_material_management_component_1 = require("./wechat-material-management/wechat-material-management.component");
var create_or_edit_img_text_material_component_1 = require("./wechat-material-management/create-or-edit-img-text-material/create-or-edit-img-text-material.component");
var routes = [
    { path: 'wechat-app-config', component: wechat_app_config_component_1.WechatAppConfigComponent },
    { path: 'create-or-edit-wechat-menu', component: create_or_edit_wechat_menu_component_1.CreateOrEditWechatMenuComponent, data: { reuse: true } },
    { path: 'wechat-materials', component: wechat_material_management_component_1.WechatMaterialManagementComponent, data: { reuse: true } },
    { path: 'create-or-edit-img-text-material', component: create_or_edit_img_text_material_component_1.CreateOrEditImgTextMaterialComponent, data: { reuse: true } },
    {
        path: '**',
        redirectTo: 'wechat-app-configs',
    },
];
var WechatManagementRoutingModule = /** @class */ (function () {
    function WechatManagementRoutingModule() {
    }
    WechatManagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], WechatManagementRoutingModule);
    return WechatManagementRoutingModule;
}());
exports.WechatManagementRoutingModule = WechatManagementRoutingModule;
