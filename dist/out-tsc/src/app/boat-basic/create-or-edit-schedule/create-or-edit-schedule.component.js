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
var CreateOrEditScheduleComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditScheduleComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditScheduleComponent(injector, _scheduleService, _routeService, _boatService, _ticketPriceService) {
        var _this = _super.call(this, injector) || this;
        _this._scheduleService = _scheduleService;
        _this._routeService = _routeService;
        _this._boatService = _boatService;
        _this._ticketPriceService = _ticketPriceService;
        _this.entity = new service_proxies_1.ScheduleEditDto();
        _this.queryData = [];
        _this.boatList = [];
        _this.routeList = [];
        _this.ticketlist = [];
        return _this;
    }
    CreateOrEditScheduleComponent.prototype.ngOnInit = function () {
        this.init();
    };
    CreateOrEditScheduleComponent.prototype.formatDateTime = function (date) {
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
    CreateOrEditScheduleComponent.prototype.formatDate = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var datesrt = year + '-' + month + '-' + day;
        return datesrt;
    };
    CreateOrEditScheduleComponent.prototype.formatTime = function (date) {
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
        var datesrt = hours + ':' + minutes + ':' + seconds;
        return datesrt;
    };
    /**
    * 初始化方法
    */
    CreateOrEditScheduleComponent.prototype.init = function () {
        var _this = this;
        this._scheduleService.getForEdit(this.id).subscribe(function (result) {
            if (result.schedule.id) {
                _this.sDStr = new Date(result.schedule.saleDate.toString());
                _this.sStr = new Date(result.schedule.startTime.toString());
                _this.eStr = new Date(result.schedule.endTime.toString());
                _this.cSStr = new Date(result.schedule.checkStartTime.toString());
                _this.cEStr = new Date(result.schedule.checkEndTime.toString());
            }
            else {
                _this.sDStr = new Date();
                _this.sStr = new Date();
                _this.eStr = new Date();
                _this.cSStr = new Date();
                _this.cEStr = new Date();
                result.schedule.routeId = '';
                result.schedule.boatId = '';
            }
            _this.entity = result.schedule;
        });
        this.getboat();
        this.getroute();
        this.getticket();
    };
    CreateOrEditScheduleComponent.prototype.getticket = function () {
        var _this = this;
        var arr = [];
        // arr.push(new QueryData({
        //     field: "position",
        //     method: "=",
        //     value: "windows",
        //     logic: "and"
        // }))
        this._ticketPriceService.getPaged(arr, null, 999, 0)
            .subscribe(function (result) {
            _this.ticketlist = result.items;
        });
    };
    CreateOrEditScheduleComponent.prototype.getboat = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetBoatsInput();
        formdata.queryData = this.queryData;
        formdata.sorting = "";
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._boatService.getPaged(formdata)
            .subscribe(function (result) {
            _this.boatList = result.items;
        });
    };
    CreateOrEditScheduleComponent.prototype.getroute = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetRoutesInput();
        formdata.queryData = this.queryData;
        formdata.sorting = "";
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._routeService.getPaged(formdata)
            .subscribe(function (result) {
            _this.routeList = result.items;
        });
    };
    CreateOrEditScheduleComponent.prototype.boatChange = function ($event) {
        for (var i = 0; i < this.boatList.length; i++) {
            if (this.boatList[i].id == $event) {
                this.entity.seatQuantity = this.boatList[i].seatNumber;
                // this.entity.surplusQuantity =  this.boatList[i].seatNumber
                if (!this.id) {
                    this.entity.surplusQuantity = this.boatList[i].seatNumber;
                }
            }
        }
        // this.entity.seatQuantity = 
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditScheduleComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateScheduleInput();
        var date = this.formatDate(this.sDStr);
        this.entity.saleDateStr = this.formatDate(this.sDStr) + ' 00:00:00';
        this.entity.startTimeStr = date + ' ' + this.formatTime(this.sStr);
        this.entity.endTimeStr = date + ' ' + this.formatTime(this.eStr);
        this.entity.checkStartTimeStr = date + ' ' + this.formatTime(this.cSStr);
        this.entity.checkEndTimeStr = date + ' ' + this.formatTime(this.cEStr);
        delete this.entity.saleDate;
        delete this.entity.startTime;
        delete this.entity.endTime;
        delete this.entity.checkStartTime;
        delete this.entity.checkEndTime;
        input.schedule = this.entity;
        this.saving = true;
        this._scheduleService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditScheduleComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-schedule',
            templateUrl: './create-or-edit-schedule.component.html',
            styleUrls: [
                'create-or-edit-schedule.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ScheduleServiceProxy,
            service_proxies_1.RouteServiceProxy,
            service_proxies_1.BoatServiceProxy,
            service_proxies_1.TicketPriceServiceProxy])
    ], CreateOrEditScheduleComponent);
    return CreateOrEditScheduleComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditScheduleComponent = CreateOrEditScheduleComponent;
