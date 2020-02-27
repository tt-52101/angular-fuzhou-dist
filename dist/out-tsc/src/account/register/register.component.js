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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var routerTransition_1 = require("@shared/animations/routerTransition");
var login_service_1 = require("../login/login.service");
var AppEnums_1 = require("abpPro/AppEnums");
var captcha_component_1 = require("account/component/captcha/captcha.component");
var RegisterComponent = /** @class */ (function (_super) {
    __extends(RegisterComponent, _super);
    function RegisterComponent(injector, _accountService, _router, _loginService) {
        var _this = _super.call(this, injector) || this;
        _this._accountService = _accountService;
        _this._router = _router;
        _this._loginService = _loginService;
        _this.saving = false;
        return _this;
    }
    Object.defineProperty(RegisterComponent.prototype, "useCaptcha", {
        /**
         * 是否使用验证码
         */
        get: function () {
            return this.setting.getBoolean('App.UseCaptchaOnUserRegistration');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "captchaLength", {
        /**
         * 如果使用验证码,获取长度
         */
        get: function () {
            return this.setting.getInt('App.CaptchaOnUserRegistrationLength');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "captchaType", {
        /**
         * 验证码类型
         */
        get: function () {
            return AppEnums_1.AppCaptchaType.TenantUserRegister;
            // if (this.appSession.tenantId) {
            //   return AppCaptchaType.TenantUserRegister;
            // } else {
            //   return AppCaptchaType.HostUserLogin;
            // }
        },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.ngOnInit = function () {
        this.titleSrvice.setTitle(this.l('CreateAnAccount'));
        if (!this.appSession.tenant) {
            this.back();
            return;
        }
        this.model = new service_proxies_1.RegisterInput();
    };
    RegisterComponent.prototype.onKey = function (e) {
        if (e.key === 'Tab') {
            this.captcha.initImg();
        }
    };
    RegisterComponent.prototype.back = function () {
        this._router.navigate(['/account/login']);
    };
    RegisterComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        this._accountService
            .register(this.model)
            .finally(function () {
            _this.saving = false;
        })
            .subscribe(function (result) {
            if (!result.canLogin) {
                _this.notify.success(_this.l('SuccessfullyRegistered'));
                _this._router.navigate(['/login']);
                return;
            }
            _this.saving = true;
            // Autheticate
            _this._loginService.authenticateModel.userNameOrEmailAddress = _this.model.emailAddress;
            _this._loginService.authenticateModel.password = _this.model.password;
            _this._loginService.authenticate(function () {
                _this.saving = false;
            });
        });
    };
    __decorate([
        core_1.ViewChild(captcha_component_1.CaptchaComponent, { static: false }),
        __metadata("design:type", captcha_component_1.CaptchaComponent)
    ], RegisterComponent.prototype, "captcha", void 0);
    RegisterComponent = __decorate([
        core_1.Component({
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.less'],
            animations: [routerTransition_1.appModuleAnimation()]
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.AccountServiceProxy,
            router_1.Router,
            login_service_1.LoginService])
    ], RegisterComponent);
    return RegisterComponent;
}(app_component_base_1.AppComponentBase));
exports.RegisterComponent = RegisterComponent;
