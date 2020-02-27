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
var operators_1 = require("rxjs/operators");
var _ = require("lodash");
var add_member_component_1 = require("@app/admin/organization-units/add-member/add-member.component");
var OrganizationUnitMembersPanelComponent = /** @class */ (function (_super) {
    __extends(OrganizationUnitMembersPanelComponent, _super);
    /**
     * 构造函数
     * @param injector 注入器
     * @param _organizationUnitService 组织机构服务
     */
    function OrganizationUnitMembersPanelComponent(injector, _organizationUnitService) {
        var _this = _super.call(this, injector) || this;
        _this._organizationUnitService = _organizationUnitService;
        _this.memberRemoved = new core_1.EventEmitter();
        _this.membersAdded = new core_1.EventEmitter();
        /**
         * 搜索文本
         */
        _this.filterText = '';
        /**
         * 当前选中机构节点
         */
        _this._organizationUnit = null;
        return _this;
    }
    Object.defineProperty(OrganizationUnitMembersPanelComponent.prototype, "organizationUnit", {
        /**
         * 当前选中机构
         */
        get: function () {
            return this._organizationUnit;
        },
        set: function (ou) {
            if (this._organizationUnit === ou) {
                return;
            }
            this._organizationUnit = ou;
            if (ou) {
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    OrganizationUnitMembersPanelComponent.prototype.ngOnInit = function () { };
    /**
     * 获取数据列表
     * @param request 分页请求必须参数
     * @param pageNumber 当前页码
     * @param finishedCallback 完成后回调函数
     */
    OrganizationUnitMembersPanelComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        if (!this._organizationUnit) {
            return;
        }
        this._organizationUnitService
            .getPagedOrganizationUnitUsers(
        // tslint:disable-next-line:radix
        parseInt(this._organizationUnit.key), this.filterText, request.sorting, request.maxResultCount, request.skipCount)
            .pipe(operators_1.finalize(function () {
            finishedCallback();
        }))
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    /**
     * 移除用户
     * @param user 当前用户实体
     */
    OrganizationUnitMembersPanelComponent.prototype.removeMember = function (user) {
        var _this = this;
        // tslint:disable-next-line:radix
        var _ouId = parseInt(this.organizationUnit.key);
        this._organizationUnitService.removeUser(user.id, _ouId).subscribe(function () {
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyRemoved'));
            _this.memberRemoved.emit([user.id]);
        });
    };
    /**
     * 批量删除
     */
    OrganizationUnitMembersPanelComponent.prototype.batchDelete = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        this.message.confirm(this.l('ConfirmDeleteXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                // tslint:disable-next-line:radix
                var _ouId = parseInt(_this.organizationUnit.key);
                var ids_1 = _.map(_this.selectedDataItems, 'id');
                _this._organizationUnitService
                    .batchRemoveUserFromOrganizationUnit(ids_1, _ouId)
                    .subscribe(function () {
                    _this.refreshGoFirstPage();
                    _this.notify.success(_this.l('SuccessfullyDeleted'));
                    _this.memberRemoved.emit(ids_1);
                });
            }
        });
    };
    /**
     * 增加成员
     */
    OrganizationUnitMembersPanelComponent.prototype.addUser = function () {
        var _this = this;
        this.modalHelper
            .static(add_member_component_1.AddMemberComponent, {
            // tslint:disable-next-line:radix
            organizationUnitId: parseInt(this.organizationUnit.key)
        })
            .subscribe(function (res) {
            if (res) {
                _this.addMembers(res);
            }
        });
    };
    /**
     * 新增后广播事件
     * @param data 新增后回传数据
     */
    OrganizationUnitMembersPanelComponent.prototype.addMembers = function (userIds) {
        this.membersAdded.emit(userIds);
        this.refresh();
    };
    /**
     * 清除条件并刷新
     */
    OrganizationUnitMembersPanelComponent.prototype.clearFilterAndRefresh = function () {
        this.filterText = '';
        this.refresh();
    };
    OrganizationUnitMembersPanelComponent.prototype.delete = function (entity) {
        throw new Error('Method not implemented.');
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], OrganizationUnitMembersPanelComponent.prototype, "memberRemoved", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], OrganizationUnitMembersPanelComponent.prototype, "membersAdded", void 0);
    OrganizationUnitMembersPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-organization-unit-members-panel',
            templateUrl: './organization-unit-members-panel.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.OrganizationUnitServiceProxy])
    ], OrganizationUnitMembersPanelComponent);
    return OrganizationUnitMembersPanelComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.OrganizationUnitMembersPanelComponent = OrganizationUnitMembersPanelComponent;
