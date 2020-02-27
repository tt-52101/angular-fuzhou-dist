"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var AppTenantAvailabilityState = /** @class */ (function () {
    function AppTenantAvailabilityState() {
    }
    AppTenantAvailabilityState.Available = service_proxies_1.TenantAvailabilityState.Available;
    AppTenantAvailabilityState.InActive = service_proxies_1.TenantAvailabilityState.InActive;
    AppTenantAvailabilityState.NotFound = service_proxies_1.TenantAvailabilityState.NotFound;
    return AppTenantAvailabilityState;
}());
exports.AppTenantAvailabilityState = AppTenantAvailabilityState;
var AppTimezoneScope = /** @class */ (function () {
    function AppTimezoneScope() {
    }
    AppTimezoneScope.Application = service_proxies_1.SettingScopes.Application;
    AppTimezoneScope.Tenant = service_proxies_1.SettingScopes.Tenant;
    AppTimezoneScope.User = service_proxies_1.SettingScopes.User;
    return AppTimezoneScope;
}());
exports.AppTimezoneScope = AppTimezoneScope;
/**
 * 验证码类型
 */
var AppCaptchaType = /** @class */ (function () {
    function AppCaptchaType() {
    }
    /**
     * 宿主租户注册
     */
    AppCaptchaType.HostTenantRegister = 1;
    /**
     * 宿主用户登陆
     */
    AppCaptchaType.HostUserLogin = 2;
    /**
     * 租户用户注册
     */
    AppCaptchaType.TenantUserRegister = 3;
    /**
     * 租户用户登陆
     */
    AppCaptchaType.TenantUserLogin = 4;
    return AppCaptchaType;
}());
exports.AppCaptchaType = AppCaptchaType;
var AppEditionExpireAction = /** @class */ (function () {
    function AppEditionExpireAction() {
    }
    AppEditionExpireAction.DeactiveTenant = 'DeactiveTenant';
    AppEditionExpireAction.AssignToAnotherEdition = 'AssignToAnotherEdition';
    return AppEditionExpireAction;
}());
exports.AppEditionExpireAction = AppEditionExpireAction;
/**
 * 用户通知状态
 */
var AppUserNotificationState = /** @class */ (function () {
    function AppUserNotificationState() {
    }
    /**
     * 未读
     */
    AppUserNotificationState.Unread = service_proxies_1.UserNotificationState.Unread;
    /**
     * 已读
     */
    AppUserNotificationState.Read = service_proxies_1.UserNotificationState.Read;
    return AppUserNotificationState;
}());
exports.AppUserNotificationState = AppUserNotificationState;
/**
 * 微信素材类型
 */
var WechatMaterialType = /** @class */ (function () {
    function WechatMaterialType() {
    }
    /**
     * 图片
     */
    WechatMaterialType.Image = service_proxies_1.UploadMediaFileType.Image;
    /**
     * 语音
     */
    WechatMaterialType.Voice = service_proxies_1.UploadMediaFileType.Voice;
    /**
     * 视频
     */
    WechatMaterialType.Video = service_proxies_1.UploadMediaFileType.Video;
    /**
     * 缩略图
     */
    WechatMaterialType.Thumb = service_proxies_1.UploadMediaFileType.Thumb;
    WechatMaterialType.News = service_proxies_1.UploadMediaFileType.News;
    return WechatMaterialType;
}());
exports.WechatMaterialType = WechatMaterialType;
