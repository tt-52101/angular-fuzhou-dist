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
var ScheduleComponent = /** @class */ (function (_super) {
    __extends(ScheduleComponent, _super);
    function ScheduleComponent(injector, _scheduleTicketService, _boatService, _routeService, _ticketService) {
        var _this = _super.call(this, injector) || this;
        _this._scheduleTicketService = _scheduleTicketService;
        _this._boatService = _boatService;
        _this._routeService = _routeService;
        _this._ticketService = _ticketService;
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
                field: "StartTime ",
                method: ">=",
                value: "",
                logic: "and"
            }, {
                field: "StartTime ",
                method: "<=",
                value: "",
                logic: "and"
            }];
        _this.ticketId = '';
        _this.ticketarr = [];
        _this.routequery = [];
        _this.routeList = [];
        _this.boatquery = [];
        _this.boatList = [];
        _this.boattime = '';
        return _this;
    }
    ScheduleComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var arr = [];
        for (var i = this.queryData.length - 1; i >= 0; i--) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._scheduleTicketService.getPagedStat(arr, null, request.maxResultCount, request.skipCount, this.ticketId)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items.concat(result.total);
            _this.showPaging(result);
        });
        this.getroute();
        this.getboat();
        this.getticket();
    };
    ScheduleComponent.prototype.getticket = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetTicketsInput();
        formdata.queryData = [];
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._ticketService.getPaged(formdata)
            .subscribe(function (result) {
            _this.ticketarr = result.items;
        });
    };
    ScheduleComponent.prototype.datechange = function ($event) {
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
        this.queryData[3].value = moment(fulldate1).format('YYYY-MM-DD HH:mm:ss');
        this.queryData[4].value = moment(fulldate2).format('YYYY-MM-DD HH:mm:ss');
    };
    ScheduleComponent.prototype.getroute = function () {
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
    ScheduleComponent.prototype.getboat = function () {
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
    ScheduleComponent.prototype.open = function (id) {
        var _this = this;
        this._scheduleTicketService.scheduleDetailStat(id)
            .subscribe(function (result) {
            console.log(result);
            _this.visible = true;
            _this.ticketinfo = result.items;
        });
    };
    ScheduleComponent.prototype.close = function () {
        this.visible = false;
    };
    ScheduleComponent = __decorate([
        core_1.Component({
            templateUrl: './schedule.component.html',
            styleUrls: ['./schedule.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ScheduleTicketServiceProxy,
            service_proxies_1.BoatServiceProxy,
            service_proxies_1.RouteServiceProxy,
            service_proxies_1.TicketServiceProxy])
    ], ScheduleComponent);
    return ScheduleComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.ScheduleComponent = ScheduleComponent;
