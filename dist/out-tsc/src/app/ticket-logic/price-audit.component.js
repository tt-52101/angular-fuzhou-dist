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
var _ = require("lodash");
var routerTransition_1 = require("@shared/animations/routerTransition");
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var create_or_edit_price_audit_component_1 = require("./create-or-edit-price-audit/create-or-edit-price-audit.component");
var PriceAuditComponent = /** @class */ (function (_super) {
    __extends(PriceAuditComponent, _super);
    function PriceAuditComponent(injector, _priceAuditService) {
        var _this = _super.call(this, injector) || this;
        _this._priceAuditService = _priceAuditService;
        _this.queryData = [];
        return _this;
    }
    PriceAuditComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var formdata = new service_proxies_1.GetPriceAuditsInput();
        formdata.queryData = this.queryData;
        formdata.sorting = request.sorting;
        formdata.maxResultCount = request.maxResultCount;
        formdata.skipCount = request.skipCount;
        this._priceAuditService.getPaged(formdata)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    PriceAuditComponent.prototype.createOrEdit = function (id) {
        var _this = this;
        this.modalHelper.static(create_or_edit_price_audit_component_1.CreateOrEditPriceAuditComponent, { id: id })
            .subscribe(function (result) {
            if (result) {
                _this.refresh();
            }
        });
    };
    PriceAuditComponent.prototype.throughAudit = function (entity) {
        var _this = this;
        this._priceAuditService.updateThroughAudit(entity)
            .subscribe(function () {
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyEditd'));
        });
    };
    PriceAuditComponent.prototype.rejecteAudit = function (entity) {
        var _this = this;
        this._priceAuditService.updateRejecteAudit(entity)
            .subscribe(function () {
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyEditd'));
        });
    };
    PriceAuditComponent.prototype.enabled = function (entity) {
        var _this = this;
        entity.isEnabled = true;
        this._priceAuditService.updateThroughAudit(entity)
            .subscribe(function () {
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyEditd'));
        });
    };
    PriceAuditComponent.prototype.notenabled = function (entity) {
        var _this = this;
        entity.isEnabled = false;
        this._priceAuditService.updateThroughAudit(entity)
            .subscribe(function () {
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyEditd'));
        });
    };
    PriceAuditComponent.prototype.delete = function (entity) {
        var _this = this;
        this._priceAuditService.delete(entity.id)
            .subscribe(function () {
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyDeleted'));
        });
    };
    /**
    * 批量删除
    */
    PriceAuditComponent.prototype.batchDelete = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        abp.message.confirm(this.l('ConfirmDeleteXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                var ids = _.map(_this.selectedDataItems, 'id');
                _this._priceAuditService.batchDelete(ids).subscribe(function () {
                    _this.refreshGoFirstPage();
                    _this.notify.success(_this.l('SuccessfullyDeleted'));
                });
            }
        });
    };
    PriceAuditComponent = __decorate([
        core_1.Component({
            templateUrl: './price-audit.component.html',
            styleUrls: ['./price-audit.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.PriceAuditServiceProxy])
    ], PriceAuditComponent);
    return PriceAuditComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.PriceAuditComponent = PriceAuditComponent;
