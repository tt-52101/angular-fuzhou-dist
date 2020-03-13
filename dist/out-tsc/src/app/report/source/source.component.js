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
var SourceComponent = /** @class */ (function (_super) {
    __extends(SourceComponent, _super);
    function SourceComponent(injector, _orderSourceService, _sourceService, _boatService, _ticketService, _routeService) {
        var _this = _super.call(this, injector) || this;
        _this._orderSourceService = _orderSourceService;
        _this._sourceService = _sourceService;
        _this._boatService = _boatService;
        _this._ticketService = _ticketService;
        _this._routeService = _routeService;
        _this.queryData = [{
                field: "SourceId",
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
        _this.sourceList = [];
        _this.orderlist = [];
        _this.ticketlist = [];
        _this.visible = false;
        _this.childvisible = false;
        _this.boatId = '';
        _this.ticketId = '';
        _this.routeId = '';
        _this.boatList = [];
        _this.ticketarr = [];
        _this.routelist = [];
        _this.collectionTime = '';
        _this.disabledDate = function (current) {
            // Can not select days before today and today
            return differenceInCalendarDays(current, new Date()) > 0;
        };
        return _this;
    }
    SourceComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var arr = [];
        for (var i = 0; i < this.queryData.length; i++) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._orderSourceService.getPagedStat(arr, request.sorting, request.maxResultCount, request.skipCount, this.routeId, this.boatId, this.ticketId)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items.concat(result.total);
            _this.showPaging(result);
        });
        this.getsource();
        this.getboat();
        this.getticket();
        this.getroute();
    };
    SourceComponent.prototype.getroute = function () {
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
    SourceComponent.prototype.getticket = function () {
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
    SourceComponent.prototype.getboat = function () {
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
    SourceComponent.prototype.datechange = function ($event) {
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
    SourceComponent.prototype.open = function (id) {
        var _this = this;
        this._orderSourceService.orderSourceStatDetail(id)
            .subscribe(function (result) {
            _this.visible = true;
            _this.orderlist = result;
        });
    };
    SourceComponent.prototype.close = function () {
        this.visible = false;
    };
    SourceComponent.prototype.openchild = function (tickets) {
        this.childvisible = true;
        this.ticketlist = tickets;
    };
    SourceComponent.prototype.closechild = function () {
        this.childvisible = false;
    };
    SourceComponent.prototype.getsource = function () {
        var _this = this;
        this._sourceService.getPaged(null, 999, 0)
            .subscribe(function (result) {
            _this.sourceList = result.items;
        });
    };
    SourceComponent = __decorate([
        core_1.Component({
            templateUrl: './source.component.html',
            styleUrls: ['./source.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.OrderSourceServiceProxy,
            service_proxies_1.SourceServiceProxy,
            service_proxies_1.BoatServiceProxy,
            service_proxies_1.TicketServiceProxy,
            service_proxies_1.RouteServiceProxy])
    ], SourceComponent);
    return SourceComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.SourceComponent = SourceComponent;
