import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/component-base/paged-listing-component-base';
import {
  BooksServiceProxy,
  PagedResultDtoOfBookListDto,
  BookListDto
} from '@shared/service-proxies/service-proxies';
import { CreateOrEditBookComponent } from './create-or-edit-book/create-or-edit-book.component';
import { AppConsts } from 'abpPro/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';

@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less'],
  animations: [appModuleAnimation()]
})
export class BookComponent extends PagedListingComponentBase<BookListDto>
  implements OnInit {
  constructor(injector: Injector, private _booksService: BooksServiceProxy) {
    super(injector);
  }

  /**
   * 获取后端数据列表信息
   * @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
   * @param pageNumber 当前页码
   * @param finishedCallback 完成后回调函数
   */
  protected fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._booksService
      .getPagedBook(
        request.sorting,
        request.maxResultCount,
        request.skipCount
      )
      .finally(() => {
        finishedCallback();
      })
      .subscribe(
        result => {
          this.dataList = result.items;
          this.showPaging(result);
        },
        err => {
          this.notify.error(this.l('DefaultErrorMessage'));
          console.error(err);
        }
      );
  }

  /**
   * 新增或编辑DTO信息
   * @param id 当前DTO的Id
   */
  createOrEdit(id?: number): void {
    this.modalHelper.static(CreateOrEditBookComponent, { id: id }).subscribe(
      result => {
        if (result) {
          this.refresh();
        }
      },
      err => {
        this.notify.error(this.l('DefaultErrorMessage'));
        console.error(err);
      }
    );
  }

  /**
   * 删除功能
   * @param entity 角色的实体信息
   */
  delete(entity: BookListDto): void {
    this._booksService.deleteBook(entity.id).subscribe(
      () => {
        /**
         * 刷新表格数据并跳转到第一页（`pageNumber = 1`）
         */
        this.refreshGoFirstPage();
        this.notify.success(this.l('SuccessfullyDeleted'));
      },
      err => {
        this.notify.error(this.l('DefaultErrorMessage'));
        console.error(err);
      }
    );
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
          this._booksService.batchDeleteBook(ids).subscribe(
            () => {
              this.refreshGoFirstPage();
              this.notify.success(this.l('SuccessfullyDeleted'));
            },
            err => {
              this.notify.error(this.l('DefaultErrorMessage'));
              console.error(err);
            }
          );
        }
      }
    );
  }

  /**
   * 导出为Excel表
   */
  exportToExcel(): void {
    abp.message.error('功能开发中！！！！');
    // this._booksService.getBookExportToExcel().subscribe(result => {
    // this._fileDownloadService.downloadTempFile(result);
    // });
  }
}
