"use strict";
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
var theme_1 = require("@delon/theme");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(settings) {
        this.settings = settings;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        // this.settings.setLayout('theme', 'light');
        // console.log(this.settings.layout)
        var that = this;
        that.settime();
        setInterval(function () {
            that.settime();
        }, 1000);
    };
    HeaderComponent.prototype.settime = function () {
        var now = new Date();
        var year = now.getFullYear(); //年
        var month = now.getMonth() + 1; //月
        var day = now.getDate(); //日
        var week = now.getDay() + '';
        // console.log(week)
        var hour = now.getHours();
        var minute = now.getMinutes();
        var date = year + "年" + month + "月" + day + "日";
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
        this.date = date;
        if (minute < 10) {
            this.time = hour + ':0' + minute;
        }
        else {
            this.time = hour + ':' + minute;
        }
        this.day = week;
    };
    HeaderComponent.prototype.toggleCollapsedSidebar = function () {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    };
    HeaderComponent.prototype.searchToggleChange = function () {
        this.searchToggleStatus = !this.searchToggleStatus;
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'layout-header',
            templateUrl: './header.component.html',
        }),
        __metadata("design:paramtypes", [theme_1.SettingsService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
