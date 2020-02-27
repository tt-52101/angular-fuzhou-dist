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
var app_component_base_1 = require("@shared/component-base/app-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var util_1 = require("@delon/util");
var PermissionComboxComponent = /** @class */ (function (_super) {
    __extends(PermissionComboxComponent, _super);
    function PermissionComboxComponent(_permissionService, _arrayService, injector) {
        var _this = _super.call(this, injector) || this;
        _this._permissionService = _permissionService;
        _this._arrayService = _arrayService;
        /**
         * 源数据
         */
        _this.permissions = [];
        /**
         * 是否启用多选，默认`multiple=false`
         */
        _this.multiple = false;
        /**
         * 下拉框样式
         */
        _this.dropDownStyle = null;
        /**
         * 选中的权限
         */
        _this.selectedPermission = undefined;
        /**
         * 选择后发射到父页面事件
         */
        _this.selectedPermissionChange = new core_1.EventEmitter();
        /**
         * 加载中
         */
        _this.loading = false;
        /**
         * NzTree数据
         */
        _this._treeData = [];
        return _this;
    }
    PermissionComboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._permissionService.getAllPermissions().subscribe(function (result) {
            _this.permissions = result.items;
            _this.arrToTreeNode();
        });
    };
    /**
     * 重组Tree数据
     */
    PermissionComboxComponent.prototype.arrToTreeNode = function () {
        var _this = this;
        this.loading = true;
        this._treeData = this._arrayService.arrToTreeNode(this.permissions, {
            idMapName: 'name',
            parentIdMapName: 'parentName',
            titleMapName: 'displayName',
        });
        // 延时设置子父节点checkbox关联状态，否则有父节点选中则全部选中了
        setTimeout(function () {
            _this.loading = false;
        }, 500);
    };
    /**
     * 选择事件
     * @param node 选择节点
     */
    PermissionComboxComponent.prototype.selectedChange = function (selectKey) {
        this.selectedPermissionChange.emit(selectKey);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PermissionComboxComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PermissionComboxComponent.prototype, "dropDownStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PermissionComboxComponent.prototype, "selectedPermission", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PermissionComboxComponent.prototype, "selectedPermissionChange", void 0);
    PermissionComboxComponent = __decorate([
        core_1.Component({
            // tslint:disable-next-line:component-selector
            selector: 'app-permission-combox',
            templateUrl: './permission-combox.component.html',
        }),
        __metadata("design:paramtypes", [service_proxies_1.PermissionServiceProxy,
            util_1.ArrayService,
            core_1.Injector])
    ], PermissionComboxComponent);
    return PermissionComboxComponent;
}(app_component_base_1.AppComponentBase));
exports.PermissionComboxComponent = PermissionComboxComponent;
