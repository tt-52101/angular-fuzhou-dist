import {
  Component,
  OnInit,
  Injector,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  ModalComponentBase
} from '@shared/component-base/modal-component-base';
import {
  CreateOrUpdatePriceAuditInput,
  PriceAuditEditDto,
  PriceAuditServiceProxy,
  TicketServiceProxy,
  GetTicketsInput,
  TicketPriceServiceProxy,
  GetTicketPricesInput,
  // ScheduleServiceProxy,
  // GetSchedulesInput
} from '@shared/service-proxies/service-proxies';
import {
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'create-or-edit-price-audit',
  templateUrl: './create-or-edit-price-audit.component.html',
  styleUrls: [
  'create-or-edit-price-audit.component.less'
  ],
})

export class CreateOrEditPriceAuditComponent
extends ModalComponentBase
implements OnInit {
  /**
   * 编辑时DTO的id
   */
   id: any;

   entity: PriceAuditEditDto = new PriceAuditEditDto();

   queryData = []

   ticketList = []
   ticketPriceList = []
   upperTime = ""
   lowerTime = ""


   // scheduleList = []

  /**
   * 初始化的构造函数
   */
   constructor(
     injector: Injector,
     private _priceAuditService: PriceAuditServiceProxy,
     private _ticketService: TicketServiceProxy,
     private _ticketPriceService: TicketPriceServiceProxy,
     // private _scheduleService: ScheduleServiceProxy,
     ) {
     super(injector);
   }

   ngOnInit(): void {
     this.init();
   }


   change1($event): void {
     this.entity.upperTimeStr = this.formatDate($event)
   }

   change2($event): void {
     this.entity.lowerTimeStr = this.formatDate($event)
   }


   formatDate(date) {
     let year = date.getFullYear();
     let month = date.getMonth() + 1;
     if (month < 10) {
       month = '0' + month
     }
     let day = date.getDate();
     if (day < 10) {
       day = '0' + day
     }
     let hours = date.getHours();
     if (hours < 10) {
       hours = '0' + hours
     }
     let minutes = date.getMinutes();
     if (minutes < 10) {
       minutes = '0' + minutes
     }
     let seconds = date.getSeconds();
     if (seconds < 10) {
       seconds = '0' + seconds
     }
     var datesrt = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
     return datesrt
   }


  /**
   * 初始化方法
   */
   init(): void {
     this._priceAuditService.getForEdit(this.id).subscribe(result => {
       if (result.priceAudit.id) {
         result.priceAudit.upperTimeStr = result.priceAudit.upperTime.toString()
         result.priceAudit.lowerTimeStr = result.priceAudit.lowerTime.toString()
       } else {
         result.priceAudit.upperTime = moment()
         result.priceAudit.lowerTime = moment()
         result.priceAudit.upperTimeStr = this.formatDate(new Date())
         result.priceAudit.lowerTimeStr = this.formatDate(new Date())
         // result.priceAudit.scheduleId = ''
         result.priceAudit.ticketId = ''
         result.priceAudit.discount = 1

       }



       this.entity = result.priceAudit;
     });

     var formdata = new GetTicketsInput();
     formdata.queryData = this.queryData;
     formdata.sorting = null
     formdata.maxResultCount = 999;
     formdata.skipCount = 0;

     this._ticketService.getPaged(formdata)
     .subscribe(result => {
       this.ticketList = result.items;
     });

     var formdata=new GetTicketPricesInput
     formdata.queryData=this.queryData
     formdata.sorting=''
     formdata.maxResultCount=999
     formdata.skipCount=0
     this._ticketPriceService.getPagedPost(formdata)
     .subscribe(result => {
       this.ticketPriceList = result.items;
     });

     // var formdata = new GetSchedulesInput()
     // formdata.queryData = this.queryData;
     // formdata.sorting = null
     // formdata.maxResultCount = 999;
     // formdata.skipCount = 0;

     // this._scheduleService.getPaged(formdata)
     //   .subscribe(result => {
       //     this.scheduleList = result.items;
       //   });
     }



  /**
   * 保存方法,提交form表单
   */
   submitForm(): void {
     const input = new CreateOrUpdatePriceAuditInput();

     this.entity.upperTimeStr = this.formatDate(new Date(this.entity.upperTimeStr))
     this.entity.lowerTimeStr = this.formatDate(new Date(this.entity.lowerTimeStr))

     // var auditStatus: AuditStatusEnum ='WaiteAudit';
     // this.entity.auditStatus=auditStatus
     if(this.entity.price==0){
       abp.message.warn('票价不能为0');
       return
     }


     if(this.entity.orgTicketPriceId){
       delete this.entity.id
       delete this.entity.ticketId
       delete this.entity.price
       delete this.entity.discount
       delete this.entity.rDiscount
       delete this.entity.auditStatus
       delete this.entity.ticketName
       delete this.entity.upperTimeStr
       delete this.entity.lowerTimeStr
     }
     input.priceAudit = this.entity;

     this.saving = true;

     this._priceAuditService.createOrUpdate(input)
     .finally(() => (this.saving = false))
     .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success(true);
     });
   }
 }