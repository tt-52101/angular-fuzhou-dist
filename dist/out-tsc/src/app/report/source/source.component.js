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
var SourceComponent = /** @class */ (function (_super) {
    __extends(SourceComponent, _super);
    function SourceComponent(injector, _orderSourceService, _sourceService) {
        var _this = _super.call(this, injector) || this;
        _this._orderSourceService = _orderSourceService;
        _this._sourceService = _sourceService;
        _this.queryData = [{
                field: "SourceId",
                method: "=",
                value: "",
                logic: "and"
            }];
        _this.sourceList = [];
        _this.orderlist = [];
        _this.ticketlist = [];
        _this.visible = false;
        _this.childvisible = false;
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
        this._orderSourceService.getPagedStat(arr, request.sorting, request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
        this.getsource();
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
            service_proxies_1.SourceServiceProxy])
    ], SourceComponent);
    return SourceComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.SourceComponent = SourceComponent;
