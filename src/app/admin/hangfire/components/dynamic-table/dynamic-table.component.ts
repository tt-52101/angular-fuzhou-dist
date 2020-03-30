import { Component, OnInit, Input, Injector, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { EntityDto, PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { Router } from '@angular/router';
import { ColumnHeader } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent extends PagedListingComponentBase<EntityDto> implements OnInit {

  /**
* 数据表的数据源
*/
  dataList: any[] = [];
  dataColumnList: ColumnHeader[] = [];
  // total: number;
  @Input() totalItems;
  @Output() outDetailTabEvent = new EventEmitter();
  @Input() pageNumber;
  @Input() pageSize;
  @Input() nzFrontPagination;
  @Input()
  get tableData() {
    return this.dataList;
  }
  set tableData(val) {
    this.dataList = val;
  }

  @Input()
  get tableColumnData() {
    return this.dataColumnList;
  }
  set tableColumnData(val: ColumnHeader[]) {
    this.dataColumnList = val;
  }


  @Output() refreshEvent = new EventEmitter();
  @Input() isTableLoading;


  constructor(injector: Injector, private router: Router, ) {
    super(injector);
  }

  ngOnInit() {
  }

  refresh() {
    this.refreshEvent.emit(this.pageNumber);
  }

  getTableSelectedIds() {
    const selectCount = this.selectedDataItems.length;
    if (selectCount <= 0) {
      this.message.warn('请选择作业！', '提示');
      return;
    }
    //let jobIds = _.map(this.selectedDataItems, 'key');
    return this.selectedDataItems;
  }
  //跳转页面不同模块
  locationDetail = (id) => {
    this.router.navigate(['/app/admin/hangfire'], {
      queryParams: { key: id },
      skipLocationChange: true,
    });
    this.outDetailTabEvent.emit(id);
  }


  protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    throw new Error("Method not implemented.");
  }
}
