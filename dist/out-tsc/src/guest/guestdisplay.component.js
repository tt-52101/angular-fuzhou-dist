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
var app_component_base_1 = require("@shared/component-base/app-component-base");
var signalrservice_1 = require("@shared/service-proxies/signalrservice");
var abc_1 = require("@delon/abc");
var GuestdisplayComponent = /** @class */ (function (_super) {
    __extends(GuestdisplayComponent, _super);
    function GuestdisplayComponent(injector, signalRService, _reuseTabService) {
        var _this = _super.call(this, injector) || this;
        _this.signalRService = signalRService;
        _this._reuseTabService = _reuseTabService;
        _this.totalamount = 0;
        _this.ticketlist = [];
        _this.groupid = 0;
        return _this;
    }
    GuestdisplayComponent.prototype.ngOnInit = function () {
        this.startconnedt();
    };
    GuestdisplayComponent.prototype.startconnedt = function () {
        var that = this;
        var query = window.location.href.split('=')[1];
        that.signalRService.startConnection(query);
        that.signalRService.hubConnection.on("messageReceived", function (username, message) {
            if (message == 'joinGroup' && that.groupid == 0) {
                that.groupid = username;
                return;
            }
            if (username == that.groupid) {
                var methodname = message.split('&')[0];
                var data = JSON.parse(message.split('&')[1]);
                if (methodname == 'updateSchedule') {
                    that.scheduleCode = data.scheduleCode;
                    that.routeName = data.routeName;
                    that.startTimeStr = data.startTimeStr;
                    that.endTimeStr = data.endTimeStr;
                    that.saleDateStr = data.saleDateStr;
                }
                else if (methodname == 'addTicket') {
                    var ticket = {
                        ticketName: data.ticket.ticketName,
                        customerName: data.customer.customerName,
                        verifiableType: that.l(data.customer.verifiableType),
                        price: data.ticket.price
                    };
                    that.ticketlist.push(ticket);
                    that.countprice();
                }
                else if (methodname == 'deleteTicket') {
                    that.ticketlist.splice(data.index, 1);
                    that.countprice();
                }
                else if (methodname == 'replace') {
                    var ticket = {
                        ticketName: data.info.ticket.ticketName,
                        customerName: data.info.customer.customerName,
                        verifiableType: that.l(data.info.customer.verifiableType),
                        price: data.info.ticket.price
                    };
                    that.ticketlist.splice(data.index, 1, ticket);
                    that.countprice();
                }
            }
        });
    };
    GuestdisplayComponent.prototype.countprice = function () {
        var totalamount = 0;
        for (var i = 0; i < this.ticketlist.length; i++) {
            totalamount += this.ticketlist[i].price;
        }
        this.totalamount = totalamount;
    };
    GuestdisplayComponent = __decorate([
        core_1.Component({
            selector: 'app-guestdisplay',
            templateUrl: './guestdisplay.component.html',
            styleUrls: ['guestdisplay.component.less']
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            signalrservice_1.SignalRService,
            abc_1.ReuseTabService])
    ], GuestdisplayComponent);
    return GuestdisplayComponent;
}(app_component_base_1.AppComponentBase));
exports.GuestdisplayComponent = GuestdisplayComponent;
