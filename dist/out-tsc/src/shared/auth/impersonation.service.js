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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var app_auth_service_1 = require("@shared/auth/app-auth.service");
var app_url_service_1 = require("@shared/nav/app-url.service");
var ImpersonationService = /** @class */ (function () {
    function ImpersonationService(_accountService, _appUrlService, _authService) {
        this._accountService = _accountService;
        this._appUrlService = _appUrlService;
        this._authService = _authService;
    }
    ImpersonationService.prototype.impersonate = function (userId, tenantId) {
        var _this = this;
        var input = new service_proxies_1.ImpersonateInput();
        input.userId = userId;
        input.tenantId = tenantId;
        this._accountService
            .impersonate(input)
            .subscribe(function (result) {
            _this._authService.logout(false);
            var targetUrl = _this._appUrlService.getAppRootUrlOfTenant(result.tenancyName) +
                '?impersonationToken=' +
                result.impersonationToken;
            if (input.tenantId) {
                targetUrl = targetUrl + '&tenantId=' + input.tenantId;
            }
            location.href = targetUrl;
        });
    };
    ImpersonationService.prototype.backToImpersonator = function () {
        var _this = this;
        this._accountService
            .backToImpersonator()
            .subscribe(function (result) {
            _this._authService.logout(false);
            var targetUrl = _this._appUrlService.getAppRootUrlOfTenant(result.tenancyName) +
                '?impersonationToken=' +
                result.impersonationToken;
            if (abp.session.impersonatorTenantId) {
                targetUrl =
                    targetUrl + '&tenantId=' + abp.session.impersonatorTenantId;
            }
            location.href = targetUrl;
        });
    };
    ImpersonationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [service_proxies_1.AccountServiceProxy,
            app_url_service_1.AppUrlService,
            app_auth_service_1.AppAuthService])
    ], ImpersonationService);
    return ImpersonationService;
}());
exports.ImpersonationService = ImpersonationService;
