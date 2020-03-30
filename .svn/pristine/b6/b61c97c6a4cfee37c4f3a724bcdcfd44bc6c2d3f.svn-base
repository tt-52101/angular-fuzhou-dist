
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTicketStationEnableInput,TicketStationEnableEditDto, TicketStationEnableServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-ticket-station-enable',
  templateUrl: './create-or-edit-ticket-station-enable.component.html',
  styleUrls:[
	'create-or-edit-ticket-station-enable.component.less'
  ],
})

export class CreateOrEditTicketStationEnableComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: TicketStationEnableEditDto=new TicketStationEnableEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _ticketStationEnableService: TicketStationEnableServiceProxy
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
		this._ticketStationEnableService.getForEdit(this.id).subscribe(result => {
			this.entity = result.ticketStationEnable;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateTicketStationEnableInput();
		input.ticketStationEnable = this.entity;

		this.saving = true;

		this._ticketStationEnableService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
