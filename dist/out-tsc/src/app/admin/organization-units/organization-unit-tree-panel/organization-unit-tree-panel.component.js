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
var ng_zorro_antd_1 = require("ng-zorro-antd");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var util_1 = require("@delon/util");
var _ = require("lodash");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
// tslint:disable-next-line:max-line-length
var create_or_edit_organiaztion_unit_component_1 = require("@app/admin/organization-units/create-or-edit-organiaztion-unit/create-or-edit-organiaztion-unit.component");
var OrganizationUnitTreePanelComponent = /** @class */ (function (_super) {
    __extends(OrganizationUnitTreePanelComponent, _super);
    /**
     * 构造函数
     * @param injector 注入器
     * @param _organizationUnitService 机构获取数据服务
     */
    function OrganizationUnitTreePanelComponent(injector, _organizationUnitService, _nzContextMenuService, _arrayService, cdr) {
        var _this = _super.call(this, injector) || this;
        _this._organizationUnitService = _organizationUnitService;
        _this._nzContextMenuService = _nzContextMenuService;
        _this._arrayService = _arrayService;
        _this.cdr = cdr;
        _this.selectedChange = new core_1.EventEmitter();
        /**
         * 加载中
         */
        _this.loading = false;
        /**
         * 总机构数
         */
        _this.totalUnitCount = 0;
        /**
         * 树数据
         */
        _this._treeData = [];
        /**
         * 组织机构源数据
         */
        _this._ouData = [];
        /**
         * 拖拽中
         */
        _this.draging = false;
        return _this;
    }
    /**
     * 初始化
     */
    OrganizationUnitTreePanelComponent.prototype.ngOnInit = function () {
        this.reload();
    };
    /**
     * 重新加载
     */
    OrganizationUnitTreePanelComponent.prototype.reload = function () {
        var _this = this;
        this.getTreeDataFromServer(function (treeData) {
            _this.totalUnitCount = _this._ouData.length;
            _this._treeData = treeData;
        });
    };
    /**
     * 从服务端获取数据
     * @param callback 回调函数
     */
    OrganizationUnitTreePanelComponent.prototype.getTreeDataFromServer = function (callback) {
        var _this = this;
        this.loading = true;
        this._organizationUnitService
            .getAllOrganizationUnitList()
            .pipe(operators_1.finalize(function () {
            _this.loading = false;
        }))
            .subscribe(function (result) {
            _this._ouData = result.items;
            var treeData = _this.treeDataMap();
            callback(treeData);
        });
    };
    /**
     * 重组Tree数据
     */
    OrganizationUnitTreePanelComponent.prototype.treeDataMap = function () {
        var _this = this;
        var ouDtataParentIsNull = _.filter(this._ouData, function (item) { return item.parentId === null; });
        return ouDtataParentIsNull.map(function (item) { return _this._recursionGenerateTree(item); });
    };
    /**
     * 递归重组特性菜单为nzTree数据类型
     * @param item 组织机构项
     */
    OrganizationUnitTreePanelComponent.prototype._recursionGenerateTree = function (item) {
        var _this = this;
        // 叶子节点
        var childs = _.filter(this._ouData, function (child) { return child.parentId === item.id; });
        // 父节点 无返回undefined
        var parentOu = _.find(this._ouData, function (p) { return p.id === item.parentId; });
        var _treeNode = new ng_zorro_antd_1.NzTreeNode({
            title: item.displayName,
            key: item.id.toString(),
            isLeaf: childs && childs.length <= 0,
            expanded: true,
            isMatched: true,
            code: item.code,
            memberCount: item.memberCount,
            dto: item,
            parent: parentOu
        });
        if (childs && childs.length) {
            childs.forEach(function (itemChild) {
                var childItem = _this._recursionGenerateTree(itemChild);
                _treeNode.children.push(childItem);
            });
        }
        return _treeNode;
    };
    /**
     * 展开文件夹图标事件
     * @param data 节点数据或事件数据
     */
    OrganizationUnitTreePanelComponent.prototype.openFolder = function (data) {
        if (data instanceof ng_zorro_antd_1.NzTreeNode) {
            if (!data.isExpanded) {
                data.origin.isLoading = true;
                setTimeout(function () {
                    data.isExpanded = !data.isExpanded;
                    data.origin.isLoading = false;
                }, 500);
            }
            else {
                data.isExpanded = !data.isExpanded;
            }
        }
        else {
            if (!data.node.isExpanded) {
                data.node.origin.isLoading = true;
                setTimeout(function () {
                    data.node.isExpanded = !data.node.isExpanded;
                    data.node.origin.isLoading = false;
                }, 500);
            }
            else {
                data.node.isExpanded = !data.node.isExpanded;
            }
        }
    };
    /**
     * 选中节点
     * @param data 当前几点数据
     */
    OrganizationUnitTreePanelComponent.prototype.activeNode = function (data) {
        this._setActiveNodeValue(data.node);
    };
    /**
     * 设置当前激活（选中）节点的值
     * @param currentNode 当前节点
     */
    OrganizationUnitTreePanelComponent.prototype._setActiveNodeValue = function (currentNode) {
        this._setActiveNodeNull(false);
        currentNode.isSelected = true;
        this.activedNode = currentNode;
        // 选中后发射到父页面
        this.selectedChange.emit(currentNode);
    };
    /**
     * 设置当前激活节点为null（未选中）
     * @param isEmit 是否发射父页面，默认：`true`
     */
    OrganizationUnitTreePanelComponent.prototype._setActiveNodeNull = function (isEmit) {
        if (isEmit === void 0) { isEmit = true; }
        if (this.activedNode) {
            this.activedNode = null;
            if (isEmit) {
                // 清空后发射到父页面
                this.selectedChange.emit(null);
            }
        }
    };
    /**
     * 拖拽进入事件（与某节点重合）
     * @param event 事件
     */
    OrganizationUnitTreePanelComponent.prototype.dragEnter = function (event) {
        this.dragSrcNode = null;
        this.dragTargetNode = null;
        this.dragSrcNode = event.dragNode;
        this.dragTargetNode = event.node;
    };
    /**
     * 拖拽保存数据事件（当：目标节点为叶子节点时触发：dragEnd事件，当目标节点为非叶子节点时触发dragDrop事件）
     * @param event 事件
     */
    OrganizationUnitTreePanelComponent.prototype.dragSaveData = function (event) {
        var _this = this;
        if (this.dragSrcNode && this.dragTargetNode) {
            if (this.dragSrcNode.key !== this.dragTargetNode.key) {
                this.draging = true;
                this.message.confirm(this.l('OrganizationUnitMoveConfirmMessage', this.dragSrcNode.title, this.dragTargetNode.title), function (isConfirmed) {
                    if (isConfirmed) {
                        var input = new service_proxies_1.MoveOrganizationUnitInput();
                        // tslint:disable-next-line:radix
                        input.id = parseInt(_this.dragSrcNode.key);
                        input.newParentId =
                            _this.dragTargetNode === null
                                ? undefined
                                : // tslint:disable-next-line:radix
                                    parseInt(_this.dragTargetNode.key);
                        _this._organizationUnitService
                            .move(input)
                            .pipe(operators_1.finalize(function () {
                            _this.draging = false;
                            _this.reload();
                        }), operators_1.catchError(function (error) {
                            return rxjs_1.throwError(error);
                        }))
                            .subscribe(function () {
                            _this.notify.success(_this.l('SuccessfullyMoved'));
                        });
                    }
                    else {
                        _this.reload();
                        _this.draging = false;
                    }
                });
            }
        }
    };
    /**
     * 创建右键菜单
     * @param $event 鼠标事件
     * @param template 右键模板
     * @param node 当前节点
     */
    OrganizationUnitTreePanelComponent.prototype.createContextMenu = function ($event, template, node) {
        if (this.isGranted('Pages.Administration.OrganizationUnits.ManageOrganizationTree')) {
            this._nzContextMenuService.create($event, template);
        }
        // 选中当前右键的项
        this._setActiveNodeValue(node);
    };
    /**
     * 新增组织机构
     * @param parentId 父节点ID
     */
    OrganizationUnitTreePanelComponent.prototype.addUnit = function (parentId) {
        var _this = this;
        // 当添加根节点时，如有选中的菜单项则清空
        if (!parentId) {
            this._setActiveNodeNull();
        }
        // 添加子节点时显示为XX添加子节点
        var _parentDisplayName = null;
        if (this.activedNode) {
            _parentDisplayName = this.activedNode.title;
        }
        this.modalHelper
            .static(create_or_edit_organiaztion_unit_component_1.CreateOrEditOrganiaztionUnitComponent, {
            organizationUnit: {
                parentId: parentId,
                parentDisplayName: _parentDisplayName
            }
        }, 'md')
            .subscribe(function (res) {
            if (res) {
                // 更新新增的节点至UI
                _this.unitCreated(res);
            }
        });
    };
    /**
     * 新增后更新节点至UI，无需再次查数据库
     * @param ou 当前新增的OU实体
     */
    OrganizationUnitTreePanelComponent.prototype.unitCreated = function (ou) {
        var _this = this;
        // 在源数据中加入新增的数据
        this._ouData.push(ou);
        // 操作树数据
        var childs = _.filter(this._ouData, function (child) { return child.parentId === ou.id; });
        var _treeNode = new ng_zorro_antd_1.NzTreeNode({
            title: ou.displayName,
            key: ou.id.toString(),
            isLeaf: childs && childs.length <= 0,
            expanded: true,
            isMatched: true,
            code: ou.code,
            memberCount: ou.memberCount,
            dto: ou
        });
        if (this.activedNode) {
            // 更新当前激活节点是否有子节点
            childs = _.filter(this._ouData, function (child) {
                return child.parentId ===
                    // tslint:disable-next-line:radix
                    parseInt(_this.activedNode.key);
            });
            this.activedNode.isLeaf = childs && childs.length <= 0;
            // 把新增的节点插入到激活节点的子节点
            this.activedNode.children.push(_treeNode);
            this.activedNode.isExpanded = true;
        }
        else {
            // 插入根节点中
            this._treeData.push(_treeNode);
        }
        this.totalUnitCount += 1;
        this.refreshTreeDisplay();
    };
    //#region 添加、编辑、删除、添加子节点
    //#endregion
    /**
     * 添加子节点
     * @param node 当前选中节点
     */
    OrganizationUnitTreePanelComponent.prototype.addSubUnit = function () {
        var canManageOrganizationTree = this.isGranted('Pages.Administration.OrganizationUnits.ManageOrganizationTree');
        if (!canManageOrganizationTree) {
            abp.message.error(this.l('YouHaveNoOperatingPermissions'));
            return;
        }
        if (this.activedNode.key) {
            // tslint:disable-next-line:radix
            this.addUnit(parseInt(this.activedNode.key));
        }
        this._nzContextMenuService.close();
    };
    /**
     * 编辑组织机构
     */
    OrganizationUnitTreePanelComponent.prototype.editUnit = function () {
        var _this = this;
        var canManageOrganizationTree = this.isGranted('Pages.Administration.OrganizationUnits.ManageOrganizationTree');
        if (!canManageOrganizationTree) {
            abp.message.error(this.l('YouHaveNoOperatingPermissions'));
            return;
        }
        if (this.activedNode.key) {
            var ouPars = {
                // tslint:disable-next-line:radix
                id: parseInt(this.activedNode.key),
                displayName: this.activedNode.title
            };
            this.modalHelper
                .static(create_or_edit_organiaztion_unit_component_1.CreateOrEditOrganiaztionUnitComponent, {
                organizationUnit: ouPars
            })
                .subscribe(function (res) {
                if (res) {
                    // 直接更新节点，无需再次请求数据库
                    _this.activedNode.title = res.displayName;
                    _this._treeData = _this._treeData.map(function (o) { return o; });
                }
            });
        }
        this._nzContextMenuService.close();
    };
    /**
     * 删除组织结构
     */
    OrganizationUnitTreePanelComponent.prototype.deleteUnit = function () {
        var _this = this;
        var canManageOrganizationTree = this.isGranted('Pages.Administration.OrganizationUnits.ManageOrganizationTree');
        if (!canManageOrganizationTree) {
            abp.message.error(this.l('YouHaveNoOperatingPermissions'));
            return;
        }
        if (this.activedNode.key) {
            this._organizationUnitService
                // tslint:disable-next-line:radix
                .delete(parseInt(this.activedNode.key))
                .subscribe(function () {
                _this.totalUnitCount -= 1;
                _this.unitDeletedData();
                _this.notify.success(_this.l('SuccessfullyDeleted'));
            });
        }
        this._nzContextMenuService.close();
    };
    /**
     * 删除后直接操作本地数据，无需再次从数据库获取
     */
    OrganizationUnitTreePanelComponent.prototype.unitDeletedData = function () {
        var _this = this;
        // 删除源数据
        _.remove(this._ouData, function (oRemove) {
            // tslint:disable-next-line:radix
            return oRemove.id === parseInt(_this.activedNode.key);
        });
        // 递归删除tree节点数据
        this._treeData.forEach(function (item) {
            if (item.key === _this.activedNode.key) {
                _.remove(_this._treeData, function (tRemove) {
                    return tRemove.key === _this.activedNode.key;
                });
                _this._setActiveNodeNull();
                return;
            }
            _this._unitDeletedSubData(item);
        });
        this.refreshTreeDisplay();
    };
    /**
     * 如果删除的数据不在父节点中就遍历子节点，直到找到删除为止
     * @param item 节点数据
     */
    OrganizationUnitTreePanelComponent.prototype._unitDeletedSubData = function (item) {
        var _this = this;
        if (item && item.children) {
            item.children.forEach(function (itemChild) {
                if (itemChild.key === _this.activedNode.key) {
                    _.remove(item.children, function (remove) {
                        return remove.key === _this.activedNode.key;
                    });
                    // 如无子节点则设置为叶子节点
                    item.isLeaf = !item.children.length;
                    _this._setActiveNodeNull();
                    return;
                }
                _this._unitDeletedSubData(itemChild);
            });
        }
    };
    /**
     * 成员新增后操作人数事件
     * @param userIds 新增的成员Id类表
     */
    OrganizationUnitTreePanelComponent.prototype.membersAdded = function (userIds) {
        this.incrementMemberCount(userIds.length);
    };
    /**
     * 成员移除后操作人数事件
     * @param userIds 移除的成员Id类表
     */
    OrganizationUnitTreePanelComponent.prototype.memberRemoved = function (userIds) {
        this.incrementMemberCount(-userIds.length);
    };
    /**
     * 机构成员数量操作
     * @param incrementAmount 增量
     */
    OrganizationUnitTreePanelComponent.prototype.incrementMemberCount = function (incrementAmount) {
        this.activedNode.origin.memberCount =
            this.activedNode.origin.memberCount + incrementAmount;
        if (this.activedNode.origin.memberCount < 0)
            this.activedNode.origin.memberCount = 0;
    };
    /** 刷新树显示 */
    OrganizationUnitTreePanelComponent.prototype.refreshTreeDisplay = function () {
        var self = this;
        var tmpTreeData = self._treeData;
        self._treeData = [];
        setTimeout(function () {
            self._treeData = tmpTreeData;
        }, 10);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], OrganizationUnitTreePanelComponent.prototype, "selectedChange", void 0);
    OrganizationUnitTreePanelComponent = __decorate([
        core_1.Component({
            selector: 'app-organization-unit-tree-panel',
            templateUrl: './organization-unit-tree-panel.component.html',
            styleUrls: ['./organization-unit-tree-panel.component.less']
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.OrganizationUnitServiceProxy,
            ng_zorro_antd_1.NzContextMenuService,
            util_1.ArrayService,
            core_1.ChangeDetectorRef])
    ], OrganizationUnitTreePanelComponent);
    return OrganizationUnitTreePanelComponent;
}(app_component_base_1.AppComponentBase));
exports.OrganizationUnitTreePanelComponent = OrganizationUnitTreePanelComponent;
