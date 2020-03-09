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
var routerTransition_1 = require("@shared/animations/routerTransition");
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var differenceInCalendarDays = require("date-fns/difference_in_calendar_days");
var moment = require("moment");
var SalerDailyComponent = /** @class */ (function (_super) {
    __extends(SalerDailyComponent, _super);
    function SalerDailyComponent(injector, _sellerdailyService, _userService) {
        var _this = _super.call(this, injector) || this;
        _this._sellerdailyService = _sellerdailyService;
        _this._userService = _userService;
        _this.queryData = [{
                field: "CreatorUserId",
                method: "=",
                value: "",
                logic: "and"
            },
            {
                field: "CreationTime",
                method: ">=",
                value: "",
                logic: "and"
            },
            {
                field: "CreationTime",
                method: "<=",
                value: "",
                logic: "and"
            }
        ];
        _this.CreationTime = '';
        _this.orderlist = [];
        _this.ticketlist = [];
        _this.visible = false;
        _this.childvisible = false;
        _this.disabledDate = function (current) {
            // Can not select days before today and today
            return differenceInCalendarDays(current, new Date()) > 0;
        };
        _this.userList = [];
        return _this;
    }
    SalerDailyComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var arr = [];
        for (var i = this.queryData.length - 1; i >= 0; i--) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._sellerdailyService.getPaged(arr, null, request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            if (result.totalCount > 0) {
                _this.dataList = result.items;
                _this.showPaging(result);
            }
        });
        this.getuser();
    };
    SalerDailyComponent.prototype.open = function (id) {
        var _this = this;
        this._sellerdailyService.detail(id)
            .subscribe(function (result) {
            _this.visible = true;
            _this.orderlist = result;
        });
    };
    SalerDailyComponent.prototype.close = function () {
        this.visible = false;
    };
    SalerDailyComponent.prototype.openchild = function (tickets) {
        this.childvisible = true;
        this.ticketlist = tickets;
    };
    SalerDailyComponent.prototype.closechild = function () {
        this.childvisible = false;
    };
    SalerDailyComponent.prototype.datechange = function ($event) {
        var myDate = new Date($event);
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var date = myDate.getDate();
        var fulldate = year + '-' + month + '-' + date;
        this.queryData[1].value = moment(fulldate).format('YYYY-MM-DD HH:mm:ss');
        this.queryData[2].value = moment(fulldate).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
    };
    SalerDailyComponent.prototype.getuser = function () {
        var _this = this;
        this._userService
            .getPaged(undefined, undefined, undefined, undefined, undefined, '', null, 999, 0)
            .subscribe(function (result) {
            _this.userList = result.items;
        });
    };
    SalerDailyComponent = __decorate([
        core_1.Component({
            templateUrl: './salerdaily.component.html',
            styleUrls: ['./salerdaily.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.SellerDailyServiceProxy,
            service_proxies_1.UserServiceProxy])
    ], SalerDailyComponent);
    return SalerDailyComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.SalerDailyComponent = SalerDailyComponent;
