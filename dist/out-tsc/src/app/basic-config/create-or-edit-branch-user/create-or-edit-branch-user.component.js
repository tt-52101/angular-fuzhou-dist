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
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var CreateOrEditBranchUserComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditBranchUserComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditBranchUserComponent(injector, _branchUserService, _branchService, _userService) {
        var _this = _super.call(this, injector) || this;
        _this._branchUserService = _branchUserService;
        _this._branchService = _branchService;
        _this._userService = _userService;
        _this.entity = new service_proxies_1.BranchUserEditDto();
        _this.filterText = '';
        _this.selectedPermission = [];
        _this.isActive = undefined;
        _this.isEmailConfirmed = undefined;
        _this.role = undefined;
        _this.branchList = [];
        _this.userList = [];
        return _this;
    }
    CreateOrEditBranchUserComponent.prototype.ngOnInit = function () {
        this.init();
    };
    /**
    * 初始化方法
    */
    CreateOrEditBranchUserComponent.prototype.init = function () {
        var _this = this;
        this._branchUserService.getForEdit(this.id).subscribe(function (result) {
            _this._branchService.getPaged(null, 999, 0)
                .subscribe(function (result) {
                _this.branchList = result.items;
            });
            _this._userService.getPaged(_this.selectedPermission, _this.role, _this.isEmailConfirmed, _this.isActive, undefined, _this.filterText, null, 999, 0)
                .subscribe(function (result) {
                _this.userList = result.items;
            });
            _this.entity = result.branchUser;
        });
    };
    CreateOrEditBranchUserComponent.prototype.onChange1 = function ($event) {
        this.entity.branchId = $event;
    };
    CreateOrEditBranchUserComponent.prototype.onChange2 = function ($event) {
        this.entity.userId = parseInt($event);
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditBranchUserComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateBranchUserInput();
        input.branchUser = this.entity;
        this.saving = true;
        this._branchUserService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditBranchUserComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-branch-user',
            templateUrl: './create-or-edit-branch-user.component.html',
            styleUrls: [
                'create-or-edit-branch-user.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.BranchUserServiceProxy,
            service_proxies_1.BranchServiceProxy,
            service_proxies_1.UserServiceProxy])
    ], CreateOrEditBranchUserComponent);
    return CreateOrEditBranchUserComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditBranchUserComponent = CreateOrEditBranchUserComponent;
