
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateWharfInput,WharfEditDto, WharfServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-wharf',
  templateUrl: './create-or-edit-wharf.component.html',
  styleUrls:[
	'create-or-edit-wharf.component.less'
  ],
})

export class CreateOrEditWharfComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: WharfEditDto=new WharfEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _wharfService: WharfServiceProxy
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
		this._wharfService.getForEdit(this.id).subscribe(result => {
			this.entity = result.wharf;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateWharfInput();
		input.wharf = this.entity;

		this.saving = true;

		this._wharfService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
