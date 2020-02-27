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
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var router_1 = require("@angular/router");
var DynamicTableComponent = /** @class */ (function (_super) {
    __extends(DynamicTableComponent, _super);
    function DynamicTableComponent(injector, router) {
        var _this = _super.call(this, injector) || this;
        _this.router = router;
        /**
      * 数据表的数据源
      */
        _this.dataList = [];
        _this.dataColumnList = [];
        _this.outDetailTabEvent = new core_1.EventEmitter();
        _this.refreshEvent = new core_1.EventEmitter();
        //跳转页面不同模块
        _this.locationDetail = function (id) {
            _this.router.navigate(['/app/admin/hangfire'], {
                queryParams: { key: id },
                skipLocationChange: true,
            });
            _this.outDetailTabEvent.emit(id);
        };
        return _this;
    }
    Object.defineProperty(DynamicTableComponent.prototype, "tableData", {
        get: function () {
            return this.dataList;
        },
        set: function (val) {
            this.dataList = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicTableComponent.prototype, "tableColumnData", {
        get: function () {
            return this.dataColumnList;
        },
        set: function (val) {
            this.dataColumnList = val;
        },
        enumerable: true,
        configurable: true
    });
    DynamicTableComponent.prototype.ngOnInit = function () {
    };
    DynamicTableComponent.prototype.refresh = function () {
        this.refreshEvent.emit(this.pageNumber);
    };
    DynamicTableComponent.prototype.getTableSelectedIds = function () {
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            this.message.warn('请选择作业！', '提示');
            return;
        }
        //let jobIds = _.map(this.selectedDataItems, 'key');
        return this.selectedDataItems;
    };
    DynamicTableComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        throw new Error("Method not implemented.");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicTableComponent.prototype, "totalItems", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DynamicTableComponent.prototype, "outDetailTabEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicTableComponent.prototype, "pageNumber", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicTableComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicTableComponent.prototype, "nzFrontPagination", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DynamicTableComponent.prototype, "tableData", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DynamicTableComponent.prototype, "tableColumnData", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DynamicTableComponent.prototype, "refreshEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicTableComponent.prototype, "isTableLoading", void 0);
    DynamicTableComponent = __decorate([
        core_1.Component({
            selector: 'app-dynamic-table',
            templateUrl: './dynamic-table.component.html',
            styles: [],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.Injector, router_1.Router])
    ], DynamicTableComponent);
    return DynamicTableComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.DynamicTableComponent = DynamicTableComponent;
