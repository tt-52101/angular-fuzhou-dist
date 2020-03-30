import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/component-base/paged-listing-component-base';
import {
  HangfireServiceServiceProxy,
  HangFireStorageJob,
  StatisticsInfoDto,
  JobState,
  IPagedResultDtoOfHangFireStorageJob,
  RecurringJobInput,
  ServerResultList,
  RecurringResultList,
  PagedResultDtoOfRecurringListJobDto,
  RetriesResultList,
  PagedResultDtoOfRetriesJobListDto,
  SearchTimeType,
  DashboardIndexDetailDto
} from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import * as moment from 'moment';
import { JobcommontableComponent } from './components/jobcommontable/jobcommontable.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-hangfire',
  templateUrl: './hangfire.component.html',
  styleUrls: ['./hangfire.component.less']
})
export class HangfireComponent
  extends PagedListingComponentBase<HangFireStorageJob>
  implements OnInit {
  @ViewChild(JobcommontableComponent, { static: false })
  childCommonTable: JobcommontableComponent; //父组件中获得子组件的引用

  @ViewChild(DynamicTableComponent, { static: false })
  dynamicTable: DynamicTableComponent; //动态表格

  // @ViewChild('currentChart')
  // currentChart: CurrentDataChartComponent;

  selectedIndex: any;
  statisticsInfoDto = new StatisticsInfoDto();
  statisticsDatas = [];
  listArray = [
    { title: 'Enqueued', count: 0, state: 'Enqueued' },
    { title: '计划', count: 0, state: 'Plan' },
    { title: '执行中', count: 0, state: 'Runing' },
    { title: '完成', count: 0, state: 'Success' },
    { title: '失败', count: 0, state: 'Faile' },
    { title: '删除', count: 0, state: 'Delete' },
    { title: '等待中', count: 0, state: 'Waiting' }
  ];
  requestParameter: any = { state: JobState, title: '作业列表' };
  loading = false;
  isFirstLoad = true;
  togglePara = { selectedKey: '', state: false };
  enumName: any = 'Success';
  // 请求参数
  jobKey = '';
  queuename = '';
  serverCount = 0;

  tabList = [
    { name: '仪表盘', count: 0 },
    { name: '作业', count: 0 },
    { name: '重试', count: 0 },
    { name: '周期性作业', count: 0 },
    { name: '服务器', count: 0 }
  ];

  historyData = [];

  //服务列表
  serverResultList = new ServerResultList();
  //周期性作业数据
  recurringResultList = new RecurringResultList();
  recurringListJobDtos = new PagedResultDtoOfRecurringListJobDto();
  //重试作业
  retriesResultList = new RetriesResultList();
  retriesJobListDto = new PagedResultDtoOfRetriesJobListDto();

  dashboardIndexDetailDto: DashboardIndexDetailDto;

  constructor(
    injector: Injector,
    private router: Router,
    public activeRoute: ActivatedRoute,
    private _hangfire: HangfireServiceServiceProxy
  ) {
    super(injector);
    this.pageSize = 10;
  }

  ngOnInit() {
    const self = this;
    setTimeout(() => {
      self.onLoadHistoryData();
    }, 100);

    // 调回本页面，刷新页面
    this.router.events.subscribe(item => {
      if (
        item instanceof NavigationEnd &&
        this.activeRoute.snapshot.queryParams.reload
      ) {
      }
    });

    this.queuename = '';
    this.isTableLoading = false;
    //获取请求参数
    this.activeRoute.queryParams.subscribe((params: Params) => {
      //this.selectedIndex = 1;
      this.jobKey = params.key;
      this.queuename = params.queuename;
      if (this.queuename && this.queuename.length > 0) {
        this.jobKey = null;
        this.enumName = 'EnqueuedJob';
        this.requestParameter.state = JobState.EnqueuedJob;
        this.requestParameter.title = `${this.queuename.toUpperCase()} 队列作业`;
        this.fetchDataList(new PagedRequestDto(), 1, Function);
      }
    });
    this.onLoadDefaultList();
    this.onLoadStatistics();
  }

  outDetailPage(data) {
    if (data) this.jobKey = data;
  }

  //跳转页面不同模块
  locationPage = typeName => {
    this.isFirstLoad = false;
    this.router.navigate(['/app/schoolmanage/hangfire'], {
      queryParams: { type: typeName },
      skipLocationChange: true
    });
  };

  //跳转页面不同模块
  // locationDetail() {
  //   this.selectedIndex = 1;
  //   //this.childCommonTable.locationDetail(id);
  //   this.childCommonTable.onLoadData();

  //   // setTimeout(() => {
  //   //   this.childCommonTable.locationDetail(id);
  //   // }, 1000);
  // }
  //统计作业数量
  onLoadStatistics() {
    this._hangfire.getDashboardStatistics().subscribe(ret => {
      this.statisticsInfoDto = ret;
      this.listArray = [
        { title: 'Enqueued', count: ret.enqueued, state: 'Enqueued' },
        { title: '计划', count: ret.scheduled, state: 'Plan' },
        { title: '执行中', count: ret.processing, state: 'Runing' },
        { title: '完成', count: ret.succeeded, state: 'Success' },
        { title: '失败', count: ret.failed, state: 'Faile' },
        { title: '删除', count: ret.deleted, state: 'Delete' },
        { title: '等待中', count: ret.waiting, state: 'Waiting' }
      ];

      this.tabList = [
        { name: '仪表盘', count: 0 },
        { name: '作业', count: ret.failed },
        { name: '重试', count: ret.retries },
        { name: '周期性作业', count: ret.recurring },
        { name: '服务器', count: ret.servers }
      ];
    });
  }
  formatDate(date: moment.Moment): string {
    return date.format('YYYY-MM-DD');
  }
  onLoadHistoryData(searchTimeType: SearchTimeType = SearchTimeType.Day) {
    this._hangfire
      .getDashboardData(searchTimeType)
      .subscribe((ret: DashboardIndexDetailDto) => {
        this.historyData = [];
        ret.dashboardDataDtos.forEach(a => {
          let x_value = '';
          if (searchTimeType == SearchTimeType.Week) {
            x_value = this.formatDate(a.key);
          } else {
            x_value =
              moment(a.key)
                .hours()
                .toString() + ':00';
          }
          this.historyData.push({
            state: a.type,
            value: parseInt(a.value),
            key: x_value
          });
        });
      });
  }

  searchType(type: any) {
    this.onLoadHistoryData(
      type == 'day' ? SearchTimeType.Day : SearchTimeType.Week
    );
  }

  tabSelect(event: any) {
    alert(event);
  }
  tabSelectedIndexChange(index: any) {
    this.pageNumber = 1;
    this.queuename = '';
    this.isFirstLoad = false;
    if (index != 1) {
      this.jobKey = null;
    }
    switch (index) {
      case 0:
        this.onLoadHistoryData();
        break;
      case 1:
        this.onLoadStatistics();
        if (!this.jobKey) {
          this.onLoadDefaultList();
        }
        break;
      case 2:
        this.retriesList();
        break;
      case 3:
        this.onLoadRecurringJobList();
        break;
      case 4:
        this.onLoadServerList();
        break;
    }
  }
  /**
   * 默认加载完成的作业
   */
  onLoadDefaultList() {
    this.enumName = 'Success';
    this.requestParameter.state = JobState.Success;
    this.requestParameter.title = '完成的作业';
    this.fetchDataList(new PagedRequestDto(), 1, Function);
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
  /**
   * 选中作业
   */
  onSelectJob(obj: { state: JobState; title: string }) {
    this.jobKey = null;
    this.queuename = '';
    this.enumName = obj.state;
    this.pageNumber = 1;
    this.requestParameter.state = obj.state;
    this.requestParameter.title = `${obj.title}的作业`;
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
        this.requestParameter.state,
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

  /**
   * 重新加入队列
   */
  onRetry(eventData: any = []) {
    let input = new RecurringJobInput();
    if (!eventData) {
      const selectCount = this.selectedDataItems.length;
      if (selectCount <= 0) {
        this.message.warn('请选择需要添加的作业！', '提示');
        return;
      }
      this.loading = true;
      input.jobId = _.map(this.selectedDataItems, 'key');
    } else {
      input.jobId = eventData;
    }
    this._hangfire
      .requeue(input)
      .finally(() => {
        this.loading = false;
        this.onLoadStatistics();
      })
      .subscribe(() => {
        this.notify.info('添加成功！');
      });
  }

  /**
   * 加载服务列表数据
   */
  onLoadServerList() {
    this.isTableLoading = true;
    this._hangfire
      .getServer()
      .finally(() => {
        this.isTableLoading = false;
      })
      .subscribe(ret => {
        this.serverResultList = ret;
        this.serverCount = ret.hangfireServerListDtos.length;
      });
  }

  protected fetchRecurringList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this.isTableLoading = true;
    request.maxResultCount = this.pageSize;
    request.skipCount = request.maxResultCount * (pageNumber - 1);
    this._hangfire
      .getAllRecurringJob('', request.maxResultCount, request.skipCount, '')
      .finally(() => {
        finishedCallback();
        this.isTableLoading = false;
      })
      .subscribe((result: RecurringResultList) => {
        this.recurringResultList = result;
        this.recurringListJobDtos = result.recurringListJobDtos;
        this.recurringListJobDtos.items.forEach(
          ret => ((<any>ret).checked = false)
        );
      });
  }

  refreshRecurring(data: any) {
    this.pageNumber = data;
    this.fetchRecurringList(new PagedRequestDto(), this.pageNumber, Function);
  }

  refreshRetries(data: any) {
    this.pageNumber = data;
    this.fetchRetryList(new PagedRequestDto(), this.pageNumber, Function);
  }
  /**
   * 加载周期性作业表格数据
   */
  onLoadRecurringJobList() {
    this.fetchRecurringList(new PagedRequestDto(), 1, Function);
  }

  //删除周期性作业
  onDeleteRecurring(eventData: any = []) {
    let input = new RecurringJobInput();
    //eventData = this.dynamicTable.getTableSelectedIds();
    let jobIds: string[] = [];
    this.recurringListJobDtos.items.forEach(a => {
      if ((<any>a).checked) {
        jobIds.push(a.recurringJobId);
      }
    });
    eventData = jobIds;

    if (!eventData) {
      const selectCount = this.selectedDataItems.length;
      if (selectCount <= 0) {
        this.message.warn('请选择需要删除的作业！', '提示');
        return;
      }
      this.loading = true;
      input.jobId = _.map(this.selectedDataItems, 'recurringJobId');
    } else {
      input.jobId = eventData;
    }
    if (!input.jobId || input.jobId.length == 0) {
      this.message.warn('请选择需要删除的作业！', '提示');
      return;
    }
    this._hangfire
      .deleteRecurringJob(input.jobId)
      .finally(() => {
        this.loading = false;
        this.onLoadRecurringJobList();
        this.onLoadStatistics();
      })
      .subscribe(() => {
        this.notify.info('删除成功！');
      });
  }

  //立即执行周期性作业
  onRunRecurring(eventData: any = []) {
    let input = new RecurringJobInput();
    let jobIds: string[] = [];
    this.recurringListJobDtos.items.forEach(a => {
      if ((<any>a).checked) {
        jobIds.push(a.recurringJobId);
      }
    });
    eventData = jobIds;

    if (!eventData) {
      const selectCount = this.selectedDataItems.length;
      if (selectCount <= 0) {
        this.message.warn('请选择需要执行的作业！', '提示');
        return;
      }
      input.jobId = _.map(this.selectedDataItems, 'recurringJobId');
      this.loading = true;
    } else {
      input.jobId = eventData;
    }
    if (!input.jobId || input.jobId.length == 0) {
      this.message.warn('请选择需要执行的作业！', '提示');
      return;
    }

    this._hangfire
      .runRecurringJob(input)
      .finally(() => {
        this.loading = false;
        this.onLoadRecurringJobList();
        this.onLoadStatistics();
      })
      .subscribe(() => {
        this.notify.info('执行成功！');
      });
  }

  //重试作业列表
  retriesList() {
    this.fetchRetryList(new PagedRequestDto(), 1, Function);
  }

  protected fetchRetryList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this.isTableLoading = true;
    request.maxResultCount = this.pageSize;
    request.skipCount = request.maxResultCount * (pageNumber - 1);
    this._hangfire
      .getRetriesJob('', request.maxResultCount, request.skipCount, '')
      .finally(() => {
        finishedCallback();
        this.isTableLoading = false;
      })
      .subscribe((result: RetriesResultList) => {
        this.retriesResultList = result;
        this.retriesJobListDto = result.retriesJobListDtos;
        this.retriesJobListDto.items.forEach(
          ret => ((<any>ret).checked = false)
        );
      });
  }

  /**
   * 删除重试作业
   */
  onDeleteJob(eventData: any = []) {
    let input = new RecurringJobInput();
    if (!eventData) {
      const selectCount = this.selectedDataItems.length;
      if (selectCount <= 0) {
        this.message.warn('请选择需要删除的作业！', '提示');
        return;
      }
      input.jobId = _.map(this.selectedDataItems, 'key');
    } else {
      input.jobId = eventData;
    }
    if (!input.jobId || input.jobId.length == 0) {
      this.message.warn('请选择需要删除的作业！', '提示');
      return;
    }
    this.loading = true;
    this._hangfire
      .deleteJob(input.jobId)
      .finally(() => {
        this.loading = false;
        this.retriesList();
        this.onLoadStatistics();
      })
      .subscribe(() => {
        this.notify.info('删除成功！');
      });
  }

  //重试删除作业
  onDeleteJobRetry() {
    let jobIds: string[] = [];
    this.retriesJobListDto.items.forEach(a => {
      if ((<any>a).checked) {
        jobIds.push(a.jobId);
      }
    });
    this.onDeleteJob(jobIds);
  }
  //重试运行作业
  onRunRetryJob() {
    let jobIds: string[] = [];
    this.retriesJobListDto.items.forEach(a => {
      if ((<any>a).checked) {
        jobIds.push(a.jobId);
      }
    });
    this.onRunRetry(jobIds);
  }
  /**
   * 加入队列
   */
  onRunRetry(eventData: any = []) {
    let input = new RecurringJobInput();
    if (!eventData) {
      const selectCount = this.selectedDataItems.length;
      if (selectCount <= 0) {
        this.message.warn('请选择需要添加的作业！', '提示');
        return;
      }
      input.jobId = _.map(this.selectedDataItems, 'key');
    } else {
      input.jobId = eventData;
    }
    if (!input.jobId || input.jobId.length == 0) {
      this.message.warn('请选择需要添加的作业！', '提示');
      return;
    }
    this.loading = true;
    this._hangfire
      .addEnqueueJob(input)
      .finally(() => {
        this.loading = false;
        this.retriesList();
        this.onLoadStatistics();
      })
      .subscribe(() => {
        this.notify.info('添加成功！');
      });
  }
  outDetailTabMethod(data) {
    if (data) {
      this.selectedIndex = 1;
      this.jobKey = data;
    }
  }
}
