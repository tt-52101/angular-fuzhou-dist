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
var util_1 = require("@delon/util");
var core_1 = require("@angular/core");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var PermissionTreeComponent = /** @class */ (function (_super) {
    __extends(PermissionTreeComponent, _super);
    /**
     * 构造函数
     * @param injector 注入器
     * @param _arrayService 数组常用工具
     */
    function PermissionTreeComponent(injector, _arrayService) {
        var _this = _super.call(this, injector) || this;
        _this._arrayService = _arrayService;
        /**
         * 默认需要选中的权限名称集合
         */
        _this.defaultCheckedPermissionNames = [];
        /**
         * 父子节点选中状态不再关联
         */
        _this.checkStrictly = true;
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
    Object.defineProperty(PermissionTreeComponent.prototype, "editData", {
        /**
         * 源数据
         */
        set: function (val) {
            this._editData = val;
            this.arrToTreeNode();
            this.defaultCheckedPermissionNames = val.grantedPermissionNames;
        },
        enumerable: true,
        configurable: true
    });
    PermissionTreeComponent.prototype.ngOnInit = function () {
        //  throw new Error('Method not implemented.');
    };
    /**
     * 重组Tree数据
     */
    PermissionTreeComponent.prototype.arrToTreeNode = function () {
        var _this = this;
        this.loading = true;
        this._treeData = this._arrayService.arrToTreeNode(this._editData.permissions, {
            idMapName: 'name',
            parentIdMapName: 'parentName',
            titleMapName: 'displayName'
        });
        this._arrayService.visitTree(this._treeData, function (item) {
            item.isChecked = _this._editData.grantedPermissionNames.find(function (p) { return p == item.key; }) ? true : false;
        });
        // 延时设置子父节点checkbox关联状态，否则有父节点选中则全部选中了
        setTimeout(function () {
            _this.checkStrictly = false;
            _this.loading = false;
        }, 500);
    };
    /**
     * 重新加载
     */
    PermissionTreeComponent.prototype.reload = function () {
        this.checkStrictly = true;
        this.arrToTreeNode();
        this.filterText = '';
    };
    /**
     * 获取已授权项`key`集合
     */
    PermissionTreeComponent.prototype.getGrantedPermissionNames = function () {
        var permissionNames = this._arrayService.getKeysByTreeNode(this._treeData);
        return permissionNames;
    };
    /**
     * 过滤文本为空时，刷新树
     */
    PermissionTreeComponent.prototype.filterTextEmptyChange = function () {
        if (!this.filterText) {
            this.reload();
        }
    };
    PermissionTreeComponent = __decorate([
        core_1.Component({
            // tslint:disable-next-line:component-selector
            selector: 'permission-tree',
            templateUrl: './permission-tree.component.html',
        }),
        __metadata("design:paramtypes", [core_1.Injector, util_1.ArrayService])
    ], PermissionTreeComponent);
    return PermissionTreeComponent;
}(app_component_base_1.AppComponentBase));
exports.PermissionTreeComponent = PermissionTreeComponent;
