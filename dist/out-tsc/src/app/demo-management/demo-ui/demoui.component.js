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
var forms_1 = require("@angular/forms");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var utils_1 = require("@shared/utils");
var DemoUiComponent = /** @class */ (function (_super) {
    __extends(DemoUiComponent, _super);
    function DemoUiComponent(injector, fb, _userService, _fileDownloadService) {
        var _this = _super.call(this, injector) || this;
        _this.fb = fb;
        _this._userService = _userService;
        _this._fileDownloadService = _fileDownloadService;
        _this.listOfData = [];
        return _this;
    }
    DemoUiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.validateForm = this.fb.group({
            content: ['1111111111111111', [forms_1.Validators.required]]
        });
        this._userService
            .getPaged([], undefined, undefined, undefined, undefined, '', '', 20, 0)
            .subscribe(function (result) {
            _this.listOfData = result.items;
        });
    };
    /**
     * 演示-markdown 提交表单
     * @param value 表单值
     */
    DemoUiComponent.prototype.submitForm = function (value) {
        for (var key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        console.log(value);
    };
    /**
     * 演示-markdown 重置表单
     * @param e
     */
    DemoUiComponent.prototype.resetForm = function (e) {
        e.preventDefault();
        // 因为simplemde组件 如果用 FormGroup reset 会赋值null 出现 字符串分割异常
        this.validateForm.setValue({ content: '' });
        // this.validateForm.reset();
        // for (const key in this.validateForm.controls) {
        //   this.validateForm.controls[key].markAsPristine();
        //   this.validateForm.controls[key].updateValueAndValidity();
        // }
    };
    /**
     * 演示-导出excel
     */
    DemoUiComponent.prototype.exportToExcel = function () {
        var _this = this;
        this._userService.getUsersToExcel().subscribe(function (result) {
            console.log(result);
            _this._fileDownloadService.downloadTempFile(result);
        });
        // 调用后端的到处方法
    };
    DemoUiComponent = __decorate([
        core_1.Component({
            selector: 'app-demoui',
            templateUrl: './demoui.component.html',
            styleUrls: ['./demoui.component.less']
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            forms_1.FormBuilder,
            service_proxies_1.UserServiceProxy,
            utils_1.FileDownloadService])
    ], DemoUiComponent);
    return DemoUiComponent;
}(app_component_base_1.AppComponentBase));
exports.DemoUiComponent = DemoUiComponent;
