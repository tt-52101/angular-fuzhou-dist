
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {JsonWRServiceProxy, PagedResultDtoOfJsonCell,GetCommonInput,JsonCell,QueryData } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTranslationComponent } from './create-or-edit-translation/create-or-edit-translation.component';


@Component({
	templateUrl: './translation.component.html',
	styleUrls: ['./translation.component.less'],
	animations: [appModuleAnimation()],
})


export class  TranslationComponent extends PagedListingComponentBase<JsonCell>
implements OnInit {
	
	constructor(
		injector: Injector,
		private _jsonWRService: JsonWRServiceProxy
		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}

	isAllOperation=false
	curmenupower=[]
	queryData=[{
		field: "path",
		method: "=",
		value: "",
		logic: "or"
	}]


	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		var formdata=new GetCommonInput
		var arr=[]

		if(this.queryData[0].value){
			arr.push(new QueryData(this.queryData[0]))
			arr.push(new QueryData({
				field: "value",
				method: "=",
				value: this.queryData[0].value,
				logic: "or"
			}))
		}
		
		formdata.queryData = arr;
		formdata.sorting = ""
		formdata.maxResultCount = request.maxResultCount;
		formdata.skipCount = request.skipCount;
		this._jsonWRService.getPagedPost(formdata)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			console.log(result)
			this.dataList = result.items;
			this.showPaging(result);
		});
	}
	
	createOrEdit(path?: any): void {
		this.modalHelper.static(CreateOrEditTranslationComponent, { path: path })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}
	

}