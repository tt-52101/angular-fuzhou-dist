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
var CreateOrEditBoatComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditBoatComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditBoatComponent(injector, _boatService, _utilsService, _routeService) {
        var _this = _super.call(this, injector) || this;
        _this._boatService = _boatService;
        _this._utilsService = _utilsService;
        _this._routeService = _routeService;
        _this.entity = new service_proxies_1.BoatEditDto();
        _this.uploadurl = '';
        _this.baseurl = '';
        _this.hearder = {
            Authorization: ''
        };
        _this.routeList = [];
        _this.picture = '';
        return _this;
    }
    CreateOrEditBoatComponent.prototype.ngOnInit = function () {
        this.init();
    };
    /**
    * 初始化方法
    */
    CreateOrEditBoatComponent.prototype.init = function () {
        var _this = this;
        this._boatService.getForEdit(this.id).subscribe(function (result) {
            _this.entity = result.boat;
            _this.picture = result.boat.picture;
        });
        this.uploadurl = AppConsts_1.AppConsts.remoteServiceBaseUrl + '/api/File/UploadImageAsync';
        this.hearder.Authorization = 'Bearer ' + this._utilsService.getCookieValue("Abp.AuthToken");
        this.getroute();
    };
    // statusChange($event): void {
    //   console.log($event)
    //   console.log(this.entity.runStatus)
    //   // this.entity.runStatus=$event
    // }
    // beforeUpload = (file: File) => {
    //     return new Observable((observer: Observer<boolean>) => {
    //       const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    //       if (!isJPG) {
    //         this.msg.error('You can only upload JPG or PNG file!');
    //         observer.complete();
    //         return;
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         this.msg.error('Image must smaller than 2MB!');
    //         observer.complete();
    //         return;
    //     }
    //     observer.next(isJPG && isLt2M);
    //     observer.complete();
    // })
    // })
    // }
    CreateOrEditBoatComponent.prototype.getroute = function () {
        var _this = this;
        var formdata = new service_proxies_1.GetRoutesInput();
        formdata.queryData = [];
        formdata.sorting = "";
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._routeService.getPaged(formdata)
            .subscribe(function (result) {
            _this.routeList = result.items;
        });
    };
    CreateOrEditBoatComponent.prototype.handleChange = function (info) {
        console.log(info);
        switch (info.file.status) {
            case 'done':
                this.picture = info.file.name;
                this.entity.picture = info.file.response.result.uri;
                break;
            case 'error':
                abp.message.error(this.l('UploadFail'));
                break;
        }
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditBoatComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateBoatInput();
        input.boat = this.entity;
        // console.log(input.boat)
        // return
        this.saving = true;
        this._boatService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditBoatComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-boat',
            templateUrl: './create-or-edit-boat.component.html',
            styleUrls: [
                'create-or-edit-boat.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.BoatServiceProxy,
            utils_service_1.UtilsService,
            service_proxies_1.RouteServiceProxy])
    ], CreateOrEditBoatComponent);
    return CreateOrEditBoatComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditBoatComponent = CreateOrEditBoatComponent;
