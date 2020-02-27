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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var JobdetailComponent = /** @class */ (function (_super) {
    __extends(JobdetailComponent, _super);
    function JobdetailComponent(injector, _hangfire) {
        var _this = _super.call(this, injector) || this;
        _this.injector = injector;
        _this._hangfire = _hangfire;
        _this.loading = false;
        _this.jobDetail = new service_proxies_1.HangfireJobDetailDto();
        return _this;
    }
    JobdetailComponent.prototype.ngOnInit = function () {
        this.onLoadDetailData();
    };
    /**
     * 加载作业详情数据
     */
    JobdetailComponent.prototype.onLoadDetailData = function () {
        var _this = this;
        this.loading = true;
        this._hangfire.getJobDetail(this.jobKey).finally(function () {
            _this.loading = false;
        }).subscribe(function (ret) {
            _this.jobDetail = ret;
        });
    };
    JobdetailComponent.prototype.onRetryData = function () {
        var _this = this;
        var input = new service_proxies_1.RecurringJobInput();
        input.jobId = [];
        input.jobId.push(this.jobKey);
        this._hangfire.addEnqueueJob(input).finally(function () {
            _this.loading = false;
            _this.onLoadDetailData();
        }).subscribe(function () {
            _this.notify.info('重试成功！');
        });
    };
    JobdetailComponent.prototype.onDeleteJobData = function () {
        var _this = this;
        var input = new service_proxies_1.RecurringJobInput();
        input.jobId = [];
        input.jobId.push(this.jobKey);
        this._hangfire.deleteJob(input.jobId).finally(function () {
            _this.loading = false;
            _this.onLoadDetailData();
        }).subscribe(function () {
            _this.notify.info('删除成功！');
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], JobdetailComponent.prototype, "jobKey", void 0);
    JobdetailComponent = __decorate([
        core_1.Component({
            selector: 'app-jobdetail',
            templateUrl: './jobdetail.component.html',
            styleUrls: ['./jobdetail.component.less']
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.HangfireServiceServiceProxy])
    ], JobdetailComponent);
    return JobdetailComponent;
}(component_base_1.AppComponentBase));
exports.JobdetailComponent = JobdetailComponent;
