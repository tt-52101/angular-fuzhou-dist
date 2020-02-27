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
var app_component_base_1 = require("@shared/component-base/app-component-base");
var RoleComboxComponent = /** @class */ (function (_super) {
    __extends(RoleComboxComponent, _super);
    function RoleComboxComponent(_roleService, injector) {
        var _this = _super.call(this, injector) || this;
        _this._roleService = _roleService;
        /**
         * 角色数据
         */
        _this.roles = [];
        /**
         * 下拉框样式
         */
        _this.dropDownStyle = null;
        /**
         * 选择模式，默认`multiple`
         */
        _this.selectMode = 'multiple';
        /**
         * 已选项Value
         */
        _this.selectedRole = undefined;
        /**
         * 选中回发父页面事件
         */
        _this.selectedRoleChange = new core_1.EventEmitter();
        return _this;
    }
    RoleComboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._roleService.getAll(undefined).subscribe(function (result) {
            _this.roles = result.items;
        });
    };
    /**
     * 选择事件
     * @param selectKey 选择Value
     */
    RoleComboxComponent.prototype.selectedChange = function (selectKey) {
        this.selectedRoleChange.emit(selectKey);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RoleComboxComponent.prototype, "dropDownStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RoleComboxComponent.prototype, "selectMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RoleComboxComponent.prototype, "selectedRole", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RoleComboxComponent.prototype, "selectedRoleChange", void 0);
    RoleComboxComponent = __decorate([
        core_1.Component({
            selector: 'app-role-combox',
            templateUrl: './role-combox.component.html',
        }),
        __metadata("design:paramtypes", [service_proxies_1.RoleServiceProxy, core_1.Injector])
    ], RoleComboxComponent);
    return RoleComboxComponent;
}(app_component_base_1.AppComponentBase));
exports.RoleComboxComponent = RoleComboxComponent;
