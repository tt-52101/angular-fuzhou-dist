
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {TicketUserEnableServiceProxy, PagedResultDtoOfTicketUserEnableListDto, TicketUserEnableListDto } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTicketUserEnableComponent } from './create-or-edit-ticket-user-enable/create-or-edit-ticket-user-enable.component';


@Component({
	templateUrl: './ticket-user-enable.component.html',
	styleUrls: ['./ticket-user-enable.component.less'],
	animations: [appModuleAnimation()],
})


export class  TicketUserEnableComponent extends PagedListingComponentBase<TicketUserEnableListDto>
implements OnInit {
	
	constructor(
		injector: Injector,
		private _ticketUserEnableService: TicketUserEnableServiceProxy
		) {
		super(injector);
	}
	

	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		this._ticketUserEnableService.getPaged(
			request.sorting,
			request.maxResultCount,
			request.skipCount,
			)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			this.dataList = result.items;
			this.showPaging(result);
		});
	}
	

	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditTicketUserEnableComponent, { id: id })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}
}