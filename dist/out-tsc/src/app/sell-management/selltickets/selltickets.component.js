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
var create_or_edit_passenger_component_1 = require("./create-or-edit-passenger/create-or-edit-passenger.component");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var abc_1 = require("@delon/abc");
var AppConsts_1 = require("abpPro/AppConsts");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var moment = require("moment");
var differenceInCalendarDays = require("date-fns/difference_in_calendar_days");
var signalrservice_1 = require("@shared/service-proxies/signalrservice");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var SellTicketsComponent = /** @class */ (function (_super) {
    __extends(SellTicketsComponent, _super);
    function SellTicketsComponent(injector, _reuseTabService, _scheduleService, _boatService, _routeService, 
    // private _wharfService: WharfServiceProxy,
    _payMethodService, 
    // private _ticketPriceService: TicketPriceServiceProxy,
    _activityService, _modalService, _sourceService, signalRService) {
        var _this = _super.call(this, injector) || this;
        _this._reuseTabService = _reuseTabService;
        _this._scheduleService = _scheduleService;
        _this._boatService = _boatService;
        _this._routeService = _routeService;
        _this._payMethodService = _payMethodService;
        _this._activityService = _activityService;
        _this._modalService = _modalService;
        _this._sourceService = _sourceService;
        _this.signalRService = signalRService;
        _this.imgurl = AppConsts_1.AppConsts.remoteServiceBaseUrl;
        _this.hblist = [];
        _this.nowtimestamp = 0;
        _this.starttimestamp = 0;
        _this.datearr = [];
        _this.nowdate = "";
        _this.nowday = '';
        _this.hangbanquery = [{
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
                field: "wharfId",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "scheduleStatus",
                method: "=",
                value: "",
                logic: "and"
            }, {
                field: "saleDate",
                method: ">=",
                value: "",
                logic: "and"
            }, {
                field: "saleDate",
                method: "<=",
                value: "",
                logic: "and"
            }, {
                field: "checkStartTime",
                method: ">",
                value: "",
                logic: "and"
            }, {
                field: "Boat.runStatus",
                method: "=",
                value: 'Running',
                logic: "and"
            }];
        _this.hangbanList = [];
        _this.hangxianquery = [];
        _this.hangxianList = [];
        _this.youchanquery = [{
                field: "runStatus",
                method: "=",
                value: "Running",
                logic: "and"
            }];
        _this.youchuanList = [];
        _this.matouquery = [];
        _this.matouList = [];
        _this.paymethodList = [];
        _this.sourceId = '';
        _this.scheduleId = '';
        _this.schedule = {
            scheduleCode: '',
            route: {
                routeName: ''
            },
            startTimeStr: '',
            endTimeStr: '',
            saleDateStr: ''
        };
        _this.orderdetail = [];
        _this.curticket = {};
        _this.orderinfo = {
            payMethodId: '',
        };
        _this.totalamount = 0;
        _this.receivable = 0;
        _this.discount = 1;
        _this.receive = 0;
        _this.change = 0;
        _this.today = 0;
        _this.showcalendar = false;
        _this.calendardate = '';
        _this.groupid = 0;
        _this.disabledDate = function (current) {
            return differenceInCalendarDays(current, new Date()) < 0;
        };
        _this._reuseTabService.title = _this.l('航班售票');
        return _this;
    }
    SellTicketsComponent.prototype.calendarctrl = function () {
        this.showcalendar = !this.showcalendar;
    };
    SellTicketsComponent.prototype.clear = function () {
        for (var i = 0; i < 6; i++) {
            this.hangbanquery[i].value = '';
        }
    };
    SellTicketsComponent.prototype.calendarChange = function ($event) {
        // console.log($event)
        var now = new Date($event);
        this.starttimestamp = now.getTime();
        this.settime(0);
        this.showcalendar = !this.showcalendar;
        var now = new Date(now);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var week = now.getDay() + '';
        switch (week) {
            case '1':
                week = '星期一';
                break;
            case '2':
                week = '星期二';
                break;
            case '3':
                week = '星期三';
                break;
            case '4':
                week = '星期四';
                break;
            case '5':
                week = '星期五';
                break;
            case '6':
                week = '星期六';
                break;
            case '0':
                week = '星期日';
                break;
        }
        var fulldate = year + '-' + month + '-' + day;
        this.nowdate = month + "月" + day + "日";
        this.nowday = week;
        this.hangbanquery[5].value = moment(fulldate).format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[6].value = moment(fulldate).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[7].value = moment().format('YYYY-MM-DD HH:mm:ss');
        this.gethangban();
    };
    SellTicketsComponent.prototype.ngOnInit = function () {
        this.getnowdate();
        this.getsource();
        this.calendardate = new Date().toString();
        var now = new Date();
        this.starttimestamp = now.getTime();
        this.settime(0);
        var groupidtemp = localStorage.getItem('groupid');
        if (groupidtemp) {
            this.groupid = parseInt(groupidtemp);
        }
        else {
            var groupid = new Date().getTime();
            this.groupid = groupid;
            localStorage.setItem('groupid', groupid + '');
        }
        this.signalRService.startConnection(this.groupid);
    };
    SellTicketsComponent.prototype.openguest = function () {
        window.open("/#/guest/guestdisplay?gn=" + this.groupid, '_blank', "menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
        var that = this;
        setTimeout(function () {
            if (that.schedule.scheduleCode) {
                that.updateSchedule();
            }
            if (that.orderdetail.length > 0) {
                for (var i = 0; i < that.orderdetail.length; i++) {
                    that.addTicket(that.orderdetail[i]);
                }
            }
        }, 4000);
    };
    SellTicketsComponent.prototype.updateSchedule = function () {
        var data = {
            scheduleCode: this.schedule.scheduleCode,
            routeName: this.schedule.route.routeName,
            startTimeStr: this.schedule.startTimeStr.split(' ')[1],
            endTimeStr: this.schedule.endTimeStr.split(' ')[1],
            saleDateStr: this.schedule.saleDateStr.split(' ')[0]
        };
        this.signalRService.send(this.groupid, 'updateSchedule' + '&' + JSON.stringify(data));
    };
    SellTicketsComponent.prototype.addTicket = function (ticketitem) {
        this.signalRService.send(this.groupid, 'addTicket&' + JSON.stringify(ticketitem));
    };
    SellTicketsComponent.prototype.replace = function (data) {
        this.signalRService.send(this.groupid, 'replace&' + JSON.stringify(data));
    };
    SellTicketsComponent.prototype.deletet = function (i) {
        this.signalRService.send(this.groupid, 'deleteTicket&' + i);
    };
    SellTicketsComponent.prototype.settlement = function () {
        var _this = this;
        if (this.orderdetail.length == 0) {
            abp.message.warn(this.l('PleaseSelectTicket'));
            return;
        }
        if (this.receive < this.totalamount) {
            abp.message.warn(this.l('RecieveAmountLessTanReceivableAmount'));
            return;
        }
        var orderdata = new service_proxies_1.CreateActivityModel();
        // console.log(orderdata)
        orderdata.sourceId = this.sourceId;
        orderdata.payMethodId = this.orderinfo.payMethodId;
        orderdata.activityDetails = [];
        for (var i = 0; i < this.orderdetail.length; i++) {
            orderdata.activityDetails.push(new service_proxies_1.CreateActivityDetailModel({
                ticketPriceId: this.orderdetail[i].ticket.id,
                customerId: this.orderdetail[i].customerId,
                quantity: 1,
                scheduleId: this.scheduleId
            }));
        }
        this._activityService.createActivity(orderdata)
            .subscribe(function (result) {
            if (result.resultCode == "000") {
                _this.notify.success(result.resultMessage);
                _this.gethangban();
                _this.orderdetail = [];
                _this.countprice();
            }
            else {
                abp.message.warn(result.resultMessage);
            }
        });
    };
    SellTicketsComponent.prototype.getsource = function () {
        var _this = this;
        this._sourceService.getPaged(null, 999, 0)
            .subscribe(function (result) {
            // this.sourceList = result.items;
            for (var i = 0; i < result.items.length; i++) {
                if (result.items[i].sourceCode == 'Reception') {
                    _this.sourceId = result.items[i].id;
                }
            }
        });
    };
    SellTicketsComponent.prototype.gethangban = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetSchedulesInput;
        var arr = [];
        for (var i = this.hangbanquery.length - 1; i >= 0; i--) {
            if (this.hangbanquery[i].value) {
                arr.push(new service_proxies_1.QueryData(this.hangbanquery[i]));
            }
        }
        formdata.queryData = arr;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.isEnabled = true;
        formdata.skipCount = 0;
        this._scheduleService.getPaged(formdata)
            .subscribe(function (result) {
            _this.hangbanList = result.items;
        });
    };
    SellTicketsComponent.prototype.createOrEdit = function (item, titem) {
        // console.log(item)
        // console.log(titem)
        // console.log(this.scheduleId)
        var _this = this;
        // console.log(item.scheduleId)
        if (item.scheduleStatus !== "WaitCheck") {
            abp.message.warn(this.l('ScheduleStopSale'));
            return;
        }
        if (item.surplusQuantity == 0) {
            abp.message.warn(this.l('TicketsSoldOut'));
            return;
        }
        // console.log(new Date(item.startTimeStr).getTime())
        // console.log(new Date().getTime())
        if (new Date(item.startTimeStr).getTime() < new Date().getTime()) {
            abp.message.warn(this.l('ScheduleStopSale'));
            return;
        }
        this.curticket = titem;
        if (this.scheduleId && this.scheduleId !== item.id) {
            this._modalService.create({
                nzTitle: this.l('Tips'),
                nzContent: this.l('IsReplaceSchedule'),
                nzClosable: false,
                nzOnOk: function () {
                    _this.schedule = item;
                    _this.scheduleId = item.id;
                    _this.orderdetail = [];
                    _this.updateSchedule();
                    _this.createcustomer();
                }
            });
        }
        else if (this.scheduleId && this.scheduleId == item.id) {
            this.createcustomer();
        }
        else if (!this.scheduleId) {
            this.scheduleId = item.id;
            this.schedule = item;
            this.updateSchedule();
            this.createcustomer();
        }
    };
    SellTicketsComponent.prototype.createcustomer = function () {
        var _this = this;
        this.modalHelper.static(create_or_edit_passenger_component_1.CreateOrEditPassengerComponent)
            .subscribe(function (result) {
            if (result) {
                // console.log(result)
                var hadadd = false;
                var hadindex = 0;
                for (var i = 0; i < _this.orderdetail.length; i++) {
                    if (_this.orderdetail[i].customerId == result.id) {
                        hadadd = true;
                        hadindex = i;
                    }
                }
                if (hadadd) {
                    _this._modalService.create({
                        nzTitle: _this.l('Tips'),
                        nzContent: _this.l('IsReplacePassenger'),
                        nzClosable: false,
                        nzOnOk: function () {
                            var item = {
                                customer: result,
                                customerId: result.id,
                                ticket: _this.curticket
                            };
                            _this.orderdetail[hadindex] = item;
                            var data = {
                                info: item,
                                index: hadindex
                            };
                            _this.replace(data);
                            _this.countprice();
                        }
                    });
                }
                else {
                    var ticketitem = {
                        customer: result,
                        customerId: result.id,
                        ticket: _this.curticket
                    };
                    _this.orderdetail.push(ticketitem);
                    _this.addTicket(ticketitem);
                    _this.countprice();
                }
            }
        });
    };
    SellTicketsComponent.prototype.countprice = function () {
        var totalamount = 0;
        for (var i = 0; i < this.orderdetail.length; i++) {
            totalamount += this.orderdetail[i].ticket.price;
        }
        this.totalamount = totalamount;
        this.receivable = totalamount;
    };
    SellTicketsComponent.prototype.deleteticket = function (i) {
        this.orderdetail.splice(i, 1);
        this.deletet(i);
        this.countprice();
    };
    SellTicketsComponent.prototype.settime = function (e) {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        this.today = new Date(year + '-' + month + '-' + day).getTime();
        if (e == 1) {
            var starttimestamp = this.starttimestamp - 7 * 86400000;
            if (starttimestamp < this.today) {
                var now = new Date();
                this.starttimestamp = now.getTime();
                this.calendarChange(now);
                // abp.message.warn(this.l('TicketSaleClose'))
                return;
            }
        }
        else if (e == 2) {
            var starttimestamp = this.starttimestamp + 7 * 86400000;
        }
        else if (e == 0) {
            var starttimestamp = this.starttimestamp;
        }
        this.starttimestamp = starttimestamp;
        this.datearr = [];
        for (var i = 0; i < 7; i++) {
            var myDate = new Date(starttimestamp + i * 86400000);
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var date = myDate.getDate();
            var dateitem = {
                fulldate: year + '-' + month + '-' + date,
                date: month + "月" + date + "日",
                day: "星期" + "日一二三四五六".charAt(myDate.getDay()),
                enable: false
            };
            var thisdate = new Date();
            var year1 = thisdate.getFullYear();
            var month1 = thisdate.getMonth() + 1;
            var date1 = thisdate.getDate();
            if (dateitem.fulldate == year1 + '-' + month1 + '-' + date1) {
                dateitem.day = '今天';
            }
            if (myDate.getTime() < new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime()) {
                dateitem.enable = false;
            }
            else {
                dateitem.enable = true;
            }
            this.datearr.push(dateitem);
        }
        // console.log(this.datearr)
    };
    SellTicketsComponent.prototype.datechange = function (a, b, c, d) {
        if (!d) {
            abp.message.warn(this.l('TicketSaleClose'));
            return;
        }
        this.nowdate = a;
        this.nowday = b;
        this.hangbanquery[5].value = moment(c).format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[6].value = moment(c).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[7].value = moment().format('YYYY-MM-DD HH:mm:ss');
        this.gethangban();
    };
    SellTicketsComponent.prototype.getnowdate = function () {
        var timestamp = (new Date()).getTime();
        var now = new Date(timestamp);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var week = now.getDay() + '';
        switch (week) {
            case '1':
                week = '星期一';
                break;
            case '2':
                week = '星期二';
                break;
            case '3':
                week = '星期三';
                break;
            case '4':
                week = '星期四';
                break;
            case '5':
                week = '星期五';
                break;
            case '6':
                week = '星期六';
                break;
            case '0':
                week = '星期日';
                break;
        }
        this.nowdate = month + "月" + day + "日";
        this.nowday = week;
        var fulldate = year + '-' + month + '-' + day;
        this.hangbanquery[5].value = moment(fulldate).format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[6].value = moment(fulldate).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[7].value = moment().format('YYYY-MM-DD HH:mm:ss');
        this.gethangban();
        this.gethangxian();
        this.getyouchan();
        // this.getmatou()
        this.getpaymethod();
    };
    SellTicketsComponent.prototype.gethangxian = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetRoutesInput();
        formdata.queryData = this.hangxianquery;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._routeService.getPaged(formdata)
            .subscribe(function (result) {
            _this.hangxianList = result.items;
        });
    };
    SellTicketsComponent.prototype.getyouchan = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetBoatsInput;
        var arr = [];
        for (var i = this.youchanquery.length - 1; i >= 0; i--) {
            if (this.youchanquery[i].value) {
                arr.push(new service_proxies_1.QueryData(this.youchanquery[i]));
            }
        }
        formdata.queryData = arr;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._boatService.getPaged(formdata)
            .subscribe(function (result) {
            _this.youchuanList = result.items;
        });
    };
    // getmatou(){
    //   const formdata = new GetWharfsInput()
    //   formdata.queryData = this.matouquery;
    //   formdata.sorting = null
    //   formdata.maxResultCount = 999;
    //   formdata.skipCount = 0;
    //   this._wharfService.getPaged(formdata)
    //   .subscribe(result => {
    //     this.matouList = result.items;
    //   });
    // }
    SellTicketsComponent.prototype.getpaymethod = function () {
        var _this = this;
        this._payMethodService.getPaged(null, 999, 0)
            .subscribe(function (result) {
            _this.paymethodList = result.items;
            _this.orderinfo.payMethodId = result.items[0].id;
        });
    };
    SellTicketsComponent = __decorate([
        core_1.Component({
            selector: 'app-selltickets',
            templateUrl: './selltickets.component.html',
            styleUrls: ['./selltickets.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            abc_1.ReuseTabService,
            service_proxies_1.ScheduleServiceProxy,
            service_proxies_1.BoatServiceProxy,
            service_proxies_1.RouteServiceProxy,
            service_proxies_1.PayMethodServiceProxy,
            service_proxies_1.ActivityServiceProxy,
            ng_zorro_antd_1.NzModalService,
            service_proxies_1.SourceServiceProxy,
            signalrservice_1.SignalRService])
    ], SellTicketsComponent);
    return SellTicketsComponent;
}(app_component_base_1.AppComponentBase));
exports.SellTicketsComponent = SellTicketsComponent;
