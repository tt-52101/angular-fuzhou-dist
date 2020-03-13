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
var TravelComponent = /** @class */ (function (_super) {
    __extends(TravelComponent, _super);
    function TravelComponent(injector, _travelAgencyService, _boatService, _ticketService, _routeService) {
        var _this = _super.call(this, injector) || this;
        _this._travelAgencyService = _travelAgencyService;
        _this._boatService = _boatService;
        _this._ticketService = _ticketService;
        _this._routeService = _routeService;
        _this.queryData = [{
                field: "TravelAgencyId",
                method: "=",
                value: "",
                logic: "and"
            }, {
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
        _this.travelList = [];
        _this.boatId = '';
        _this.ticketId = '';
        _this.routeId = '';
        _this.boatList = [];
        _this.ticketarr = [];
        _this.routelist = [];
        _this.collectionTime = '';
        _this.orderlist = [];
        _this.ticketlist = [];
        _this.visible = false;
        _this.childvisible = false;
        _this.disabledDate = function (current) {
            // Can not select days before today and today
            return differenceInCalendarDays(current, new Date()) > 0;
        };
        return _this;
    }
    TravelComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var arr = [];
        for (var i = 0; i < this.queryData.length; i++) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._travelAgencyService.getPagedStat(arr, request.sorting, request.maxResultCount, request.skipCount, this.routeId, this.boatId, this.ticketId)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items.concat(result.total);
            _this.showPaging(result);
        });
        this.getlist();
        this.getboat();
        this.getticket();
        this.getroute();
    };
    TravelComponent.prototype.getroute = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetRoutesInput();
        formdata.queryData = [];
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._routeService.getPaged(formdata)
            .subscribe(function (result) {
            _this.routelist = result.items;
        });
    };
    TravelComponent.prototype.getticket = function () {
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
    TravelComponent.prototype.getboat = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetBoatsInput();
        formdata.queryData = [];
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._boatService.getPaged(formdata)
            .subscribe(function (result) {
            _this.boatList = result.items;
        });
    };
    TravelComponent.prototype.datechange = function ($event) {
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
        this.queryData[1].value = moment(fulldate1).format('YYYY-MM-DD HH:mm:ss');
        this.queryData[2].value = moment(fulldate2).format('YYYY-MM-DD HH:mm:ss');
    };
    TravelComponent.prototype.open = function (id) {
        var _this = this;
        this._travelAgencyService.orderSourceStatDetail(id)
            .subscribe(function (result) {
            _this.visible = true;
            _this.orderlist = result;
        });
    };
    TravelComponent.prototype.close = function () {
        this.visible = false;
    };
    TravelComponent.prototype.openchild = function (tickets) {
        this.childvisible = true;
        this.ticketlist = tickets;
    };
    TravelComponent.prototype.closechild = function () {
        this.childvisible = false;
    };
    TravelComponent.prototype.getlist = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetTravelAgencysInput();
        formdata.queryData = [];
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._travelAgencyService.getPagedForPost(formdata)
            .subscribe(function (result) {
            _this.travelList = result.items;
            _this.showPaging(result);
        });
    };
    TravelComponent = __decorate([
        core_1.Component({
            templateUrl: './travel.component.html',
            styleUrls: ['./travel.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.TravelAgencyServiceProxy,
            service_proxies_1.BoatServiceProxy,
            service_proxies_1.TicketServiceProxy,
            service_proxies_1.RouteServiceProxy])
    ], TravelComponent);
    return TravelComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.TravelComponent = TravelComponent;
