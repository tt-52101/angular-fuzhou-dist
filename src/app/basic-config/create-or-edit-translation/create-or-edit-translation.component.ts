
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { JsonWRServiceProxy,JsonCell } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-translation',
  templateUrl: './create-or-edit-translation.component.html',
  styleUrls:[
  'create-or-edit-translation.component.less'
  ],
})

export class CreateOrEditTranslationComponent extends ModalComponentBase implements OnInit {
    /**
    * 编辑时DTO的id
    */
    path: any;

    entity: JsonCell=new JsonCell();


    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _jsonWRService: JsonWRServiceProxy
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
      this._jsonWRService.getByPathPost(this.path).subscribe(result => {
        this.entity = result;
      });
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      var input = new JsonCell();
      input = this.entity;
      this.saving = true;

      this._jsonWRService.updatePost(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.success(true);
      });
    }
  }
