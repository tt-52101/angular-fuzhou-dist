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
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var AppConsts_1 = require("abpPro/AppConsts");
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var ModalPagedListingComponentBase = /** @class */ (function (_super) {
    __extends(ModalPagedListingComponentBase, _super);
    //#endregion
    /**
     * 构造函数
     * @param injector 注入器
     * @param nzModalRef (optional) nzModal 模态框关闭、销毁等处理帮助，只能在modal中打开的组件中注入，非modal打开的组件注入null即可，否则报错。因为nzModalRef是建立在nzModalComponent之上的。
     */
    function ModalPagedListingComponentBase(injector) {
        var _this = _super.call(this, injector) || this;
        /**
         * 数据表的数据源
         */
        _this.dataList = [];
        //#region 分页模块
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
         * 排序
         */
        _this.sorting = undefined;
        /**
         * 模糊搜索的文本
         */
        _this.filterText = '';
        //#endregion
        //#region 数据加载模块
        /**
         * 是否加载中
         */
        _this.isTableLoading = false;
        //#endregion
        //#region Checkbox复选框
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
        return _this;
    }
    /**
     * 子类中的ngOnInit会覆盖父类此方法
     */
    ModalPagedListingComponentBase.prototype.ngOnInit = function () {
        this.refresh();
    };
    /**
     * 刷新表格数据的方法
     */
    ModalPagedListingComponentBase.prototype.refresh = function () {
        this.restCheckStatus(this.dataList);
        this.getDataPage(this.pageNumber);
    };
    /**
     * 刷新表格数据并跳转到第一页（`pageNumber = 1`）
     */
    ModalPagedListingComponentBase.prototype.refreshGoFirstPage = function () {
        this.pageNumber = 1;
        this.restCheckStatus(this.dataList);
        this.getDataPage(this.pageNumber);
    };
    //#region 分页的信息和内容
    //#endregion
    //#region 分页有关的实现基类方法
    /**
     * 计算分页
     * @param result 分页结果Dto
     *
     */
    ModalPagedListingComponentBase.prototype.showPaging = function (result) {
        this.totalItems = result.totalCount;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    };
    /**
     * 获取当前页数据
     * @param page 当前页码
     */
    ModalPagedListingComponentBase.prototype.getDataPage = function (page) {
        var _this = this;
        var req = new paged_listing_component_base_1.PagedRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (page - 1) * this.pageSize;
        req.sorting = this.sorting;
        this.isTableLoading = true;
        this.getDataList(req, page, function () {
            _this.isTableLoading = false;
            // 更新全选框禁用状态
            _this.refreshAllCheckBoxDisabled();
        });
    };
    //#endregion
    //#region Checkbox，复选框的实现方法
    /**
     * 选中全部记录
     * @param value 是否选中
     */
    ModalPagedListingComponentBase.prototype.checkAll = function (value) {
        var _this = this;
        this.dataList.forEach(function (data) { return (data.checked = _this.allChecked); });
        this.refreshCheckStatus(this.dataList);
    };
    /**
     * 刷新选中状态
     */
    ModalPagedListingComponentBase.prototype.refreshCheckStatus = function (entityList) {
        if (!Array.isArray(entityList)) {
            entityList = this.dataList;
        }
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
    ModalPagedListingComponentBase.prototype.restCheckStatus = function (entityList) {
        this.allChecked = false;
        this.checkboxIndeterminate = false;
        // 已选中数据
        this.selectedDataItems = [];
        // 设置数据为未选中状态
        entityList.forEach(function (value) { return (value.checked = false); });
    };
    /**
     * 刷新全选框是否禁用
     */
    ModalPagedListingComponentBase.prototype.refreshAllCheckBoxDisabled = function () {
        this.allCheckboxDisabled = this.dataList.length <= 0;
    };
    return ModalPagedListingComponentBase;
}(modal_component_base_1.ModalComponentBase));
exports.ModalPagedListingComponentBase = ModalPagedListingComponentBase;
