"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppConsts_1 = require("abpPro/AppConsts");
var app_session_service_1 = require("@shared/session/app-session.service");
var feature_checker_service_1 = require("@abp/features/feature-checker.service");
var notify_service_1 = require("@abp/notify/notify.service");
var setting_service_1 = require("@abp/settings/setting.service");
var message_service_1 = require("@abp/message/message.service");
var abp_multi_tenancy_service_1 = require("@abp/multi-tenancy/abp-multi-tenancy.service");
var theme_1 = require("@delon/theme");
var permission_service_1 = require("@shared/auth/permission.service");
var abp_session_service_1 = require("abp-ng2-module/dist/src/session/abp-session.service");
var loading_service_1 = require("@shared/utils/global-loading/loading.service");
var AppComponentBase = /** @class */ (function () {
    function AppComponentBase(injector) {
        this.localizationSourceName = AppConsts_1.AppConsts.localization.defaultLocalizationSourceName;
        /**
         * 保存状态
         */
        this.saving = false;
        this.localization = injector.get(theme_1.ALAIN_I18N_TOKEN);
        this.permission = injector.get(permission_service_1.PermissionService);
        this.feature = injector.get(feature_checker_service_1.FeatureCheckerService);
        this.notify = injector.get(notify_service_1.NotifyService);
        this.setting = injector.get(setting_service_1.SettingService);
        this.message = injector.get(message_service_1.MessageService);
        this.multiTenancy = injector.get(abp_multi_tenancy_service_1.AbpMultiTenancyService);
        this.appSession = injector.get(app_session_service_1.AppSessionService);
        this.elementRef = injector.get(core_1.ElementRef);
        this.modalHelper = injector.get(theme_1.ModalHelper);
        this.titleSrvice = injector.get(theme_1.TitleService);
        this.abpSession = injector.get(abp_session_service_1.AbpSessionService);
        this.loadingService = injector.get(loading_service_1.LoadingService);
    }
    AppComponentBase.prototype.l = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var localizedText = this.localization.localization(key, this.localizationSourceName);
        if (!localizedText) {
            localizedText = key;
        }
        if (!args || !args.length) {
            return localizedText;
        }
        return this.localization.formatString(localizedText, args);
    };
    AppComponentBase.prototype.isGranted = function (permissionName) {
        return this.permission.isGranted(permissionName);
    };
    return AppComponentBase;
}());
exports.AppComponentBase = AppComponentBase;
