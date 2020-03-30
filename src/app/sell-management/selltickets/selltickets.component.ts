import { Component, OnInit, Injector } from '@angular/core';

import { appModuleAnimation } from '@shared/animations/routerTransition';

import { CreateOrEditPassengerComponent } from './create-or-edit-passenger/create-or-edit-passenger.component';

import { AppComponentBase } from '@shared/component-base/app-component-base';
// import { ReuseTabService } from '@delon/abc';

import { AppConsts } from 'abpPro/AppConsts';

import { NzModalService } from 'ng-zorro-antd';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import { SignalRService } from '@shared/service-proxies/signalrservice';

import {
  ScheduleServiceProxy,
  BoatServiceProxy,
  RouteServiceProxy,
  // WharfServiceProxy,
  PayMethodServiceProxy,
  GetWharfsInput,
  GetBoatsInput,
  GetRoutesInput,
  GetSchedulesInput,

  ActivityServiceProxy,
  CreateActivityModel,

  // TicketPriceServiceProxy,

  SourceServiceProxy,

  CreateActivityDetailModel,
  QueryData
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-selltickets',
  templateUrl: './selltickets.component.html',
  styleUrls: ['./selltickets.component.less'],
  animations: [appModuleAnimation()],
})
export class SellTicketsComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector,
    // private _reuseTabService: ReuseTabService,
    private _scheduleService: ScheduleServiceProxy,
    private _boatService: BoatServiceProxy,
    private _routeService: RouteServiceProxy,
    // private _wharfService: WharfServiceProxy,
    private _payMethodService: PayMethodServiceProxy,
    // private _ticketPriceService: TicketPriceServiceProxy,
    private _activityService: ActivityServiceProxy,

    private _modalService: NzModalService,

    private _sourceService: SourceServiceProxy,

    public signalRService: SignalRService
    ) {
    super(injector);
    // this._reuseTabService.title = this.l('航班售票');
    this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
    this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
  }

  isAllOperation=false
  curmenupower=[]
  

  imgurl=AppConsts.remoteServiceBaseUrl


  hblist = []

  nowtimestamp = 0
  starttimestamp = 0
  datearr=[]
  nowdate = ""
  nowday = ''


  hangbanquery=[{
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
    field: "wharfId",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "scheduleStatus",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "saleDate",
    method: ">=",
    value: "",
    logic: "and"
  },{
    field: "saleDate",
    method: "<=",
    value: "",
    logic: "and"
  },{
    field: "checkStartTime",
    method: ">",
    value: "",
    logic: "and"
  },{
    field: "Boat.runStatus",
    method: "=",
    value: 'Running',
    logic: "and"
  },
  // {
    //   field: "scheduleSaleStatus",
    //   method: "=",
    //   value: 'ScheduleNormal',
    //   logic: "or"
    // },{
      //   field: "scheduleSaleStatus",
      //   method: "=",
      //   value: 'ScheduleStopSale',
      //   logic: "or"
      // }
      ]

      hangbanList=[]

      hangxianquery=[]
      hangxianList=[]

      youchanquery=[{
        field: "runStatus",
        method: "=",
        value: "Running",
        logic: "and"
      }]
      youchuanList=[]

      matouquery=[]
      matouList=[]

      paymethodList=[]

      sourceId='';

      scheduleId='';
      schedule={
        scheduleCode:'',
        route:{
          routeName:''
        },
        startTimeStr:'',
        endTimeStr:'',
        saleDateStr:'',
        ticketPrices:[]
      };

      orderdetail=[]

      curticket={}

      orderinfo={
        payMethodId: '',
      }

      totalamount=0;
      receivable=0;
      discount=1;
      receive=0;
      change=0;

      today=0

      calendardate=''

      groupid=0

      disabledDate = (current: Date): boolean => {
        return differenceInCalendarDays(current, new Date()) < 0;
      };

      clear(){
        for (var i = 0; i <6 ; i++) {
          this.hangbanquery[i].value=''
        }
      }

      calendarChange($event){
        console.log($event)
        if($event){
          var now = new Date($event);
        }else{
          var now = new Date();
        }

        this.starttimestamp=now.getTime();

        this.settime(0)

        var now = new Date(now)
        var year=now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var week="星期" + "日一二三四五六".charAt(now.getDay())

        var fulldate=year+'-'+month+'-'+day;
        this.nowdate = month + "月" + day + "日";
        this.nowday =week
        this.hangbanquery[5].value=moment(fulldate).format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[6].value=moment(fulldate).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[7].value=moment().format('YYYY-MM-DD HH:mm:ss');
        this.gethangban()
      }

      ngOnInit() {

        this.getnowdate()
        this.getsource()

        this.calendardate=new Date().toString();
        var now = new Date();
        this.starttimestamp=now.getTime();
        this.settime(0)


        var groupidtemp =localStorage.getItem('groupid')
        if(groupidtemp){
          this.groupid=parseInt(groupidtemp)
        }else{
          var groupid=new Date().getTime()
          this.groupid=groupid
          localStorage.setItem('groupid',groupid+'')
        }

        this.signalRService.startConnection(this.groupid);
      }

      openguest(){
        window.open("/#/guest/guestdisplay?gn="+this.groupid,'_blank',"menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");

        var that =this
        setTimeout(function(){
          if(that.schedule.scheduleCode){
            that.updateSchedule()
          }

          if(that.orderdetail.length>0){
            for (var i =0 ;i< that.orderdetail.length ; i++) {
              that.addTicket(that.orderdetail[i])
            }
          }
        },4000)
      }

      updateSchedule(){
        var data={
          scheduleCode:this.schedule.scheduleCode,
          routeName:this.schedule.route.routeName,
          startTimeStr:this.schedule.startTimeStr.split(' ')[1],
          endTimeStr:this.schedule.endTimeStr.split(' ')[1],
          saleDateStr:this.schedule.saleDateStr.split(' ')[0]
        }
        this.signalRService.send(this.groupid,'updateSchedule'+'&'+JSON.stringify(data));
      }

      addTicket(ticketitem){
        this.signalRService.send(this.groupid,'addTicket&'+JSON.stringify(ticketitem))
      }

      replace(data){
        this.signalRService.send(this.groupid,'replace&'+JSON.stringify(data))
      }

      deletet(i){
        this.signalRService.send(this.groupid,'deleteTicket&'+i)
      }


      settlement(){
        if(this.orderdetail.length==0){
          abp.message.warn(this.l('PleaseSelectTicket'));
          return
        }
        if(this.receive<this.totalamount){
          abp.message.warn(this.l('RecieveAmountLessTanReceivableAmount'));
          return
        }
        
        var orderdata = new CreateActivityModel()
        // console.log(orderdata)
        orderdata.sourceId= this.sourceId;
        orderdata.payMethodId= this.orderinfo.payMethodId;
        orderdata.activityDetails=[]
        for (var i = 0; i<this.orderdetail.length;i++) {
          orderdata.activityDetails.push(new CreateActivityDetailModel({
            ticketPriceId:this.orderdetail[i].ticket.id,
            customerId:this.orderdetail[i].customerId,
            quantity:1,
            scheduleId:this.scheduleId
          }))
        }

        this._activityService.createActivity(orderdata)
        .subscribe(result => {
          if(result.resultCode == "000"){
            this.notify.success(result.resultMessage);
            this.gethangban()
            this.orderdetail=[]
            this.countprice()
          }else{
            abp.message.warn(result.resultMessage);
          }
        });
      }


      getsource(){
        this._sourceService.getPaged(null,999,0)
        .subscribe(result => {
          // this.sourceList = result.items;
          for (var i = 0; i<result.items.length;i++) {
            if(result.items[i].sourceCode=='Reception'){
              this.sourceId=result.items[i].id
            }
          }
        });
      }

      gethangban(){
        var formdata = new GetSchedulesInput

        var arr=[]
        for (var i = this.hangbanquery.length - 1; i >= 0; i--) {
          if(this.hangbanquery[i].value){
            arr.push(new QueryData(this.hangbanquery[i]))
          }
        }

        formdata.queryData = arr;
        formdata.sorting = null
        formdata.maxResultCount = 999;
        formdata.isEnabled=true
        formdata.skipCount = 0;
        this._scheduleService.getPaged(formdata)
        .subscribe(result => {
          this.hangbanList = result.items;
        });
      }



      createOrEdit(item): void {

        if(item.scheduleStatus !== "WaitCheck"){
          abp.message.warn(this.l('ScheduleStopSale'));
          return
        }

        if(item.standardSurplusNum == 0 && item.vipSurplusNum == 0&& item.compartmentSurplusNum == 0){
          abp.message.warn('票已售罄');
          return
        }

        if(new Date(item.startTimeStr).getTime() < new Date().getTime()){
          abp.message.warn('停止售票');
          return
        }

        if(this.scheduleId && this.scheduleId!==item.id){
          this._modalService.create({
            nzTitle: this.l('Tips'),
            nzContent: this.l('IsReplaceSchedule'),
            nzClosable: false,
            nzOnOk: () => {
              this.schedule=item
              this.scheduleId=item.id
              this.orderdetail=[]

              this.updateSchedule()
              this.createcustomer()
            }
          });
        }else if(this.scheduleId && this.scheduleId==item.id){
          this.createcustomer()
        }
        else if(!this.scheduleId){
          this.scheduleId=item.id
          this.schedule=item
          this.updateSchedule()

          this.createcustomer()
        }
      }

      createcustomer(){
        localStorage.setItem('curschedule',JSON.stringify(this.schedule))
        localStorage.setItem('orderdetail',JSON.stringify(this.orderdetail))

        this.modalHelper.static(CreateOrEditPassengerComponent)
        .subscribe(result => {
          if (result) {
            console.log(result)
            var hadadd=false
            var hadindex=0
            this.orderdetail.forEach(function(item,index){
              if( item.customerId == result.customer.id){
                hadadd=true
                hadindex=index
              }
            })
            if(hadadd){
              this._modalService.create({
                nzTitle:  this.l('Tips'),
                nzContent:  this.l('IsReplacePassenger'),
                nzClosable: false,
                nzOnOk: () => {
                  var item={
                    customer:result.customer,
                    customerId:result.customer.id,
                    ticket: {}
                  }
                  this.schedule.ticketPrices.forEach(function(titem){
                    if( titem.id == result.ticketid){
                      item.ticket=titem
                    }
                  })
                  this.orderdetail[hadindex]=item
                  var data={
                    info:item,
                    index:hadindex
                  }
                  this.replace(data)

                  this.countprice()
                }
              });
            }else{

              var ticketitem={
                customer:result.customer,
                customerId:result.customer.id,
                ticket: {}
              }
              this.schedule.ticketPrices.forEach(function(titem){
                if( titem.id == result.ticketid){
                  ticketitem.ticket=titem
                }
              })
              this.orderdetail.push(ticketitem)
              this.addTicket(ticketitem)

              this.countprice()
            }
          }
        });
      }


      countprice(){
        var totalamount=0
        for (var i =0; i<this.orderdetail.length; i++) {
          totalamount+=this.orderdetail[i].ticket.price
        }
        this.totalamount=totalamount
        this.receivable=totalamount
      }

      deleteticket(i){
        this.orderdetail.splice(i,1);

        this.deletet(i)

        this.countprice()
      }


      settime(e){

        var now = new Date()
        var year=now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        this.today= new Date(year+'-'+month+'-'+day).getTime()

        if(e==1){
          var starttimestamp=this.starttimestamp - 7 * 86400000
          if (starttimestamp < this.today) {
            var now = new Date();
            this.starttimestamp=now.getTime();
            this.calendarChange(now)

            // abp.message.warn(this.l('TicketSaleClose'))
            return
          }
        }else if(e==2){
          var starttimestamp=this.starttimestamp + 7 * 86400000
        }else if(e==0){
          var starttimestamp=this.starttimestamp
        }
        this.starttimestamp=starttimestamp
        this.datearr=[]
        for(var i = 0 ; i < 7 ; i++){
          var myDate = new Date(starttimestamp + i * 86400000);
          var year=myDate.getFullYear();
          var month=myDate.getMonth()+1;
          var date=myDate.getDate();
          var dateitem={
            fulldate:year+'-'+month+'-'+date,
            date:month+"月"+date+"日",
            day:"星期" + "日一二三四五六".charAt(myDate.getDay()),
            enable:false
          }
          var thisdate=new Date()
          var year1=thisdate.getFullYear();
          var month1=thisdate.getMonth()+1;
          var date1=thisdate.getDate();


          if(dateitem.fulldate==year1+'-'+month1+'-'+date1){
            dateitem.day='今天'
          }
          if(myDate.getTime() < new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime()){
            dateitem.enable=false
          }else{
            dateitem.enable=true
          }
          this.datearr.push(dateitem)
        }
        // console.log(this.datearr)
      }

      datechange(a,b,c,d){
        if(!d){
          abp.message.warn(this.l('TicketSaleClose'))
          return
        }
        this.nowdate = a
        this.nowday = b
        this.hangbanquery[5].value=moment(c).format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[6].value=moment(c).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');

        this.hangbanquery[7].value=moment().format('YYYY-MM-DD HH:mm:ss');
        this.gethangban()
      }


      getnowdate(){
        var timestamp = (new Date()).getTime();

        var now = new Date(timestamp)
        var year=now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();

        var week="星期" + "日一二三四五六".charAt(now.getDay())

        this.nowdate = month + "月" + day + "日";
        this.nowday = week

        var fulldate=year+'-'+month+'-'+day;
        this.hangbanquery[5].value=moment(fulldate).format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[6].value=moment(fulldate).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
        this.hangbanquery[7].value=moment().format('YYYY-MM-DD HH:mm:ss');

        this.gethangban()
        this.gethangxian()
        this.getyouchan()
        // this.getmatou()
        this.getpaymethod()
      }

      gethangxian(){
        const formdata = new GetRoutesInput()
        formdata.queryData = this.hangxianquery;
        formdata.sorting = null
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._routeService.getPaged(formdata)
        .subscribe(result => {
          this.hangxianList = result.items;
        });
      }

      getyouchan(){
        var formdata = new GetBoatsInput

        var arr=[]
        for (var i = this.youchanquery.length - 1; i >= 0; i--) {
          if(this.youchanquery[i].value){
            arr.push(new QueryData(this.youchanquery[i]))
          }
        }

        formdata.queryData = arr;
        formdata.sorting = null
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;

        this._boatService.getPaged(formdata)
        .subscribe(result => {
          this.youchuanList = result.items;
        });
      }

      getpaymethod(){
        this._payMethodService.getPaged(null,999,0)
        .subscribe(result => {
          this.paymethodList = result.items;
          this.orderinfo.payMethodId=result.items[0].id
        });
      }

    }