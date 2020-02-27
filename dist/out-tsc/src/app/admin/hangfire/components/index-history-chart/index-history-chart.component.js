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
var IndexHistoryChartComponent = /** @class */ (function () {
    function IndexHistoryChartComponent() {
    }
    Object.defineProperty(IndexHistoryChartComponent.prototype, "chartData", {
        set: function (val) {
            if (val && val.length > 0) {
                if (!this.myChart) {
                    this.showChart(val);
                }
                else {
                    this.myChart.changeData(val); //动态更新图表数据
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    IndexHistoryChartComponent.prototype.ngOnInit = function () {
    };
    IndexHistoryChartComponent.prototype.showChart = function (data) {
        var self = this;
        setTimeout(function () {
            var chartContainer = document.getElementById('index-history-chart');
            if (!chartContainer) {
                return;
            }
            var chart = new G2.Chart({
                container: chartContainer,
                forceFit: true,
                //height: window.innerHeight
                height: 600,
                padding: [60, 60, 100, 50]
            });
            chart.source(data, {
                key: {
                    range: [0, 1]
                }
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.scale('value', {
                alias: '数量'
            });
            chart.areaStack().position('key*value').color('state', function (type) {
                if (type === '失败') {
                    return '#d9534f';
                }
                return '#1890FF';
            });
            chart.lineStack().position('key*value').color('state', function (type) {
                if (type === '失败') {
                    return '#d9534f';
                }
                return '#1890FF';
            }).size(2);
            chart.render();
            self.myChart = chart;
        }, 1000);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], IndexHistoryChartComponent.prototype, "chartData", null);
    IndexHistoryChartComponent = __decorate([
        core_1.Component({
            selector: 'app-index-history-chart',
            template: "<div style=\"padding-top:40px;\" id=\"index-history-chart\"></div>",
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], IndexHistoryChartComponent);
    return IndexHistoryChartComponent;
}());
exports.IndexHistoryChartComponent = IndexHistoryChartComponent;
