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
var CreateOrEditGateRecordComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditGateRecordComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditGateRecordComponent(injector, _gateRecordService) {
        var _this = _super.call(this, injector) || this;
        _this._gateRecordService = _gateRecordService;
        _this.entity = new service_proxies_1.GateRecordEditDto();
        return _this;
    }
    CreateOrEditGateRecordComponent.prototype.ngOnInit = function () {
        this.init();
    };
    /**
    * 初始化方法
    */
    CreateOrEditGateRecordComponent.prototype.init = function () {
        var _this = this;
        this._gateRecordService.getForEdit(this.id).subscribe(function (result) {
            _this.entity = result.gateRecord;
        });
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditGateRecordComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateGateRecordInput();
        input.gateRecord = this.entity;
        this.saving = true;
        this._gateRecordService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditGateRecordComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-gate-record',
            templateUrl: './create-or-edit-gate-record.component.html',
            styleUrls: [
                'create-or-edit-gate-record.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.GateRecordServiceProxy])
    ], CreateOrEditGateRecordComponent);
    return CreateOrEditGateRecordComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditGateRecordComponent = CreateOrEditGateRecordComponent;
