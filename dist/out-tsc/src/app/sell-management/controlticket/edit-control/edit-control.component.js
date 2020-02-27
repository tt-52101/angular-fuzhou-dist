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
var EditControlComponent = /** @class */ (function (_super) {
    __extends(EditControlComponent, _super);
    /**
     * 初始化的构造函数
     */
    function EditControlComponent(injector, _activityService) {
        var _this = _super.call(this, injector) || this;
        _this._activityService = _activityService;
        return _this;
    }
    EditControlComponent.prototype.ngOnInit = function () {
        this.init();
    };
    EditControlComponent.prototype.init = function () {
        // console.log(this.entity)
    };
    EditControlComponent.prototype.submitForm = function () {
        var _this = this;
        this.saving = true;
        this._activityService.setReserveQuantity(this.entity.id, this.reserveQuantity)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function (result) {
            // console.log(result)
            if (result.resultCode == "000") {
                _this.notify.success(_this.l('SavedSuccessfully'));
                _this.success(true);
            }
            else {
                // console.log(this)
                abp.message.warn(result.resultMessage);
                // this.warning(result.resultMessage);
            }
        });
    };
    EditControlComponent = __decorate([
        core_1.Component({
            selector: 'edit-control',
            templateUrl: './edit-control.component.html',
            styleUrls: [
                'edit-control.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ActivityServiceProxy])
    ], EditControlComponent);
    return EditControlComponent;
}(modal_component_base_1.ModalComponentBase));
exports.EditControlComponent = EditControlComponent;
