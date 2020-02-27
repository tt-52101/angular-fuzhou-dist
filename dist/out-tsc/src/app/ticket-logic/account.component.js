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
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';
var AccountComponent = /** @class */ (function (_super) {
    __extends(AccountComponent, _super);
    function AccountComponent(injector, _accountService, _ticketaccountService, _payMethodService, _accountDetailService, _ticketDetailService) {
        var _this = _super.call(this, injector) || this;
        _this._accountService = _accountService;
        _this._ticketaccountService = _ticketaccountService;
        _this._payMethodService = _payMethodService;
        _this._accountDetailService = _accountDetailService;
        _this._ticketDetailService = _ticketDetailService;
        _this.payMethodList = [];
        _this.queryData = [{
                field: "accountNo",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "accountStatus",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "payName",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "collectionTime",
                method: ">=",
                value: "",
                logic: "and"
            }, {
                field: "collectionTime",
                method: "<=",
                value: "",
                logic: "and"
            }];
        _this.collectionTime = "";
        _this.accountinfo = [];
        _this.ticketlist = [];
        _this.allChecked = false;
        _this.checkboxIndeterminate = false;
        _this.selectedDataItems = [];
        _this.visible = false;
        return _this;
    }
    AccountComponent.prototype.search = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetAccountsInput;
        var arr = [];
        for (var i = this.queryData.length - 1; i >= 0; i--) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        formdata.queryData = arr;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._ticketaccountService.getPaged(formdata)
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    AccountComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var formdata = new service_proxies_1.GetAccountsInput();
        var arr = [];
        for (var i = this.queryData.length - 1; i >= 0; i--) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        formdata.queryData = arr;
        formdata.sorting = this.sorting;
        formdata.maxResultCount = request.maxResultCount;
        formdata.skipCount = request.skipCount;
        this._ticketaccountService.getPaged(formdata)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
            _this.getpayMethod();
        });
    };
    AccountComponent.prototype.getpayMethod = function () {
        var _this = this;
        this._payMethodService.getPaged(null, 999, 0)
            .subscribe(function (result) {
            _this.payMethodList = result.items;
        });
    };
    AccountComponent.prototype.datechange = function ($event) {
        this.queryData[4].value = $event[0];
        this.queryData[5].value = $event[1];
    };
    AccountComponent.prototype.close = function () {
        this.visible = false;
    };
    AccountComponent.prototype.cancelSettle = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        abp.message.confirm(this.l('ConfirmCancelSettleXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                var ids = _.map(_this.selectedDataItems, 'id');
                _this._accountService.rSettleAccount(ids).subscribe(function (result) {
                    if (result.resultCode == '000') {
                        _this.notify.success(_this.l('SuccessfullyCancelSettle'));
                        _this.refreshGoFirstPage();
                    }
                    else {
                        _this.notify.error(result.resultMessage);
                    }
                });
            }
        });
    };
    AccountComponent.prototype.open = function (account, id) {
        var _this = this;
        var arr = [new service_proxies_1.QueryData({
                field: "ActivityDetail.Activity.accountsId",
                method: "=",
                value: id,
                logic: "and"
            })];
        console.log(arr);
        this._ticketDetailService.getPaged(arr, null, 999, 0)
            .subscribe(function (result) {
            console.log(result);
            _this.visible = true;
            _this.accountinfo = [account];
            _this.ticketlist = result.items;
        });
    };
    AccountComponent = __decorate([
        core_1.Component({
            templateUrl: './account.component.html',
            styleUrls: ['./account.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.AccountServiceProxy,
            service_proxies_1.TicketAccountServiceProxy,
            service_proxies_1.PayMethodServiceProxy,
            service_proxies_1.AccountDetailServiceProxy,
            service_proxies_1.TicketDetailServiceProxy])
    ], AccountComponent);
    return AccountComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.AccountComponent = AccountComponent;
