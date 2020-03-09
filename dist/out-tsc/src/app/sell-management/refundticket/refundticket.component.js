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
var app_component_base_1 = require("@shared/component-base/app-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var RefundTicketComponent = /** @class */ (function (_super) {
    __extends(RefundTicketComponent, _super);
    function RefundTicketComponent(injector, _activityService, _ticketDetailService, _modalService) {
        var _this = _super.call(this, injector) || this;
        _this._activityService = _activityService;
        _this._ticketDetailService = _ticketDetailService;
        _this._modalService = _modalService;
        _this.queryData = [{
                field: "ticketNo",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "qrcode",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "mobile",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "activityType",
                method: "=",
                value: "ActivityTypePayment",
                logic: "and"
            }, {
                field: "buyer",
                method: "%",
                value: "",
                logic: "and"
            }];
        _this.certificatesNum = '';
        _this.orderlist = [];
        _this.orderinfo = {};
        _this.orderticket = [];
        _this.rDiscount = '0.9';
        _this.refundcount = 0;
        _this.single = false;
        _this.remark = '';
        _this.allChecked = false;
        _this.checkboxIndeterminate = false;
        _this.selectedDataItems = [];
        return _this;
    }
    RefundTicketComponent.prototype.ngOnInit = function () {
        this.init();
    };
    RefundTicketComponent.prototype.init = function () {
    };
    RefundTicketComponent.prototype.query = function () {
        var _this = this;
        var arr = [];
        if (this.queryData[0].value || this.queryData[1].value) {
            for (var i = 0; i < 2; i++) {
                if (this.queryData[i].value) {
                    arr.push(new service_proxies_1.QueryData(this.queryData[i]));
                }
            }
            this._ticketDetailService.getPaged(arr, null, 999, 0)
                .subscribe(function (result) {
                if (result.items.length > 0) {
                    _this.single = true;
                    // for (var i =0;i< result.items.length; i++) {
                    //   result.items[i].isPrint=false
                    // }
                    _this.orderticket = result.items;
                    _this.orderinfo = result.items[0].activity;
                }
                else {
                    abp.message.warn(_this.l('NoOrder'));
                }
            });
        }
        else {
            for (var i = 2; i < 4; i++) {
                if (this.queryData[i].value) {
                    arr.push(new service_proxies_1.QueryData(this.queryData[i]));
                }
            }
            var formdata = new service_proxies_1.GetActivitysInput;
            formdata.queryData = arr;
            formdata.sorting = null;
            formdata.certificatesNum = this.certificatesNum;
            formdata.maxResultCount = 999;
            formdata.skipCount = 0;
            this._activityService.getPaged(formdata)
                .subscribe(function (result) {
                if (result.items.length == 0) {
                    abp.message.warn(_this.l('NoOrder'));
                }
                else {
                    // else if(result.items.length==1){
                    // this.orderinfo = result.items;
                    // this.select(result.items[0])
                    // this.single=true
                    // }else{
                    _this.single = false;
                    _this.orderlist = result.items;
                }
            });
        }
    };
    RefundTicketComponent.prototype.select = function (item) {
        var _this = this;
        // console.log(item)
        if (item.payStatus !== 'PayStatusPayment') {
            abp.message.warn(this.l('该订单不能退款'));
            return;
        }
        this.single = true;
        this.orderinfo = item;
        // var formdata=new GetActivitysInput
        // formdata.queryData = arr;
        // formdata.sorting = null;
        // formdata.maxResultCount = 999;
        // formdata.skipCount = 0;
        var arr = [new service_proxies_1.QueryData({
                field: "ActivityDetail.Activity.ActivityNo",
                method: "=",
                value: item.activityNo,
                logic: "and"
            })];
        this._ticketDetailService.getPaged(arr, null, 999, 0)
            .subscribe(function (result) {
            _this.orderticket = result.items;
        });
    };
    RefundTicketComponent.prototype.countprice = function () {
        var _this = this;
        var arr = [];
        for (var i = 0; i < this.orderticket.length; i++) {
            if (this.orderticket[i].checked) {
                arr.push(this.orderticket[i].id);
            }
        }
        // if(arr.length==0){
        //   abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
        //   return
        // }
        if (arr.length == 0) {
            return;
        }
        console.log(arr, this.rDiscount);
        this._activityService.sumRefund(arr, parseFloat(this.rDiscount))
            .subscribe(function (result) {
            console.log(result);
            if (result.resultCode == '000') {
                _this.refundcount = result.date;
            }
            else {
                abp.message.warn(_this.l(result.resultMessage));
            }
            // window.print();
        });
    };
    RefundTicketComponent.prototype.printticket = function () {
        var _this = this;
        // var hadcheck=0
        // var isPrint=0
        var arr = [];
        for (var i = 0; i < this.orderticket.length; i++) {
            if (this.orderticket[i].checked) {
                arr.push(this.orderticket[i].id);
            }
        }
        if (arr.length == 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        console.log();
        this._activityService.refundTicket(arr, parseFloat(this.rDiscount), this.remark)
            .subscribe(function (result) {
            if (result.resultCode == "000") {
                _this.select(_this.orderinfo);
                _this.notify.success(_this.l('RefundSuccess'));
                _this.orderlist = [];
                _this.single = false;
            }
            else {
                abp.message.warn(result.resultMessage);
            }
        });
    };
    RefundTicketComponent.prototype.checkAll = function ($event) {
        console.log($event);
        if ($event) {
            for (var i = 0; i < this.orderticket.length; i++) {
                this.orderticket[i].checked = true;
            }
        }
        else {
            for (var i = 0; i < this.orderticket.length; i++) {
                this.orderticket[i].checked = false;
            }
        }
        this.countprice();
    };
    RefundTicketComponent.prototype.refreshCheckStatus = function (entityList) {
        // 是否全部选中
        var allChecked = entityList.every(function (value) { return value.checked === true; });
        // 是否全部未选中
        var allUnChecked = entityList.every(function (value) { return !value.checked; });
        // 是否全选
        this.allChecked = allChecked;
        // 全选框样式控制
        this.checkboxIndeterminate = !allChecked && !allUnChecked;
        // 已选中数据
        this.selectedDataItems = entityList.filter(function (value) { return value.checked; });
        this.countprice();
    };
    RefundTicketComponent = __decorate([
        core_1.Component({
            selector: 'app-refundticket',
            templateUrl: './refundticket.component.html',
            styleUrls: ['./refundticket.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ActivityServiceProxy,
            service_proxies_1.TicketDetailServiceProxy,
            ng_zorro_antd_1.NzModalService])
    ], RefundTicketComponent);
    return RefundTicketComponent;
}(app_component_base_1.AppComponentBase));
exports.RefundTicketComponent = RefundTicketComponent;
