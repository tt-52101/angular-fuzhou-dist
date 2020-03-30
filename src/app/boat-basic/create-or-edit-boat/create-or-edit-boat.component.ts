
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateBoatInput,BoatEditDto, BoatServiceProxy,
  RouteServiceProxy,
  GetRoutesInput,
} from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';
import { UtilsService } from '@abp/utils/utils.service';

import { AppConsts } from 'abpPro/AppConsts';

import * as moment from 'moment';

@Component({
  selector: 'create-or-edit-boat',
  templateUrl: './create-or-edit-boat.component.html',
  styleUrls:[
  'create-or-edit-boat.component.less'
  ],
})

export class CreateOrEditBoatComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: BoatEditDto=new BoatEditDto();

    uploadurl=''
    baseurl=''
    hearder={
      Authorization:''
    }
    routeList=[]
    picture=''
    createDate:any;
    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _boatService: BoatServiceProxy,
      private _utilsService: UtilsService,
      private _routeService: RouteServiceProxy,
      ) {
      super(injector);
    }

    ngOnInit() :void{
      this.init();
    }

    /**
    * 初始化方法
    */
    init(): void {
      this._boatService.getForEdit(this.id).subscribe(result => {
        this.entity = result.boat;
        this.picture=result.boat.picture;
        this.createDate = new Date(moment(result.boat.createDate).add(8,'h').toString())
      });
      this.uploadurl=AppConsts.remoteServiceBaseUrl+'/api/File/UploadImageAsync'
      this.hearder.Authorization='Bearer '+ this._utilsService.getCookieValue("Abp.AuthToken");

      this.getroute()
    }

    datechange($event): void {
      var year=$event.getFullYear();
      var month = $event.getMonth() + 1;
      var day = $event.getDate();
      var fulldate=year+'-'+month+'-'+day;
      this.createDate=moment(fulldate)
      this.entity.createDate=moment(fulldate)
    }


    getroute(){
      var formdata = new GetRoutesInput()
      formdata.queryData =[]
      formdata.sorting = ""
      formdata.maxResultCount = 999;
      formdata.skipCount = 0;

      this._routeService.getPaged(formdata)
      .subscribe(result => {
        this.routeList = result.items;
      });
    }

    handleChange(info): void {
      console.log(info)
      switch (info.file.status) {

        case 'done':
        this.picture=info.file.name
        this.entity.picture=info.file.response.result.uri
        break;
        case 'error':
        abp.message.error(this.l('UploadFail'));
        break;
      }
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      const input = new CreateOrUpdateBoatInput();
      input.boat = this.entity;
      // console.log(input.boat)
      // return
      this.saving = true;

      this._boatService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.success(true);
      });
    }
  }
