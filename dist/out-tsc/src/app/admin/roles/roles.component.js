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
var create_or_edit_role_component_1 = require("@app/admin/roles/create-or-edit-role/create-or-edit-role.component");
var create_or_edit_power_role_component_1 = require("./create-or-edit-power-role/create-or-edit-power-role.component");
var _ = require("lodash");
var AppConsts_1 = require("abpPro/AppConsts");
var abc_1 = require("@delon/abc");
var RolesComponent = /** @class */ (function (_super) {
    __extends(RolesComponent, _super);
    function RolesComponent(injector, _roleService, _reuseTabService) {
        var _this = _super.call(this, injector) || this;
        _this._roleService = _roleService;
        _this._reuseTabService = _reuseTabService;
        _this.advancedFiltersVisible = false; // 是否显示高级过滤
        /**
         * 选中的权限过滤
         */
        _this.selectedPermission = [];
        _this._reuseTabService.title = _this.l('角色管理');
        return _this;
    }
    RolesComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._roleService
            .getPaged(this.selectedPermission, this.filterText, request.sorting, request.maxResultCount, request.skipCount)
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
    RolesComponent.prototype.forceRefresh = function () {
        this.filterText = '';
        this.refreshGoFirstPage();
    };
    /**
     * 删除功能
     * @param entity 角色的实体信息
     */
    RolesComponent.prototype.delete = function (entity) {
        var _this = this;
        if (entity.isStatic) {
            abp.message.warn(this.l('XUserCannotBeDeleted', AppConsts_1.AppConsts.userManagement.defaultAdminUserName));
            return;
        }
        this._roleService.delete(entity.id).subscribe(function () {
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyDeleted'));
        });
    };
    /**
     * 新增或编辑角色
     * @param id 当前角色Id
     */
    RolesComponent.prototype.createOrEdit = function (id) {
        var _this = this;
        this.modalHelper
            .static(create_or_edit_role_component_1.CreateOrEditRoleComponent, { id: id })
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    RolesComponent.prototype.editPowerRole = function (id) {
        var _this = this;
        // console.log(id)
        this.modalHelper
            .static(create_or_edit_power_role_component_1.CreateOrEditPowerRoleComponent, { id: id })
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    /**
     * 批量删除
     */
    RolesComponent.prototype.batchDelete = function () {
        var _this = this;
        // this.modal('1')
        console.log(this);
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        this.message.confirm(this.l('ConfirmDeleteXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                var ids = _.map(_this.selectedDataItems, 'id');
                _this._roleService.batchDelete(ids).subscribe(function () {
                    _this.refresh();
                    _this.notify.success(_this.l('SuccessfullyDeleted'));
                });
            }
        });
    };
    RolesComponent.prototype.refreshCheckStatus = function (entityList) {
        // 是否全部选中
        var allChecked = entityList.every(function (value) { return value.checked === true; });
        // 是否全部未选中
        var allUnChecked = entityList.every(function (value) { return !value.checked; });
        // 是否全选
        this.allChecked = allChecked;
        // 全选框样式控制
        this.checkboxIndeterminate = !allChecked && !allUnChecked;
        // 已选中数据
        this.selectedDataItems = entityList.filter(function (value) { return value.checked && !value.isStatic; });
    };
    RolesComponent = __decorate([
        core_1.Component({
            selector: 'app-roles',
            templateUrl: './roles.component.html',
            styles: [],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.RoleServiceProxy,
            abc_1.ReuseTabService])
    ], RolesComponent);
    return RolesComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.RolesComponent = RolesComponent;
