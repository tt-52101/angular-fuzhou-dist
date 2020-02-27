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
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var permission_tree_component_1 = require("@app/admin/shared/permission-tree/permission-tree.component");
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var CreateOrEditRoleComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditRoleComponent, _super);
    function CreateOrEditRoleComponent(injector, _roleService) {
        var _this = _super.call(this, injector) || this;
        _this._roleService = _roleService;
        /**
         * 用户实体
         */
        _this.user = new service_proxies_1.UserEditDto();
        /**
         * 角色实体
         */
        _this.role = new service_proxies_1.RoleEditDto();
        return _this;
    }
    CreateOrEditRoleComponent.prototype.ngOnInit = function () {
        // 初始化数据
        this.init();
    };
    /**
     * 初始化
     */
    CreateOrEditRoleComponent.prototype.init = function () {
        var self = this;
        self._roleService.getForEdit(self.id).subscribe(function (result) {
            self.role = result.role;
            // self.permissionTree.editData = result;
        });
    };
    /**
     * 提交 实行的方法
     * @param finisheCallback 回调
     */
    CreateOrEditRoleComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        var input = new service_proxies_1.CreateOrUpdateRoleInput();
        input.role = this.role;
        // input.grantedPermissionNames = this.permissionTree.getGrantedPermissionNames();
        input.grantedPermissionNames = [];
        this.saving = true;
        this._roleService
            .createOrUpdate(input)
            .pipe(operators_1.finalize(function () { return (_this.saving = false); }))
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success();
        });
    };
    __decorate([
        core_1.ViewChild(permission_tree_component_1.PermissionTreeComponent, { static: false }),
        __metadata("design:type", permission_tree_component_1.PermissionTreeComponent)
    ], CreateOrEditRoleComponent.prototype, "permissionTree", void 0);
    CreateOrEditRoleComponent = __decorate([
        core_1.Component({
            selector: 'app-create-or-edit-role',
            templateUrl: './create-or-edit-role.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector, service_proxies_1.RoleServiceProxy])
    ], CreateOrEditRoleComponent);
    return CreateOrEditRoleComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditRoleComponent = CreateOrEditRoleComponent;
