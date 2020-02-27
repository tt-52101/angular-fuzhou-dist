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
var app_component_base_1 = require("@shared/component-base/app-component-base");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var abc_1 = require("@delon/abc");
var http_1 = require("@angular/common/http");
var RequestHelper_1 = require("@shared/helpers/RequestHelper");
var AppConsts_1 = require("abpPro/AppConsts");
var operators_1 = require("rxjs/operators");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var WechatMaterialImgTextViewComponent = /** @class */ (function (_super) {
    __extends(WechatMaterialImgTextViewComponent, _super);
    function WechatMaterialImgTextViewComponent(injector, activatedRoute, reuseTabService, http) {
        var _this = _super.call(this, injector) || this;
        _this.activatedRoute = activatedRoute;
        _this.reuseTabService = reuseTabService;
        _this.http = http;
        /**
         * 导入excel文件的api相对路径
         */
        _this.excelImportUrl = '/api/services/app/WechatMedia/Test';
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
    WechatMaterialImgTextViewComponent.prototype.ngOnInit = function () { };
    WechatMaterialImgTextViewComponent.prototype.save = function () {
        var _this = this;
        debugger;
        if (this.fileList.length < 1) {
            this.message.warn('请选择文件！');
            return;
        }
        this.uploading = true;
        var input = {
            data: 'hello',
            file: this.fileList[0]
        };
        // formdata拼接
        var formData = new FormData();
        formData.append('input', 'input');
        this.fileList.forEach(function (file) {
            formData.append('files[]', file);
        });
        // 创建HTTP请求头
        var modifiedHeaders = RequestHelper_1.RequestHelper.createHttpHeaders();
        var request = new http_1.HttpRequest('POST', AppConsts_1.AppConsts.remoteServiceBaseUrl + this.excelImportUrl, formData, {
            headers: modifiedHeaders
        });
        // 发送请求
        this.http
            .request(request)
            .pipe(operators_1.filter(function (e) { return e instanceof http_1.HttpResponse; }))
            .subscribe(function (event) {
            _this.uploading = false;
            _this.message.success('导入成功');
        }, function (err) {
            debugger;
            var result = err.error;
            _this.uploading = false;
            _this.message.error("\u5BFC\u5165\u5931\u8D25\uFF01" + result.error.message);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", service_proxies_1.WechatMediaServiceProxy)
    ], WechatMaterialImgTextViewComponent.prototype, "wechatMediaService", void 0);
    WechatMaterialImgTextViewComponent = __decorate([
        core_1.Component({
            selector: 'app-wechat-material-img-text-view',
            templateUrl: './wechat-material-img-text-view.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.ActivatedRoute,
            abc_1.ReuseTabService,
            http_1.HttpClient])
    ], WechatMaterialImgTextViewComponent);
    return WechatMaterialImgTextViewComponent;
}(app_component_base_1.AppComponentBase));
exports.WechatMaterialImgTextViewComponent = WechatMaterialImgTextViewComponent;
