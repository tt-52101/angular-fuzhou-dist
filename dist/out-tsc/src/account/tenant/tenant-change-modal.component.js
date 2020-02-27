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
var service_proxies_2 = require("@shared/service-proxies/service-proxies");
var AppEnums_1 = require("abpPro/AppEnums");
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var TenantChangeModalComponent = /** @class */ (function (_super) {
    __extends(TenantChangeModalComponent, _super);
    function TenantChangeModalComponent(injector, _accountService) {
        var _this = _super.call(this, injector) || this;
        _this._accountService = _accountService;
        _this.tenancyName = '';
        _this.beforeTenancyName = '';
        _this.saving = false;
        return _this;
    }
    TenantChangeModalComponent.prototype.ngOnInit = function () {
        this.beforeTenancyName = this.tenancyName;
    };
    TenantChangeModalComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        if (this.tenancyName === this.beforeTenancyName) {
            this.close();
            return;
        }
        if (!this.tenancyName || this.tenancyName === '') {
            abp.multiTenancy.setTenantIdCookie(undefined);
            this.close();
            location.reload();
            return;
        }
        var input = new service_proxies_2.IsTenantAvailableInput();
        input.tenancyName = this.tenancyName;
        this._accountService
            .isTenantAvailable(input)
            .finally(function () {
            _this.saving = false;
        })
            .subscribe(function (result) {
            switch (result.state) {
                case AppEnums_1.AppTenantAvailabilityState.Available:
                    abp.multiTenancy.setTenantIdCookie(result.tenantId);
                    _this.success();
                    location.reload();
                    return;
                case AppEnums_1.AppTenantAvailabilityState.InActive:
                    _this.message.warn(_this.l('TenantIsNotActive', _this.tenancyName));
                    break;
                case AppEnums_1.AppTenantAvailabilityState.NotFound: // NotFound
                    _this.message.warn(_this.l('ThereIsNoTenantDefinedWithName{0}', _this.tenancyName));
                    break;
            }
        }, function (error) {
            console.error(error);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TenantChangeModalComponent.prototype, "tenancyName", void 0);
    TenantChangeModalComponent = __decorate([
        core_1.Component({
            selector: 'app-tenant-change-modal',
            templateUrl: './tenant-change-modal.component.html'
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.AccountServiceProxy])
    ], TenantChangeModalComponent);
    return TenantChangeModalComponent;
}(modal_component_base_1.ModalComponentBase));
exports.TenantChangeModalComponent = TenantChangeModalComponent;
