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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var login_service_1 = require("./login.service");
var routerTransition_1 = require("@shared/animations/routerTransition");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var abp_session_service_1 = require("@abp/session/abp-session.service");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var UrlHelper_1 = require("@shared/helpers/UrlHelper");
var AppEnums_1 = require("abpPro/AppEnums");
var captcha_component_1 = require("account/component/captcha/captcha.component");
var AppConsts_1 = require("abpPro/AppConsts");
var app_session_service_1 = require("@shared/session/app-session.service");
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(injector, loginService, _abpSessionService, _sessionAppService, _sessionService) {
        var _this = _super.call(this, injector) || this;
        _this.loginService = loginService;
        _this._abpSessionService = _abpSessionService;
        _this._sessionAppService = _sessionAppService;
        _this._sessionService = _sessionService;
        _this.submitting = false;
        _this.hidepwd = true;
        _this.verificationImgUrl = '../assets/images/captcha.png';
        return _this;
    }
    LoginComponent.prototype.changepwd = function () {
        this.hidepwd = !this.hidepwd;
    };
    Object.defineProperty(LoginComponent.prototype, "multiTenancySideIsTeanant", {
        /**
         * 是否已选中租户
         */
        get: function () {
            return this.appSession.tenantId > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "isTenantSelfRegistrationAllowed", {
        /**
         * 允许注册租户
         */
        get: function () {
            if (this.appSession.tenantId) {
                return false;
            }
            return this.setting.getBoolean('App.Host.AllowSelfRegistration');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "isMultiTenancyEnabled", {
        get: function () {
            return abp.multiTenancy.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "isSelfRegistrationAllowed", {
        /**
         * 允许注册用户
         */
        get: function () {
            if (!this.appSession.tenantId) {
                return false;
            }
            return this.setting.getBoolean('App.AllowSelfRegistrationUser');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "useCaptcha", {
        /**
         * 是否使用登陆验证码
         */
        get: function () {
            return this.setting.getBoolean('App.UseCaptchaOnUserLogin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "enabledExternalLoginTypes", {
        /**
         * 激活的三方登陆类型
         */
        get: function () {
            return JSON.parse(this.setting.get('App.UserManagement.ExternalLoginProviders'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "captchaLength", {
        /**
         * 如果使用验证码,获取长度
         */
        get: function () {
            return this.setting.getInt('App.CaptchaOnUserLoginLength');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "captchaType", {
        /**
         * 验证码类型
         */
        get: function () {
            if (this.appSession.tenantId) {
                return AppEnums_1.AppCaptchaType.TenantUserLogin;
            }
            else {
                return AppEnums_1.AppCaptchaType.HostUserLogin;
            }
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loginService.initExternalLoginProviders()];
                    case 1:
                        _a.sent();
                        // this.titleSrvice.setTitle(this.l('LogIn'));
                        if (this._abpSessionService.userId > 0 && UrlHelper_1.UrlHelper.getReturnUrl()) {
                            this._sessionAppService
                                .updateUserSignInToken()
                                .subscribe(function (result) {
                                var initialReturnUrl = UrlHelper_1.UrlHelper.getReturnUrl();
                                var returnUrl = initialReturnUrl +
                                    (initialReturnUrl.indexOf('?') >= 0 ? '&' : '?') +
                                    'accessToken=' +
                                    result.signInToken +
                                    '&userId=' +
                                    result.encodedUserId +
                                    '&tenantId=' +
                                    result.encodedTenantId;
                                location.href = returnUrl;
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.getCaptchaType = function () {
        if (this.appSession.tenantId) {
            return AppEnums_1.AppCaptchaType.TenantUserLogin;
        }
        else {
            return AppEnums_1.AppCaptchaType.HostUserLogin;
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.submitting = true;
        // console.log(this.loginService.authenticateModel)
        // this.loginService.authenticateModel.sourceCode=''
        this.loginService.authenticate(function (success) {
            if (!success) {
                // 登陆失败,刷新验证码
                _this.clearimg();
            }
            _this._sessionService.init();
            // console.log(this._sessionService,new Date().getTime())
            _this.submitting = false;
        });
    };
    LoginComponent.prototype.externalLogin = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loginService.externalAuthenticate(provider)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //#region 验证码功能
    LoginComponent.prototype.onKey = function (e) {
        if (e.key === 'Tab') {
            this.initImg();
        }
    };
    LoginComponent.prototype.initImg = function () {
        var userName = this.loginService.authenticateModel.userNameOrEmailAddress;
        if (!userName || userName === '' || this.verificationImgUrl !== '../assets/images/captcha.png') {
            return;
        }
        this.clearimg();
    };
    LoginComponent.prototype.clearimg = function () {
        var userName = this.loginService.authenticateModel.userNameOrEmailAddress;
        if (!userName || userName === '') {
            // 未输入账号
            return;
        }
        var tid = this.appSession.tenantId;
        if (!tid) {
            tid = '';
        }
        var timestamp = new Date().getTime();
        this.verificationImgUrl =
            AppConsts_1.AppConsts.remoteServiceBaseUrl +
                '/api/TokenAuth/GenerateVerification' +
                '?name=' +
                userName +
                '&tid=' +
                tid +
                '&t=' +
                timestamp;
    };
    __decorate([
        core_1.ViewChild(captcha_component_1.CaptchaComponent, { static: false }),
        __metadata("design:type", captcha_component_1.CaptchaComponent)
    ], LoginComponent.prototype, "captcha", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.less'],
            animations: [routerTransition_1.appModuleAnimation()]
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            login_service_1.LoginService,
            abp_session_service_1.AbpSessionService,
            service_proxies_1.SessionServiceProxy,
            app_session_service_1.AppSessionService])
    ], LoginComponent);
    return LoginComponent;
}(app_component_base_1.AppComponentBase));
exports.LoginComponent = LoginComponent;
