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
var common_1 = require("@angular/common");
var root_component_1 = require("root.component");
var app_session_service_1 = require("@shared/session/app-session.service");
var AppPreBootstrap_1 = require("AppPreBootstrap");
var AppConsts_1 = require("abpPro/AppConsts");
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
var service_proxy_module_1 = require("@shared/service-proxies/service-proxy.module");
var http_1 = require("@angular/common/http");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var root_routing_module_1 = require("root-routing.module");
var shared_module_1 = require("@shared/shared.module");
var theme_1 = require("@delon/theme");
var ng_zorro_antd_2 = require("ng-zorro-antd");
var delon_module_1 = require("./delon.module");
var style_icons_auto_1 = require("./style-icons-auto");
var style_icons_1 = require("./style-icons");
var abp_module_1 = require("@abp/abp.module");
var _ = require("lodash");
var localization_service_1 = require("@shared/i18n/localization.service");
var message_extension_1 = require("@shared/helpers/message.extension");
var auth_1 = require("@shared/auth");
function appInitializerFactory(injector) {
    // 导入图标
    var iconSrv = injector.get(ng_zorro_antd_1.NzIconService);
    iconSrv.addIcon.apply(iconSrv, __spreadArrays(style_icons_auto_1.ICONS_AUTO, style_icons_1.ICONS));
    return function () {
        return new Promise(function (resolve, reject) {
            // 覆盖ABP默认通知和消息提示
            overrideAbpMessageAndNotify(injector);
            // 启动程序初始化，获取基本配置信息
            AppPreBootstrap_1.AppPreBootstrap.run(injector, function () {
                // 获取当前登陆信息
                var appSessionService = injector.get(app_session_service_1.AppSessionService);
                appSessionService.init().then(function (result) {
                    // 注册语言
                    if (shouldLoadLocale()) {
                        registerNgZorroLocales(injector);
                        registerNgAlianLocales(injector);
                        registerLocales(resolve, reject);
                    }
                    else {
                        resolve(result);
                    }
                }, function (err) {
                    // 这里获取登陆信息报错了的话，退出登陆，并刷新浏览器
                    injector.get(auth_1.AppAuthService).logout(true);
                    console.log('err');
                    reject(err);
                });
            });
        });
    };
}
exports.appInitializerFactory = appInitializerFactory;
function getRemoteServiceBaseUrl() {
    return AppConsts_1.AppConsts.remoteServiceBaseUrl;
}
exports.getRemoteServiceBaseUrl = getRemoteServiceBaseUrl;
function getCurrentLanguage() {
    return abp.localization.currentLanguage.name;
}
exports.getCurrentLanguage = getCurrentLanguage;
function getBaseHref(platformLocation) {
    var baseUrl = platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
        return baseUrl;
    }
    return '/';
}
exports.getBaseHref = getBaseHref;
/**
 * 覆盖abp自带的弹窗和通知
 * @param injector
 */
function overrideAbpMessageAndNotify(injector) {
    var nzMsgService = injector.get(ng_zorro_antd_1.NzMessageService);
    var nzNotifySerivce = injector.get(ng_zorro_antd_1.NzNotificationService);
    var nzModalService = injector.get(ng_zorro_antd_1.NzModalService);
    // 覆盖abp自带的通知和mssage
    // MessageExtension.overrideAbpMessageByMini(
    //   nzMsgService,
    //   nzModalService,
    // );
    //  覆盖abp.message替换为ng-zorro的模态框
    message_extension_1.MessageExtension.overrideAbpMessageByNgModal(nzModalService);
    //  覆盖abp.notify替换为ng-zorro的notify
    message_extension_1.MessageExtension.overrideAbpNotify(nzNotifySerivce);
}
function getDocumentOrigin() {
    if (!document.location.origin) {
        return (document.location.protocol +
            '//' +
            document.location.hostname +
            (document.location.port ? ':' + document.location.port : ''));
    }
    return document.location.origin;
}
/**
 * 注册ng-zorro的本地化
 * @param injector
 */
function registerNgZorroLocales(injector) {
    if (shouldLoadLocale()) {
        var ngZorroLcale = convertAbpLocaleToNgZorroLocale(abp.localization.currentLanguage.name);
        Promise.resolve().then(function () { return require("ng-zorro-antd/esm5/i18n/languages/" + ngZorroLcale + ".js"); }).then(function (module) {
            var nzI18nService = injector.get(ng_zorro_antd_2.NzI18nService);
            nzI18nService.setLocale(module.default);
        });
    }
}
/**
 * 注册ng-alain的本地化
 * @param injector
 */
