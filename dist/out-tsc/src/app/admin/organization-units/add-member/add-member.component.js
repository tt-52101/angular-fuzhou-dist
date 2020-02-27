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
var operators_1 = require("rxjs/operators");
var _ = require("lodash");
var modal_paged_listing_component_base_1 = require("@shared/component-base/modal-paged-listing-component-base");
var AddMemberComponent = /** @class */ (function (_super) {
    __extends(AddMemberComponent, _super);
    /**
     * 构造函数
     * @param injector 注入器
     * @param _organizationUnitService 组织机构服务
     */
    function AddMemberComponent(injector, _organizationUnitService) {
        var _this = _super.call(this, injector) || this;
        _this._organizationUnitService = _organizationUnitService;
        _this.filterText = '';
        return _this;
    }
    /**
     * 获取数据列表
     * @param request 分页请求必须参数
     * @param pageNumber 当前页码
     * @param finishedCallback 完成后回调函数
     */
    AddMemberComponent.prototype.getDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        // 设置查询数据
        var input = new service_proxies_1.FindUsersInput();
        input.organizationUnitId = this.organizationUnitId;
        input.filterText = this.filterText;
        input.skipCount = request.skipCount;
        input.maxResultCount = request.maxResultCount;
        this._organizationUnitService
            .findUsers(input)
            .pipe(operators_1.finalize(function () {
            finishedCallback();
        }))
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    AddMemberComponent.prototype.delete = function (entity) { };
    /**
     * 添加用户到当前组织
     */
    AddMemberComponent.prototype.addUsersToOrganizationUnit = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        this.saving = true;
        var input = new service_proxies_1.UsersToOrganizationUnitInput();
        input.organizationUnitId = this.organizationUnitId;
        input.userIds = _.map(this.selectedDataItems, function (selectedMember) {
            return Number(selectedMember.value);
        });
        this._organizationUnitService
            .addUsers(input)
            .pipe(operators_1.finalize(function () { return (_this.saving = false); }))
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(input.userIds);
        });
    };
    AddMemberComponent = __decorate([
        core_1.Component({
            selector: 'app-add-member',
            templateUrl: './add-member.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.OrganizationUnitServiceProxy])
    ], AddMemberComponent);
    return AddMemberComponent;
}(modal_paged_listing_component_base_1.ModalPagedListingComponentBase));
exports.AddMemberComponent = AddMemberComponent;
