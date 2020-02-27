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
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var moment = require("moment");
var CreateOrEditPriceAuditComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditPriceAuditComponent, _super);
    // scheduleList = []
    /**
     * 初始化的构造函数
     */
    function CreateOrEditPriceAuditComponent(injector, _priceAuditService, _ticketService, _ticketPriceService) {
        var _this = _super.call(this, injector) || this;
        _this._priceAuditService = _priceAuditService;
        _this._ticketService = _ticketService;
        _this._ticketPriceService = _ticketPriceService;
        _this.entity = new service_proxies_1.PriceAuditEditDto();
        _this.queryData = [];
        _this.ticketList = [];
        _this.ticketPriceList = [];
        _this.upperTime = "";
        _this.lowerTime = "";
        return _this;
    }
    CreateOrEditPriceAuditComponent.prototype.ngOnInit = function () {
        this.init();
    };
    CreateOrEditPriceAuditComponent.prototype.change1 = function ($event) {
        this.entity.upperTimeStr = this.formatDate($event);
    };
    CreateOrEditPriceAuditComponent.prototype.change2 = function ($event) {
        this.entity.lowerTimeStr = this.formatDate($event);
    };
    CreateOrEditPriceAuditComponent.prototype.formatDate = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        var seconds = date.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        var datesrt = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        return datesrt;
    };
    /**
     * 初始化方法
     */
    CreateOrEditPriceAuditComponent.prototype.init = function () {
        var _this = this;
        this._priceAuditService.getForEdit(this.id).subscribe(function (result) {
            if (result.priceAudit.id) {
                result.priceAudit.upperTimeStr = result.priceAudit.upperTime.toString();
                result.priceAudit.lowerTimeStr = result.priceAudit.lowerTime.toString();
            }
            else {
                result.priceAudit.upperTime = moment();
                result.priceAudit.lowerTime = moment();
                result.priceAudit.upperTimeStr = _this.formatDate(new Date());
                result.priceAudit.lowerTimeStr = _this.formatDate(new Date());
                // result.priceAudit.scheduleId = ''
                result.priceAudit.ticketId = '';
                result.priceAudit.discount = 1;
            }
            _this.entity = result.priceAudit;
        });
        var formdata = new service_proxies_1.GetTicketsInput();
        formdata.queryData = this.queryData;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._ticketService.getPaged(formdata)
            .subscribe(function (result) {
            _this.ticketList = result.items;
        });
        this._ticketPriceService.getPaged(this.queryData, null, 999, 0)
            .subscribe(function (result) {
            _this.ticketPriceList = result.items;
        });
        // var formdata = new GetSchedulesInput()
        // formdata.queryData = this.queryData;
        // formdata.sorting = null
        // formdata.maxResultCount = 999;
        // formdata.skipCount = 0;
        // this._scheduleService.getPaged(formdata)
        //   .subscribe(result => {
        //     this.scheduleList = result.items;
        //   });
    };
    /**
     * 保存方法,提交form表单
     */
    CreateOrEditPriceAuditComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdatePriceAuditInput();
        this.entity.upperTimeStr = this.formatDate(new Date(this.entity.upperTimeStr));
        this.entity.lowerTimeStr = this.formatDate(new Date(this.entity.lowerTimeStr));
        // var auditStatus: AuditStatusEnum ='WaiteAudit';
        // this.entity.auditStatus=auditStatus
        if (this.entity.price == 0) {
            abp.message.warn('票价不能为0');
            return;
        }
        if (this.entity.orgTicketPriceId) {
            delete this.entity.id;
            delete this.entity.ticketId;
            delete this.entity.price;
            delete this.entity.discount;
            delete this.entity.rDiscount;
            delete this.entity.auditStatus;
            delete this.entity.ticketName;
            delete this.entity.upperTimeStr;
            delete this.entity.lowerTimeStr;
        }
        input.priceAudit = this.entity;
        this.saving = true;
        this._priceAuditService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditPriceAuditComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-price-audit',
            templateUrl: './create-or-edit-price-audit.component.html',
            styleUrls: [
                'create-or-edit-price-audit.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.PriceAuditServiceProxy,
            service_proxies_1.TicketServiceProxy,
            service_proxies_1.TicketPriceServiceProxy])
    ], CreateOrEditPriceAuditComponent);
    return CreateOrEditPriceAuditComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditPriceAuditComponent = CreateOrEditPriceAuditComponent;
