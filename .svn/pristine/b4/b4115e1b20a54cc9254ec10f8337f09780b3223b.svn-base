import {
  Component,
  OnInit,
  Input,
  Injector,
  Output,
  EventEmitter
} from '@angular/core';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/component-base';
import * as _ from 'lodash';
import {
  HangFireStorageJob,
  HangfireServiceServiceProxy,
  IPagedResultDtoOfHangFireStorageJob,
  JobState
} from '@shared/service-proxies/service-proxies';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobcommontable',
  templateUrl: './jobcommontable.component.html',
  styleUrls: ['./jobcommontable.component.less']
})
export class JobcommontableComponent
  extends PagedListingComponentBase<HangFireStorageJob>
  implements OnInit {
  @Input() queuename;
  @Input() dataList;
  @Input() totalItems;
  @Input() state: JobState;
  @Input() enumName: any;
  @Input() title: string;
  togglePara = { selectedKey: '', state: false };

  @Output() onDeleteJobEvent = new EventEmitter();
  @Output() onRunRetryEvent = new EventEmitter();
  @Output() onRetryEvent = new EventEmitter();
  @Output() outDetailPageEvent = new EventEmitter();

  constructor(
    private injector: Injector,
    private router: Router,
    private _hangfire: HangfireServiceServiceProxy
  ) {
    super(injector);
    this.pageSize = 10;
    this.pageNumber = 1;
  }

  ngOnInit() {
    this.isTableLoading = false;
  }

  getTableSelectedIds() {
    const selectCount = this.selectedDataItems.length;
    if (selectCount <= 0) {
      this.message.warn('请选择作业！', '提示');
      return;
    }
    let jobIds = _.map(this.selectedDataItems, 'key');
    return jobIds;
  }

  /**
   * 删除作业
   */
  onDeleteJob() {
    let jobIds = this.getTableSelectedIds();
    this.onDeleteJobEvent.emit(jobIds);
  }
  //加入队列
  onRunRetry() {
    let jobIds = this.getTableSelectedIds();
    this.onRunRetryEvent.emit(jobIds);
  }
  //重新加入队列
  onRetry() {
    const jobIds = this.getTableSelectedIds();
    this.onRetryEvent.emit(jobIds);
  }
  onLoadData() {
    this.fetchDataList(new PagedRequestDto(), 1, Function);
  }
  /**
   * 查询选中的作业数据
   */
  protected fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this.isTableLoading = true;
    request.maxResultCount = this.pageSize;
    request.skipCount = request.maxResultCount * (pageNumber - 1);
    this._hangfire
      .getAllJobs(
        this.state,
        this.queuename,
        '',
        '',
        request.maxResultCount,
        request.skipCount
      )
      .finally(() => {
        finishedCallback();
        this.isTableLoading = false;
      })
      .subscribe((result: IPagedResultDtoOfHangFireStorageJob) => {
        this.dataList = result.items;
        this.totalItems = result.totalCount;
        this.dataList.forEach(ret => {
          (<any>ret).expand = false;
        });
      });
  }
  toggleDetail(key: any) {
    this.togglePara.selectedKey = key;
    this.togglePara.state = !this.togglePara.state;
    this.dataList.forEach(ret => {
      if (ret.key == key) {
        (<any>ret).expand = this.togglePara.state;
      }
    });
  }
  selectEnqueue(queuename: any) {
    this.togglePara.state = !this.togglePara.state;
    this.dataList.forEach(ret => {
      if (ret.queuename == queuename) {
        (<any>ret).expand = this.togglePara.state;
      }
    });
  }
  //跳转页面不同模块
  locationDetail = id => {
    this.router.navigate(['/app/admin/hangfire'], {
      queryParams: { key: id },
      skipLocationChange: true
    });
    this.outDetailPageEvent.emit(id);
  };

  onSelectQueue(queuename: any) {
    this.router.navigate(['/app/admin/hangfire'], {
      queryParams: { key: '', queuename: queuename },
      skipLocationChange: true
    });
  }
}
