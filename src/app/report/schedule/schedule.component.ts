
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {ScheduleTicketServiceProxy,ScheduleTicketResultDto,
	ScheduleServiceProxy,
	BoatServiceProxy,
	RouteServiceProxy,
	GetSchedulesInput,
	GetBoatsInput,
	GetRoutesInput,
	QueryData,
	TicketServiceProxy,GetTicketsInput,
} from '@shared/service-proxies/service-proxies';

import * as moment from 'moment';

@Component({
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.less'],
	animations: [appModuleAnimation()],
})


export class  ScheduleComponent extends PagedListingComponentBase<ScheduleTicketResultDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _scheduleTicketService: ScheduleTicketServiceProxy,
		private _boatService: BoatServiceProxy,
		private _routeService: RouteServiceProxy,
		private _ticketService: TicketServiceProxy,

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
		field: "StartTime ",
		method: ">=",
		value: "",
		logic: "and"
	},{
		field: "StartTime ",
		method: "<=",
		value: "",
		logic: "and"
	}];

	ticketId=''
	ticketarr=[]


	routequery=[]
	routeList=[]

	boatquery=[]
	boatList=[]

	boattime = ''


total:any;

	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		var arr=[]
		for (var i = this.queryData.length - 1; i >= 0; i--) {
			if(this.queryData[i].value){
				arr.push(new QueryData(this.queryData[i]))
			}
		}

		this._scheduleTicketService.getPagedStat(arr,null, request.maxResultCount,request.skipCount,this.ticketId)
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
		this.getticket()
	}


	getticket(){
		const formdata = new GetTicketsInput()
		formdata.queryData = [];
		formdata.sorting = null;
		formdata.maxResultCount = 999;
		formdata.skipCount = 0;

		this._ticketService.getPaged(formdata)
		.subscribe(result => {
			this.ticketarr = result.items;
		});
	}


	datechange($event): void {
		if($event[0].getTime() == $event[1].getTime()){
			$event[1]=new Date($event[1].getTime()+24*60*60*1000)
		}

		var year=$event[0].getFullYear();
		var month = $event[0].getMonth() + 1;
		var day = $event[0].getDate();

		var fulldate1=year+'-'+month+'-'+day;

		var year=$event[1].getFullYear();
		var month = $event[1].getMonth() + 1;
		var day = $event[1].getDate();

		var fulldate2=year+'-'+month+'-'+day;

		this.queryData[3].value=moment(fulldate1).format('YYYY-MM-DD HH:mm:ss')
		this.queryData[4].value=moment(fulldate2).format('YYYY-MM-DD HH:mm:ss')

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


	open(id): void {

		this._scheduleTicketService.scheduleDetailStat(id)
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

