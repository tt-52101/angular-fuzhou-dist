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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var LoginLogsComponent = /** @class */ (function (_super) {
    __extends(LoginLogsComponent, _super);
    function LoginLogsComponent(injector, auditLogService, _modalService) {
        var _this = _super.call(this, injector) || this;
        _this.auditLogService = auditLogService;
        _this._modalService = _modalService;
        _this.startToEndDate = [];
        _this.hasException = undefined;
        return _this;
    }
    LoginLogsComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        var startData;
        var endData;
        if (this.startToEndDate.length === 2) {
            startData = this.startToEndDate[0] === null ? undefined : this.startToEndDate[0];
            endData = this.startToEndDate[1] === null ? undefined : this.startToEndDate[1];
        }
        this.auditLogService
            .getPagedLoginLogs(startData, endData, this.username, this.sourceName, this.sourceCode, this.clientIpAddress, this.hasException, this.sorting, request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    LoginLogsComponent.prototype.delete = function (entity) { };
    LoginLogsComponent.prototype.showDetails = function (item) {
        this._modalService.create({
            nzTitle: this.l('Details'),
            nzContent: item.exception,
            nzClosable: false,
            nzCancelText: null,
            nzOnOk: function () {
            }
        });
    };
    LoginLogsComponent.prototype.truncateStringWithPostfix = function (text, length) {
        return abp.utils.truncateStringWithPostfix(text, length);
    };
    LoginLogsComponent = __decorate([
        core_1.Component({
            selector: 'app-login-logs',
            templateUrl: './login-logs.component.html',
            styles: [],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.AuditLogServiceProxy,
            ng_zorro_antd_1.NzModalService])
    ], LoginLogsComponent);
    return LoginLogsComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.LoginLogsComponent = LoginLogsComponent;
