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
var edit_control_component_1 = require("./edit-control/edit-control.component");
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
// import { ReuseTabService } from '@delon/abc';
var ControlTicketComponent = /** @class */ (function (_super) {
    __extends(ControlTicketComponent, _super);
    function ControlTicketComponent(injector, 
    // private _reuseTabService: ReuseTabService,
    _scheduleService, _boatService, _routeService) {
        var _this = _super.call(this, injector) || this;
        _this._scheduleService = _scheduleService;
        _this._boatService = _boatService;
        _this._routeService = _routeService;
        _this.routequery = [];
        _this.routeList = [];
        _this.boatquery = [];
        _this.boatList = [];
        _this.boattime = '';
        _this.scqueryData = [{
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
                field: "scheduleStatus",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "starttime",
                method: ">=",
                value: "",
                logic: "and"
            }, {
                field: "endtime",
                method: "<=",
                value: "",
                logic: "and"
            }];
        return _this;
        // this._reuseTabService.title = this.l('控票管理');
    }
    ControlTicketComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        //  this.getlist(request,pageNumber)
        //  console.log(request)
        // }
        var _this = this;
        // getlist(request,pageNumber):void{
        var formdata = new service_proxies_1.GetSchedulesInput;
        var arr = [];
        for (var i = this.scqueryData.length - 1; i >= 0; i--) {
            if (this.scqueryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.scqueryData[i]));
            }
        }
        formdata.queryData = arr;
        formdata.sorting = null;
        formdata.maxResultCount = request.maxResultCount;
        formdata.skipCount = request.skipCount;
        this._scheduleService.getPaged(formdata)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
        this.getroute();
        this.getboat();
    };
    ControlTicketComponent.prototype.getlist = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetSchedulesInput;
        var arr = [];
        for (var i = this.scqueryData.length - 1; i >= 0; i--) {
            if (this.scqueryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.scqueryData[i]));
            }
        }
        formdata.queryData = arr;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._scheduleService.getPagedForPost(formdata)
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    ControlTicketComponent.prototype.datechange = function ($event) {
        this.scqueryData[4].value = $event[0];
        this.scqueryData[5].value = $event[1];
    };
    ControlTicketComponent.prototype.getroute = function () {
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
    ControlTicketComponent.prototype.getboat = function () {
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
    ControlTicketComponent.prototype.editcontrol = function (entity) {
        var _this = this;
        this.modalHelper.static(edit_control_component_1.EditControlComponent, { entity: entity })
            .subscribe(function (result) {
            if (result) {
                _this.refresh();
            }
        });
    };
    ControlTicketComponent = __decorate([
        core_1.Component({
            selector: 'app-controlticket',
            templateUrl: './controlticket.component.html',
            styleUrls: ['./controlticket.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ScheduleServiceProxy,
            service_proxies_1.BoatServiceProxy,
            service_proxies_1.RouteServiceProxy])
    ], ControlTicketComponent);
    return ControlTicketComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.ControlTicketComponent = ControlTicketComponent;
