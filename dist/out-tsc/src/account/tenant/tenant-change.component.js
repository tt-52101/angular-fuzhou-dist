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
var app_component_base_1 = require("@shared/component-base/app-component-base");
var tenant_change_modal_component_1 = require("./tenant-change-modal.component");
var TenantChangeComponent = /** @class */ (function (_super) {
    __extends(TenantChangeComponent, _super);
    function TenantChangeComponent(injector) {
        return _super.call(this, injector) || this;
    }
    TenantChangeComponent.prototype.ngOnInit = function () {
        if (this.appSession.tenant) {
            this.tenancyName = this.appSession.tenant.tenancyName;
            this.name = this.appSession.tenant.name;
        }
    };
    Object.defineProperty(TenantChangeComponent.prototype, "isMultiTenancyEnabled", {
        get: function () {
            return abp.multiTenancy.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    TenantChangeComponent.prototype.showChangeModal = function () {
        this.modalHelper
            .open(tenant_change_modal_component_1.TenantChangeModalComponent, { tenancyName: this.tenancyName }, 'md', {
            nzMask: true,
        })
            .subscribe(function () { });
    };
    TenantChangeComponent = __decorate([
        core_1.Component({
            selector: 'tenant-change',
            templateUrl: './tenant-change.component.html',
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], TenantChangeComponent);
    return TenantChangeComponent;
}(app_component_base_1.AppComponentBase));
exports.TenantChangeComponent = TenantChangeComponent;
