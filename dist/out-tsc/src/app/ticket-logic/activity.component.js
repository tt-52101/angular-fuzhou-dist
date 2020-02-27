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
var _ = require("lodash");
var routerTransition_1 = require("@shared/animations/routerTransition");
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var create_or_edit_activity_component_1 = require("./create-or-edit-activity/create-or-edit-activity.component");
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';
var ActivityComponent = /** @class */ (function (_super) {
    __extends(ActivityComponent, _super);
    function ActivityComponent(injector, _accountService, _ticketDetailService, _activityService, _payMethodService, _sourceService) {
        var _this = _super.call(this, injector) || this;
        _this._accountService = _accountService;
        _this._ticketDetailService = _ticketDetailService;
        _this._activityService = _activityService;
        _this._payMethodService = _payMethodService;
        _this._sourceService = _sourceService;
        _this.visible = false;
        _this.sourceList = [];
        _this.payMethodList = [];
        _this.queryData = [{
                field: "activityNo",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "sourceId",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "ActivityType",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "payMethodId",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "activityDate",
                method: ">=",
                value: "",
                logic: "and"
            }, {
                field: "activityDate",
                method: "<=",
                value: "",
                logic: "and"
            }];
        _this.boattime = "";
        _this.activityinfo = [];
        _this.ticketlist = [];
        return _this;
    }
    ActivityComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var formdata = new service_proxies_1.GetActivitysInput();
        var arr = [];
        for (var i = 0; i < this.queryData.length; i++) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        formdata.queryData = arr;
        formdata.sorting = request.sorting;
        formdata.maxResultCount = request.maxResultCount;
        formdata.skipCount = request.skipCount;
        this._activityService.getPaged(formdata)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
        this.getsource();
        this.getpayMethod();
    };
    ActivityComponent.prototype.search = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetActivitysInput;
        var arr = [];
        for (var i = 0; i < this.queryData.length; i++) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        formdata.queryData = arr;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._activityService.getPaged(formdata)
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    ActivityComponent.prototype.settle = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount == 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        abp.message.confirm(this.l('ConfirmSettleXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                var ids = _.map(_this.selectedDataItems, 'id');
                _this._accountService.settleAccount(ids).subscribe(function (result) {
                    if (result.resultCode == '000') {
                        _this.notify.success(_this.l('SuccessfullySettle'));
                    }
                    else {
                        _this.notify.error(result.resultMessage);
                    }
                    _this.refreshGoFirstPage();
                });
            }
        });
    };
    ActivityComponent.prototype.open = function (activity, activityNo) {
        var _this = this;
        var arr = [new service_proxies_1.QueryData({
                field: "ActivityDetail.Activity.ActivityNo",
                method: "=",
                value: activityNo,
                logic: "and"
            })];
        this._ticketDetailService.getPaged(arr, null, 999, 0)
            .subscribe(function (result) {
            console.log(result);
            _this.visible = true;
            _this.activityinfo = [activity];
            _this.ticketlist = result.items;
        });
    };
    ActivityComponent.prototype.close = function () {
        this.visible = false;
    };
    ActivityComponent.prototype.getsource = function () {
        var _this = this;
        this._sourceService.getPaged(null, 999, 0)
            .subscribe(function (result) {
            _this.sourceList = result.items;
        });
    };
    ActivityComponent.prototype.getpayMethod = function () {
        var _this = this;
        this._payMethodService.getPaged(null, 999, 0)
            .subscribe(function (result) {
            _this.payMethodList = result.items;
        });
    };
    ActivityComponent.prototype.datechange = function ($event) {
        this.queryData[4].value = $event[0];
        this.queryData[5].value = $event[1];
    };
    /**
    * 新增或编辑DTO信息
    * @param id 当前DTO的Id
    */
    ActivityComponent.prototype.createOrEdit = function (id) {
        var _this = this;
        this.modalHelper.static(create_or_edit_activity_component_1.CreateOrEditActivityComponent, { id: id })
            .subscribe(function (result) {
            if (result) {
                _this.refresh();
            }
        });
    };
    /**
    * 删除功能
    * @param entity 角色的实体信息
    */
    ActivityComponent.prototype.delete = function (entity) {
        var _this = this;
        this._activityService.delete(entity.id)
            .subscribe(function () {
            /**
            * 刷新表格数据并跳转到第一页（`pageNumber = 1`）
            */
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyDeleted'));
        });
    };
    /**
    * 批量删除
    */
    ActivityComponent.prototype.batchDelete = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        abp.message.confirm(this.l('ConfirmDeleteXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                var ids = _.map(_this.selectedDataItems, 'id');
                _this._activityService.batchDelete(ids).subscribe(function () {
                    _this.refreshGoFirstPage();
                    _this.notify.success(_this.l('SuccessfullyDeleted'));
                });
            }
        });
    };
    /**
    * 导出为Excel表
    */
    ActivityComponent.prototype.exportToExcel = function () {
        abp.message.error('功能开发中！！！！');
        // this._activityService.getActivityexportToExcel().subscribe(result => {
        // this._fileDownloadService.downloadTempFile(result);
        // });
    };
    ActivityComponent = __decorate([
        core_1.Component({
            templateUrl: './activity.component.html',
            styleUrls: ['./activity.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.AccountServiceProxy,
            service_proxies_1.TicketDetailServiceProxy,
            service_proxies_1.ActivityServiceProxy,
            service_proxies_1.PayMethodServiceProxy,
            service_proxies_1.SourceServiceProxy])
    ], ActivityComponent);
    return ActivityComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.ActivityComponent = ActivityComponent;
