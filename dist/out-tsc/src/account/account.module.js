"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var forgot_password_component_1 = require("./passwords/forgot-password.component");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var account_routing_module_1 = require("./account-routing.module");
var shared_module_1 = require("@shared/shared.module");
var account_component_1 = require("./account.component");
var tenant_change_component_1 = require("./tenant/tenant-change.component");
var tenant_change_modal_component_1 = require("./tenant/tenant-change-modal.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var account_languages_component_1 = require("./account-languages/account-languages.component");
var login_service_1 = require("./login/login.service");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var abp_module_1 = require("@abp/abp.module");
var reset_password_component_1 = require("./passwords/reset-password.component");
var tenant_register_component_1 = require("./tenant-register/tenant-register.component");
var captcha_component_1 = require("./component/captcha/captcha.component");
var http_1 = require("@angular/common/http");
var login_callback_component_1 = require("./login-callback/login-callback.component");
var activation_component_1 = require("./activation/activation.component");
var service_proxies_1 = require("../shared/service-proxies/service-proxies");
var router_1 = require("@angular/router");
var utils_service_1 = require("abp-ng2-module/dist/src/utils/utils.service");
var message_service_1 = require("abp-ng2-module/dist/src/message/message.service");
var token_service_1 = require("abp-ng2-module/dist/src/auth/token.service");
var log_service_1 = require("abp-ng2-module/dist/src/log/log.service");
var angularx_social_login_1 = require("angularx-social-login");
var authService = new angularx_social_login_1.AuthService(new angularx_social_login_1.AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider(environment.externalLogin.google.clientId, {
//       redirect_uri: environment.externalLogin.redirectUri,
//     })
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider(environment.externalLogin.facebook.appId, {
//       redirect_uri: environment.externalLogin.redirectUri
//     })
//   },
]));
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule,
                http_1.HttpClientModule,
                shared_module_1.SharedModule,
                abp_module_1.AbpModule,
                angularx_social_login_1.SocialLoginModule,
                // CommonModule,
                // FormsModule,
                // NgZorroAntdModule,
                // AbpModule,
                // SharedModule,
                // ServiceProxyModule,
                account_routing_module_1.AccountRoutingModule
            ],
            declarations: [
                account_component_1.AccountComponent,
                tenant_change_component_1.TenantChangeComponent,
                tenant_change_modal_component_1.TenantChangeModalComponent,
                login_component_1.LoginComponent,
                login_callback_component_1.LoginCallbackComponent,
                register_component_1.RegisterComponent,
                account_languages_component_1.AccountLanguagesComponent,
                reset_password_component_1.ResetPasswordComponent,
                forgot_password_component_1.ForgotPasswordComponent,
                tenant_register_component_1.TenantRegisterComponent,
                captcha_component_1.CaptchaComponent,
                activation_component_1.ActivationComponent
            ],
            providers: [
                {
                    provide: login_service_1.LoginService,
                    useFactory: function (tokenAuthService, router, zone, utilsService, messageService, tokenService, logService, modalService) {
                        return new login_service_1.LoginService(tokenAuthService, router, zone, utilsService, messageService, tokenService, logService, modalService, authService);
                    },
                    deps: [
                        service_proxies_1.TokenAuthServiceProxy,
                        router_1.Router,
                        core_1.NgZone,
                        utils_service_1.UtilsService,
                        message_service_1.MessageService,
                        token_service_1.TokenService,
                        log_service_1.LogService,
                        ng_zorro_antd_1.NzModalService,
                    ]
                }
            ],
            entryComponents: [tenant_change_modal_component_1.TenantChangeModalComponent]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
