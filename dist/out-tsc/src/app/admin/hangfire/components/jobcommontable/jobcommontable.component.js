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
var component_base_1 = require("@shared/component-base");
var _ = require("lodash");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var router_1 = require("@angular/router");
var JobcommontableComponent = /** @class */ (function (_super) {
    __extends(JobcommontableComponent, _super);
    function JobcommontableComponent(injector, router, _hangfire) {
        var _this = _super.call(this, injector) || this;
        _this.injector = injector;
        _this.router = router;
        _this._hangfire = _hangfire;
        _this.togglePara = { selectedKey: '', state: false };
        _this.onDeleteJobEvent = new core_1.EventEmitter();
        _this.onRunRetryEvent = new core_1.EventEmitter();
        _this.onRetryEvent = new core_1.EventEmitter();
        _this.outDetailPageEvent = new core_1.EventEmitter();
        //跳转页面不同模块
        _this.locationDetail = function (id) {
            _this.router.navigate(['/app/admin/hangfire'], {
                queryParams: { key: id },
                skipLocationChange: true
            });
            _this.outDetailPageEvent.emit(id);
        };
        _this.pageSize = 10;
        _this.pageNumber = 1;
        return _this;
    }
    JobcommontableComponent.prototype.ngOnInit = function () {
        this.isTableLoading = false;
    };
    JobcommontableComponent.prototype.getTableSelectedIds = function () {
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            this.message.warn('请选择作业！', '提示');
            return;
        }
        var jobIds = _.map(this.selectedDataItems, 'key');
        return jobIds;
    };
    /**
     * 删除作业
     */
    JobcommontableComponent.prototype.onDeleteJob = function () {
        var jobIds = this.getTableSelectedIds();
        this.onDeleteJobEvent.emit(jobIds);
    };
    //加入队列
    JobcommontableComponent.prototype.onRunRetry = function () {
        var jobIds = this.getTableSelectedIds();
        this.onRunRetryEvent.emit(jobIds);
    };
    //重新加入队列
    JobcommontableComponent.prototype.onRetry = function () {
        var jobIds = this.getTableSelectedIds();
        this.onRetryEvent.emit(jobIds);
    };
    JobcommontableComponent.prototype.onLoadData = function () {
        this.fetchDataList(new component_base_1.PagedRequestDto(), 1, Function);
    };
    /**
     * 查询选中的作业数据
     */
    JobcommontableComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this.isTableLoading = true;
        request.maxResultCount = this.pageSize;
        request.skipCount = request.maxResultCount * (pageNumber - 1);
        this._hangfire
            .getAllJobs(this.state, this.queuename, '', '', request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
            _this.isTableLoading = false;
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.totalItems = result.totalCount;
            _this.dataList.forEach(function (ret) {
                ret.expand = false;
            });
        });
    };
    JobcommontableComponent.prototype.toggleDetail = function (key) {
        var _this = this;
        this.togglePara.selectedKey = key;
        this.togglePara.state = !this.togglePara.state;
        this.dataList.forEach(function (ret) {
            if (ret.key == key) {
                ret.expand = _this.togglePara.state;
            }
        });
    };
    JobcommontableComponent.prototype.selectEnqueue = function (queuename) {
        var _this = this;
        this.togglePara.state = !this.togglePara.state;
        this.dataList.forEach(function (ret) {
            if (ret.queuename == queuename) {
                ret.expand = _this.togglePara.state;
            }
        });
    };
    JobcommontableComponent.prototype.onSelectQueue = function (queuename) {
        this.router.navigate(['/app/admin/hangfire'], {
            queryParams: { key: '', queuename: queuename },
            skipLocationChange: true
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], JobcommontableComponent.prototype, "queuename", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], JobcommontableComponent.prototype, "dataList", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], JobcommontableComponent.prototype, "totalItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], JobcommontableComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], JobcommontableComponent.prototype, "enumName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], JobcommontableComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], JobcommontableComponent.prototype, "onDeleteJobEvent", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], JobcommontableComponent.prototype, "onRunRetryEvent", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], JobcommontableComponent.prototype, "onRetryEvent", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], JobcommontableComponent.prototype, "outDetailPageEvent", void 0);
    JobcommontableComponent = __decorate([
        core_1.Component({
            selector: 'app-jobcommontable',
            templateUrl: './jobcommontable.component.html',
            styleUrls: ['./jobcommontable.component.less']
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.Router,
            service_proxies_1.HangfireServiceServiceProxy])
    ], JobcommontableComponent);
    return JobcommontableComponent;
}(component_base_1.PagedListingComponentBase));
exports.JobcommontableComponent = JobcommontableComponent;
