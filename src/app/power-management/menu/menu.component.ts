import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { MenuServiceProxy, PagedResultDtoOfMenuListDto, MenuListDto,QueryData,GetMenusInput } from '@shared/service-proxies/service-proxies';
import { CreateOrEditMenuComponent } from './create-or-edit-menu/create-or-edit-menu.component';
//import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';
import { ReuseTabService } from '@delon/abc';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  animations: [appModuleAnimation()],
})


export class MenuComponent extends PagedListingComponentBase < MenuListDto >
implements OnInit {

  constructor(
    injector: Injector,
    private _menuService: MenuServiceProxy,
    private _reuseTabService: ReuseTabService
    ) {
    super(injector);

    this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
    this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
  }

  isAllOperation=false
  curmenupower=[]

  menuarr=[]


  queryData=[{
    field: "id",
    method: "=",
    value: "",
    logic: "and"
  }]


    /**
     * 获取后端数据列表信息
     * @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
     * @param pageNumber 当前页码
     * @param finishedCallback 完成后回调函数
     */
     protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
       var arr=[]
       if(this.queryData[0].value){
         arr.push(new QueryData(this.queryData[0]))
       }

       var formdata=new GetMenusInput()
       formdata.queryData = arr;
       formdata.sorting = null;
       formdata.maxResultCount = 999;
       formdata.skipCount = 0;

       this._menuService.getPaged(formdata)
       .finally(() => {
         finishedCallback();
       })
       .subscribe(result => {
         this.getmenu()
         this.dataList = result.items;
         this.showPaging(result);
       });
     }

     getmenu(){
       this._menuService.getMenuDropDown()
       .subscribe(res => {
         this.menuarr = res
       });
     }


     onChange($event: string): void {
       this.queryData[0].value = $event
       this.refresh()
     }


    /**
     * 新增或编辑DTO信息
     * @param id 当前DTO的Id
     */
     createOrEdit(id ? : number): void {
       this.modalHelper.static(CreateOrEditMenuComponent, { id: id })
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
     delete(entity: MenuListDto): void {
       this._menuService.delete(entity.id)
       .subscribe(() => {
          /**
           * 刷新表格数据并跳转到第一页（`pageNumber = 1`）
           */
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
             this._menuService.batchDelete(ids).subscribe(() => {
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
       // this._menuService.getMenuexportToExcel().subscribe(result => {
         // this._fileDownloadService.downloadTempFile(result);
         // });
       }
     }
