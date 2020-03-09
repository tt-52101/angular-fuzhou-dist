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
var LODOP;
var InternetTicketComponent = /** @class */ (function (_super) {
    __extends(InternetTicketComponent, _super);
    function InternetTicketComponent(injector, _activityService, _ticketDetailService, _modalService) {
        var _this = _super.call(this, injector) || this;
        _this._activityService = _activityService;
        _this._ticketDetailService = _ticketDetailService;
        _this._modalService = _modalService;
        _this.queryData = [{
                field: "qrCode",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "activityNo",
                method: "%",
                value: "",
                logic: "and"
            }, {
                field: "mobile",
                method: "%",
                value: "",
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
        _this.single = false;
        _this.allChecked = false;
        _this.checkboxIndeterminate = false;
        _this.selectedDataItems = [];
        return _this;
    }
    InternetTicketComponent.prototype.ngOnInit = function () {
        this.init();
    };
    InternetTicketComponent.prototype.init = function () {
    };
    InternetTicketComponent.prototype.query = function () {
        var _this = this;
        var arr = [];
        for (var i = 1; i < this.queryData.length; i++) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        var formdata = new service_proxies_1.GetActivitysInput;
        formdata.queryData = arr;
        formdata.certificatesNum = this.certificatesNum;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._activityService.getPaged(formdata)
            .subscribe(function (result) {
            if (result.items.length == 0) {
                abp.message.warn(_this.l('NoOrder'));
            }
            else {
                _this.single = false;
                _this.orderlist = result.items;
            }
        });
    };
    InternetTicketComponent.prototype.checkAll = function ($event) {
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
    };
    InternetTicketComponent.prototype.refreshCheckStatus = function (entityList) {
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
    };
    InternetTicketComponent.prototype.select = function (item) {
        var _this = this;
        this.single = true;
        this.orderinfo = item;
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
    InternetTicketComponent.prototype.printticket = function () {
        // console.log(this.orderticket)
        var _this = this;
        var idarr = [];
        var ticketarr = [];
        for (var i = 0; i < this.orderticket.length; i++) {
            if (this.orderticket[i].checked) {
                idarr.push(this.orderticket[i].id);
                ticketarr.push(this.orderticket[i]);
            }
        }
        if (idarr.length == 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        this._ticketDetailService.printTicketDetail(idarr)
            .subscribe(function (result) {
            _this.select(_this.orderinfo);
            _this.notify.success(_this.l('PrintSuccess'));
            // LODOP=getLodop();
            // var top = 22; //最高坐标
            // var left = 100; //最左坐标
            // var width = 10; //上边距
            // var height = 12; //右边距
            // var QRcodeWidth = 120; //二维码大小
            // var paperWidth = 700; //纸张宽度
            // var paperHeight = 1200; //纸张长度
            // var fontWidth = 400; //文字区域宽度
            // var fontHeight = 20; //文字区域高度
            // LODOP.SET_PRINT_STYLEA(0, "DataCharset", "UTF-8");
            // LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
            // LODOP.PRINT_INITA("");
            // LODOP.SET_PRINT_STYLE("FontSize", 10);
            // //设置打印方向及纸张类型，自定义纸张宽度，设定纸张高，
            // LODOP.SET_PRINT_PAGESIZE(1, paperWidth, paperHeight, "");
            // for (var i = 0; i < ticketarr.length; i++) {
            //   var item = ticketarr[i];
            //   var saleDate=moment(item.schedule.saleDate).format('YYYY-MM-DD');
            //   var startTime=moment(item.schedule.startTime).format('HH:mm:ss');
            //   LODOP.NewPage(); //创建新的打印页
            //   LODOP.ADD_PRINT_BARCODE(top + 15, left + height, QRcodeWidth, QRcodeWidth, "QRCode", item.qrCode);
            //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270); //逆时针旋转270度
            //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 5 * fontHeight, fontWidth, fontHeight, "票    号：" + item.ticketNo);
            //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
            //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 4 * fontHeight, fontWidth, fontHeight, "船    名：" + item.schedule.boat.boatName);
            //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
            //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 3 * fontHeight, fontWidth, fontHeight, "航班日期：" + saleDate);
            //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
            //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 2 * fontHeight, fontWidth, fontHeight, "开船时间：" + startTime);
            //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
            //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 1 * fontHeight, fontWidth, fontHeight, "乘客姓名：" + item.customer.customerName);
            //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
            // }
            // //LODOP.PRINT();
            // LODOP.PREVIEW()
            // window.print();
        });
    };
    InternetTicketComponent = __decorate([
        core_1.Component({
            selector: 'app-internetticket',
            templateUrl: './internetticket.component.html',
            styleUrls: ['./internetticket.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ActivityServiceProxy,
            service_proxies_1.TicketDetailServiceProxy,
            ng_zorro_antd_1.NzModalService])
    ], InternetTicketComponent);
    return InternetTicketComponent;
}(app_component_base_1.AppComponentBase));
exports.InternetTicketComponent = InternetTicketComponent;
