
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateRouteInput,RouteEditDto, RouteServiceProxy,WharfServiceProxy,GetWharfsInput } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';
import { UtilsService } from '@abp/utils/utils.service';

import { AppConsts } from 'abpPro/AppConsts';

@Component({
  selector: 'create-or-edit-route',
  templateUrl: './create-or-edit-route.component.html',
  styleUrls:[
  'create-or-edit-route.component.less'
  ],
})

export class CreateOrEditRouteComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: RouteEditDto=new RouteEditDto();

    wharfList=[];

    uploadurl=''
    baseurl=''
    hearder={
      Authorization:''
    }

    lineImage=''

    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _routeService: RouteServiceProxy,
      private _wharfService: WharfServiceProxy,
      private _utilsService: UtilsService,
      ) {
      super(injector);
    }

    ngOnInit() :void{
      this.init();

      const formdata = new GetWharfsInput()
      formdata.queryData = [];
      formdata.sorting = null
      formdata.maxResultCount = 999;
      formdata.skipCount = 0;
      this._wharfService.getPaged(formdata)
      .subscribe(result => {
        this.wharfList = result.items;
      });
    }


    /**
    * 初始化方法
    */
    init(): void {
      this._routeService.getForEdit(this.id).subscribe(result => {
       this.entity = result.route;
       this.lineImage=result.route.lineImage;
     });
      this.uploadurl=AppConsts.remoteServiceBaseUrl+'/api/File/UploadImageAsync'
      this.hearder.Authorization='Bearer '+ this._utilsService.getCookieValue("Abp.AuthToken");
    }

    onChange1($event: string): void {
      for(var i=0;i<this.wharfList.length;i++){
        if(this.wharfList[i].id == $event){
          this.entity.startPosition =this.wharfList[i].wharfName
        }
      }
    }

    onChange2($event: string): void {
      for(var i=0;i<this.wharfList.length;i++){
        if(this.wharfList[i].id == $event){
          this.entity.endPosition =this.wharfList[i].wharfName
        }
      }
    }


    handleChange(info): void {
      console.log(info)
      switch (info.file.status) {

        case 'done':
        this.lineImage=info.file.name
        this.entity.lineImage=info.file.response.result.uri
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
      const input = new CreateOrUpdateRouteInput();
      input.route = this.entity;

      this.saving = true;

      this._routeService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success(true);
     });
    }
  }
