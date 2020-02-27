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
var app_component_base_1 = require("@shared/component-base/app-component-base");
var router_1 = require("@angular/router");
var login_service_1 = require("account/login/login.service");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var routerTransition_1 = require("@shared/animations/routerTransition");
var operators_1 = require("rxjs/operators");
var AppEnums_1 = require("abpPro/AppEnums");
var captcha_component_1 = require("account/component/captcha/captcha.component");
var TenantRegisterComponent = /** @class */ (function (_super) {
    __extends(TenantRegisterComponent, _super);
    function TenantRegisterComponent(injector, _router, _loginService, _tenantRegisterService) {
        var _this = _super.call(this, injector) || this;
        _this._router = _router;
        _this._loginService = _loginService;
        _this._tenantRegisterService = _tenantRegisterService;
        _this.model = new service_proxies_1.CreateTenantDto();
        return _this;
    }
    Object.defineProperty(TenantRegisterComponent.prototype, "useCaptcha", {
        /**
         * 是否使用验证码
         */
        get: function () {
            return this.setting.getBoolean('App.Host.UseCaptchaOnTenantRegistration');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantRegisterComponent.prototype, "captchaLength", {
        /**
         * 如果使用验证码,获取长度
         */
        get: function () {
            return this.setting.getInt('App.Host.CaptchaOnTenantRegistrationLength');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantRegisterComponent.prototype, "captchaType", {
        /**
         * 验证码类型
         */
        get: function () {
            return AppEnums_1.AppCaptchaType.HostTenantRegister;
        },
        enumerable: true,
        configurable: true
    });
    TenantRegisterComponent.prototype.ngOnInit = function () {
        this.titleSrvice.setTitle(this.l('TenantRegister'));
        if (this.appSession.tenant) {
            this.back();
            return;
        }
    };
    TenantRegisterComponent.prototype.back = function () {
        this._router.navigate(['/account/login']);
    };
    TenantRegisterComponent.prototype.onKey = function (e) {
        if (e.key === 'Tab') {
            this.captcha.initImg();
        }
    };
    TenantRegisterComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        this._tenantRegisterService
            .registerTenant(this.model)
            .pipe(operators_1.finalize(function () {
            _this.saving = false;
        }))
            .subscribe(function (result) {
            _this.notify.success(_this.l('SavedSuccessfully'));
            abp.multiTenancy.setTenantIdCookie(result.tenantId);
            // 租户默认激活，并且登陆没有使用验证码，自动登陆
            if (result.isActive && !result.useCaptchaOnUserLogin) {
                _this.saving = true;
                _this._loginService.authenticateModel.userNameOrEmailAddress = _this.model.adminEmailAddress;
                _this._loginService.authenticateModel.password = _this.model.tenantAdminPassword;
                _this._loginService.authenticate(function () {
                    _this.saving = false;
                });
            }
            else {
                _this.back();
            }
        });
    };
    __decorate([
        core_1.ViewChild(captcha_component_1.CaptchaComponent, { static: false }),
        __metadata("design:type", captcha_component_1.CaptchaComponent)
    ], TenantRegisterComponent.prototype, "captcha", void 0);
    TenantRegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-tenant-register',
            templateUrl: './tenant-register.component.html',
            styleUrls: ['./tenant-register.component.less'],
            animations: [routerTransition_1.appModuleAnimation()]
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.Router,
            login_service_1.LoginService,
            service_proxies_1.TenantRegistrationServiceProxy])
    ], TenantRegisterComponent);
    return TenantRegisterComponent;
}(app_component_base_1.AppComponentBase));
exports.TenantRegisterComponent = TenantRegisterComponent;
