
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {TicketPriceServiceProxy, PagedResultDtoOfTicketPriceListDto, TicketPriceListDto,GetTicketPricesInput } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTicketPriceComponent } from './create-or-edit-ticket-price/create-or-edit-ticket-price.component';
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';


@Component({
	templateUrl: './ticket-price.component.html',
	styleUrls: ['./ticket-price.component.less'],
	animations: [appModuleAnimation()],
})


export class  TicketPriceComponent extends PagedListingComponentBase<TicketPriceListDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _ticketPriceService: TicketPriceServiceProxy,
		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}

	isAllOperation=false
	curmenupower=[]

	queryData = [];

	/**
	* 获取后端数据列表信息
	* @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
	* @param pageNumber 当前页码
	* @param finishedCallback 完成后回调函数
	*/
	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		var formdata=new GetTicketPricesInput
		formdata.queryData=this.queryData
		formdata.sorting=request.sorting
		formdata.maxResultCount=request.maxResultCount
		formdata.skipCount=request.skipCount
		this._ticketPriceService.getPagedPost(formdata)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			this.dataList = result.items;
			this.showPaging(result);
		});
	}

	/**
	* 新增或编辑DTO信息
	* @param id 当前DTO的Id
	*/
	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditTicketPriceComponent, { id: id })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}


	/**
	* 删除功能
	* @param entity 角色的实体信息
	*/
	delete(entity: TicketPriceListDto): void {
		this._ticketPriceService.delete(entity.id)
		.subscribe(() => {
		/**
		* 刷新表格数据并跳转到第一页（`pageNumber = 1`）
		*/
		this.refreshGoFirstPage();
		this.notify.success(this.l('SuccessfullyDeleted'));
	});
	}

	enabled(id?: string): void {
		this._ticketPriceService.setPriceEnable(id,true)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyEditd'));
		});
	}

	notenabled(id?: string): void {
		this._ticketPriceService.setPriceEnable(id,false)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyEditd'));
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
					this._ticketPriceService.batchDelete(ids).subscribe(() => {
						this.refreshGoFirstPage();
						this.notify.success(this.l('SuccessfullyDeleted'));
					});
				}
			},
			);
	}


	/**
	* 导出为Excel表
	*/
	exportToExcel(): void {
		abp.message.error('功能开发中！！！！');
		// this._ticketPriceService.getTicketPriceexportToExcel().subscribe(result => {
			// this._fileDownloadService.downloadTempFile(result);
			// });
		}

	}
