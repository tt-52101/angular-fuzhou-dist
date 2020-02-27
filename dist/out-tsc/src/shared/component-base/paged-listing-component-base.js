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
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_base_1 = require("@shared/component-base/app-component-base");
var AppConsts_1 = require("abpPro/AppConsts");
/**
 * 分页请求必须参数
 */
var PagedResultDto = /** @class */ (function () {
    function PagedResultDto() {
    }
    return PagedResultDto;
}());
exports.PagedResultDto = PagedResultDto;
// 实体主键dto
var EntityDto = /** @class */ (function () {
    function EntityDto() {
    }
    return EntityDto;
}());
exports.EntityDto = EntityDto;
/**
 * 分页结果dto
 */
var PagedRequestDto = /** @class */ (function () {
    function PagedRequestDto() {
    }
    return PagedRequestDto;
}());
exports.PagedRequestDto = PagedRequestDto;
/**
 * 分页列表基类，包含一些分页通用方法。注意 派生类中的 `ngOnInit` 会覆盖此类中的此方法。
 */
// tslint:disable-next-line:no-shadowed-variable
var PagedListingComponentBase = /** @class */ (function (_super) {
    __extends(PagedListingComponentBase, _super);
    /**
     * 构造函数
     * @param injector 注入器
     * @param nzModalRef (optional) nzModal 模态框关闭、销毁等处理帮助，只能在modal中打开的组件中注入，非modal打开的组件注入null即可，否则报错。因为nzModalRef是建立在nzModalComponent之上的。
     */
    function PagedListingComponentBase(injector) {
        var _this = _super.call(this, injector) || this;
        /**
         * 分页大小
         */
        _this.pageSize = AppConsts_1.AppConsts.grid.defaultPageSize;
        /**
         * 当前页
         */ _this.pageNumber = 1;
        /**
         * 总页数
         */
        _this.totalPages = 1;
        /**
         * 是否加载中
         */
        _this.isTableLoading = true;
        /**
         * 是否全部选中
         */
        _this.allChecked = false;
        /**
         * 全选框是否禁用
         */
        _this.allCheckboxDisabled = false;
        /**
         * 选择框非全选状态，控制全选框的样式：☒
         */
        _this.checkboxIndeterminate = false;
        /**
         * 已选中数据项列表
         */
        _this.selectedDataItems = [];
        /**
         * 排序
         */
        _this.sorting = undefined;
        /**
         * 模糊搜索的文本
         */
        _this.filterText = '';
        /**
         * 数据表的数据源
         */
        _this.dataList = [];
        /**
         *
         *
         *
         *
         * 布尔类型表格列头过滤列表
         */
        // tslint:disable-next-line:member-ordering
        _this.booleanFilterList = [
            { text: _this.l('All'), value: 'All' },
            { text: _this.l('Yes'), value: true },
            { text: _this.l('No'), value: false },
        ];
        return _this;
    }
    PagedListingComponentBase.prototype.ngOnInit = function () {
        this.refresh();
    };
    /**
     * 刷新表格数据
     * @param args
     */
    PagedListingComponentBase.prototype.refresh = function () {
        this.restCheckStatus(this.dataList);
        this.getDataPage(this.pageNumber);
    };
    /**
     * 刷新表格数据并跳转到第一页（`pageNumber = 1`）
     */
    PagedListingComponentBase.prototype.refreshGoFirstPage = function () {
        this.pageNumber = 1;
        this.restCheckStatus(this.dataList);
        this.getDataPage(this.pageNumber);
    };
    PagedListingComponentBase.prototype.getDataPage = function (page) {
        var _this = this;
        // if (page <= 0) {
        //   this.pageNumber = 1;
        //   this.refresh();
        //   return;
        // }
        var req = new PagedRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (page - 1) * this.pageSize;
        req.sorting = this.sorting;
        this.isTableLoading = true;
        this.fetchDataList(req, page, function () {
            _this.isTableLoading = false;
            // 更新全选框禁用状态
            _this.refreshAllCheckBoxDisabled();
        });
    };
    /**
     * 刷新全选框是否禁用
     */
    PagedListingComponentBase.prototype.refreshAllCheckBoxDisabled = function () {
        this.allCheckboxDisabled = this.dataList.length <= 0;
    };
    PagedListingComponentBase.prototype.pageNumberChange = function () {
        if (this.pageNumber > 0) {
            this.refresh();
        }
    };
    /**
     * 选中全部记录
     * @param value 是否选中
     */
    PagedListingComponentBase.prototype.checkAll = function (value) {
        var _this = this;
        this.dataList.forEach(function (data) { return (data.checked = _this.allChecked); });
        this.refreshCheckStatus(this.dataList);
    };
    /**
     * 刷新选中状态
     */
    PagedListingComponentBase.prototype.refreshCheckStatus = function (entityList) {
        // 是否全部选中
        var allChecked = entityList.every(function (value) { return value.checked === true; });
        // 是否全部未选中
        var allUnChecked = entityList.every(function (value) { return !value.checked; });
        // 是否全选
        this.allChecked = allChecked;
        // 全选框样式控制
        this.checkboxIndeterminate = !allChecked && !allUnChecked;
        // 已选中数据
        this.selectedDataItems = entityList.filter(function (value) { return value.checked; });
    };
    /**
     * 重置选中状态
     */
    PagedListingComponentBase.prototype.restCheckStatus = function (entityList) {
        if (!Array.isArray(entityList)) {
            entityList = this.dataList;
        }
        this.allChecked = false;
        this.checkboxIndeterminate = false;
        // 已选中数据
        this.selectedDataItems = [];
        // 设置数据为未选中状态
        entityList.forEach(function (value) { return (value.checked = false); });
    };
    /**
     * 计算分页
     * @param result 分页结果Dto
     * @param pageNumber 当前页码
     */
    PagedListingComponentBase.prototype.showPaging = function (result) {
        this.totalItems = result.totalCount;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    };
    /**
     * 数据表格排序
     * @param sort 排序信息
     */
    PagedListingComponentBase.prototype.gridSort = function (sort) {
        this.sorting = undefined;
        var ascOrDesc = sort.value; // 'ascend' or 'descend' or null
        var filedName = sort.key; // 字段名
        if (ascOrDesc) {
            ascOrDesc = abp.utils.replaceAll(ascOrDesc, 'end', '');
            var args = ['{0} {1}', filedName, ascOrDesc];
            var sortingStr = abp.utils.formatString.apply(this, args);
            this.sorting = sortingStr;
        }
        this.refresh();
    };
    /**
     * 权限列表验证
     * @param permissions 权限名称列表
     */
    PagedListingComponentBase.prototype.isGrantedAny = function () {
        var permissions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            permissions[_i] = arguments[_i];
        }
        if (!permissions) {
            return false;
        }
        for (var _a = 0, permissions_1 = permissions; _a < permissions_1.length; _a++) {
            var permission = permissions_1[_a];
            if (this.isGranted(permission)) {
                return true;
            }
        }
        return false;
    };
    return PagedListingComponentBase;
}(app_component_base_1.AppComponentBase));
exports.PagedListingComponentBase = PagedListingComponentBase;
