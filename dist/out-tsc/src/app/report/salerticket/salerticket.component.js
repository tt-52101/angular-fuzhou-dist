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
var SalerTicketComponent = /** @class */ (function (_super) {
    __extends(SalerTicketComponent, _super);
    function SalerTicketComponent(injector, _sellerticketService, _userService) {
        var _this = _super.call(this, injector) || this;
        _this._sellerticketService = _sellerticketService;
        _this._userService = _userService;
        _this.queryData = [{
                field: "User.id",
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
        _this.userList = [];
        return _this;
    }
    SalerTicketComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var arr = [];
        for (var i = this.queryData.length - 1; i >= 0; i--) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._sellerticketService.getPaged(arr, null, request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
        this.getuser();
    };
    SalerTicketComponent.prototype.search = function () {
        var _this = this;
        var arr = [];
        for (var i = this.queryData.length - 1; i >= 0; i--) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        this._sellerticketService.getPaged(arr, null, 999, 0)
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    SalerTicketComponent.prototype.getuser = function () {
        var _this = this;
        this._userService
            .getPaged(undefined, undefined, undefined, undefined, undefined, '', null, 999, 0)
            .subscribe(function (result) {
            _this.userList = result.items;
        });
    };
    SalerTicketComponent = __decorate([
        core_1.Component({
            templateUrl: './salerticket.component.html',
            styleUrls: ['./salerticket.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.SellerTicketServiceProxy,
            service_proxies_1.UserServiceProxy])
    ], SalerTicketComponent);
    return SalerTicketComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.SalerTicketComponent = SalerTicketComponent;
