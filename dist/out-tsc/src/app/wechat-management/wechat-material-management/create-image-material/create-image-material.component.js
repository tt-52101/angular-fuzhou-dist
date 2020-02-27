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
var component_base_1 = require("@shared/component-base");
var http_1 = require("@angular/common/http");
var RequestHelper_1 = require("@shared/helpers/RequestHelper");
var operators_1 = require("rxjs/operators");
var AppEnums_1 = require("abpPro/AppEnums");
var AppConsts_1 = require("abpPro/AppConsts");
var CreateImageMaterialComponent = /** @class */ (function (_super) {
    __extends(CreateImageMaterialComponent, _super);
    function CreateImageMaterialComponent(injector, http) {
        var _this = _super.call(this, injector) || this;
        _this.http = http;
        /**
         * 导入excel文件的api相对路径
         */
        _this.apiUrl = '/api/services/app/WechatMedia/CreateOtherrMaterial';
        /**
         * 导入的类型
         */
        _this.importType = AppEnums_1.WechatMaterialType.Image;
        /**
         * 文件支持的格式
         */
        _this.accept = '*';
        /**
         * 上传状态
         */
        _this.uploading = false;
        /**
         * 文件集合
         */
        _this.fileList = [];
        _this.beforeUpload = function (file) {
            _this.fileList.push(file);
            return false;
        };
        return _this;
    }
    CreateImageMaterialComponent.prototype.ngOnInit = function () { };
    CreateImageMaterialComponent.prototype.save = function () {
        var _this = this;
        if (this.fileList.length < 1) {
            this.message.warn('请选择文件！');
            return;
        }
        this.uploading = true;
        // formdata拼接
        var formData = new FormData();
        formData.append('appId', this.appId);
        formData.append('mediaFileType', "" + this.importType);
        this.fileList.forEach(function (file) {
            formData.append('files[]', file);
        });
        // 发送请求
        RequestHelper_1.RequestHelper.createRequest(this.http, AppConsts_1.AppConsts.remoteServiceBaseUrl + this.apiUrl, 'POST', formData)
            .pipe(operators_1.filter(function (e) { return e instanceof http_1.HttpResponse; }))
            .subscribe(function (event) {
            _this.uploading = false;
            _this.message.success(_this.l('Successfully'));
            _this.success();
        }, function (err) {
            debugger;
            _this.uploading = false;
            var result = err.error;
            _this.message.error("\u5BFC\u5165\u5931\u8D25\uFF01" + result.error.message);
        });
    };
    CreateImageMaterialComponent = __decorate([
        core_1.Component({
            selector: 'app-create-image-material',
            templateUrl: './create-image-material.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector, http_1.HttpClient])
    ], CreateImageMaterialComponent);
    return CreateImageMaterialComponent;
}(component_base_1.ModalComponentBase));
exports.CreateImageMaterialComponent = CreateImageMaterialComponent;
