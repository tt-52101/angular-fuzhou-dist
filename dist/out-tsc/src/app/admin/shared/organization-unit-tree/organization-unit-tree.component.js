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
var util_1 = require("@delon/util");
var OrganizationUnitsTreeComponent = /** @class */ (function (_super) {
    __extends(OrganizationUnitsTreeComponent, _super);
    /**
     * 构造函数
     * @param injector 注入器
     * @param _arrayService 数组常用工具
     */
    function OrganizationUnitsTreeComponent(injector, _arrayService) {
        var _this = _super.call(this, injector) || this;
        _this._arrayService = _arrayService;
        /**
         * 默认需要选中的机构键值集合
         */
        _this.defaultCheckedOrganizationUnits = [];
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
    Object.defineProperty(OrganizationUnitsTreeComponent.prototype, "data", {
        /**
         * 源数据
         */
        set: function (data) {
            this._sourceData = data;
            this.arrToTreeNode();
        },
        enumerable: true,
        configurable: true
    });
    OrganizationUnitsTreeComponent.prototype.ngOnInit = function () { };
    /**
     * 重组Tree数据
     */
    OrganizationUnitsTreeComponent.prototype.arrToTreeNode = function () {
        var _this = this;
        this.loading = true;
        this._treeData = this._arrayService.arrToTreeNode(this._sourceData.allOrganizationUnits, {
            idMapName: 'id',
            parentIdMapName: 'parentId',
            titleMapName: 'displayName'
        });
        this._arrayService.visitTree(this._treeData, function (item) {
            item.isChecked = _this._sourceData.selectedOrganizationUnits.find(function (p) { return p === item.origin.code; })
                ? true
                : false;
        });
        this.loading = false;
    };
    /**
     * 重新加载
     */
    OrganizationUnitsTreeComponent.prototype.reload = function () {
        this.arrToTreeNode();
        this.filterText = '';
    };
    /**
     * 获取已选项`key`集合
     */
    OrganizationUnitsTreeComponent.prototype.getSelectedOrganizations = function () {
        var organizationIds = this._arrayService.getKeysByTreeNode(this._treeData);
        return organizationIds;
    };
    /**
     * 过滤文本为空时，刷新树
     */
    OrganizationUnitsTreeComponent.prototype.filterTextEmptyChange = function () {
        if (!this.filterText) {
            this.reload();
        }
    };
    OrganizationUnitsTreeComponent = __decorate([
        core_1.Component({
            selector: 'organization-unit-tree',
            templateUrl: './organization-unit-tree.component.html'
        }),
        __metadata("design:paramtypes", [core_1.Injector, util_1.ArrayService])
    ], OrganizationUnitsTreeComponent);
    return OrganizationUnitsTreeComponent;
}(app_component_base_1.AppComponentBase));
exports.OrganizationUnitsTreeComponent = OrganizationUnitsTreeComponent;
