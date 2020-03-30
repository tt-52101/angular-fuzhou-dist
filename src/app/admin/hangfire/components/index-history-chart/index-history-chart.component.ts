import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-index-history-chart',
  template: `<div style="padding-top:40px;" id="index-history-chart"></div>`,
  styles: []
})
export class IndexHistoryChartComponent implements OnInit {

  myChart: any;
  @Input()
  set chartData(val: any) {
    if (val && val.length > 0) {
      if (!this.myChart) {
        this.showChart(val);
      } else {
        this.myChart.changeData(val); //动态更新图表数据
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

  showChart(data: any) {
    const self = this;
    setTimeout(() => {
      let chartContainer =document.getElementById('index-history-chart');
      if(!chartContainer){
        return;
      }

      const chart = new G2.Chart({
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
  }
}