function registerNgAlianLocales(injector) {
    if (shouldLoadLocale()) {
        var ngAlianLocale = convertAbpLocaleToNgAlianLocale(abp.localization.currentLanguage.name);
        Promise.resolve().then(function () { return require("@delon/theme/esm5/src/locale/languages/" + ngAlianLocale + ".js"); }).then(function (module) {
            var delonLocaleService = injector.get(theme_1.DelonLocaleService);
            delonLocaleService.setLocale(module.default);
        });
    }
}
/**
 * 注册angular本地化
 * @param resolve
 * @param reject
 */
function registerLocales(resolve, reject) {
    if (shouldLoadLocale()) {
        var angularLocale = convertAbpLocaleToAngularLocale(abp.localization.currentLanguage.name);
        Promise.resolve().then(function () { return require("@angular/common/locales/" + angularLocale + ".js"); }).then(function (module) {
            common_1.registerLocaleData(module.default);
            resolve(true);
        }, reject);
    }
    else {
        resolve(true);
    }
}
function shouldLoadLocale() {
    return (abp.localization.currentLanguage.name &&
        abp.localization.currentLanguage.name !== 'en-US');
}
exports.shouldLoadLocale = shouldLoadLocale;
/**
 * 后端多语言编码转 Angular 前端多语言编码
 * @param locale
 */
function convertAbpLocaleToAngularLocale(locale) {
    var defaultLocale = 'zh';
    if (!AppConsts_1.AppConsts.localeMappings) {
        return defaultLocale;
    }
    var localeMapings = _.filter(AppConsts_1.AppConsts.localeMappings, { from: locale });
    if (localeMapings && localeMapings.length) {
        return localeMapings[0]['to'];
    }
    return defaultLocale;
}
exports.convertAbpLocaleToAngularLocale = convertAbpLocaleToAngularLocale;
/**
 * 后端多语言编码转 Ng-Zorro 前端多语言编码
 * @param locale
 */
function convertAbpLocaleToNgZorroLocale(locale) {
    var defaultLocale = 'zh_CN';
    if (!AppConsts_1.AppConsts.ngZorroLocaleMappings) {
        return defaultLocale;
    }
    var localeMapings = _.filter(AppConsts_1.AppConsts.ngZorroLocaleMappings, {
        from: locale
    });
    if (localeMapings && localeMapings.length) {
        return localeMapings[0]['to'];
    }
    return defaultLocale;
}
exports.convertAbpLocaleToNgZorroLocale = convertAbpLocaleToNgZorroLocale;
/**
 * 后端多语言编码转 Ng-Alian 前端多语言编码
 * @param locale
 */
function convertAbpLocaleToNgAlianLocale(locale) {
    var defaultLocale = 'zh-CN';
    if (!AppConsts_1.AppConsts.ngAlainLocaleMappings) {
        return defaultLocale;
    }
    var localeMapings = _.filter(AppConsts_1.AppConsts.ngAlainLocaleMappings, {
        from: locale
    });
    if (localeMapings && localeMapings.length) {
        return localeMapings[0]['to'];
    }
    return defaultLocale;
}
exports.convertAbpLocaleToNgAlianLocale = convertAbpLocaleToNgAlianLocale;
var I18NSERVICE_PROVIDES = [
    // { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false }
    { provide: theme_1.ALAIN_I18N_TOKEN, useClass: localization_service_1.LocalizationService, multi: false }
];
var RootModule = /** @class */ (function () {
    function RootModule() {
    }
    RootModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                animations_1.BrowserAnimationsModule,
                platform_browser_1.BrowserModule,
                abp_module_1.AbpModule,
                // 引入DelonMdule
                delon_module_1.DelonModule.forRoot(),
                service_proxy_module_1.ServiceProxyModule,
                root_routing_module_1.RootRoutingModule,
                http_1.HttpClientModule,
                /** 导入 ng-zorro-antd 模块 **/
                ng_zorro_antd_1.NgZorroAntdModule,
                /** 必须导入 ng-zorro 才能导入此项 */
                shared_module_1.SharedModule.forRoot()
            ],
            declarations: [root_component_1.RootComponent],
            providers: [
                { provide: service_proxies_1.API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
                {
                    provide: core_2.APP_INITIALIZER,
                    useFactory: appInitializerFactory,
                    deps: [core_1.Injector, common_1.PlatformLocation],
                    multi: true
                },
                { provide: core_3.LOCALE_ID, useFactory: getCurrentLanguage },
                I18NSERVICE_PROVIDES
            ],
            bootstrap: [root_component_1.RootComponent]
        })
    ], RootModule);
    return RootModule;
}());
exports.RootModule = RootModule;
