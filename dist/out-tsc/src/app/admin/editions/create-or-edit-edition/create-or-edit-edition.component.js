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
var edition_feature_tree_component_1 = require("@app/admin/shared/edition-feature-tree/edition-feature-tree.component");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var AppEnums_1 = require("abpPro/AppEnums");
var operators_1 = require("rxjs/operators");
var CreateOrEditEditionComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditEditionComponent, _super);
    function CreateOrEditEditionComponent(injector, _editionService, _commonLookupService) {
        var _this = _super.call(this, injector) || this;
        _this._editionService = _editionService;
        _this._commonLookupService = _commonLookupService;
        _this.saving = false;
        _this.edition = new service_proxies_1.EditionEditDto();
        _this.expiringEditions = [];
        _this.expireAction = AppEnums_1.AppEditionExpireAction.DeactiveTenant;
        _this.expireActionEnum = AppEnums_1.AppEditionExpireAction;
        _this.isFree = 'true';
        _this.isTrialActive = false;
        _this.isWaitingDayActive = false;
        return _this;
    }
    CreateOrEditEditionComponent.prototype.ngOnInit = function () {
        this.show(this.editionId);
    };
    CreateOrEditEditionComponent.prototype.show = function (editionId) {
        var _this = this;
        this._commonLookupService
            .getEditionsForCombobox(true)
            .subscribe(function (editionsResult) {
            _this.expiringEditions = editionsResult.items;
            _this._editionService
                .getEditionForEdit(editionId)
                .subscribe(function (editionResult) {
                _this.edition = editionResult.edition;
                _this.featureTree.editData = editionResult;
                _this.expireAction =
                    _this.edition.expiringEditionId > 0
                        ? AppEnums_1.AppEditionExpireAction.AssignToAnotherEdition
                        : AppEnums_1.AppEditionExpireAction.DeactiveTenant;
                _this.isFree =
                    !editionResult.edition.monthlyPrice &&
                        !editionResult.edition.annualPrice
                        ? 'true'
                        : 'false';
                _this.isTrialActive = editionResult.edition.trialDayCount > 0;
                _this.isWaitingDayActive =
                    editionResult.edition.waitingDayAfterExpire > 0;
            });
        });
    };
    CreateOrEditEditionComponent.prototype.updateAnnualPrice = function (value) {
        this.edition.annualPrice = value;
    };
    CreateOrEditEditionComponent.prototype.updateMonthlyPrice = function (value) {
        this.edition.monthlyPrice = value;
    };
    CreateOrEditEditionComponent.prototype.resetPrices = function (isFree) {
        this.edition.annualPrice = undefined;
        this.edition.monthlyPrice = undefined;
    };
    CreateOrEditEditionComponent.prototype.removeExpiringEdition = function (isDeactivateTenant) {
        this.edition.expiringEditionId = null;
    };
    CreateOrEditEditionComponent.prototype.save = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateEditionDto();
        input.edition = this.edition;
        input.featureValues = this.featureTree.getGrantedFeatures();
        this.saving = true;
        this._editionService
            .createOrUpdateEdition(input)
            .pipe(operators_1.finalize(function () { return (_this.saving = false); }))
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.saving = false;
            _this.success();
        });
    };
    __decorate([
        core_1.ViewChild(edition_feature_tree_component_1.EditionFeatureTreeComponent, { static: false }),
        __metadata("design:type", edition_feature_tree_component_1.EditionFeatureTreeComponent)
    ], CreateOrEditEditionComponent.prototype, "featureTree", void 0);
    CreateOrEditEditionComponent = __decorate([
        core_1.Component({
            selector: 'app-create-or-edit-edition',
            templateUrl: './create-or-edit-edition.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.EditionServiceProxy,
            service_proxies_1.CommonLookupServiceProxy])
    ], CreateOrEditEditionComponent);
    return CreateOrEditEditionComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditEditionComponent = CreateOrEditEditionComponent;
