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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var WechatMaterialVideoViewComponent = /** @class */ (function (_super) {
    __extends(WechatMaterialVideoViewComponent, _super);
    function WechatMaterialVideoViewComponent(injector, activatedRoute, reuseTabService) {
        var _this = _super.call(this, injector) || this;
        _this.activatedRoute = activatedRoute;
        _this.reuseTabService = reuseTabService;
        return _this;
    }
    WechatMaterialVideoViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", service_proxies_1.WechatMediaServiceProxy)
    ], WechatMaterialVideoViewComponent.prototype, "wechatMediaService", void 0);
    WechatMaterialVideoViewComponent = __decorate([
        core_1.Component({
            selector: 'app-wechat-material-video-view',
            templateUrl: './wechat-material-video-view.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.ActivatedRoute,
            abc_1.ReuseTabService])
    ], WechatMaterialVideoViewComponent);
    return WechatMaterialVideoViewComponent;
}(app_component_base_1.AppComponentBase));
exports.WechatMaterialVideoViewComponent = WechatMaterialVideoViewComponent;
