"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var account_component_1 = require("./account.component");
var forgot_password_component_1 = require("./passwords/forgot-password.component");
var reset_password_component_1 = require("./passwords/reset-password.component");
var tenant_register_component_1 = require("./tenant-register/tenant-register.component");
var login_callback_component_1 = require("./login-callback/login-callback.component");
var activation_component_1 = require("./activation/activation.component");
var AccountRoutingModule = /** @class */ (function () {
    function AccountRoutingModule() {
    }
    AccountRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: account_component_1.AccountComponent,
                        children: [
                            { path: 'login', component: login_component_1.LoginComponent, data: { title: '登录' } },
                            { path: 'login-callback', component: login_callback_component_1.LoginCallbackComponent },
                            { path: 'register', component: register_component_1.RegisterComponent },
                            { path: 'forgot-password', component: forgot_password_component_1.ForgotPasswordComponent },
                            { path: 'reset-password', component: reset_password_component_1.ResetPasswordComponent },
                            { path: 'activation', component: activation_component_1.ActivationComponent },
                            {
                                path: 'tenant-register',
                                component: tenant_register_component_1.TenantRegisterComponent,
                            },
                        ],
                    },
                ]),
            ],
            exports: [router_1.RouterModule],
        })
    ], AccountRoutingModule);
    return AccountRoutingModule;
}());
exports.AccountRoutingModule = AccountRoutingModule;
