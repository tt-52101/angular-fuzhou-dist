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
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var core_1 = require("@angular/core");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var operators_1 = require("rxjs/operators");
var EditTenantComponent = /** @class */ (function (_super) {
    __extends(EditTenantComponent, _super);
    function EditTenantComponent(injector, _tenantService) {
        var _this = _super.call(this, injector) || this;
        _this._tenantService = _tenantService;
        _this.entity = new service_proxies_1.TenantEditDto();
        return _this;
    }
    EditTenantComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.saving = true;
        this._tenantService.getForEdit(this.entityId)
            .pipe(operators_1.finalize(function () {
            _this.saving = false;
        })).subscribe(function (result) {
            _this.entity = result;
            _this.subscriptionEndUtc = _this.entity.subscriptionEndUtc ? _this.entity.subscriptionEndUtc.toDate() : null;
            _this.connectionString = _this.entity.connectionString;
            _this.isUnlimited = !_this.entity.subscriptionEndUtc;
        });
    };
    EditTenantComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        // 版本
        this.entity.editionId = this.edition ? parseInt(this.edition.value) : null;
        // 如果没有选择版本或勾选了无限期使用，订阅时间设置为null
        this.entity.subscriptionEndUtc = (!this.entity.editionId || this.isUnlimited) ? null : this.subscriptionEndUtc;
        this._tenantService.update(this.entity)
            .pipe(operators_1.finalize(function () {
            _this.saving = false;
        })).subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success();
        });
    };
    EditTenantComponent.prototype.selectedEditionChange = function (edtion) {
        this.edition = edtion;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], EditTenantComponent.prototype, "entityId", void 0);
    EditTenantComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-tenant',
            templateUrl: './edit-tenant.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.TenantServiceProxy])
    ], EditTenantComponent);
    return EditTenantComponent;
}(modal_component_base_1.ModalComponentBase));
exports.EditTenantComponent = EditTenantComponent;
