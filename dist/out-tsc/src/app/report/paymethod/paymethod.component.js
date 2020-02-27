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
var PayMethodComponent = /** @class */ (function (_super) {
    __extends(PayMethodComponent, _super);
    function PayMethodComponent(injector, _payMethodService, _routeService, _boatService) {
        var _this = _super.call(this, injector) || this;
        _this._payMethodService = _payMethodService;
        _this._routeService = _routeService;
        _this._boatService = _boatService;
        _this.queryData = [{
                field: "PayMethodId",
                method: "=",
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
            }];
        _this.payMethodList = [];
        _this.routelist = [];
        _this.boatlist = [];
        return _this;
    }
    PayMethodComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var arr = [];
        for (var i = 0; i < this.queryData.length; i++) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._payMethodService.getPagedStat(arr, request.sorting, request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
        this.getpaymethod();
        this.getroute();
        this.getboat();
    };
    PayMethodComponent.prototype.search = function () {
        var _this = this;
        var arr = [];
        for (var i = 0; i < this.queryData.length; i++) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._payMethodService.getPagedStat(arr, null, 999, 0)
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    PayMethodComponent.prototype.getroute = function () {
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
    PayMethodComponent.prototype.getboat = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetBoatsInput();
        formdata.queryData = [];
        formdata.sorting = "";
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._boatService.getPaged(formdata)
            .subscribe(function (result) {
            _this.boatlist = result.items;
        });
    };
    PayMethodComponent.prototype.getpaymethod = function () {
        var _this = this;
        this._payMethodService.getPaged(null, 999, 0)
            .subscribe(function (result) {
            _this.payMethodList = result.items;
        });
    };
    PayMethodComponent = __decorate([
        core_1.Component({
            templateUrl: './paymethod.component.html',
            styleUrls: ['./paymethod.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.PayMethodServiceProxy,
            service_proxies_1.RouteServiceProxy,
            service_proxies_1.BoatServiceProxy])
    ], PayMethodComponent);
    return PayMethodComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.PayMethodComponent = PayMethodComponent;
