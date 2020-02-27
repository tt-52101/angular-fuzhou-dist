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
var wechat_management_routing_module_1 = require("./wechat-management-routing.module");
var wechat_app_config_component_1 = require("./wechat-app-configs/wechat-app-config.component");
var create_or_edit_wechat_app_config_component_1 = require("./wechat-app-configs/create-or-edit-wechat-app-config/create-or-edit-wechat-app-config.component");
var abp_module_1 = require("abp-ng2-module/dist/src/abp.module");
var shared_module_1 = require("@shared/shared.module");
var create_or_edit_wechat_menu_component_1 = require("./create-or-edit-wechat-menu/create-or-edit-wechat-menu.component");
var edit_menu_view_component_1 = require("./create-or-edit-wechat-menu/edit-menu-view/edit-menu-view.component");
var wechat_menu_button_component_1 = require("./components/wechat-menu-button/wechat-menu-button.component");
var edit_menu_config_component_1 = require("./create-or-edit-wechat-menu/edit-menu-config/edit-menu-config.component");
var edit_menu_conditional_component_1 = require("./create-or-edit-wechat-menu/edit-menu-conditional/edit-menu-conditional.component");
var wechat_material_management_component_1 = require("./wechat-material-management/wechat-material-management.component");
var create_or_edit_img_text_material_component_1 = require("./wechat-material-management/create-or-edit-img-text-material/create-or-edit-img-text-material.component");
var create_image_material_component_1 = require("./wechat-material-management/create-image-material/create-image-material.component");
var create_voice_material_component_1 = require("./wechat-material-management/create-voice-material/create-voice-material.component");
var create_video_material_component_1 = require("./wechat-material-management/create-video-material/create-video-material.component");
var wechat_material_img_text_view_component_1 = require("./wechat-material-management/wechat-material-img-text-view/wechat-material-img-text-view.component");
var wechat_material_img_view_component_1 = require("./wechat-material-management/wechat-material-img-view/wechat-material-img-view.component");
var wechat_material_voice_view_component_1 = require("./wechat-material-management/wechat-material-voice-view/wechat-material-voice-view.component");
var wechat_material_video_view_component_1 = require("./wechat-material-management/wechat-material-video-view/wechat-material-video-view.component");
var WechatManagementModule = /** @class */ (function () {
    function WechatManagementModule() {
    }
    WechatManagementModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                wechat_management_routing_module_1.WechatManagementRoutingModule,
                shared_module_1.SharedModule,
                abp_module_1.AbpModule,
            ],
            declarations: [
                wechat_app_config_component_1.WechatAppConfigComponent,
                create_or_edit_wechat_app_config_component_1.CreateOrEditWechatAppConfigComponent,
                create_or_edit_wechat_menu_component_1.CreateOrEditWechatMenuComponent,
                wechat_menu_button_component_1.WechatMenuButtonComponent,
                edit_menu_view_component_1.EditMenuViewComponent,
                edit_menu_config_component_1.EditMenuConfigComponent,
                edit_menu_conditional_component_1.EditMenuConditionalComponent,
                wechat_material_management_component_1.WechatMaterialManagementComponent,
                create_or_edit_img_text_material_component_1.CreateOrEditImgTextMaterialComponent,
                create_image_material_component_1.CreateImageMaterialComponent,
                create_voice_material_component_1.CreateVoiceMaterialComponent,
                create_video_material_component_1.CreateVideoMaterialComponent,
                wechat_material_img_text_view_component_1.WechatMaterialImgTextViewComponent,
                wechat_material_img_view_component_1.WechatMaterialImgViewComponent,
                wechat_material_voice_view_component_1.WechatMaterialVoiceViewComponent,
                wechat_material_video_view_component_1.WechatMaterialVideoViewComponent,
            ],
            entryComponents: [
                create_or_edit_wechat_app_config_component_1.CreateOrEditWechatAppConfigComponent,
                create_image_material_component_1.CreateImageMaterialComponent,
                create_voice_material_component_1.CreateVoiceMaterialComponent,
                create_video_material_component_1.CreateVideoMaterialComponent,
            ],
            providers: []
        })
    ], WechatManagementModule);
    return WechatManagementModule;
}());
exports.WechatManagementModule = WechatManagementModule;
