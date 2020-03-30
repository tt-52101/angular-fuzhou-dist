
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {PriceAuditServiceProxy, PagedResultDtoOfPriceAuditListDto, PriceAuditListDto,GetPriceAuditsInput,
	ScheduleServiceProxy,
	GetSchedulesInput
} from '@shared/service-proxies/service-proxies';
import { CreateOrEditPriceAuditComponent } from './create-or-edit-price-audit/create-or-edit-price-audit.component';


@Component({
	templateUrl: './price-audit.component.html',
	styleUrls: ['./price-audit.component.less'],
	animations: [appModuleAnimation()],
})


export class  PriceAuditComponent extends PagedListingComponentBase<PriceAuditListDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _priceAuditService: PriceAuditServiceProxy,

		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}

	isAllOperation=false
	curmenupower=[]

	queryData = [];

	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {

		const formdata = new GetPriceAuditsInput();
		formdata.queryData = this.queryData;
		formdata.sorting = request.sorting
		formdata.maxResultCount = request.maxResultCount;
		formdata.skipCount = request.skipCount;

		this._priceAuditService.getPaged(formdata)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			this.dataList = result.items;
			this.showPaging(result);
		});
	}



	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditPriceAuditComponent, { id: id })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}

	throughAudit(entity: PriceAuditListDto): void {
		this._priceAuditService.updateThroughAudit(entity)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyEditd'));
		});
	}

	rejecteAudit(entity: PriceAuditListDto): void {
		this._priceAuditService.updateRejecteAudit(entity)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyEditd'));
		});
	}


	enabled(entity: PriceAuditListDto): void {
		entity.isEnabled=true
		this._priceAuditService.updateThroughAudit(entity)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyEditd'));
		});
	}

	notenabled(entity: PriceAuditListDto): void {
		entity.isEnabled=false
		this._priceAuditService.updateThroughAudit(entity)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyEditd'));
		});
	}

	delete(entity: PriceAuditListDto): void {
		this._priceAuditService.delete(entity.id)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyDeleted'));
		});
	}

	/**
	* 批量删除
	*/
	batchDelete(): void {
		const selectCount = this.selectedDataItems.length;
		if (selectCount <= 0) {
			abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
			return;
		}

		abp.message.confirm(
			this.l('ConfirmDeleteXItemsWarningMessage', selectCount),
			res => {
				if (res) {
					const ids = _.map(this.selectedDataItems, 'id');
					this._priceAuditService.batchDelete(ids).subscribe(() => {
						this.refreshGoFirstPage();
						this.notify.success(this.l('SuccessfullyDeleted'));
					});
				}
			},
			);
	}
	
	
}

