"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var routerTransition_1 = require("@shared/animations/routerTransition");
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var create_or_edit_verifiable_set_component_1 = require("./create-or-edit-verifiable-set/create-or-edit-verifiable-set.component");
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';
var VerifiableSetComponent = /** @class */ (function (_super) {
    __extends(VerifiableSetComponent, _super);
    function VerifiableSetComponent(injector, _verifiableSetService, _deviceService) {
        var _this = _super.call(this, injector) || this;
        _this._verifiableSetService = _verifiableSetService;
        _this._deviceService = _deviceService;
        _this.devicList = [];
        _this.queryData = [{
                field: "deviceId",
                method: "=",
                value: "",
                logic: "and"
            }];
        return _this;
    }
    /**
    * 获取后端数据列表信息
    * @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
    * @param pageNumber 当前页码
    * @param finishedCallback 完成后回调函数
    */
    VerifiableSetComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._verifiableSetService.getPaged(request.sorting, request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            console.log(result.items);
            _this.dataList = result.items;
            _this.showPaging(result);
        });
        var formdata = new service_proxies_1.GetDevicesInput();
        formdata.queryData = [];
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._deviceService.getPaged(formdata)
            .subscribe(function (result) {
            _this.devicList = result.items;
        });
    };
    /**
    * 新增或编辑DTO信息
    * @param id 当前DTO的Id
    */
    VerifiableSetComponent.prototype.createOrEdit = function (id) {
        var _this = this;
        this.modalHelper.static(create_or_edit_verifiable_set_component_1.CreateOrEditVerifiableSetComponent, { id: id })
            .subscribe(function (result) {
            if (result) {
                _this.refresh();
            }
        });
    };
    /**
    * 删除功能
    * @param entity 角色的实体信息
    */
    VerifiableSetComponent.prototype.delete = function (entity) {
        var _this = this;
        this._verifiableSetService.delete(entity.id)
            .subscribe(function () {
            /**
            * 刷新表格数据并跳转到第一页（`pageNumber = 1`）
            */
            _this.refreshGoFirstPage();
            _this.notify.success(_this.l('SuccessfullyDeleted'));
        });
    };
    /**
    * 批量删除
    */
    VerifiableSetComponent.prototype.batchDelete = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        abp.message.confirm(this.l('ConfirmDeleteXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                var ids = _.map(_this.selectedDataItems, 'id');
                _this._verifiableSetService.batchDelete(ids).subscribe(function () {
                    _this.refreshGoFirstPage();
                    _this.notify.success(_this.l('SuccessfullyDeleted'));
                });
            }
        });
    };
    /**
    * 导出为Excel表
    */
    VerifiableSetComponent.prototype.exportToExcel = function () {
        abp.message.error('功能开发中！！！！');
        // this._verifiableSetService.getVerifiableSetexportToExcel().subscribe(result => {
        // this._fileDownloadService.downloadTempFile(result);
        // });
    };
    VerifiableSetComponent = __decorate([
        core_1.Component({
            templateUrl: './verifiable-set.component.html',
            styleUrls: ['./verifiable-set.component.less'],
            animations: [routerTransition_1.appModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.VerifiableSetServiceProxy,
            service_proxies_1.DeviceServiceProxy])
    ], VerifiableSetComponent);
    return VerifiableSetComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.VerifiableSetComponent = VerifiableSetComponent;
