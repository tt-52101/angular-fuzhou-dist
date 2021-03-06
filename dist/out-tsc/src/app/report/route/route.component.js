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
var moment = require("moment");
var differenceInCalendarDays = require("date-fns/difference_in_calendar_days");
var RouteComponent = /** @class */ (function (_super) {
    __extends(RouteComponent, _super);
    function RouteComponent(injector, _scheduleService, _boatService, _routeService) {
        var _this = _super.call(this, injector) || this;
        _this._scheduleService = _scheduleService;
        _this._boatService = _boatService;
        _this._routeService = _routeService;
        _this.collectionTime = '';
        _this.queryData = [{
                field: "CreationTime",
                method: ">=",
                value: "",
                logic: "and"
            }, {
                field: "CreationTime",
                method: "<=",
                value: "",
                logic: "and"
            }];
        _this.boatId = '';
        _this.routeId = '';
        _this.ticketId = '';
        _this.routequery = [];
        _this.routeList = [];
        _this.boatquery = [];
        _this.boatList = [];
        _this.boattime = '';
        _this.ticketinfo = [];
        _this.visible = false;
        _this.disabledDate = function (current) {
            // Can not select days before today and today
            return differenceInCalendarDays(current, new Date()) > 0;
        };
        return _this;
    }
    RouteComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var arr = [];
        for (var i = 0; i < this.queryData.length; i++) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._scheduleService.getPagedStat(arr, null, 9, request.skipCount, this.routeId, this.boatId, this.ticketId)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items.concat(result.total);
            _this.showPaging(result);
        });
        this.getroute();
        this.getboat();
    };
    RouteComponent.prototype.datechange = function ($event) {
        if ($event[0].getTime() == $event[1].getTime()) {
            $event[1] = new Date($event[1].getTime() + 24 * 60 * 60 * 1000);
        }
        var year = $event[0].getFullYear();
        var month = $event[0].getMonth() + 1;
        var day = $event[0].getDate();
        var fulldate1 = year + '-' + month + '-' + day;
        var year = $event[1].getFullYear();
        var month = $event[1].getMonth() + 1;
        var day = $event[1].getDate();
        var fulldate2 = year + '-' + month + '-' + day;
        this.queryData[0].value = moment(fulldate1).format('YYYY-MM-DD HH:mm:ss');
        this.queryData[1].value = moment(fulldate2).format('YYYY-MM-DD HH:mm:ss');
    };
    RouteComponent.prototype.getroute = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetRoutesInput();
        formdata.queryData = this.routequery;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._routeService.getPaged(formdata)
            .subscribe(function (result) {
            _this.routeList = result.items;
        });
    };
    RouteComponent.prototype.getboat = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetBoatsInput();
        formdata.queryData = this.boatquery;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._boatService.getPaged(formdata)
            .subscribe(function (result) {
            _this.boatList = result.items;
        });
    };
    RouteComponent.prototype.open = function (id) {
        var _this = this;
        this._scheduleService.scheduleDetailStat(id)
            .subscribe(function (result) {
            console.log(result);
            _this.visible = true;
            _this.ticketinfo = result.items;
        });
    };
    RouteComponent.prototype.close = function () {
        this.visible = false;
    };
    RouteComponent = __decorate([
        core_1.Component({
            templateUrl: './route.component.html',
            styleUrls: ['./route.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ScheduleServiceProxy,
            service_proxies_1.BoatServiceProxy,
            service_proxies_1.RouteServiceProxy])
    ], RouteComponent);
    return RouteComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.RouteComponent = RouteComponent;
