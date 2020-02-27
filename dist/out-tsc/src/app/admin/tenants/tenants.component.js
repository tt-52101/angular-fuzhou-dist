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
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var create_tenant_component_1 = require("@app/admin/tenants/create-tenant/create-tenant.component");
var edit_tenant_component_1 = require("./edit-tenant/edit-tenant.component");
var common_lookup_component_1 = require("../common/common-lookup/common-lookup.component");
var edit_tenant_features_component_1 = require("./edit-tenant-features/edit-tenant-features.component");
var auth_1 = require("@shared/auth");
var router_1 = require("@angular/router");
var TenantsComponent = /** @class */ (function (_super) {
    __extends(TenantsComponent, _super);
    function TenantsComponent(injector, _activatedRoute, _tenantService, _impersonationService, _commonLookupService) {
        var _this = _super.call(this, injector) || this;
        _this._activatedRoute = _activatedRoute;
        _this._tenantService = _tenantService;
        _this._impersonationService = _impersonationService;
        _this._commonLookupService = _commonLookupService;
        _this.advancedFiltersVisible = false; // 是否显示高级过滤
        _this.editionId = null; // 版本Id
        _this.subscribableDateRange = [null, null]; // 订阅时间范围
        _this.createDateRange = [null, null]; // 创建时间范围
        _this.filterText =
            _this._activatedRoute.snapshot.queryParams['filterText'] || '';
        return _this;
    }
    TenantsComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._tenantService
            .getPaged(this.advancedFiltersVisible
            ? this.subscribableDateRange[0] || undefined
            : undefined, // 订阅结束时间开始
        this.advancedFiltersVisible
            ? this.subscribableDateRange[1] || undefined
            : undefined, // 订阅结束时间结束
        this.advancedFiltersVisible
            ? this.createDateRange[0] || undefined
            : undefined, // 创建时间开始
        this.advancedFiltersVisible
            ? this.createDateRange[1] || undefined
            : undefined, // 创建时间结束
        this.editionId || undefined, // 版本id
        this.filterText, // 名称过滤字符串
        this.sorting, // 排序字段
        request.maxResultCount, // 最大数据量
        request.skipCount // 跳过数据量
        )
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    /**
     * 强制刷新
     */
    TenantsComponent.prototype.forceRefresh = function () {
        this.filterText = '';
        this.refreshGoFirstPage();
    };
    /**
     * 解锁此租户默认管理员
     * @param entity
     */
    TenantsComponent.prototype.unlockTenantAdminUser = function (entity) {
        var _this = this;
        this._tenantService
            .unlockTenantAdmin(new service_proxies_1.EntityDtoOfInt64({ id: entity.id }))
            .subscribe(function () {
            _this.notify.success(_this.l('UnlockedTenandAdmin', entity.name));
        });
    };
    /**
     * 修改租户的功能
     * @param entity
     */
    TenantsComponent.prototype.changeTenantFeatures = function (entity) {
        this.modalHelper
            .createStatic(edit_tenant_features_component_1.EditTenantFeaturesComponent, {
            tenantId: entity.id,
            tenantName: name
        })
            .subscribe(function (res) { });
    };
    /**
     * 使用此租户模拟登陆
     * @param entity
     */
    TenantsComponent.prototype.tenantImpersonateLogin = function (entity) {
        var _this = this;
        this.modalHelper
            .createStatic(common_lookup_component_1.CommonLookupComponent, {
            tenantId: entity.id,
            options: {
                dataSource: function (skipCount, maxResultCount, filter, tenantId) {
                    var input = new service_proxies_1.CommonLookupFindUsersInput();
                    input.filterText = filter;
                    input.maxResultCount = maxResultCount;
                    input.skipCount = skipCount;
                    input.tenantId = tenantId;
                    return _this._commonLookupService.findUsers(input);
                },
                isFilterEnabled: true,
                canSelect: function () { return true; }
            }
        })
            .subscribe(function (item) {
            if (item) {
                _this.impersonateUser(item, entity.id);
            }
        });
    };
    TenantsComponent.prototype.edit = function (entity) {
        var _this = this;
        this.modalHelper
            .static(edit_tenant_component_1.EditTenantComponent, { entityId: entity })
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    TenantsComponent.prototype.delete = function (entity) {
        var _this = this;
        this._tenantService.delete(entity.id).subscribe(function () { return _this.refresh(); });
    };
    TenantsComponent.prototype.create = function () {
        var _this = this;
        this.modalHelper.open(create_tenant_component_1.CreateTenantComponent, null, 'md').subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    TenantsComponent.prototype.batchDelete = function () {
        var _this = this;
        this._tenantService
            .batchDelete(this.selectedDataItems)
            .subscribe(function () { return _this.refresh(); });
    };
    TenantsComponent.prototype.selectedEditionChange = function (edition) {
        this.editionId = edition ? edition.value : null;
        this.refresh();
    };
    TenantsComponent.prototype.impersonateUser = function (item, id) {
        this._impersonationService.impersonate(parseInt(item.value), id);
    };
    TenantsComponent = __decorate([
        core_1.Component({
            selector: 'app-tenants',
            templateUrl: './tenants.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.ActivatedRoute,
            service_proxies_1.TenantServiceProxy,
            auth_1.ImpersonationService,
            service_proxies_1.CommonLookupServiceProxy])
    ], TenantsComponent);
    return TenantsComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.TenantsComponent = TenantsComponent;
