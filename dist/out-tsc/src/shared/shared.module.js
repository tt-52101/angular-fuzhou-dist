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
var custom_components_module_1 = require("@shared/components/custom-components.module");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var abp_module_1 = require("@abp/abp.module");
var router_1 = require("@angular/router");
var app_session_service_1 = require("@shared/session/app-session.service");
var app_url_service_1 = require("@shared/nav/app-url.service");
var app_auth_service_1 = require("@shared/auth/app-auth.service");
var auth_route_guard_1 = require("@shared/auth/auth-route-guard");
// region: third libs
var ng_zorro_antd_1 = require("ng-zorro-antd");
var ngx_countdown_1 = require("ngx-countdown");
/**
 * 第三方的一些组件模块
 */
var THIRDMODULES = [
    ng_zorro_antd_1.NgZorroAntdModule,
    ngx_countdown_1.CountdownModule,
    custom_components_module_1.CustomComponentModule,
    directives_module_1.DirectivesModule,
    ng_zorro_antd_1.NzSpinModule,
    overlay_1.OverlayModule
];
var abc_1 = require("@delon/abc");
var form_1 = require("@delon/form");
var theme_1 = require("@delon/theme");
// endregion
var chart_1 = require("@delon/chart");
var acl_1 = require("@delon/acl");
var auth_1 = require("./auth");
var directives_module_1 = require("./directives/directives.module");
var utils_1 = require("./utils");
var moment_from_now_pipe_1 = require("./utils/moment-from-now.pipe");
var http_1 = require("@angular/common/http");
var loading_interceptor_1 = require("./utils/global-loading/loading.interceptor");
var overlay_1 = require("@angular/cdk/overlay");
var overlay_component_1 = require("./utils/global-loading/overlay/overlay.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [
                app_session_service_1.AppSessionService,
                app_url_service_1.AppUrlService,
                app_auth_service_1.AppAuthService,
                auth_route_guard_1.AppRouteGuard,
                utils_1.FileDownloadService,
                utils_1.TreeDataHelperService,
                utils_1.ArrayToTreeConverterService,
                auth_1.PermissionService
            ]
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
            imports: __spreadArrays([
                common_1.CommonModule,
                abp_module_1.AbpModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                theme_1.AlainThemeModule.forChild(),
                abc_1.DelonABCModule,
                acl_1.DelonACLModule,
                chart_1.DelonChartModule,
                form_1.DelonFormModule
            ], THIRDMODULES),
            declarations: [moment_from_now_pipe_1.MomentFromNowPipe, overlay_component_1.OverlayComponent],
            exports: __spreadArrays([
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule,
                theme_1.AlainThemeModule,
                abc_1.DelonABCModule,
                acl_1.DelonACLModule,
                chart_1.DelonChartModule,
                form_1.DelonFormModule
            ], THIRDMODULES, [
                moment_from_now_pipe_1.MomentFromNowPipe
            ]),
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: loading_interceptor_1.LoadingInterceptor,
                    multi: true
                }
            ],
            entryComponents: [overlay_component_1.OverlayComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
