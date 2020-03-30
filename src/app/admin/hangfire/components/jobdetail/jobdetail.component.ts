import { Component, OnInit, Input, Injector, EventEmitter, Output } from '@angular/core';
import { AppComponentBase } from '@shared/component-base';
import { HangfireServiceServiceProxy, HangfireJobDetailDto, RecurringJobInput } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.less']
})
export class JobdetailComponent extends AppComponentBase implements OnInit {

  @Input() jobKey;
  loading = false;
  jobDetail = new HangfireJobDetailDto();
  constructor(private injector: Injector,
    private _hangfire: HangfireServiceServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this.onLoadDetailData();
  }

  /**
   * 加载作业详情数据
   */
  onLoadDetailData() {
    this.loading = true;
    this._hangfire.getJobDetail(this.jobKey).finally(() => {
      this.loading = false;
    }).subscribe(ret => {
      this.jobDetail = ret;
    });
  }

  onRetryData() {
    let input = new RecurringJobInput();
    input.jobId = [];
    input.jobId.push(this.jobKey);
    this._hangfire.addEnqueueJob(input).finally(() => {
      this.loading = false;
      this.onLoadDetailData();
    }).subscribe(() => {
      this.notify.info('重试成功！');
    });
  }
  onDeleteJobData() {
    let input = new RecurringJobInput();
    input.jobId = [];
    input.jobId.push(this.jobKey);
    this._hangfire.deleteJob(input.jobId).finally(() => {
      this.loading = false;
      this.onLoadDetailData();
    }).subscribe(() => {
      this.notify.info('删除成功！');
    });
  }
}
