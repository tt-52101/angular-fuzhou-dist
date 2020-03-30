
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {RecordServiceProxy, StatsPagedResultDtoOfGateRecordResultDto,GateRecordResultDto ,QueryData} from '@shared/service-proxies/service-proxies';
import { CreateOrEditGateRecordComponent } from './create-or-edit-gate-record/create-or-edit-gate-record.component';
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
	templateUrl: './gate-record.component.html',
	styleUrls: ['./gate-record.component.less'],
	animations: [appModuleAnimation()],
})


export class  GateRecordComponent extends PagedListingComponentBase<GateRecordResultDto>
implements OnInit {
	
	constructor(
		injector: Injector,
		private _recordService: RecordServiceProxy,
		) {
		super(injector);
	}


	queryData=[{
		field: "DeviceId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "BoatId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "TicketId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "CheckerId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "StatusCode ",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "CreationTime",
		method: ">=",
		value: "",
		logic: "and"
	},{
		field: "CreationTime",
		method: "<=",
		value: "",
		logic: "and"
	}]

	collectionTime=''

	Devices=[]
	Boats=[]
	Checkers=[]
	Tickets=[]


	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		var arr=[]
		for (var i = this.queryData.length - 1; i >= 0; i--) {
			if(this.queryData[i].value){
				arr.push(new QueryData(this.queryData[i]))
			}
		}
		this._recordService.getPagedStat(
			arr,
			request.sorting,
			request.maxResultCount,
			request.skipCount,
			)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			this.Devices=result.filters.Devices
			this.Boats=result.filters.Boats
			this.Checkers=result.filters.Checkers
			this.Tickets=result.filters.Tickets

			this.dataList = result.items;
			this.showPaging(result);
		});
	}
	
	disabledDate = (current: Date): boolean => {
		return differenceInCalendarDays(current, new Date()) > 0;
	};

	datechange($event): void {
		console.log($event)
		if($event.length == 2){
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

			this.queryData[5].value=moment(fulldate1).format('YYYY-MM-DD HH:mm:ss')
			this.queryData[6].value=moment(fulldate2).format('YYYY-MM-DD HH:mm:ss')
		}
	}
}

