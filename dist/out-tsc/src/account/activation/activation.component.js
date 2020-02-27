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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var component_base_1 = require("@shared/component-base");
var router_1 = require("@angular/router");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var AppEnums_1 = require("abpPro/AppEnums");
var captcha_component_1 = require("account/component/captcha/captcha.component");
var routerTransition_1 = require("@shared/animations/routerTransition");
var login_service_1 = require("account/login/login.service");
var ActivationComponent = /** @class */ (function (_super) {
    __extends(ActivationComponent, _super);
    function ActivationComponent(injector, _router, _tokenAuthServiceProxy, _loginService, _activatedRoute) {
        var _this = _super.call(this, injector) || this;
        _this._router = _router;
        _this._tokenAuthServiceProxy = _tokenAuthServiceProxy;
        _this._loginService = _loginService;
        _this._activatedRoute = _activatedRoute;
        _this.ActivateType = service_proxies_1.ActivateType;
        return _this;
    }
    Object.defineProperty(ActivationComponent.prototype, "useCaptcha", {
        /**
         * 是否使用验证码
         */
        get: function () {
            return this.setting.getBoolean('App.UseCaptchaOnUserRegistration');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivationComponent.prototype, "captchaLength", {
        /**
         * 如果使用验证码,获取长度
         */
        get: function () {
            return this.setting.getInt('App.CaptchaOnUserRegistrationLength');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivationComponent.prototype, "captchaType", {
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
    ActivationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.titleSrvice.setTitle(this.l('ActivateAccount'));
                this._activatedRoute.paramMap.subscribe(function (_) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.loginResult = window.history.state;
                        this.model = new service_proxies_1.ActivateAccountModel({
                            password: undefined,
                            verificationCode: undefined,
                            emailAddress: undefined,
                            activateType: service_proxies_1.ActivateType.NewAccount,
                            userId: this.loginResult.userId.toString()
                        });
                        this.loginResult.waitingForActivation = true;
                        if (!this.loginResult.waitingForActivation) {
                            this._router.navigate(['account/login']);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ActivationComponent.prototype.onKey = function (e) {
        if (e.key === 'Tab') {
            this.captcha.initImg();
        }
    };
    ActivationComponent.prototype.toggleActivateType = function () {
        if (this.model.activateType === service_proxies_1.ActivateType.NewAccount) {
            this.model.activateType = service_proxies_1.ActivateType.BindExistAccount;
        }
        else {
            this.model.activateType = service_proxies_1.ActivateType.NewAccount;
        }
    };
    ActivationComponent.prototype.activateAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._tokenAuthServiceProxy
                            .activateAccount(this.model)
                            .toPromise()];
                    case 1:
                        res = _a.sent();
                        this._loginService.authenticateModel = new service_proxies_1.AuthenticateModel(__assign(__assign(__assign({}, res), this.model), { rememberClient: false, returnUrl: undefined, sourceCode: 'Reception', userNameOrEmailAddress: this.model.emailAddress }));
                        console.log(this._loginService.authenticateModel);
                        this._loginService.authenticate(function (success) {
                            if (!success && _this.useCaptcha) {
                                // 登陆失败,刷新验证码
                                _this.captcha.clearimg();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild(captcha_component_1.CaptchaComponent, { static: false }),
        __metadata("design:type", captcha_component_1.CaptchaComponent)
    ], ActivationComponent.prototype, "captcha", void 0);
    ActivationComponent = __decorate([
        core_1.Component({
            templateUrl: './activation.component.html',
            styleUrls: ['./activation.component.less'],
            animations: [routerTransition_1.appModuleAnimation()]
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.Router,
            service_proxies_1.TokenAuthServiceProxy,
            login_service_1.LoginService,
            router_1.ActivatedRoute])
    ], ActivationComponent);
    return ActivationComponent;
}(component_base_1.AppComponentBase));
exports.ActivationComponent = ActivationComponent;
