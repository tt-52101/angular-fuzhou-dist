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
var edition_feature_tree_component_1 = require("@app/admin/shared/edition-feature-tree/edition-feature-tree.component");
var component_base_1 = require("@shared/component-base");
var operators_1 = require("rxjs/operators");
var EditTenantFeaturesComponent = /** @class */ (function (_super) {
    __extends(EditTenantFeaturesComponent, _super);
    function EditTenantFeaturesComponent(injector, _tenantService) {
        var _this = _super.call(this, injector) || this;
        _this._tenantService = _tenantService;
        _this.saving = false;
        _this.resettingFeatures = false;
        _this.featureEditData = null;
        return _this;
    }
    EditTenantFeaturesComponent.prototype.ngAfterViewInit = function () {
        this.show();
    };
    EditTenantFeaturesComponent.prototype.show = function () {
        this.loadFeatures();
    };
    EditTenantFeaturesComponent.prototype.loadFeatures = function () {
        var _this = this;
        this._tenantService
            .getTenantFeaturesForEdit(this.tenantId)
            .subscribe(function (result) {
            _this.featureTree.editData = result;
        });
    };
    EditTenantFeaturesComponent.prototype.save = function () {
        var _this = this;
        if (!this.featureTree.areAllValuesValid()) {
            this.message.warn(this.l('InvalidFeaturesWarning'));
            return;
        }
        var input = new service_proxies_1.UpdateTenantFeaturesInput();
        input.id = this.tenantId;
        input.featureValues = this.featureTree.getGrantedFeatures();
        this.saving = true;
        this._tenantService
            .updateTenantFeatures(input)
            .pipe(operators_1.finalize(function () { return (_this.saving = false); }))
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success();
        });
    };
    EditTenantFeaturesComponent.prototype.resetFeatures = function () {
        var _this = this;
        var input = new service_proxies_1.EntityDto();
        input.id = this.tenantId;
        this.resettingFeatures = true;
        this._tenantService
            .resetTenantSpecificFeatures(input)
            .pipe(operators_1.finalize(function () { return (_this.saving = false); }))
            .subscribe(function () {
            _this.notify.success(_this.l('ResetSuccessfully'));
            _this.loadFeatures();
        });
    };
    __decorate([
        core_1.ViewChild(edition_feature_tree_component_1.EditionFeatureTreeComponent, { static: false }),
        __metadata("design:type", edition_feature_tree_component_1.EditionFeatureTreeComponent)
    ], EditTenantFeaturesComponent.prototype, "featureTree", void 0);
    EditTenantFeaturesComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-tenant-features',
            templateUrl: './edit-tenant-features.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector, service_proxies_1.TenantServiceProxy])
    ], EditTenantFeaturesComponent);
    return EditTenantFeaturesComponent;
}(component_base_1.ModalComponentBase));
exports.EditTenantFeaturesComponent = EditTenantFeaturesComponent;
