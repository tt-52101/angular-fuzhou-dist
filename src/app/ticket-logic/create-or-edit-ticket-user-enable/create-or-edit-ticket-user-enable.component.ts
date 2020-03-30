
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTicketUserEnableInput,TicketUserEnableEditDto, TicketUserEnableServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-ticket-user-enable',
  templateUrl: './create-or-edit-ticket-user-enable.component.html',
  styleUrls:[
	'create-or-edit-ticket-user-enable.component.less'
  ],
})

export class CreateOrEditTicketUserEnableComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: TicketUserEnableEditDto=new TicketUserEnableEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _ticketUserEnableService: TicketUserEnableServiceProxy
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
		this._ticketUserEnableService.getForEdit(this.id).subscribe(result => {
			this.entity = result.ticketUserEnable;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateTicketUserEnableInput();
		input.ticketUserEnable = this.entity;

		this.saving = true;

		this._ticketUserEnableService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
