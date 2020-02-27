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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var abc_1 = require("@delon/abc");
var wechat_material_img_text_view_component_1 = require("./wechat-material-img-text-view/wechat-material-img-text-view.component");
var wechat_material_img_view_component_1 = require("./wechat-material-img-view/wechat-material-img-view.component");
var wechat_material_voice_view_component_1 = require("./wechat-material-voice-view/wechat-material-voice-view.component");
var wechat_material_video_view_component_1 = require("./wechat-material-video-view/wechat-material-video-view.component");
var WechatMaterialManagementComponent = /** @class */ (function (_super) {
    __extends(WechatMaterialManagementComponent, _super);
    function WechatMaterialManagementComponent(injector, activatedRoute, reuseTabService, _wechatMediaService) {
        var _this = _super.call(this, injector) || this;
        _this.activatedRoute = activatedRoute;
        _this.reuseTabService = reuseTabService;
        _this._wechatMediaService = _wechatMediaService;
        _this.wechatMediaService = _wechatMediaService;
        return _this;
    }
    WechatMaterialManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            // 初始化获取数据,如果未获取到,跳转到管理列表页
            _this.appId = params['appId'];
            _this.appName = params['appName'];
            if (!_this.appId || !_this.appName) {
                _this.reuseTabService.replace('/app/wechat/wechat-app-config');
                return;
            }
            var currentTitle = _this.l('WechatMaterialManagement') + ':' + _this.appName;
            _this.reuseTabService.title = currentTitle;
            _this.titleSrvice.setTitle(currentTitle);
        });
    };
    __decorate([
        core_1.ViewChild(wechat_material_img_text_view_component_1.WechatMaterialImgTextViewComponent, { static: false }),
        __metadata("design:type", wechat_material_img_text_view_component_1.WechatMaterialImgTextViewComponent)
    ], WechatMaterialManagementComponent.prototype, "imgTextMaterialView", void 0);
    __decorate([
        core_1.ViewChild(wechat_material_img_view_component_1.WechatMaterialImgViewComponent, { static: false }),
        __metadata("design:type", wechat_material_img_view_component_1.WechatMaterialImgViewComponent)
    ], WechatMaterialManagementComponent.prototype, "imgMaterialView", void 0);
    __decorate([
        core_1.ViewChild(wechat_material_voice_view_component_1.WechatMaterialVoiceViewComponent, { static: false }),
        __metadata("design:type", wechat_material_voice_view_component_1.WechatMaterialVoiceViewComponent)
    ], WechatMaterialManagementComponent.prototype, "voiceMaterialView", void 0);
    __decorate([
        core_1.ViewChild(wechat_material_video_view_component_1.WechatMaterialVideoViewComponent, { static: false }),
        __metadata("design:type", wechat_material_video_view_component_1.WechatMaterialVideoViewComponent)
    ], WechatMaterialManagementComponent.prototype, "videoMaterialView", void 0);
    WechatMaterialManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-wechat-material-management',
            templateUrl: './wechat-material-management.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.ActivatedRoute,
            abc_1.ReuseTabService,
            service_proxies_1.WechatMediaServiceProxy])
    ], WechatMaterialManagementComponent);
    return WechatMaterialManagementComponent;
}(app_component_base_1.AppComponentBase));
exports.WechatMaterialManagementComponent = WechatMaterialManagementComponent;
