
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {ScheduleCheckServiceProxy,ScheduleCheckResultDto,
	ScheduleServiceProxy,
	BoatServiceProxy,
	RouteServiceProxy,
	GetSchedulesInput,
	GetBoatsInput,
	GetRoutesInput,
	WharfServiceProxy,
	GetWharfsInput,
	QueryData,
} from '@shared/service-proxies/service-proxies';



@Component({
	templateUrl: './check.component.html',
	styleUrls: ['./check.component.less'],
	animations: [appModuleAnimation()],
})


export class  CheckComponent extends PagedListingComponentBase<ScheduleCheckResultDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _scheduleCheckService: ScheduleCheckServiceProxy,
		private _boatService: BoatServiceProxy,
		private _routeService: RouteServiceProxy,
		private _wharfService: WharfServiceProxy
		) {
		super(injector);
	}

	visible=false

	ticketinfo=[]
	
	queryData = [{
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
		field: "Route.startWharfId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "Schedule.starttime",
		method: ">=",
		value: "",
		logic: "and"
	},{
		field: "Schedule.starttime",
		method: "<=",
		value: "",
		logic: "and"
	}];

	routequery=[]
	routeList=[]

	boatquery=[]
	boatList=[]	
	wharfList=[]

	boattime = ''

	total:any;
	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		var arr=[]
		for (var i = this.queryData.length - 1; i >= 0; i--) {
			if(this.queryData[i].value){
				arr.push(new QueryData(this.queryData[i]))
			}
		}

		this._scheduleCheckService.getPagedStat(arr,null, request.maxResultCount,request.skipCount)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			this.dataList = result.items;
			if(result.totalCount>0){
				this.total= [result.total]
			}
			this.showPaging(result);
		});

		this.getroute()
		this.getboat()
		this.getwharf()
	}


	datechange($event): void {
		this.queryData[4].value=$event[0]
		this.queryData[5].value=$event[1]
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


	getwharf(){
		const formdata = new GetWharfsInput()
		formdata.queryData =[];
		formdata.sorting = null
		formdata.maxResultCount = 999;
		formdata.skipCount = 0;

		this._wharfService.getPaged(formdata)
		.subscribe(result => {
			this.wharfList = result.items;
		});
	}


	open(id): void {

		this._scheduleCheckService.scheduleDetailStat(id)
		.subscribe(result => {
			console.log(result)
			this.visible = true;
			this.ticketinfo = result.items;
		});
	}


	close(): void {
		this.visible = false;
	}


}

