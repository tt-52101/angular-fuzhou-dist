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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var AppEnums_1 = require("abpPro/AppEnums");
var component_base_1 = require("@shared/component-base");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var HostSettingsComponent = /** @class */ (function (_super) {
    __extends(HostSettingsComponent, _super);
    function HostSettingsComponent(injector, _hostSettingService, _commonLookupService) {
        var _this = _super.call(this, injector) || this;
        _this._hostSettingService = _hostSettingService;
        _this._commonLookupService = _commonLookupService;
        _this.hostSettings = undefined;
        _this.editions = undefined;
        _this.testEmailAddress = undefined;
        _this.showTimezoneSelection = abp.clock.provider.supportsMultipleTimezone;
        _this.defaultTimezoneScope = AppEnums_1.AppTimezoneScope.Application;
        _this.usingDefaultTimeZone = false;
        _this.initialTimeZone = undefined;
        _this.selectedEditionId = '';
        _this.validateCodeTypes = [];
        return _this;
    }
    HostSettingsComponent.prototype.loadDatas = function () {
        var _this = this;
        rxjs_1.zip(this._commonLookupService.getEditionsForCombobox(false), this._commonLookupService.getValidateCodeTypesForCombobox(), this._hostSettingService.getAllSettings())
            .pipe(operators_1.finalize(function () { }))
            .subscribe(function (_a) {
            var editionResult = _a[0], validateCodeTypesResult = _a[1], settingsResult = _a[2];
            //
            _this.editions = editionResult.items;
            //
            _this.validateCodeTypes = validateCodeTypesResult.items;
            //
            _this.hostSettings = settingsResult;
            _this.initialTimeZone = settingsResult.general.timezone;
            _this.usingDefaultTimeZone =
                settingsResult.general.timezoneForComparison ===
                    _this.setting.get('Abp.Timing.TimeZone');
            if (_this.hostSettings.tenantManagement.defaultEditionId) {
                _this.selectedEditionId =
                    _this.hostSettings.tenantManagement.defaultEditionId + '';
            }
        });
    };
    HostSettingsComponent.prototype.init = function () {
        this.testEmailAddress = this.appSession.user.emailAddress;
        this.showTimezoneSelection = abp.clock.provider.supportsMultipleTimezone;
        this.loadDatas();
    };
    HostSettingsComponent.prototype.ngOnInit = function () {
        this.init();
    };
    HostSettingsComponent.prototype.sendTestEmail = function () {
        var _this = this;
        this.sendMailTest = true;
        var input = new service_proxies_1.SendTestEmailInput();
        input.emailAddress = this.testEmailAddress;
        this._hostSettingService
            .sendTestEmail(input)
            .pipe(operators_1.finalize(function () {
            _this.sendMailTest = false;
        }))
            .subscribe(function (result) {
            _this.notify.success(_this.l('TestEmailSentSuccessfully'));
        });
    };
    HostSettingsComponent.prototype.saveAll = function () {
        var _this = this;
        this.hostSettings.tenantManagement.defaultEditionId = parseInt(this.selectedEditionId);
        this._hostSettingService
            .updateAllSettings(this.hostSettings)
            .subscribe(function (result) {
            _this.notify.success(_this.l('SavedSuccessfully'));
            if (abp.clock.provider.supportsMultipleTimezone &&
                _this.usingDefaultTimeZone &&
                _this.initialTimeZone !== _this.hostSettings.general.timezone) {
                _this.message
                    .success(_this.l('TimeZoneSettingChangedRefreshPageNotification'))
                    .then(function () {
                    window.location.reload();
                });
            }
        });
    };
    HostSettingsComponent = __decorate([
        core_1.Component({
            templateUrl: './host-settings.component.html'
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.HostSettingsServiceProxy,
            service_proxies_1.CommonLookupServiceProxy])
    ], HostSettingsComponent);
    return HostSettingsComponent;
}(component_base_1.AppComponentBase));
exports.HostSettingsComponent = HostSettingsComponent;
