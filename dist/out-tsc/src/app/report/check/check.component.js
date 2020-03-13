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
var CheckComponent = /** @class */ (function (_super) {
    __extends(CheckComponent, _super);
    function CheckComponent(injector, _scheduleCheckService, _boatService, _routeService, _wharfService) {
        var _this = _super.call(this, injector) || this;
        _this._scheduleCheckService = _scheduleCheckService;
        _this._boatService = _boatService;
        _this._routeService = _routeService;
        _this._wharfService = _wharfService;
        _this.visible = false;
        _this.ticketinfo = [];
        _this.queryData = [{
                field: "scheduleCode",
                method: "%",
                value: "",
                logic: "and"
            }, {
                field: "routeId",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "boatId",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "Route.startWharfId",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "Schedule.starttime",
                method: ">=",
                value: "",
                logic: "and"
            }, {
                field: "Schedule.starttime",
                method: "<=",
                value: "",
                logic: "and"
            }];
        _this.routequery = [];
        _this.routeList = [];
        _this.boatquery = [];
        _this.boatList = [];
        _this.wharfList = [];
        _this.boattime = '';
        return _this;
    }
    CheckComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var arr = [];
        for (var i = this.queryData.length - 1; i >= 0; i--) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._scheduleCheckService.getPagedStat(arr, null, request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items.concat(result.total);
            _this.showPaging(result);
        });
        this.getroute();
        this.getboat();
        this.getwharf();
    };
    CheckComponent.prototype.datechange = function ($event) {
        this.queryData[4].value = $event[0];
        this.queryData[5].value = $event[1];
    };
    CheckComponent.prototype.getroute = function () {
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
    CheckComponent.prototype.getboat = function () {
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
    CheckComponent.prototype.getwharf = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetWharfsInput();
        formdata.queryData = [];
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._wharfService.getPaged(formdata)
            .subscribe(function (result) {
            _this.wharfList = result.items;
        });
    };
    CheckComponent.prototype.open = function (id) {
        var _this = this;
        this._scheduleCheckService.scheduleDetailStat(id)
            .subscribe(function (result) {
            console.log(result);
            _this.visible = true;
            _this.ticketinfo = result.items;
        });
    };
    CheckComponent.prototype.close = function () {
        this.visible = false;
    };
    CheckComponent = __decorate([
        core_1.Component({
            templateUrl: './check.component.html',
            styleUrls: ['./check.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ScheduleCheckServiceProxy,
            service_proxies_1.BoatServiceProxy,
            service_proxies_1.RouteServiceProxy,
            service_proxies_1.WharfServiceProxy])
    ], CheckComponent);
    return CheckComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.CheckComponent = CheckComponent;
