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
var create_or_edit_user_component_1 = require("@app/admin/users/create-or-edit-user/create-or-edit-user.component");
var edit_user_permissions_component_1 = require("@app/admin/users/edit-user-permissions/edit-user-permissions.component");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
// import _ = require('../@types/lodash');
var _ = require("lodash");
var AppConsts_1 = require("abpPro/AppConsts");
var auth_1 = require("@shared/auth");
var utils_1 = require("@shared/utils");
var abc_1 = require("@delon/abc");
var UsersComponent = /** @class */ (function (_super) {
    __extends(UsersComponent, _super);
    function UsersComponent(injector, _reuseTabService, _userService, _activatedRoute, _impersonationService, _fileDownloadService) {
        var _this = _super.call(this, injector) || this;
        _this._reuseTabService = _reuseTabService;
        _this._userService = _userService;
        _this._activatedRoute = _activatedRoute;
        _this._impersonationService = _impersonationService;
        _this._fileDownloadService = _fileDownloadService;
        // 模糊搜索
        _this.filterText = '';
        _this.advancedFiltersVisible = false; // 是否显示高级过滤
        /**
         * 选中的权限过滤
         */
        _this.selectedPermission = [];
        /**
         * 是否激活过滤
         */
        _this.isActive = undefined;
        /**
         * 是否已验证邮箱过滤
         */
        _this.isEmailConfirmed = undefined;
        /**
         * 选中的角色Ids过滤
         */
        _this.role = undefined;
        _this.filterText =
            _this._activatedRoute.snapshot.queryParams['filterText'] || '';
        _this._reuseTabService.title = _this.l('用户管理');
        return _this;
    }
    Object.defineProperty(UsersComponent.prototype, "enabledUnlock", {
        /**
         * 是否显示解锁按钮
         */
        get: function () {
            return (this.isGranted('Pages.Administration.Users.Edit') &&
                this.setting.getBoolean('Abp.Zero.UserManagement.UserLockOut.IsEnabled'));
        },
        enumerable: true,
        configurable: true
    });
    // 搜索
    UsersComponent.prototype.onSearch = function () {
        this.refresh();
    };
    /**
     * 激活过滤
     * @param event 值
     */
    UsersComponent.prototype.isActiveFilter = function (event) {
        if (event === null || event === 'All') {
            this.isActive = undefined;
        }
        else {
            this.isActive = event;
        }
        this.refreshGoFirstPage();
    };
    /**
     * 邮件确认过滤
     * @param event 值
     */
    UsersComponent.prototype.isEmailConfirmedFilter = function (event) {
        if (event === null || event === 'All') {
            this.isEmailConfirmed = undefined;
        }
        else {
            this.isEmailConfirmed = event;
        }
        this.refreshGoFirstPage();
    };
    /**
     * 根据角色列表进行数据展示
     * @param roles 角色列表信息
     */
    UsersComponent.prototype.getRolesAsString = function (roles) {
        var roleNames = '';
        for (var j = 0; j < roles.length; j++) {
            if (roleNames.length) {
                roleNames = roleNames + ', ';
            }
            roleNames = roleNames + roles[j].roleName;
        }
        return roleNames;
    };
    /**
     * 添加或者编辑实体信息模态框
     * @param id 需要修改实体信息的ID
     */
    UsersComponent.prototype.createOrEdit = function (id) {
        var _this = this;
        this.modalHelper
            .static(create_or_edit_user_component_1.CreateOrEditUserComponent, { id: id })
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    UsersComponent.prototype.editUserPermissions = function (user) {
        this.modalHelper
            .open(edit_user_permissions_component_1.EditUserPermissionsComponent, {
            userId: user.id,
            userName: user.userName
        })
            .subscribe(function (result) { });
    };
    UsersComponent.prototype.unlockUser = function (user) {
        var _this = this;
        var data = new service_proxies_1.EntityDtoOfInt64();
        data.id = user.id;
        this._userService
            .unlock(data)
            .finally(function () { })
            .subscribe(function () {
            _this.refresh();
            _this.notify.success(_this.l('SuccessfullyUnlock'));
        });
    };
    /**
     * 强制刷新
     */
    UsersComponent.prototype.forceRefresh = function () {
        this.filterText = '';
        this.isEmailConfirmed = undefined;
        this.isActive = undefined;
        this.selectedPermission = undefined;
        this.role = undefined;
        this.refreshGoFirstPage();
    };
    /**
     * 获取远端数据
     * @param request
     * @param pageNumber
     * @param finishedCallback
     */
    UsersComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._userService
            .getPaged(this.selectedPermission, this.role, this.isEmailConfirmed, this.isActive, undefined, this.filterText, request.sorting, request.maxResultCount, request.skipCount)
            .pipe(operators_1.finalize(function () {
            finishedCallback();
        }))
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    /**
     * 批量删除
     */
    UsersComponent.prototype.batchDelete = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            // this.miniMessage.warning(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        this.message.confirm(this.l('ConfirmDeleteXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                var ids = _.map(_this.selectedDataItems, 'id');
                _this._userService.batchDelete(ids).subscribe(function () {
                    _this.refreshGoFirstPage();
                    _this.notify.success(_this.l('SuccessfullyDeleted'));
                });
            }
        });
    };
    UsersComponent.prototype.exportToExcel = function () {
        var _this = this;
        this._userService.getUsersToExcel().subscribe(function (result) {
            console.log(result);
            _this._fileDownloadService.downloadTempFile(result);
        });
        // 调用后端的到处方法
    };
    /**
     * 删除功能
     * @param entity 实体信息：User
     */
    UsersComponent.prototype.delete = function (entity) {
        var _this = this;
        if (entity.userName === AppConsts_1.AppConsts.userManagement.defaultAdminUserName) {
            abp.message.warn(this.l('XUserCannotBeDeleted', AppConsts_1.AppConsts.userManagement.defaultAdminUserName));
            return;
        }
        this._userService.delete(entity.id).subscribe(function () {
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyDeleted'));
        });
    };
    UsersComponent.prototype.isAdmin = function (item) {
        return item.userName === AppConsts_1.AppConsts.userManagement.defaultAdminUserName;
    };
    UsersComponent.prototype.refreshCheckStatus = function (entityList) {
        entityList.forEach(function (item) {
            if (item.userName === AppConsts_1.AppConsts.userManagement.defaultAdminUserName) {
                item.checked = false;
            }
        });
        // 是否全部选中
        var allChecked = entityList.every(function (value) { return value.checked === true; });
        // 是否全部未选中
        var allUnChecked = entityList.every(function (value) { return !value.checked; });
        // 是否全选
        this.allChecked = allChecked;
        // 全选框样式控制
        this.checkboxIndeterminate = !allChecked && !allUnChecked;
        // 已选中数据
        this.selectedDataItems = entityList.filter(function (value) { return value.checked; });
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'app-users',
            templateUrl: './users.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            abc_1.ReuseTabService,
            service_proxies_1.UserServiceProxy,
            router_1.ActivatedRoute,
            auth_1.ImpersonationService,
            utils_1.FileDownloadService])
    ], UsersComponent);
    return UsersComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.UsersComponent = UsersComponent;
