import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateCustomerInput,CustomerEditDto, CustomerServiceProxy,GetCustomersInput,QueryData ,UploadUserPictureDto,VerifiableTypeEnum,
  TicketPriceServiceProxy
} from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd';

import { UtilsService } from '@abp/utils/utils.service';
import { AppConsts } from 'abpPro/AppConsts';

import * as baseISSOnline from 'assets/baseISSOnline.js';
import ZK from 'assets/baseISSObject.js';


@Component({
  selector: 'create-or-edit-passenger',
  templateUrl: './create-or-edit-passenger.component.html',
  styleUrls: [
  'create-or-edit-passenger.component.less'
  ],
})

export class CreateOrEditPassengerComponent
extends ModalComponentBase
implements OnInit {

  entity: CustomerEditDto=new CustomerEditDto();

  uploadurl=''

  hearder={
    Authorization:''
  }
  photo=''

  video:any;
  canvas:any;
  context:any;

  cantakepic=true;

  ticketlist=[]

  orderdetail=[]
  curschedule:any

  warePosition='StandradPosition'
  ticketid=''


  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    private _utilsService: UtilsService,
    private _ticketPriceService: TicketPriceServiceProxy,
    private _modalService: NzModalService,
    ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
    this.setcardreader()
  }

  setcardreader(){
    var that=this
    var Cardreaderset={
      Cert : {
        callBack : function(result){
          that.setCertificateData(result);
        },
        select : '#button_readID'
      },
      Methods : {
        downloadDrive : function(){
          abp.message.warn("请安装相关硬件驱动！")
        },
        showMessage : function(type,message){
          abp.message.warn(message)
        }
      }
    }

    baseISSOnline.createISSonlineDevice(Cardreaderset)
    console.log(baseISSOnline)
  }

  createshebei(){
    var Device=new baseISSOnline.Device
    Device.startFun()
  }

  setCertificateData(result) {
    console.log(result);
    console.log(result.Certificate.Name);
    console.log(result.Certificate.IDNumber);
    console.log(result.Certificate.Sex);

  }





  legal(con) {

    if (!(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(this.entity.certificatesNum)) && this.entity.verifiableType == VerifiableTypeEnum.IdentityCard) {//身份证
      con.setErrors({ legal: true })
    }
    if( !(/(H|M)(\d{10})$/.test(this.entity.certificatesNum)) && this.entity.verifiableType == VerifiableTypeEnum.ReturnCard){//回乡证
      con.setErrors({ legal: true })
    }
    if( !(/(^\d{8})$/.test(this.entity.certificatesNum)) && this.entity.verifiableType == VerifiableTypeEnum.TaiwanCard){//台胞证
      con.setErrors({ legal: true })
    }
  }

  mobilelegal(con){
    if( !(/^1[3456789]\d{9}$/.test(this.entity.mobile))){
      con.setErrors({ mobilelegal: true })
    }
  }

  init(): void {
    this.entity.verifiableType=VerifiableTypeEnum.IdentityCard
    this.uploadurl=AppConsts.remoteServiceBaseUrl+'/api/File/UploadImageAsync'
    this.hearder.Authorization='Bearer '+ this._utilsService.getCookieValue("Abp.AuthToken");
    var that=this

    that.getticket()

    setTimeout(() => {
      that.setvideo()
    }, 1000);
  }

  setvideo(){
    var that=this
    this.video = this.elementRef.nativeElement.querySelector('video');
    this.canvas = this.elementRef.nativeElement.querySelector('canvas');
    this.context = this.canvas.getContext('2d');

    if (navigator.mediaDevices.getUserMedia) {

      var constraints = { video : {width: 190, height: 200} }; 

      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
        var video = that.elementRef.nativeElement.querySelector('video')
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) { that.cantakepic=false; 
        // console.log(err.name + ": " + err.message); 
      });
    } else if(navigator.getUserMedia){
      // this.getUserMedia({video : {width: 480, height: 320}}, this.success, this.error);
    } else {
      // alert('不支持访问用户媒体');
    }
  }

  makepic(){
    if(this.cantakepic){
      this.context.drawImage(this.video, 0, 0, 190, 200);
      var basestr = this.canvas.toDataURL("image/png")
      // console.log(basestr)
      var formdata=new UploadUserPictureDto
      formdata.pictureString=basestr.split(',')[1]
      this._customerService.userPictureBase64(formdata)
      .subscribe(res => {
        console.log(res.uri)
        this.entity.photo=res.uri
      });
    }else{
      abp.message.error('无法拍照，请检查设备');
    }
  }

  search(){
    if(this.entity.certificatesNum){
      this._customerService.exists(this.entity.certificatesNum)
      .subscribe(res => {
        if(res.exist){
          this.entity=res.customer;
        }else{
          abp.message.warn("当前游客信息未录入系统")
        }
      });
    }else{
      abp.message.error('请先输入证件号码');
    }
  }


  handleChange(info): void {
    // console.log(info)
    switch (info.file.status) {
      case 'done':
      this.photo=info.file.name
      this.entity.photo=info.file.response.result.uri
      break;
      case 'error':
      abp.message.error(this.l('UploadFail'));
      break;
    }
  }


  classchange($event){
    this.ticketid=''
    this.getticket()
  }

  getticket(){
    var curschedule=JSON.parse(localStorage.getItem('curschedule'))
    var orderdetail=JSON.parse(localStorage.getItem('orderdetail'))
    var that=this
    that.orderdetail=orderdetail
    that.curschedule=curschedule
    var arr=[]
    // console.log(that.warePosition)
    curschedule.ticketPrices.forEach(function(item){
      if(item.warePosition == that.warePosition){
        arr.push(item)
      }
    })
    this.ticketlist=arr
    // console.log(arr)
    // console.log(this.ticketid)
    if(arr.length > 0){
      this.ticketid=arr[0].id
    }
  }


  submitForm(): void {
    var that= this
    var curwarePositionnum=0
    var numlimit= 0
    this.orderdetail.forEach(function(item){
      if(item.ticket.warePosition== that.warePosition){
        curwarePositionnum=curwarePositionnum+1
      }
    })
    if(this.warePosition == 'StandradPosition'){
      numlimit=this.curschedule.standardSurplusNum
    }else if(this.warePosition == 'VIPPosition'){
      numlimit=this.curschedule.vipSurplusNum
    }else if(this.warePosition == 'CompartmentPosotion'){
      numlimit=this.curschedule.compartmentSurplusNum
    }

    if(curwarePositionnum == numlimit){
      abp.message.warn('当前舱位余票不足，请预订其它舱位船票');
      return
    }

    const input = new CreateOrUpdateCustomerInput();
    var formdata = new GetCustomersInput()

    var arr=[new QueryData({
      field: "certificatesNum",
      method: "=",
      value: this.entity.certificatesNum,
      logic: "and"
    })]

    formdata.queryData = arr;
    formdata.sorting = null
    formdata.maxResultCount = 999;
    formdata.skipCount = 0;

    this._customerService.getPaged(formdata)
    .subscribe(result => {

      if(result.items.length>0){

        var modalinfo={
          customer:result.items[0],
          warePosition:this.warePosition,
          ticketid:this.ticketid,
        }
        this.success(modalinfo);

      }else{
        this.entity.loginPwd="123456"
        input.customer = this.entity;

        this.saving = true;

        this._customerService.createOrUpdate(input)
        .finally(() => (this.saving = false))
        .subscribe(res => {
          // console.log(res)

          this._customerService.exists(this.entity.certificatesNum)
          .subscribe(res => {
            // console.log(res)
            this.notify.success(this.l('SavedSuccessfully'));
            var modalinfo={
              customer:res.customer,
              warePosition:this.warePosition,
              ticketid:this.ticketid,
            }
            this.success(modalinfo);
          });
        });
      }
    });
  }

}
