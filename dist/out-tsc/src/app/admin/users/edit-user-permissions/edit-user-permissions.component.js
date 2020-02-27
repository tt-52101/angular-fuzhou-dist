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
var permission_tree_component_1 = require("@app/admin/shared/permission-tree/permission-tree.component");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var EditUserPermissionsComponent = /** @class */ (function (_super) {
    __extends(EditUserPermissionsComponent, _super);
    function EditUserPermissionsComponent(injector, userService) {
        var _this = _super.call(this, injector) || this;
        _this.userService = userService;
        _this.saving = false;
        _this.resettingPermissions = false;
        return _this;
    }
    EditUserPermissionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        // self._roleService.getForEdit(self.id).subscribe(result => {
        //   self.role = result.role;
        //   self.permissionTree.editData = result;
        //   self.setFormValues(this.role);
        // });
        self.userService
            .getPermissionsTreeForEdit(self.userId)
            .subscribe(function (result) {
            _this.permissionTree.editData = result;
        });
    };
    /**
     * 保存
     */
    EditUserPermissionsComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        this.saving = true;
        var input = new service_proxies_1.UpdateUserPermissionsInput();
        input.id = this.userId;
        input.grantedPermissionNames = this.permissionTree.getGrantedPermissionNames();
        this.userService
            .updatePermissions(input)
            .finally(function () { })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success();
        });
    };
    /**
     * 重置权限
     */
    EditUserPermissionsComponent.prototype.resetPermissions = function () {
        var _this = this;
        var input = new service_proxies_1.EntityDtoOfInt64();
        input.id = this.userId;
        this.resettingPermissions = true;
        this.userService
            .resetSpecificPermissions(input)
            .finally(function () {
            _this.resettingPermissions = false;
        })
            .subscribe(function () {
            _this.notify.success(_this.l('ResetSuccessfully'));
            _this.userService
                .getPermissionsTreeForEdit(_this.userId)
                .subscribe(function (result) {
                _this.permissionTree.editData = result;
            });
        });
    };
    __decorate([
        core_1.ViewChild(permission_tree_component_1.PermissionTreeComponent, { static: false }),
        __metadata("design:type", permission_tree_component_1.PermissionTreeComponent)
    ], EditUserPermissionsComponent.prototype, "permissionTree", void 0);
    EditUserPermissionsComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-user-permissions',
            templateUrl: './edit-user-permissions.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector, service_proxies_1.UserServiceProxy])
    ], EditUserPermissionsComponent);
    return EditUserPermissionsComponent;
}(modal_component_base_1.ModalComponentBase));
exports.EditUserPermissionsComponent = EditUserPermissionsComponent;
