
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateScheduleInput,ScheduleEditDto, ScheduleServiceProxy,
	RouteServiceProxy,
	GetRoutesInput,
	BoatServiceProxy,
	GetBoatsInput,
    GetTicketPricesInput,
    TicketPriceServiceProxy,QueryData
} from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

import * as moment from 'moment';

@Component({
	selector: 'create-or-edit-schedule',
	templateUrl: './create-or-edit-schedule.component.html',
	styleUrls:[
	'create-or-edit-schedule.component.less'
	],
})

export class CreateOrEditScheduleComponent
extends ModalComponentBase
implements OnInit {

    id: any ;

    entity: ScheduleEditDto=new ScheduleEditDto();


    sDStr:any;
    sStr:any;
    eStr:any;
    cSStr:any;
    cEStr:any;

    beginDate:any;
    endDate:any;

    single=true
    collectionTime=''

    constructor(
    	injector: Injector,
    	private _scheduleService: ScheduleServiceProxy,
    	private _routeService: RouteServiceProxy,
    	private _boatService: BoatServiceProxy,
        private _ticketPriceService: TicketPriceServiceProxy,
        ) {
    	super(injector);
    }

    ngOnInit() :void{
    	this.init();
    }


    boatList=[]
    routeList=[]

    ticketlist=[]

    changetype(){
        this.single=!this.single
    }

    datechange($event): void {
        if($event[0].getTime() == $event[1].getTime()){
            abp.message.warn('请选择两个不同的日期');
            return
        }

        var year=$event[0].getFullYear();
        var month = $event[0].getMonth() + 1;
        var day = $event[0].getDate();

        var fulldate1=year+'-'+month+'-'+day;

        var year=$event[1].getFullYear();
        var month = $event[1].getMonth() + 1;
        var day = $event[1].getDate();

        var fulldate2=year+'-'+month+'-'+day;

        this.beginDate=moment(fulldate1).format('YYYY-MM-DD')
        this.endDate=moment(fulldate2).format('YYYY-MM-DD')
    }

    formatDateTime(date){
    	let year=date.getFullYear();
    	let month=date.getMonth()+1;
    	if(month< 10){month ='0'+ month}
    		let day = date.getDate();
    	if(day< 10){day ='0'+ day}
    		let hours=date.getHours(); 
    	if(hours< 10){hours ='0'+ hours}
    		let minutes=date.getMinutes();
    	if(minutes< 10){minutes ='0'+ minutes}
    		let seconds=date.getSeconds();
    	if(seconds< 10){seconds ='0'+ seconds}
    		var datesrt = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds
    	return datesrt
    }

    formatDate(date){
    	let year=date.getFullYear();
    	let month=date.getMonth()+1;
    	if(month< 10){month ='0'+ month}
    		let day = date.getDate();
    	if(day< 10){day ='0'+ day}
    		var datesrt = year+'-'+month+'-'+day
    	return datesrt
    }

    formatTime(date){
    	let hours=date.getHours(); 
    	if(hours< 10){hours ='0'+ hours}
    		let minutes=date.getMinutes();
    	if(minutes< 10){minutes ='0'+ minutes}
    		let seconds=date.getSeconds();
    	if(seconds< 10){seconds ='0'+ seconds}
    		var datesrt = hours+':'+minutes+':'+seconds
    	return datesrt
    }

    init(): void {
    	this._scheduleService.getForEdit(this.id).subscribe(result => {

    		if(result.schedule.id){
    			this.sDStr = new Date(result.schedule.saleDate.toString())
    			this.sStr = new Date(result.schedule.startTime.toString())
    			this.eStr = new Date(result.schedule.endTime.toString())
    			this.cSStr = new Date(result.schedule.checkStartTime.toString())
    			this.cEStr = new Date(result.schedule.checkEndTime.toString())
    		}else{
    			this.sDStr=new Date()
    			this.sStr=new Date()
    			this.eStr=new Date(new Date().getTime() + 7200000)
    			this.cSStr=new Date(new Date().getTime() - 3600000)
    			this.cEStr=new Date()

    			result.schedule.routeId=''
    			result.schedule.boatId=''
    		}
    		this.entity = result.schedule;
    	});

    	this.getboat()
        this.getroute()
        this.getticket()
    }

    getticket(){
        var arr=[]
        arr.push(new QueryData({
            field: "isEnabled",
            method: "=",
            value: 'true',
            logic: "and"
        }))
        var formdata=new GetTicketPricesInput
        formdata.queryData=arr
        formdata.sorting=''
        formdata.maxResultCount=999
        formdata.skipCount=0
        
        this._ticketPriceService.getPagedPost(formdata)
        .subscribe(result => {
            this.ticketlist = result.items;
        });
    }

    getboat(){
    	var formdata = new GetBoatsInput()
    	formdata.queryData = []
    	formdata.sorting = ""
    	formdata.maxResultCount = 999;
    	formdata.skipCount = 0;

    	this._boatService.getPaged(formdata)
    	.subscribe(result => {
    		this.boatList = result.items;
    	});
    }

    getroute(){
    	var formdata = new GetRoutesInput()
    	formdata.queryData = []
    	formdata.sorting = ""
    	formdata.maxResultCount = 999;
    	formdata.skipCount = 0;

    	this._routeService.getPaged(formdata)
    	.subscribe(result => {
    		this.routeList = result.items;
    	});
    }

    boatChange($event: string): void {

    }

    submitForm(): void {
        var boat:any;
        var boatId=this.entity.boatId
        if(!boatId){
            abp.message.warn('请选择游船');
            return
        }
        this.boatList.forEach(function(item){
            if(item.id ==boatId ){
                boat=item
            }
        })

        if(!this.id){
            this.entity.standardSurplusNum=this.entity.standardNum
            this.entity.vipSurplusNum=this.entity.vipNum
            this.entity.compartmentSurplusNum=this.entity.compartmentNum

            if(this.entity.standardNum > boat.standardNum){
                abp.message.warn('标准舱座位数需小于或等于游船标准舱座位数');
                return
            }
            if(this.entity.vipNum > boat.vipNum){
                abp.message.warn('VIP舱座位数需小于或等于游船VIP舱座位数');
                return
            }
            if(this.entity.compartmentNum > boat.compartmentNum){
                abp.message.warn('包间舱座位数需小于或等于游船包间舱座位数');
                return
            }
        }

        const input = new CreateOrUpdateScheduleInput();

        console.log(this.entity)
        if(this.single){
            if(!this.sDStr){
                abp.message.warn('请选择航班日期');
                return
            }
            var date= this.formatDate(this.sDStr)
            this.entity.saleDateStr=this.formatDate(this.sDStr)
        }else{
            if(!this.beginDate || !this.endDate){
                abp.message.warn('请选择开始时间和结束时间');
                return
            }
            this.entity.saleDateStr=''
            input.beginDateStr=this.beginDate
            input.endDateStr=this.endDate
        }

        this.entity.startTimeStr=this.formatTime(this.sStr)
        this.entity.endTimeStr=this.formatTime(this.eStr)

        this.entity.checkStartTimeStr=this.formatTime(this.cSStr)
        this.entity.checkEndTimeStr=this.formatTime(this.cEStr)

        delete this.entity.saleDate
        delete this.entity.startTime
        delete this.entity.endTime
        delete this.entity.checkStartTime
        delete this.entity.checkEndTime

        input.schedule = this.entity;

        this.saving = true;

        this._scheduleService.createOrUpdate(input)
        .finally(() => (this.saving = false))
        .subscribe(() => {
            this.notify.success(this.l('SavedSuccessfully'));
            this.success(true);
        });
    }
}
