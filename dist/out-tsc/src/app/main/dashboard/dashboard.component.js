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
var theme_1 = require("@delon/theme");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var routerTransition_1 = require("@shared/animations/routerTransition");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var differenceInCalendarDays = require("date-fns/difference_in_calendar_days");
var DashboardComponent = /** @class */ (function (_super) {
    __extends(DashboardComponent, _super);
    function DashboardComponent(injector, http, msg, _scheduleService) {
        var _this = _super.call(this, injector) || this;
        _this.http = http;
        _this.msg = msg;
        _this._scheduleService = _scheduleService;
        _this.peoplecount = 119000;
        _this.incomecount = 20006700.00;
        _this.range1 = 'day';
        _this.range2 = 'day';
        _this.tabbarindex = 0;
        _this.datepicker = '';
        // theme = {}
        _this.schedulelist = [];
        _this.disabledDate = function (current) {
            // Can not select days before today and today
            return differenceInCalendarDays(current, new Date()) < 0;
        };
        _this.queryData = [{
                field: "starttime",
                method: ">=",
                value: "",
                logic: "and"
            }, {
                field: "endtime",
                method: "<=",
                value: "",
                logic: "and"
            }];
        return _this;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var that = this;
        setTimeout(function () {
            that.setecharts1();
            that.setecharts2();
        }, 1000);
        this.getschedule(1);
    };
    ;
    DashboardComponent.prototype.getschedule = function (days) {
        var _this = this;
        var now = new Date();
        var nextnow = new Date(now.getTime() + (days * 86400000));
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var nextyear = new Date(nextnow).getFullYear();
        var nextmonth = new Date(nextnow).getMonth() + 1;
        var nextday = new Date(nextnow).getDate();
        // console.log(nextday)
        this.queryData[0].value = year + '-' + month + '-' + day + ' 00:00:00';
        this.queryData[1].value = nextyear + '-' + nextmonth + '-' + nextday + ' 00:00:00';
        var formdata = new service_proxies_1.GetSchedulesInput;
        var arr = [];
        for (var i = this.queryData.length - 1; i >= 0; i--) {
            if (this.queryData[i].value) {
                arr.push(new service_proxies_1.QueryData(this.queryData[i]));
            }
        }
        formdata.queryData = arr;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._scheduleService.getPaged(formdata)
            .subscribe(function (result) {
            _this.schedulelist = result.items;
        });
    };
    DashboardComponent.prototype.setecharts1 = function () {
        var date1 = [];
        var data1 = [Math.random() * 24];
        for (var i = 0; i < 11; i++) {
            var now = new Date();
            date1.push([now.getMinutes(), now.getSeconds() + i].join(':'));
            data1.push(Math.round((Math.random() - 0.3) * 10));
        }
        console.log(data1);
        var option1 = {
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            title: {
                left: 'center',
                text: '',
                textStyle: {
                    fontSize: 25
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date1
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }],
            series: [{
                    name: '',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#495BE6'
                    },
                    areaStyle: {
                        color: {
                            type: 'radial',
                            x: 0.9,
                            y: 0.9,
                            r: 0.9,
                            colorStops: [{
                                    offset: 0,
                                    color: '#CAD2FC'
                                }, {
                                    offset: 1,
                                    color: '#F1EBFF'
                                }],
                        }
                    },
                    data: data1
                }]
        };
        console.log(option1);
        var chart1 = echarts.init(document.getElementById("container1")).setOption(option1, true);
    };
    ;
    DashboardComponent.prototype.setecharts2 = function () {
        var data2 = [
            { value: 35, name: '老人票' },
            { value: 30, name: '假日票' },
            { value: 24, name: '儿童票' },
            { value: 48, name: '成人票' },
        ];
        var option2 = {
            title: {
                text: '今日票型比例分析',
                x: 'center',
                textStyle: {
                    fontSize: 25
                }
            },
            color: [
                "#5d77ff", "#9e7bff", "#889aff", "#c8d0ff", "#4cb666", "#41baff", "#9e7bff", "#308de5", "#4cb666", "#8abaeb", "#65a6e4", "#7384f5", "#6a95ef", "#c0d7ff", "#f5cead"
            ],
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c}"
            },
            legend: {
                orient: 'vertical',
                type: 'scroll',
                right: 'right',
                data: data2
            },
            series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: data2,
                    itemStyle: {
                        normal: {
                            labelLine: {
                                length: 50,
                            },
                            label: {
                                textStyle: {
                                    color: '#3C4353',
                                    fontSize: 16
                                }
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
        };
        var chart2 = echarts.init(document.getElementById("container2")).setOption(option2, true);
    };
    ;
    DashboardComponent.prototype.datechange = function () {
    };
    ;
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            theme_1._HttpClient,
            ng_zorro_antd_1.NzMessageService,
            service_proxies_1.ScheduleServiceProxy])
    ], DashboardComponent);
    return DashboardComponent;
}(app_component_base_1.AppComponentBase));
exports.DashboardComponent = DashboardComponent;
