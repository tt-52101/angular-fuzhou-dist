
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {ScheduleServiceProxy, PagedResultDtoOfScheduleListDto, ScheduleListDto,GetSchedulesInput,
	BoatServiceProxy,
	RouteServiceProxy,
	GetBoatsInput,
	GetRoutesInput,

	QueryData
} from '@shared/service-proxies/service-proxies';
import { CreateOrEditScheduleComponent } from './create-or-edit-schedule/create-or-edit-schedule.component';
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';


@Component({
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.less'],
	animations: [appModuleAnimation()],
})


export class  ScheduleComponent extends PagedListingComponentBase<ScheduleListDto>
implements OnInit {
	
	constructor(
		injector: Injector,
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
	},{
		field: "scheduleSaleStatus",
		method: "notin",
		value: 'ScheduleNotSale ',
		logic: "or"
	},{
		field: "scheduleSaleStatus",
		method: "=",
		value: 'ScheduleStopSale',
		logic: "or"
	}]

	// {
	// 	field: "scheduleSaleStatus",
	// 	method: "notin",
	// 	value: 'ScheduleNotSale',
	// 	logic: "and"
	// }


	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		var formdata = new GetSchedulesInput

		var arr=[]
		for (var i = this.scqueryData.length - 1; i >= 0; i--) {
			if(this.scqueryData[i].value){
				arr.push(new QueryData(this.scqueryData[i]))
			}
		}
		formdata.queryData = arr;
		formdata.sorting = request.sorting;
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
	

	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditScheduleComponent, { id: id })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}
	

	delete(entity: ScheduleListDto): void {
		this._scheduleService.delete(entity.id)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyDeleted'));
		});
	}
	

	batchDelete(): void {
		const selectCount = this.selectedDataItems.length;
		if (selectCount <= 0) {
			abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
			return;
		}

		abp.message.confirm(
			this.l('ConfirmDeleteXItemsWarningMessage', selectCount),
			res => {
				if (res) {
					const ids = _.map(this.selectedDataItems, 'id');
					this._scheduleService.batchDelete(ids).subscribe(() => {
						this.refreshGoFirstPage();
						this.notify.success(this.l('SuccessfullyDeleted'));
					});
				}
			},
			);
	}
	
	

	exportToExcel(): void {
		abp.message.error('功能开发中！！！！');
	}
	
}

