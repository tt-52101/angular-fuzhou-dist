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
var CreateOrEditTicketPriceComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditTicketPriceComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditTicketPriceComponent(injector, _ticketPriceService, _ticketService) {
        var _this = _super.call(this, injector) || this;
        _this._ticketPriceService = _ticketPriceService;
        _this._ticketService = _ticketService;
        _this.entity = new service_proxies_1.TicketPriceEditDto();
        _this.queryData = [];
        _this.ticketList = [];
        _this.upperTime = "";
        _this.lowerTime = "";
        return _this;
    }
    CreateOrEditTicketPriceComponent.prototype.ngOnInit = function () {
        this.init();
    };
    CreateOrEditTicketPriceComponent.prototype.change1 = function ($event) {
        this.entity.upperTimeStr = this.formatDate($event);
    };
    CreateOrEditTicketPriceComponent.prototype.change2 = function ($event) {
        this.entity.lowerTimeStr = this.formatDate($event);
    };
    CreateOrEditTicketPriceComponent.prototype.formatDate = function (date) {
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
    CreateOrEditTicketPriceComponent.prototype.init = function () {
        var _this = this;
        this._ticketPriceService.getForEdit(this.id).subscribe(function (result) {
            if (result.ticketPrice.id) {
                result.ticketPrice.upperTimeStr = result.ticketPrice.upperTime.toString();
                result.ticketPrice.lowerTimeStr = result.ticketPrice.lowerTime.toString();
            }
            else {
                result.ticketPrice.upperTime = moment();
                result.ticketPrice.lowerTime = moment();
                result.ticketPrice.upperTimeStr = _this.formatDate(new Date());
                result.ticketPrice.lowerTimeStr = _this.formatDate(new Date());
                // result.ticketPrice.scheduleId=''
                result.ticketPrice.ticketId = '';
            }
            _this.entity = result.ticketPrice;
            console.log(_this.entity);
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
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditTicketPriceComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateTicketPriceInput();
        // this.entity.sort = parseFloat(this.entity.sort)
        // this.entity.price = parseFloat(this.entity.price)
        // this.entity.discount = parseFloat(this.entity.discount)
        this.entity.upperTimeStr = this.formatDate(new Date(this.entity.upperTimeStr));
        this.entity.lowerTimeStr = this.formatDate(new Date(this.entity.lowerTimeStr));
        // delete this.entity.upperTime
        // delete this.entity.lowerTime
        // delete this.entity.scheduleId
        // this.entity.scheduleId='WaiteAudit'
        input.ticketPrice = this.entity;
        console.log(input.ticketPrice);
        this.saving = true;
        this._ticketPriceService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditTicketPriceComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-ticket-price',
            templateUrl: './create-or-edit-ticket-price.component.html',
            styleUrls: [
                'create-or-edit-ticket-price.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.TicketPriceServiceProxy,
            service_proxies_1.TicketServiceProxy])
    ], CreateOrEditTicketPriceComponent);
    return CreateOrEditTicketPriceComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditTicketPriceComponent = CreateOrEditTicketPriceComponent;
