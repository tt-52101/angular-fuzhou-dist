"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var signalR = require("@aspnet/signalr");
var SignalRService = /** @class */ (function () {
    function SignalRService() {
        var _this = this;
        this.startConnection = function (groupname) {
            _this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl('http://host.sweii.cn/signalr')
                .build();
            _this.hubConnection.start()
                .then(function () {
                _this.send(groupname, 'joinGroup');
            })
                .catch(function (err) { return console.log('Error while starting connection: ' + err); });
        };
        this.addTransferChartDataListener = function () {
            _this.hubConnection.on('messageReceived', function (username, message) {
            });
        };
        this.send = function (username, message) {
            _this.hubConnection.send('newMessage', username, message)
                .catch(function (err) { return console.error(err); });
        };
    }
    SignalRService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SignalRService);
    return SignalRService;
}());
exports.SignalRService = SignalRService;
