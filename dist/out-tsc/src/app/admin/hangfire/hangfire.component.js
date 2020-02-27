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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var _ = require("lodash");
var router_1 = require("@angular/router");
var moment = require("moment");
var jobcommontable_component_1 = require("./components/jobcommontable/jobcommontable.component");
var dynamic_table_component_1 = require("./components/dynamic-table/dynamic-table.component");
var HangfireComponent = /** @class */ (function (_super) {
    __extends(HangfireComponent, _super);
    function HangfireComponent(injector, router, activeRoute, _hangfire) {
        var _this = _super.call(this, injector) || this;
        _this.router = router;
        _this.activeRoute = activeRoute;
        _this._hangfire = _hangfire;
        _this.statisticsInfoDto = new service_proxies_1.StatisticsInfoDto();
        _this.statisticsDatas = [];
        _this.listArray = [
            { title: 'Enqueued', count: 0, state: 'Enqueued' },
            { title: '计划', count: 0, state: 'Plan' },
            { title: '执行中', count: 0, state: 'Runing' },
            { title: '完成', count: 0, state: 'Success' },
            { title: '失败', count: 0, state: 'Faile' },
            { title: '删除', count: 0, state: 'Delete' },
            { title: '等待中', count: 0, state: 'Waiting' }
        ];
        _this.requestParameter = { state: service_proxies_1.JobState, title: '作业列表' };
        _this.loading = false;
        _this.isFirstLoad = true;
        _this.togglePara = { selectedKey: '', state: false };
        _this.enumName = 'Success';
        // 请求参数
        _this.jobKey = '';
        _this.queuename = '';
        _this.serverCount = 0;
        _this.tabList = [
            { name: '仪表盘', count: 0 },
            { name: '作业', count: 0 },
            { name: '重试', count: 0 },
            { name: '周期性作业', count: 0 },
            { name: '服务器', count: 0 }
        ];
        _this.historyData = [];
        //服务列表
        _this.serverResultList = new service_proxies_1.ServerResultList();
        //周期性作业数据
        _this.recurringResultList = new service_proxies_1.RecurringResultList();
        _this.recurringListJobDtos = new service_proxies_1.PagedResultDtoOfRecurringListJobDto();
        //重试作业
        _this.retriesResultList = new service_proxies_1.RetriesResultList();
        _this.retriesJobListDto = new service_proxies_1.PagedResultDtoOfRetriesJobListDto();
        //跳转页面不同模块
        _this.locationPage = function (typeName) {
            _this.isFirstLoad = false;
            _this.router.navigate(['/app/schoolmanage/hangfire'], {
                queryParams: { type: typeName },
                skipLocationChange: true
            });
        };
        _this.pageSize = 10;
        return _this;
    }
    HangfireComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        setTimeout(function () {
            self.onLoadHistoryData();
        }, 100);
        // 调回本页面，刷新页面
        this.router.events.subscribe(function (item) {
            if (item instanceof router_1.NavigationEnd &&
                _this.activeRoute.snapshot.queryParams.reload) {
            }
        });
        this.queuename = '';
        this.isTableLoading = false;
        //获取请求参数
        this.activeRoute.queryParams.subscribe(function (params) {
            //this.selectedIndex = 1;
            _this.jobKey = params.key;
            _this.queuename = params.queuename;
            if (_this.queuename && _this.queuename.length > 0) {
                _this.jobKey = null;
                _this.enumName = 'EnqueuedJob';
                _this.requestParameter.state = service_proxies_1.JobState.EnqueuedJob;
                _this.requestParameter.title = _this.queuename.toUpperCase() + " \u961F\u5217\u4F5C\u4E1A";
                _this.fetchDataList(new paged_listing_component_base_1.PagedRequestDto(), 1, Function);
            }
        });
        this.onLoadDefaultList();
        this.onLoadStatistics();
    };
    HangfireComponent.prototype.outDetailPage = function (data) {
        if (data)
            this.jobKey = data;
    };
    //跳转页面不同模块
    // locationDetail() {
    //   this.selectedIndex = 1;
    //   //this.childCommonTable.locationDetail(id);
    //   this.childCommonTable.onLoadData();
    //   // setTimeout(() => {
    //   //   this.childCommonTable.locationDetail(id);
    //   // }, 1000);
    // }
    //统计作业数量
    HangfireComponent.prototype.onLoadStatistics = function () {
        var _this = this;
        this._hangfire.getDashboardStatistics().subscribe(function (ret) {
            _this.statisticsInfoDto = ret;
            _this.listArray = [
                { title: 'Enqueued', count: ret.enqueued, state: 'Enqueued' },
                { title: '计划', count: ret.scheduled, state: 'Plan' },
                { title: '执行中', count: ret.processing, state: 'Runing' },
                { title: '完成', count: ret.succeeded, state: 'Success' },
                { title: '失败', count: ret.failed, state: 'Faile' },
                { title: '删除', count: ret.deleted, state: 'Delete' },
                { title: '等待中', count: ret.waiting, state: 'Waiting' }
            ];
            _this.tabList = [
                { name: '仪表盘', count: 0 },
                { name: '作业', count: ret.failed },
                { name: '重试', count: ret.retries },
                { name: '周期性作业', count: ret.recurring },
                { name: '服务器', count: ret.servers }
            ];
        });
    };
    HangfireComponent.prototype.formatDate = function (date) {
        return date.format('YYYY-MM-DD');
    };
    HangfireComponent.prototype.onLoadHistoryData = function (searchTimeType) {
        var _this = this;
        if (searchTimeType === void 0) { searchTimeType = service_proxies_1.SearchTimeType.Day; }
        this._hangfire
            .getDashboardData(searchTimeType)
            .subscribe(function (ret) {
            _this.historyData = [];
            ret.dashboardDataDtos.forEach(function (a) {
                var x_value = '';
                if (searchTimeType == service_proxies_1.SearchTimeType.Week) {
                    x_value = _this.formatDate(a.key);
                }
                else {
                    x_value =
                        moment(a.key)
                            .hours()
                            .toString() + ':00';
                }
                _this.historyData.push({
                    state: a.type,
                    value: parseInt(a.value),
                    key: x_value
                });
            });
        });
    };
    HangfireComponent.prototype.searchType = function (type) {
        this.onLoadHistoryData(type == 'day' ? service_proxies_1.SearchTimeType.Day : service_proxies_1.SearchTimeType.Week);
    };
    HangfireComponent.prototype.tabSelect = function (event) {
        alert(event);
    };
    HangfireComponent.prototype.tabSelectedIndexChange = function (index) {
        this.pageNumber = 1;
        this.queuename = '';
        this.isFirstLoad = false;
        if (index != 1) {
            this.jobKey = null;
        }
        switch (index) {
            case 0:
                this.onLoadHistoryData();
                break;
            case 1:
                this.onLoadStatistics();
                if (!this.jobKey) {
                    this.onLoadDefaultList();
                }
                break;
            case 2:
                this.retriesList();
                break;
            case 3:
                this.onLoadRecurringJobList();
                break;
            case 4:
                this.onLoadServerList();
                break;
        }
    };
    /**
     * 默认加载完成的作业
     */
    HangfireComponent.prototype.onLoadDefaultList = function () {
        this.enumName = 'Success';
        this.requestParameter.state = service_proxies_1.JobState.Success;
        this.requestParameter.title = '完成的作业';
        this.fetchDataList(new paged_listing_component_base_1.PagedRequestDto(), 1, Function);
    };
    HangfireComponent.prototype.toggleDetail = function (key) {
        var _this = this;
        this.togglePara.selectedKey = key;
        this.togglePara.state = !this.togglePara.state;
        this.dataList.forEach(function (ret) {
            if (ret.key == key) {
                ret.expand = _this.togglePara.state;
            }
        });
    };
    /**
     * 选中作业
     */
    HangfireComponent.prototype.onSelectJob = function (obj) {
        this.jobKey = null;
        this.queuename = '';
        this.enumName = obj.state;
        this.pageNumber = 1;
        this.requestParameter.state = obj.state;
        this.requestParameter.title = obj.title + "\u7684\u4F5C\u4E1A";
        this.fetchDataList(new paged_listing_component_base_1.PagedRequestDto(), 1, Function);
    };
    /**
     * 查询选中的作业数据
     */
    HangfireComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this.isTableLoading = true;
        request.maxResultCount = this.pageSize;
        request.skipCount = request.maxResultCount * (pageNumber - 1);
        this._hangfire
            .getAllJobs(this.requestParameter.state, this.queuename, '', '', request.maxResultCount, request.skipCount)
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
    /**
     * 重新加入队列
     */
    HangfireComponent.prototype.onRetry = function (eventData) {
        var _this = this;
        if (eventData === void 0) { eventData = []; }
        var input = new service_proxies_1.RecurringJobInput();
        if (!eventData) {
            var selectCount = this.selectedDataItems.length;
            if (selectCount <= 0) {
                this.message.warn('请选择需要添加的作业！', '提示');
                return;
            }
            this.loading = true;
            input.jobId = _.map(this.selectedDataItems, 'key');
        }
        else {
            input.jobId = eventData;
        }
        this._hangfire
            .requeue(input)
            .finally(function () {
            _this.loading = false;
            _this.onLoadStatistics();
        })
            .subscribe(function () {
            _this.notify.info('添加成功！');
        });
    };
    /**
     * 加载服务列表数据
     */
    HangfireComponent.prototype.onLoadServerList = function () {
        var _this = this;
        this.isTableLoading = true;
        this._hangfire
            .getServer()
            .finally(function () {
            _this.isTableLoading = false;
        })
            .subscribe(function (ret) {
            _this.serverResultList = ret;
            _this.serverCount = ret.hangfireServerListDtos.length;
        });
    };
    HangfireComponent.prototype.fetchRecurringList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this.isTableLoading = true;
        request.maxResultCount = this.pageSize;
        request.skipCount = request.maxResultCount * (pageNumber - 1);
        this._hangfire
            .getAllRecurringJob('', request.maxResultCount, request.skipCount, '')
            .finally(function () {
            finishedCallback();
            _this.isTableLoading = false;
        })
            .subscribe(function (result) {
            _this.recurringResultList = result;
            _this.recurringListJobDtos = result.recurringListJobDtos;
            _this.recurringListJobDtos.items.forEach(function (ret) { return (ret.checked = false); });
        });
    };
    HangfireComponent.prototype.refreshRecurring = function (data) {
        this.pageNumber = data;
        this.fetchRecurringList(new paged_listing_component_base_1.PagedRequestDto(), this.pageNumber, Function);
    };
    HangfireComponent.prototype.refreshRetries = function (data) {
        this.pageNumber = data;
        this.fetchRetryList(new paged_listing_component_base_1.PagedRequestDto(), this.pageNumber, Function);
    };
    /**
     * 加载周期性作业表格数据
     */
    HangfireComponent.prototype.onLoadRecurringJobList = function () {
        this.fetchRecurringList(new paged_listing_component_base_1.PagedRequestDto(), 1, Function);
    };
    //删除周期性作业
    HangfireComponent.prototype.onDeleteRecurring = function (eventData) {
        var _this = this;
        if (eventData === void 0) { eventData = []; }
        var input = new service_proxies_1.RecurringJobInput();
        //eventData = this.dynamicTable.getTableSelectedIds();
        var jobIds = [];
        this.recurringListJobDtos.items.forEach(function (a) {
            if (a.checked) {
                jobIds.push(a.recurringJobId);
            }
        });
        eventData = jobIds;
        if (!eventData) {
            var selectCount = this.selectedDataItems.length;
            if (selectCount <= 0) {
                this.message.warn('请选择需要删除的作业！', '提示');
                return;
            }
            this.loading = true;
            input.jobId = _.map(this.selectedDataItems, 'recurringJobId');
        }
        else {
            input.jobId = eventData;
        }
        if (!input.jobId || input.jobId.length == 0) {
            this.message.warn('请选择需要删除的作业！', '提示');
            return;
        }
        this._hangfire
            .deleteRecurringJob(input.jobId)
            .finally(function () {
            _this.loading = false;
            _this.onLoadRecurringJobList();
            _this.onLoadStatistics();
        })
            .subscribe(function () {
            _this.notify.info('删除成功！');
        });
    };
    //立即执行周期性作业
    HangfireComponent.prototype.onRunRecurring = function (eventData) {
        var _this = this;
        if (eventData === void 0) { eventData = []; }
        var input = new service_proxies_1.RecurringJobInput();
        var jobIds = [];
        this.recurringListJobDtos.items.forEach(function (a) {
            if (a.checked) {
                jobIds.push(a.recurringJobId);
            }
        });
        eventData = jobIds;
        if (!eventData) {
            var selectCount = this.selectedDataItems.length;
            if (selectCount <= 0) {
                this.message.warn('请选择需要执行的作业！', '提示');
                return;
            }
            input.jobId = _.map(this.selectedDataItems, 'recurringJobId');
            this.loading = true;
        }
        else {
            input.jobId = eventData;
        }
        if (!input.jobId || input.jobId.length == 0) {
            this.message.warn('请选择需要执行的作业！', '提示');
            return;
        }
        this._hangfire
            .runRecurringJob(input)
            .finally(function () {
            _this.loading = false;
            _this.onLoadRecurringJobList();
            _this.onLoadStatistics();
        })
            .subscribe(function () {
            _this.notify.info('执行成功！');
        });
    };
    //重试作业列表
    HangfireComponent.prototype.retriesList = function () {
        this.fetchRetryList(new paged_listing_component_base_1.PagedRequestDto(), 1, Function);
    };
    HangfireComponent.prototype.fetchRetryList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this.isTableLoading = true;
        request.maxResultCount = this.pageSize;
        request.skipCount = request.maxResultCount * (pageNumber - 1);
        this._hangfire
            .getRetriesJob('', request.maxResultCount, request.skipCount, '')
            .finally(function () {
            finishedCallback();
            _this.isTableLoading = false;
        })
            .subscribe(function (result) {
            _this.retriesResultList = result;
            _this.retriesJobListDto = result.retriesJobListDtos;
            _this.retriesJobListDto.items.forEach(function (ret) { return (ret.checked = false); });
        });
    };
    /**
     * 删除重试作业
     */
    HangfireComponent.prototype.onDeleteJob = function (eventData) {
        var _this = this;
        if (eventData === void 0) { eventData = []; }
        var input = new service_proxies_1.RecurringJobInput();
        if (!eventData) {
            var selectCount = this.selectedDataItems.length;
            if (selectCount <= 0) {
                this.message.warn('请选择需要删除的作业！', '提示');
                return;
            }
            input.jobId = _.map(this.selectedDataItems, 'key');
        }
        else {
            input.jobId = eventData;
        }
        if (!input.jobId || input.jobId.length == 0) {
            this.message.warn('请选择需要删除的作业！', '提示');
            return;
        }
        this.loading = true;
        this._hangfire
            .deleteJob(input.jobId)
            .finally(function () {
            _this.loading = false;
            _this.retriesList();
            _this.onLoadStatistics();
        })
            .subscribe(function () {
            _this.notify.info('删除成功！');
        });
    };
    //重试删除作业
    HangfireComponent.prototype.onDeleteJobRetry = function () {
        var jobIds = [];
        this.retriesJobListDto.items.forEach(function (a) {
            if (a.checked) {
                jobIds.push(a.jobId);
            }
        });
        this.onDeleteJob(jobIds);
    };
    //重试运行作业
    HangfireComponent.prototype.onRunRetryJob = function () {
        var jobIds = [];
        this.retriesJobListDto.items.forEach(function (a) {
            if (a.checked) {
                jobIds.push(a.jobId);
            }
        });
        this.onRunRetry(jobIds);
    };
    /**
     * 加入队列
     */
    HangfireComponent.prototype.onRunRetry = function (eventData) {
        var _this = this;
        if (eventData === void 0) { eventData = []; }
        var input = new service_proxies_1.RecurringJobInput();
        if (!eventData) {
            var selectCount = this.selectedDataItems.length;
            if (selectCount <= 0) {
                this.message.warn('请选择需要添加的作业！', '提示');
                return;
            }
            input.jobId = _.map(this.selectedDataItems, 'key');
        }
        else {
            input.jobId = eventData;
        }
        if (!input.jobId || input.jobId.length == 0) {
            this.message.warn('请选择需要添加的作业！', '提示');
            return;
        }
        this.loading = true;
        this._hangfire
            .addEnqueueJob(input)
            .finally(function () {
            _this.loading = false;
            _this.retriesList();
            _this.onLoadStatistics();
        })
            .subscribe(function () {
            _this.notify.info('添加成功！');
        });
    };
    HangfireComponent.prototype.outDetailTabMethod = function (data) {
        if (data) {
            this.selectedIndex = 1;
            this.jobKey = data;
        }
    };
    __decorate([
        core_1.ViewChild(jobcommontable_component_1.JobcommontableComponent, { static: false }),
        __metadata("design:type", jobcommontable_component_1.JobcommontableComponent)
    ], HangfireComponent.prototype, "childCommonTable", void 0);
    __decorate([
        core_1.ViewChild(dynamic_table_component_1.DynamicTableComponent, { static: false }),
        __metadata("design:type", dynamic_table_component_1.DynamicTableComponent)
    ], HangfireComponent.prototype, "dynamicTable", void 0);
    HangfireComponent = __decorate([
        core_1.Component({
            selector: 'app-hangfire',
            templateUrl: './hangfire.component.html',
            styleUrls: ['./hangfire.component.less']
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.Router,
            router_1.ActivatedRoute,
            service_proxies_1.HangfireServiceServiceProxy])
    ], HangfireComponent);
    return HangfireComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.HangfireComponent = HangfireComponent;
