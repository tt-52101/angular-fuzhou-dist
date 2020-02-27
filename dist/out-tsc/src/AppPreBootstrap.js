"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var AppConsts_1 = require("abpPro/AppConsts");
var environment_1 = require("@env/environment");
var http_1 = require("@angular/common/http");
var _ = require("lodash");
var permission_service_1 = require("@shared/auth/permission.service");
var theme_1 = require("@delon/theme");
var AppMenus_1 = require("abpPro/AppMenus");
var UrlHelper_1 = require("@shared/helpers/UrlHelper");
var AppPreBootstrap = /** @class */ (function () {
    function AppPreBootstrap() {
    }
    AppPreBootstrap.run = function (injector, callback) {
        // console.log('由52ABP模板构建,详情请访问 https://www.52abp.com');
        var httpClient = injector.get(http_1.HttpClient);
        AppPreBootstrap.getApplicationConfig(injector, httpClient, function () {
            var queryStringObj = UrlHelper_1.UrlHelper.getQueryParameters();
            if (queryStringObj.impersonationToken) {
                // 模拟登陆
                abp.multiTenancy.setTenantIdCookie(queryStringObj.tenantId);
                AppPreBootstrap.impersonatedAuthenticate(httpClient, queryStringObj.impersonationToken, function () {
                    AppPreBootstrap.getUserConfiguration(injector, httpClient, callback);
                });
            }
            else if (queryStringObj.switchAccountToken) {
                // 切换关联账号
                abp.multiTenancy.setTenantIdCookie(queryStringObj.tenantId);
                AppPreBootstrap.linkedAccountAuthenticate(httpClient, queryStringObj.switchAccountToken, function () {
                    AppPreBootstrap.getUserConfiguration(injector, httpClient, callback);
                });
            }
            else {
                // 普通登陆直接获取信息
                AppPreBootstrap.getUserConfiguration(injector, httpClient, callback);
            }
        });
    };
    /**
     * 初始化前端配置
     * @param httpClient
     * @param callback
     */
    AppPreBootstrap.getApplicationConfig = function (injector, httpClient, callback) {
        var envName = '';
        if (environment_1.environment.production) {
            envName = 'prod';
        }
        else {
            envName = 'dev';
        }
        var url = '/assets/appconfig.' + envName + '.json';
        httpClient.get(url).subscribe(function (result) {
            AppConsts_1.AppConsts.appBaseUrl =
                window.location.protocol + '//' + window.location.host;
            AppConsts_1.AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
            AppConsts_1.AppConsts.portalBaseUrl = result.portalBaseUrl;
            AppConsts_1.AppConsts.localeMappings = result.localeMappings;
            AppConsts_1.AppConsts.ngZorroLocaleMappings = result.ngZorroLocaleMappings;
            AppConsts_1.AppConsts.ngAlainLocaleMappings = result.ngAlainLocaleMappings;
            AppConsts_1.AppConsts.momentLocaleMappings = result.momentLocaleMappings;
            callback();
        }, function (error) {
            console.log("\u521D\u59CB\u5316\u914D\u7F6E\u4FE1\u606F\u51FA\u9519,\u9519\u8BEF\u4FE1\u606F:\n\n" + error.message);
        });
    };
    /**
     * 获取后端配置
     * @param injector ioc容器
     * @param httpClient
     * @param callback 回调函数
     */
    AppPreBootstrap.getUserConfiguration = function (injector, httpClient, callback) {
        var _this = this;
        httpClient
            .get(AppConsts_1.AppConsts.remoteServiceBaseUrl + "/api/services/app/Session/GetUserConfigurations")
            .subscribe(function (response) {
            var result = response.result;
            // 填充数据
            _.merge(abp, result);
            // 时区
            abp.clock.provider = _this.getCurrentClockProvider(result.clock.provider);
            var locale = AppPreBootstrap.convertAbpLocaleToMomentLocale(abp.localization.currentLanguage.name);
            moment.locale(locale);
            window.moment.locale(locale);
            if (abp.clock.provider.supportsMultipleTimezone) {
                moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
                window.moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
            }
            // 权限
            var permissionService = injector.get(permission_service_1.PermissionService);
            permissionService.extend(abp.auth);
            // 本地化
            var localization = injector.get(theme_1.ALAIN_I18N_TOKEN);
            localization.extend(abp.localization);
            // 写入菜单
            var menuService = injector.get(theme_1.MenuService);
            menuService.add(AppMenus_1.AppMenus.Menus);
            callback();
        }, function (error) {
            // console.log(error);
            console.log("\u521D\u59CB\u5316\u7528\u6237\u4FE1\u606F\u51FA\u9519,\u9519\u8BEF\u4FE1\u606F:\n\n" + error.message);
        });
    };
    /**
     * 模拟登陆用户
     * @param httpClient
     * @param impersonationToken
     * @param callback
     */
    AppPreBootstrap.impersonatedAuthenticate = function (httpClient, impersonationToken, callback) {
        httpClient
            .post(AppConsts_1.AppConsts.remoteServiceBaseUrl + "/api/TokenAuth/ImpersonatedAuthenticate?impersonationToken=" + impersonationToken, null)
            .subscribe(function (data) {
            var result = data.result;
            abp.auth.setToken(result.accessToken);
            AppPreBootstrap.setEncryptedTokenCookie(result.encryptedAccessToken);
            location.search = '';
            callback();
        }, function (error) {
            console.log("\u6A21\u62DF\u767B\u9646\u51FA\u9519,\u9519\u8BEF\u4FE1\u606F:\n\n" + error.message);
        });
    };
    /**
     * 切换关联用户
     * @param httpClient
     * @param switchAccountToken
     * @param callback
     */
    AppPreBootstrap.linkedAccountAuthenticate = function (httpClient, switchAccountToken, callback) {
        httpClient
            .post(AppConsts_1.AppConsts.remoteServiceBaseUrl + "/api/TokenAuth/LinkedAccountAuthenticate?switchAccountToken=" + switchAccountToken, null)
            .subscribe(function (data) {
            var result = data.result;
            abp.auth.setToken(result.accessToken);
            AppPreBootstrap.setEncryptedTokenCookie(result.encryptedAccessToken);
            location.search = '';
            callback();
        }, function (error) {
            alert("\u5207\u6362\u5173\u8054\u7528\u6237\u51FA\u9519,\u9519\u8BEF\u4FE1\u606F:\n\n" + error.message);
        });
    };
    AppPreBootstrap.getCurrentClockProvider = function (currentProviderName) {
        if (currentProviderName === 'unspecifiedClockProvider') {
            return abp.timing.unspecifiedClockProvider;
        }
        if (currentProviderName === 'utcClockProvider') {
            return abp.timing.utcClockProvider;
        }
        return abp.timing.localClockProvider;
    };
    AppPreBootstrap.setEncryptedTokenCookie = function (encryptedToken) {
        abp.utils.setCookieValue(AppConsts_1.AppConsts.authorization.encrptedAuthTokenName, encryptedToken, new Date(new Date().getTime() + 365 * 86400000), // 1 year
        abp.appPath);
    };
    /**
     * 将ABP多语言转换为moment多语言
     * @param locale
     */
    AppPreBootstrap.convertAbpLocaleToMomentLocale = function (locale) {
        var defaultLocale = 'zh-CN';
        if (!AppConsts_1.AppConsts.momentLocaleMappings) {
            return defaultLocale;
        }
        var localeMapings = _.filter(AppConsts_1.AppConsts.momentLocaleMappings, {
            from: locale
        });
        if (localeMapings && localeMapings.length) {
            return localeMapings[0]['to'];
        }
        return defaultLocale;
    };
    return AppPreBootstrap;
}());
exports.AppPreBootstrap = AppPreBootstrap;
