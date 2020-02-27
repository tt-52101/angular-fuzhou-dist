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
var CreateOrEditActivityDetailComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditActivityDetailComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditActivityDetailComponent(injector, _activityDetailService) {
        var _this = _super.call(this, injector) || this;
        _this._activityDetailService = _activityDetailService;
        _this.entity = new service_proxies_1.ActivityDetailEditDto();
        return _this;
    }
    CreateOrEditActivityDetailComponent.prototype.ngOnInit = function () {
        this.init();
    };
    /**
    * 初始化方法
    */
    CreateOrEditActivityDetailComponent.prototype.init = function () {
        var _this = this;
        this._activityDetailService.getForEdit(this.id).subscribe(function (result) {
            _this.entity = result.activityDetail;
        });
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditActivityDetailComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateActivityDetailInput();
        input.activityDetail = this.entity;
        this.saving = true;
        this._activityDetailService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditActivityDetailComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-activity-detail',
            templateUrl: './create-or-edit-activity-detail.component.html',
            styleUrls: [
                'create-or-edit-activity-detail.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ActivityDetailServiceProxy])
    ], CreateOrEditActivityDetailComponent);
    return CreateOrEditActivityDetailComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditActivityDetailComponent = CreateOrEditActivityDetailComponent;
