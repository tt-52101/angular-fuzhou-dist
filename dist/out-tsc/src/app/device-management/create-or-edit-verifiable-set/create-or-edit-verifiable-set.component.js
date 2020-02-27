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
var CreateOrEditVerifiableSetComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditVerifiableSetComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditVerifiableSetComponent(injector, _verifiableSetService, _deviceService) {
        var _this = _super.call(this, injector) || this;
        _this._verifiableSetService = _verifiableSetService;
        _this._deviceService = _deviceService;
        _this.entity = new service_proxies_1.VerifiableSetEditDto();
        _this.devicList = [];
        return _this;
    }
    CreateOrEditVerifiableSetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.init();
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
    * 初始化方法
    */
    CreateOrEditVerifiableSetComponent.prototype.init = function () {
        var _this = this;
        this._verifiableSetService.getForEdit(this.id).subscribe(function (result) {
            _this.entity = result.verifiableSet;
        });
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditVerifiableSetComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateVerifiableSetInput();
        input.verifiableSet = this.entity;
        this.saving = true;
        this._verifiableSetService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditVerifiableSetComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-verifiable-set',
            templateUrl: './create-or-edit-verifiable-set.component.html',
            styleUrls: [
                'create-or-edit-verifiable-set.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.VerifiableSetServiceProxy,
            service_proxies_1.DeviceServiceProxy])
    ], CreateOrEditVerifiableSetComponent);
    return CreateOrEditVerifiableSetComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditVerifiableSetComponent = CreateOrEditVerifiableSetComponent;
