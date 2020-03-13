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
var abp_multi_tenancy_service_1 = require("@abp/multi-tenancy/abp-multi-tenancy.service");
var AppSessionService = /** @class */ (function () {
    function AppSessionService(_sessionService, _abpMultiTenancyService) {
        this._sessionService = _sessionService;
        this._abpMultiTenancyService = _abpMultiTenancyService;
    }
    Object.defineProperty(AppSessionService.prototype, "application", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSessionService.prototype, "user", {
        get: function () {
            // console.log(this._user)
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSessionService.prototype, "userId", {
        get: function () {
            return this.user ? this.user.id : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSessionService.prototype, "tenant", {
        get: function () {
            return this._tenant;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppSessionService.prototype, "tenantId", {
        get: function () {
            return this.tenant ? this.tenant.id : null;
        },
        enumerable: true,
        configurable: true
    });
    AppSessionService.prototype.getShownLoginName = function () {
        var userName = this._user.userName;
        if (!this._abpMultiTenancyService.isEnabled) {
            return userName;
        }
        return (this._tenant ? this._tenant.tenancyName + '\\' : '') + userName;
    };
    AppSessionService.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._sessionService.getCurrentLoginInformations()
                .toPromise()
                .then(function (result) {
                // console.log(result)
                _this._application = result.application;
                _this._user = result.user;
                _this._tenant = result.tenant;
                resolve(true);
            }, function (err) {
                // console.log(err)
                reject(err);
            });
        });
        // this._sessionService.getCurrentLoginInformations()
        // .toPromise()
        // .then(
        //   (result: GetCurrentLoginInformationsOutput) => {
        //     console.log(result)
        //     this._application = result.application;
        //     this._user = result.user;
        //     this._tenant = result.tenant;
        //   },
        //   err => {
        //     console.log(err)
        //   },
        //   );
    };
    AppSessionService.prototype.changeTenantIfNeeded = function (tenantId) {
        if (this.isCurrentTenant(tenantId)) {
            return false;
        }
        abp.multiTenancy.setTenantIdCookie(tenantId);
        location.reload();
        return true;
    };
    Object.defineProperty(AppSessionService.prototype, "session", {
        get: function () {
            return this._sessionService;
        },
        enumerable: true,
        configurable: true
    });
    AppSessionService.prototype.isCurrentTenant = function (tenantId) {
        if (!tenantId && this.tenant) {
            return false;
        }
        else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
            return false;
        }
        return true;
    };
    AppSessionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [service_proxies_1.SessionServiceProxy,
            abp_multi_tenancy_service_1.AbpMultiTenancyService])
    ], AppSessionService);
    return AppSessionService;
}());
exports.AppSessionService = AppSessionService;
