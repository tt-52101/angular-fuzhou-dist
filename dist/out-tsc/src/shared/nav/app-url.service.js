"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppConsts_1 = require("abpPro/AppConsts");
var app_session_service_1 = require("@shared/session/app-session.service");
var AppUrlService = /** @class */ (function () {
    function AppUrlService(_appSessionService) {
        this._appSessionService = _appSessionService;
    }
    AppUrlService_1 = AppUrlService;
    Object.defineProperty(AppUrlService.prototype, "appRootUrl", {
        get: function () {
            if (this._appSessionService.tenant) {
                return this.getAppRootUrlOfTenant(this._appSessionService.tenant.tenancyName);
            }
            else {
                return this.getAppRootUrlOfTenant(null);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returning url ends with '/'.
     */
    AppUrlService.prototype.getAppRootUrlOfTenant = function (tenancyName) {
        var baseUrl = this.ensureEndsWith(AppConsts_1.AppConsts.appBaseUrl, '/');
        if (baseUrl.indexOf(AppUrlService_1.tenancyNamePlaceHolder) < 0) {
            return baseUrl;
        }
        if (baseUrl.indexOf(AppUrlService_1.tenancyNamePlaceHolder + '.') >= 0) {
            baseUrl = baseUrl.replace(AppUrlService_1.tenancyNamePlaceHolder + '.', AppUrlService_1.tenancyNamePlaceHolder);
            if (tenancyName) {
                tenancyName = tenancyName + '.';
            }
        }
        if (!tenancyName) {
            return baseUrl.replace(AppUrlService_1.tenancyNamePlaceHolder, '');
        }
        return baseUrl.replace(AppUrlService_1.tenancyNamePlaceHolder, tenancyName);
    };
    AppUrlService.prototype.ensureEndsWith = function (str, c) {
        if (str.charAt(str.length - 1) !== c) {
            str = str + c;
        }
        return str;
    };
    AppUrlService.prototype.removeFromEnd = function (str, c) {
        if (str.charAt(str.length - 1) === c) {
            str = str.substr(0, str.length - 1);
        }
        return str;
    };
    var AppUrlService_1;
    AppUrlService.tenancyNamePlaceHolder = '{TENANCY_NAME}';
    AppUrlService = AppUrlService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_session_service_1.AppSessionService])
    ], AppUrlService);
    return AppUrlService;
}());
exports.AppUrlService = AppUrlService;
