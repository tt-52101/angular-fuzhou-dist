
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {ScheduleServiceProxy,ScheduleResultDto,

	BoatServiceProxy,
	RouteServiceProxy,
	GetSchedulesInput,
	GetBoatsInput,
	GetRoutesInput,

	QueryData,
} from '@shared/service-proxies/service-proxies';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
	templateUrl: './route.component.html',
	styleUrls: ['./route.component.less'],
	animations: [appModuleAnimation()],
})


export class  RouteComponent extends PagedListingComponentBase<ScheduleResultDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _scheduleService: ScheduleServiceProxy,
		private _boatService: BoatServiceProxy,
		private _routeService: RouteServiceProxy
		) {
		super(injector);
	}
	collectionTime=''

	queryData = [{
		field: "CreationTime",
		method: ">=",
		value: "",
		logic: "and"
	}, {
		field: "CreationTime",
		method: "<=",
		value: "",
		logic: "and"
	}];

	boatId=''
	routeId=''
	ticketId=''

	routequery=[]
	routeList=[]

	boatquery=[]
	boatList=[]	
	
	boattime = ''

	ticketinfo=[]

	visible=false

	total:any;

	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		var arr=[]
		for (var i =0;i< this.queryData.length; i++) {
			if(this.queryData[i].value){
				arr.push(new QueryData(this.queryData[i]))
			}
		}

		this._scheduleService.getPagedStat(arr,null, request.maxResultCount,request.skipCount,this.routeId,this.boatId,this.ticketId)
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

		this.queryData[0].value=moment(fulldate1).format('YYYY-MM-DD HH:mm:ss')
		this.queryData[1].value=moment(fulldate2).format('YYYY-MM-DD HH:mm:ss')

	}

	disabledDate = (current: Date): boolean => {
		// Can not select days before today and today
		return differenceInCalendarDays(current, new Date()) > 0;
	};




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

		this._scheduleService.scheduleDetailStat(id)
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

