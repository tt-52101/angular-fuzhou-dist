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
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var utils_service_1 = require("@abp/utils/utils.service");
var AppConsts_1 = require("abpPro/AppConsts");
var CreateOrEditTicketIntroduceComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditTicketIntroduceComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditTicketIntroduceComponent(injector, _ticketIntroduceService, _ticketService, _scenicSpotService, _utilsService) {
        var _this = _super.call(this, injector) || this;
        _this._ticketIntroduceService = _ticketIntroduceService;
        _this._ticketService = _ticketService;
        _this._scenicSpotService = _scenicSpotService;
        _this._utilsService = _utilsService;
        _this.entity = new service_proxies_1.TicketIntroduceEditDto();
        _this.uploadurl = '';
        _this.baseurl = '';
        _this.hearder = {
            Authorization: ''
        };
        _this.coverMap = '';
        _this.queryData = [];
        _this.scenicspotList = [];
        _this.ticketList = [];
        return _this;
    }
    CreateOrEditTicketIntroduceComponent.prototype.ngOnInit = function () {
        this.init();
    };
    /**
    * 初始化方法
    */
    CreateOrEditTicketIntroduceComponent.prototype.init = function () {
        var _this = this;
        this._ticketIntroduceService.getForEdit(this.id).subscribe(function (result) {
            _this.entity = result.ticketIntroduce;
            _this.coverMap = result.ticketIntroduce.coverMap;
        });
        var formdata = new service_proxies_1.GetTicketsInput();
        formdata.queryData = this.queryData;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._ticketService.getPaged(formdata)
            .subscribe(function (result) {
            _this.ticketList = result.items;
        });
        this._scenicSpotService.getPaged(null, null, 999, 0)
            .subscribe(function (result) {
            _this.scenicspotList = result.items;
        });
        this.uploadurl = AppConsts_1.AppConsts.remoteServiceBaseUrl + '/api/File/UploadImageAsync';
        this.hearder.Authorization = 'Bearer ' + this._utilsService.getCookieValue("Abp.AuthToken");
    };
    CreateOrEditTicketIntroduceComponent.prototype.handleChange = function (info) {
        console.log(info);
        switch (info.file.status) {
            case 'done':
                this.coverMap = info.file.name;
                this.entity.coverMap = info.file.response.result.uri;
                break;
            case 'error':
                abp.message.error(this.l('UploadFail'));
                break;
        }
    };
    CreateOrEditTicketIntroduceComponent.prototype.onChange1 = function ($event) {
        this.entity.scenicSpotId = $event;
    };
    CreateOrEditTicketIntroduceComponent.prototype.onChange2 = function ($event) {
        this.entity.ticketId = $event;
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditTicketIntroduceComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateTicketIntroduceInput();
        input.ticketIntroduce = this.entity;
        this.saving = true;
        this._ticketIntroduceService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditTicketIntroduceComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-ticket-introduce',
            templateUrl: './create-or-edit-ticket-introduce.component.html',
            styleUrls: [
                'create-or-edit-ticket-introduce.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.TicketIntroduceServiceProxy,
            service_proxies_1.TicketServiceProxy,
            service_proxies_1.ScenicSpotServiceProxy,
            utils_service_1.UtilsService])
    ], CreateOrEditTicketIntroduceComponent);
    return CreateOrEditTicketIntroduceComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditTicketIntroduceComponent = CreateOrEditTicketIntroduceComponent;
