import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import {  ActivityServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'edit-control',
  templateUrl: './edit-control.component.html',
  styleUrls: [
  'edit-control.component.less'
  ],
})

export class EditControlComponent extends ModalComponentBase
implements OnInit {

  entity: any;

  constructor(
    injector: Injector,
    private _activityService: ActivityServiceProxy,
    ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    console.log(this.entity)
  }

  submitForm(): void {

    if(this.entity.standardReserveNum > this.entity.standardSurplusNum){
      abp.message.warn('标准舱预留数需小于或等于游船标准舱剩余数量');
      return
    }
    if(this.entity.vipReserveNum > this.entity.vipSurplusNum){
      abp.message.warn('VIP舱预留数需小于或等于游船VIP舱剩余数量');
      return
    }
    if(this.entity.compartmentReserveNum > this.entity.compartmentSurplusNum){
      abp.message.warn('包间舱预留数需小于或等于游船包间舱剩余数量');
      return
    }


    this.saving = true;
    this._activityService.setReserveQuantityByWare(
      this.entity.id,
      this.entity.standardReserveNum,
      this.entity.vipReserveNum,
      this.entity.compartmentReserveNum,
      this.entity.remark
      )
    .finally(() => (this.saving = false))
    .subscribe(result => {
      // console.log(result)
      if(result.resultCode =="000"){
        this.notify.success(this.l('SavedSuccessfully'));
        this.success(true);
      }else{
        // console.log(this)
        abp.message.warn(result.resultMessage);
        // this.warning(result.resultMessage);
      }
    });
  }
}
