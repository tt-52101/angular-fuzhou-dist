import { Component, OnInit, Injector } from '@angular/core';

import * as _ from 'lodash';

import { appModuleAnimation } from '@shared/animations/routerTransition';

import { EditControlComponent } from './edit-control/edit-control.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {ScheduleServiceProxy, PagedResultDtoOfScheduleListDto, ScheduleListDto,GetSchedulesInput,
  BoatServiceProxy,
  RouteServiceProxy,
  GetBoatsInput,
  GetRoutesInput,

  QueryData
} from '@shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/component-base/app-component-base';


// import { ReuseTabService } from '@delon/abc';

@Component({
  selector: 'app-controlticket',
  templateUrl: './controlticket.component.html',
  styleUrls: ['./controlticket.component.less'],
  animations: [appModuleAnimation()],
})
export class ControlTicketComponent extends PagedListingComponentBase<ScheduleListDto>
implements OnInit {
  constructor(
    injector: Injector,
    // private _reuseTabService: ReuseTabService,
    private _scheduleService: ScheduleServiceProxy,
    private _boatService: BoatServiceProxy,
    private _routeService: RouteServiceProxy,
    ) {
    super(injector);

    this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
    this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
  }

  isAllOperation=false
  curmenupower=[]


  routequery=[]
  routeList=[]

  boatquery=[]
  boatList=[]

  boattime = ''


  scqueryData=[{
    field: "scheduleCode",
    method: "%",
    value: "",
    logic: "and"
  },{
    field: "routeId",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "boatId",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "scheduleStatus",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "starttime",
    method: ">=",
    value: "",
    logic: "and"
  },{
    field: "endtime",
    method: "<=",
    value: "",
    logic: "and"
  }]


  protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
    var formdata = new GetSchedulesInput

    var arr=[]
    for (var i = this.scqueryData.length - 1; i >= 0; i--) {
      if(this.scqueryData[i].value){
        arr.push(new QueryData(this.scqueryData[i]))
      }
    }

    formdata.queryData = arr;
    formdata.sorting = null;
    formdata.maxResultCount = request.maxResultCount;
    formdata.skipCount = request.skipCount;

    this._scheduleService.getPaged(formdata)
    .finally(() => {
      finishedCallback();
    })
    .subscribe(result => {
      this.dataList = result.items;
      this.showPaging(result);
    });

    this.getroute()
    this.getboat()
  }



  datechange($event): void {
    this.scqueryData[4].value=$event[0]
    this.scqueryData[5].value=$event[1]
  }

  getroute(){
    const formdata = new GetRoutesInput()
    formdata.queryData = this.routequery;
    formdata.sorting = null
    formdata.maxResultCount = 999;
    formdata.skipCount = 0;

    this._routeService.getPaged(formdata)
    .subscribe(result => {
      this.routeList = result.items;
    });
  }

  getboat(){
    const formdata = new GetBoatsInput()
    formdata.queryData = this.boatquery;
    formdata.sorting = null
    formdata.maxResultCount = 999;
    formdata.skipCount = 0;

    this._boatService.getPaged(formdata)
    .subscribe(result => {
      this.boatList = result.items;
    });
  }












  editcontrol(entity: ScheduleListDto): void {
    this.modalHelper.static(EditControlComponent, { entity:entity })
    .subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }

}
