"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var component_base_1 = require("@shared/component-base");
var rxjs_1 = require("rxjs");
var TenantSettingsComponent = /** @class */ (function (_super) {
    __extends(TenantSettingsComponent, _super);
    function TenantSettingsComponent(injector, _tenantSettingsService, _commonLookupService) {
        var _this = _super.call(this, injector) || this;
        _this._tenantSettingsService = _tenantSettingsService;
        _this._commonLookupService = _commonLookupService;
        _this.usingDefaultTimeZone = false;
        _this.initialTimeZone = null;
        _this.testEmailAddress = undefined;
        _this.isMultiTenancyEnabled = _this.multiTenancy.isEnabled;
        _this.showTimezoneSelection = abp.clock.provider.supportsMultipleTimezone;
        _this.settings = undefined;
        _this.remoteServiceBaseUrl = AppConsts_1.AppConsts.remoteServiceBaseUrl;
        _this.defaultTimezoneScope = service_proxies_1.SettingScopes.Tenant;
        _this.validateCodeTypes = [];
        return _this;
    }
    TenantSettingsComponent.prototype.ngOnInit = function () {
        this.testEmailAddress = this.appSession.user.emailAddress;
        this.getSettings();
    };
    TenantSettingsComponent.prototype.getSettings = function () {
        var _this = this;
        rxjs_1.zip(this._commonLookupService.getValidateCodeTypesForCombobox(), this._tenantSettingsService.getAllSettings()).subscribe(function (_a) {
            var validateCodeTypesResult = _a[0], settingsResult = _a[1];
            //
            _this.validateCodeTypes = validateCodeTypesResult.items;
            //
            _this.settings = settingsResult;
            if (_this.settings.general) {
                _this.initialTimeZone = _this.settings.general.timezone;
                _this.usingDefaultTimeZone =
                    _this.settings.general.timezoneForComparison ===
                        abp.setting.values['Abp.Timing.TimeZone'];
            }
        });
    };
    TenantSettingsComponent.prototype.saveAll = function () {
        var _this = this;
        this._tenantSettingsService
            .updateAllSettings(this.settings)
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            if (abp.clock.provider.supportsMultipleTimezone &&
                _this.usingDefaultTimeZone &&
                _this.initialTimeZone !== _this.settings.general.timezone) {
                _this.message
                    .info(_this.l('TimeZoneSettingChangedRefreshPageNotification'))
                    .then(function () {
                    window.location.reload();
                });
            }
        });
    };
    TenantSettingsComponent.prototype.sendTestEmail = function () {
        var _this = this;
        var input = new service_proxies_1.SendTestEmailInput();
        input.emailAddress = this.testEmailAddress;
        this._tenantSettingsService.sendTestEmail(input).subscribe(function (result) {
            _this.notify.success(_this.l('TestEmailSentSuccessfully'));
        });
    };
    TenantSettingsComponent = __decorate([
        core_1.Component({
            templateUrl: './tenant-settings.component.html'
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.TenantSettingsServiceProxy,
            service_proxies_1.CommonLookupServiceProxy])
    ], TenantSettingsComponent);
    return TenantSettingsComponent;
}(component_base_1.AppComponentBase));
exports.TenantSettingsComponent = TenantSettingsComponent;
