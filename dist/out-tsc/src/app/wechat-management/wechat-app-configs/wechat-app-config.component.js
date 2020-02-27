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
var create_or_edit_wechat_app_config_component_1 = require("./create-or-edit-wechat-app-config/create-or-edit-wechat-app-config.component");
var img_show_component_1 = require("@app/app-shared/components/img-show/img-show.component");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
//  import { FileDownloadService } from '@shared/utils/file-download.service';
var WechatAppConfigComponent = /** @class */ (function (_super) {
    __extends(WechatAppConfigComponent, _super);
    function WechatAppConfigComponent(injector, router, _wechatAppConfigService) {
        var _this = _super.call(this, injector) || this;
        _this.router = router;
        _this._wechatAppConfigService = _wechatAppConfigService;
        return _this;
    }
    /**
     * 获取后端数据列表信息
     * @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
     * @param pageNumber 当前页码
     * @param finishedCallback 完成后回调函数
     */
    WechatAppConfigComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._wechatAppConfigService
            .getPaged(this.filterText, request.sorting, request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    /**
     * 新增或编辑DTO信息
     * @param id 当前DTO的Id
     */
    WechatAppConfigComponent.prototype.createOrEdit = function (id) {
        var _this = this;
        this.modalHelper
            .static(create_or_edit_wechat_app_config_component_1.CreateOrEditWechatAppConfigComponent, { id: id })
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
    WechatAppConfigComponent.prototype.delete = function (entity) {
        var _this = this;
        this._wechatAppConfigService.delete(entity.id).subscribe(function () {
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
    WechatAppConfigComponent.prototype.batchDelete = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        abp.message.confirm(this.l('ConfirmDeleteXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                var ids = _.map(_this.selectedDataItems, 'id');
                _this._wechatAppConfigService.batchDelete(ids).subscribe(function () {
                    _this.refreshGoFirstPage();
                    _this.notify.success(_this.l('SuccessfullyDeleted'));
                });
            }
        });
    };
    /**
     * 导出为Excel表
     */
    WechatAppConfigComponent.prototype.exportToExcel = function () {
        abp.message.error('功能开发中！！！！');
        // this._wechatAppConfigService.getWechatAppConfigexportToExcel().subscribe(result => {
        // this._fileDownloadService.downloadTempFile(result);
        // });
    };
    /**
     * 显示二维码图片
     * @param url 二维码链接
     */
    WechatAppConfigComponent.prototype.showImg = function (url) {
        debugger;
        this.modalHelper
            .open(img_show_component_1.ImgShowComponent, { imgUrl: url }, 'md')
            .subscribe(function () { });
    };
    /**
     * 编辑自定义菜单
     * @param item
     */
    WechatAppConfigComponent.prototype.editMenu = function (item) {
        var self = this;
        setTimeout(function () {
            self.router.navigate([
                'app/wechat/create-or-edit-wechat-menu',
                { appId: item.appId, appName: item.name }
            ]);
        }, 300);
    };
    /**
     * 注册app
     * @param item
     */
    WechatAppConfigComponent.prototype.registerApp = function (item) {
        var _this = this;
        this._wechatAppConfigService
            .registerWechatApp(item.appId)
            .pipe(operators_1.finalize(function () { }))
            .subscribe(function () {
            _this.notify.success(_this.l('RegisterWechatAppSuccessfully'));
            _this.refresh();
        });
    };
    WechatAppConfigComponent.prototype.editMaterial = function (item) {
        var self = this;
        setTimeout(function () {
            self.router.navigate([
                'app/wechat/wechat-materials',
                { appId: item.appId, appName: item.name }
            ]);
        }, 300);
    };
    WechatAppConfigComponent = __decorate([
        core_1.Component({
            templateUrl: './wechat-app-config.component.html',
            styleUrls: ['./wechat-app-config.component.less'],
            animations: [routerTransition_1.appModuleAnimation()]
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.Router,
            service_proxies_1.WechatAppConfigServiceProxy])
    ], WechatAppConfigComponent);
    return WechatAppConfigComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.WechatAppConfigComponent = WechatAppConfigComponent;
