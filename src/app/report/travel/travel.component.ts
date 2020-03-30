
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {TravelAgencyServiceProxy, QueryData , TravelAgencyResultDto,GetTravelAgencysInput,
	BoatServiceProxy,GetBoatsInput,TicketServiceProxy,GetTicketsInput,RouteServiceProxy,GetRoutesInput
} from '@shared/service-proxies/service-proxies';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
	templateUrl: './travel.component.html',
	styleUrls: ['./travel.component.less'],
	animations: [appModuleAnimation()],
})


export class  TravelComponent extends PagedListingComponentBase<TravelAgencyResultDto>
implements OnInit {
	
	constructor(
		injector: Injector,
		private _travelAgencyService: TravelAgencyServiceProxy,
		private _boatService: BoatServiceProxy,
		private _ticketService: TicketServiceProxy,
		private _routeService: RouteServiceProxy,
		) {
		super(injector);
	}

	queryData = [{
		field: "TravelAgencyId",
		method: "=",
		value: "",
		logic: "and"
	}, {
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

	travelList=[]

	boatId=''
	ticketId=''
	routeId=''

	boatList=[]
	ticketarr=[]
	routelist=[]

	collectionTime=''

	orderlist=[]
	ticketlist=[]
	visible = false;
	childvisible=false

		total:any;
	
	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {

		var arr=[]
		for (var i = 0; i <this.queryData.length; i++) {
			if (this.queryData[i].value) {
				arr.push(new QueryData(this.queryData[i]))
			}
		}

		this._travelAgencyService.getPagedStat(arr,request.sorting,request.maxResultCount,request.skipCount,this.routeId,this.boatId,this.ticketId)
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
		this.getlist()
		this.getboat()
		this.getticket()
		this.getroute()
	}
	
	getroute(){
		const formdata = new GetRoutesInput()
		formdata.queryData = [];
		formdata.sorting = null;
		formdata.maxResultCount = 999;
		formdata.skipCount = 0;

		this._routeService.getPaged(formdata)
		.subscribe(result => {
			this.routelist = result.items;
		});
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

	getboat(){
		const formdata = new GetBoatsInput()
		formdata.queryData = [];
		formdata.sorting = null;
		formdata.maxResultCount = 999;
		formdata.skipCount = 0;

		this._boatService.getPaged(formdata)
		.subscribe(result => {
			this.boatList = result.items;
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

		this.queryData[1].value=moment(fulldate1).format('YYYY-MM-DD HH:mm:ss')
		this.queryData[2].value=moment(fulldate2).format('YYYY-MM-DD HH:mm:ss')

	}

	disabledDate = (current: Date): boolean => {
		// Can not select days before today and today
		return differenceInCalendarDays(current, new Date()) > 0;
	};


	open(id): void {
		this._travelAgencyService.orderSourceStatDetail(id)
		.subscribe(result => {
			this.visible = true;
			this.orderlist = result;
		});
	}

	close(): void {
		this.visible = false;
	}


	openchild(tickets): void {
		this.childvisible = true;
		this.ticketlist = tickets;
	}

	closechild(): void {
		this.childvisible = false;
	}


	getlist(){
		const formdata = new GetTravelAgencysInput()
		formdata.queryData = [];
		formdata.sorting =null
		formdata.maxResultCount = 999;
		formdata.skipCount = 0;

		this._travelAgencyService.getPagedForPost(formdata)
		.subscribe(result => {
			this.travelList = result.items;
			this.showPaging(result);
		});
	}



	
}

