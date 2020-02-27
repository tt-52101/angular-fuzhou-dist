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
var router_1 = require("@angular/router");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var service_proxies_2 = require("@shared/service-proxies/service-proxies");
var UrlHelper_1 = require("@shared/helpers/UrlHelper");
var AppConsts_1 = require("abpPro/AppConsts");
var _ = require("lodash");
var utils_service_1 = require("@abp/utils/utils.service");
var message_service_1 = require("@abp/message/message.service");
var log_service_1 = require("@abp/log/log.service");
var token_service_1 = require("@abp/auth/token.service");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var angularx_social_login_1 = require("angularx-social-login");
var ExternalLoginProvider = /** @class */ (function (_super) {
    __extends(ExternalLoginProvider, _super);
    function ExternalLoginProvider(providerInfo) {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.name = providerInfo.name;
        _this.clientId = providerInfo.clientId;
        _this.additionalParams = providerInfo.additionalParams;
        _this.icon = ExternalLoginProvider.getSocialIcon(_this.name);
        return _this;
    }
    ExternalLoginProvider.getSocialIcon = function (providerName) {
        providerName = providerName.toLowerCase();
        if (providerName === 'google') {
            providerName = 'google-plus';
        }
        if (providerName === 'microsoft') {
            providerName = 'windows';
        }
        return providerName;
    };
    // static readonly FACEBOOK: string = 'Facebook';
    // static readonly GOOGLE: string = 'Google';
    // static readonly MICROSOFT: string = 'Microsoft';
    // static readonly OPENID: string = 'OpenIdConnect';
    // static readonly WSFEDERATION: string = 'WsFederation';
    ExternalLoginProvider.QQ = 'QQ';
    ExternalLoginProvider.Wechat = 'Wechat';
    ExternalLoginProvider.Microsoft = 'Microsoft';
    return ExternalLoginProvider;
}(service_proxies_1.ExternalLoginProviderInfoModel));
exports.ExternalLoginProvider = ExternalLoginProvider;
var LoginService = /** @class */ (function () {
    function LoginService(_tokenAuthService, _router, zone, _utilsService, _messageService, _tokenService, _logService, _modalService, authService) {
        this._tokenAuthService = _tokenAuthService;
        this._router = _router;
        this.zone = zone;
        this._utilsService = _utilsService;
        this._messageService = _messageService;
        this._tokenService = _tokenService;
        this._logService = _logService;
        this._modalService = _modalService;
        this.authService = authService;
        this.authenticateModel = new service_proxies_2.AuthenticateModel();
        this.externalLoginProviders = [];
    }
    LoginService.prototype.authenticate = function (finallyCallback, redirectUrl) {
        var _this = this;
        finallyCallback = finallyCallback || (function (success) { });
        var success = false;
        this._tokenAuthService
            .authenticate(this.authenticateModel)
            .finally(function () {
            finallyCallback(success);
        })
            .subscribe(function (result) {
            success = true;
            _this.processAuthenticateResult(result, redirectUrl);
        });
    };
    LoginService.prototype.externalAuthenticate = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureExternalLoginProviderInitialized(provider, function () { return __awaiter(_this, void 0, void 0, function () {
                            var queryParams;
                            return __generator(this, function (_a) {
                                queryParams = UrlHelper_1.UrlHelper.getQueryParametersUsingHash();
                                switch (provider.name) {
                                    case ExternalLoginProvider.QQ:
                                        if (QC && QC.Login.check()) {
                                            // this.qqLoginCallback();
                                        }
                                        else {
                                            // this.redirectToQQLogin();
                                        }
                                        break;
                                    case ExternalLoginProvider.Wechat:
                                        if (queryParams.code) {
                                            // this.wechatLoginCallback();
                                        }
                                        else {
                                            // this.redirectToWechatLogin();
                                        }
                                        break;
                                    case ExternalLoginProvider.Microsoft:
                                        // this.redirectToMicrosoftLogin();
                                        // if (queryParams.code) {
                                        //   this.authService.signIn(provider.clientId)
                                        // } else {
                                        //   this.redirectToMicrosoftLogin();
                                        // }
                                        break;
                                    // case ExternalLoginProvider.Facebook:
                                    //   await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
                                    //     .then(user => this.standardLoginCallback(user, ExternalLoginProvider.Facebook))
                                    //     .catch(ex => console.log(ex))
                                    //   break;
                                    // case ExternalLoginProvider.Google:
                                    //   await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
                                    //     .then(user => this.standardLoginCallback(user, ExternalLoginProvider.Google))
                                    //     .catch(ex => console.log(ex))
                                    //   break;
                                    default:
                                        break;
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginService.prototype.standardLoginCallback = function (user, provider) {
        var _this = this;
        var model = new service_proxies_1.ExternalAuthenticateModel();
        model.authProvider = provider;
        model.providerAccessCode = user.authToken;
        model.providerKey = user.id;
        // model.singleSignIn = UrlHelper.getSingleSignIn();
        this._tokenAuthService
            .externalAuthenticate(model)
            .subscribe(function (result) {
            if (result.waitingForActivation) {
                _this._router.navigate(['account/activation'], {
                    state: result
                });
                return;
            }
            _this.login(result.accessToken, result.encryptedAccessToken, result.expireInSeconds);
        });
    };
    // async redirectToMicrosoftLogin() {
    //   const redirectUri = new URL(environment.externalLogin.redirectUri);
    //   redirectUri.searchParams.append('providerName', ExternalLoginProvider.Microsoft);
    //   const result = await new UserAgentApplication({
    //     auth: {
    //       clientId: environment.externalLogin.microsoft.consumerKey, redirectUri: redirectUri.toString(),
    //     },
    //   });
    //   result.acquireTokenPopup({
    //     scopes: ["https://graph.microsoft.com/User.Read"],
    //   }).then(user => {
    //     const model = new ExternalAuthenticateModel();
    //     model.authProvider = ExternalLoginProvider.Microsoft;
    //     model.providerAccessCode = user.accessToken;
    //     model.providerKey = user.uniqueId;
    //     // model.singleSignIn = UrlHelper.getSingleSignIn();
    //     this._tokenAuthService
    //       .externalAuthenticate(model)
    //       .subscribe((result: ExternalAuthenticateResultModel) => {
    //         if (result.waitingForActivation) {
    //           this._router.navigate(['account/activation'], {
    //             state: result
    //           });
    //           return;
    //         }
    //         this.login(
    //           result.accessToken,
    //           result.encryptedAccessToken,
    //           result.expireInSeconds
    //         );
    //       });
    //   });
    // }
    // redirectToWechatLogin(): any {
    //   const curUrl = new URL(location.href);
    //   this._modalService.create({
    //     nzContent: html`
    //       <div id="wx_login_container"></div>
    //     `.getHTML()
    //   });
    //   curUrl.searchParams.append('providerName', ExternalLoginProvider.Wechat);
    //   const wxConfig = environment.externalLogin.wecaht;
    //   const obj = new WxLogin({
    //     // self_redirect: true,
    //     id: 'wx_login_container',
    //     appid: wxConfig.appId,
    //     scope: 'snsapi_login',
    //     redirect_uri: encodeURIComponent(curUrl.toString()),
    //     // state: '',
    //     style: 'white'
    //     // href: ''
    //   });
    // }
    // private wechatLoginCallback() {
    //   const code = UrlHelper.getQueryParametersUsingHash().code;
    //   const model = new ExternalAuthenticateModel();
    //   model.authProvider = ExternalLoginProvider.Wechat;
    //   model.providerAccessCode = code;
    //   model.providerKey = undefined;
    //   // model.singleSignIn = UrlHelper.getSingleSignIn();
    //   this._tokenAuthService
    //     .externalAuthenticate(model)
    //     .subscribe((result: ExternalAuthenticateResultModel) => {
    //       if (result.waitingForActivation) {
    //         this._router.navigate(['account/activation'], {
    //           state: result
    //         });
    //         return;
    //       }
    //       this.login(
    //         result.accessToken,
    //         result.encryptedAccessToken,
    //         result.expireInSeconds
    //       );
    //     });
    // }
    // private redirectToQQLogin() {
    //   const redirectURI = new URL(environment.externalLogin.redirectUri);
    //   redirectURI.searchParams.append('providerName', ExternalLoginProvider.QQ);
    //   QC.Login.showPopup({
    //     ...environment.externalLogin.qq,
    //     redirectURI: redirectURI.toString()
    //   });
    // }
    // private qqLoginCallback(): any {
    //   QC.Login.getMe((openId, accessToken) => {
    //     // angular 的 bug, 外部js中的异步回调回跑出zone, 需要手动同步, 参考issue: https://github.com/angular/angular/issues/20290
    //     this.zone.run(async () => {
    //       const model = new ExternalAuthenticateModel();
    //       model.authProvider = ExternalLoginProvider.QQ;
    //       model.providerAccessCode = JSON.stringify({ accessToken, openId });
    //       model.providerKey = openId;
    //       // model.singleSignIn = UrlHelper.getSingleSignIn();
    //       const authResult = await this._tokenAuthService
    //         .externalAuthenticate(model)
    //         .toPromise();
    //       if (authResult.waitingForActivation) {
    //         this._router.navigate(['account/activation'], {
    //           state: authResult
    //         });
    //       } else {
    //         this.login(
    //           authResult.accessToken,
    //           authResult.encryptedAccessToken,
    //           authResult.expireInSeconds
    //         );
    //       }
    //     });
    //   });
    // }
    LoginService.prototype.initExternalLoginProviders = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var providers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._tokenAuthService
                            .getExternalAuthenticationProviders()
                            .toPromise()];
                    case 1:
                        providers = _a.sent();
                        this.externalLoginProviders = _.map(providers, function (p) { return new ExternalLoginProvider(p); });
                        if (callback) {
                            callback();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginService.prototype.ensureExternalLoginProviderInitialized = function (loginProvider, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (loginProvider.name) {
                    // case ExternalLoginProvider.QQ:
                    //   await new ScriptLoaderService()
                    //     .load('//connect.qq.com/qc_jssdk.js')
                    //     .then(() => {
                    //       loginProvider.initialized = true;
                    //     });
                    //   break;
                    // case ExternalLoginProvider.Wechat:
                    //   await new ScriptLoaderService()
                    //     .load('//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js')
                    //     .then(() => {
                    //       loginProvider.initialized = true;
                    //     });
                    //   break;
                    // case ExternalLoginProvider.Microsoft:
                    //   loginProvider.initialized = false;
                    //   break;
                    // case ExternalLoginProvider.Facebook:
                    //   loginProvider.initialized = false;
                    //   break;
                    // case ExternalLoginProvider.Google:
                    //   loginProvider.initialized = false;
                    //   break;
                    // default:
                    //   break;
                }
                if (loginProvider && loginProvider.initialized) {
                    callback();
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    LoginService.prototype.processAuthenticateResult = function (authenticateResult, redirectUrl) {
        if (authenticateResult.shouldResetPassword) {
            // 需要重置密码
            this._router.navigate(['account/reset-password'], {
                queryParams: {
                    userId: authenticateResult.userId,
                    tenantId: abp.session.tenantId,
                    resetCode: authenticateResult.passwordResetCode
                }
            });
        }
        if (authenticateResult.waitingForActivation) {
            this._router.navigate(['account/activation'], {
                state: authenticateResult
            });
        }
        else if (authenticateResult.accessToken) {
            // Successfully logged in
            // tslint:disable-next-line:max-line-length
            this.login(authenticateResult.accessToken, authenticateResult.encryptedAccessToken, authenticateResult.expireInSeconds, this.rememberMe);
        }
        else {
            // Unexpected result!
            this._logService.warn('Unexpected authenticateResult!');
            this._router.navigate(['account/login']);
        }
    };
    LoginService.prototype.login = function (accessToken, encryptedAccessToken, expireInSeconds, rememberMe, twoFactorRememberClientToken, redirectUrl) {
        var tokenExpireDate = rememberMe
            ? new Date(new Date().getTime() + 1000 * expireInSeconds)
            : undefined;
        this._tokenService.setToken(accessToken, tokenExpireDate);
        this._utilsService.setCookieValue(AppConsts_1.AppConsts.authorization.encrptedAuthTokenName, encryptedAccessToken, tokenExpireDate, abp.appPath);
        var initialUrl = UrlHelper_1.UrlHelper.initialUrl;
        if (initialUrl.indexOf('/login') > 0) {
            initialUrl = AppConsts_1.AppConsts.appBaseUrl;
        }
        location.href = initialUrl;
    };
    LoginService.twoFactorRememberClientTokenName = 'TwoFactorRememberClientToken';
    LoginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [service_proxies_2.TokenAuthServiceProxy,
            router_1.Router,
            core_1.NgZone,
            utils_service_1.UtilsService,
            message_service_1.MessageService,
            token_service_1.TokenService,
            log_service_1.LogService,
            ng_zorro_antd_1.NzModalService,
            angularx_social_login_1.AuthService])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
