"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("@shared/shared.module");
var header_component_1 = require("./default/header/header.component");
var sidebar_component_1 = require("./default/sidebar/sidebar.component");
var fullscreen_component_1 = require("./default/header/components/fullscreen.component");
var i18n_component_1 = require("./default/header/components/i18n.component");
var storage_component_1 = require("./default/header/components/storage.component");
var user_component_1 = require("./default/header/components/user.component");
var change_password_modal_component_1 = require("./default/profile/change-password-modal.component");
var login_attempts_modal_component_1 = require("./default/profile/login-attempts-modal.component");
var my_settings_modal_component_1 = require("./default/profile/my-settings-modal.component");
var layout_default_component_1 = require("./default/layout-default.component");
var yoyo_sidebar_nav_component_1 = require("./default/sidebar/components/yoyo-sidebar-nav.component");
var notification_settings_component_1 = require("./default/header/components/notification-settings/notification-settings.component");
var header_notifications_component_1 = require("./default/header/components/header-notifications/header-notifications.component");
var UserNotificationHelper_1 = require("@shared/helpers/UserNotificationHelper");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var common_1 = require("@angular/common");
var COMPONENTS = [
    header_component_1.HeaderComponent,
    sidebar_component_1.SidebarComponent,
    layout_default_component_1.LayoutDefaultComponent
];
var HEADERCOMPONENTS = [
    fullscreen_component_1.HeaderFullScreenComponent,
    i18n_component_1.HeaderI18nComponent,
    storage_component_1.HeaderStorageComponent,
    user_component_1.HeaderUserComponent,
    notification_settings_component_1.NotificationSettingsComponent,
    header_notifications_component_1.HeaderNotificationsComponent,
];
// passport
var ABPCOMPONENTS = [
    change_password_modal_component_1.ChangePasswordModalComponent,
    login_attempts_modal_component_1.LoginAttemptsModalComponent,
    my_settings_modal_component_1.MySettingsModalComponent,
    notification_settings_component_1.NotificationSettingsComponent,
];
//
var SIDEBARCOMPONENTS = [
    yoyo_sidebar_nav_component_1.YoYoSidebarNavComponent
];
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                ng_zorro_antd_1.NgZorroAntdModule,
            ],
            declarations: __spreadArrays(COMPONENTS, HEADERCOMPONENTS, ABPCOMPONENTS, SIDEBARCOMPONENTS),
            entryComponents: __spreadArrays(ABPCOMPONENTS),
            exports: __spreadArrays(COMPONENTS),
            providers: [
                UserNotificationHelper_1.UserNotificationHelper
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());
exports.LayoutModule = LayoutModule;
