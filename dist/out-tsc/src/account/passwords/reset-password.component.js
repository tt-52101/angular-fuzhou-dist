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
var router_1 = require("@angular/router");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var service_proxies_2 = require("@shared/service-proxies/service-proxies");
var login_service_1 = require("../login/login.service");
var app_session_service_1 = require("@shared/session/app-session.service");
var app_url_service_1 = require("@shared/nav/app-url.service");
var routerTransition_1 = require("@shared/animations/routerTransition");
var reset_password_model_1 = require("./reset-password.model");
var operators_1 = require("rxjs/operators");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var ResetPasswordComponent = /** @class */ (function (_super) {
    __extends(ResetPasswordComponent, _super);
    function ResetPasswordComponent(injector, _accountService, _router, _activatedRoute, _loginService, _appUrlService, _appSessionService, _profileService) {
        var _this = _super.call(this, injector) || this;
        _this._accountService = _accountService;
        _this._router = _router;
        _this._activatedRoute = _activatedRoute;
        _this._loginService = _loginService;
        _this._appUrlService = _appUrlService;
        _this._appSessionService = _appSessionService;
        _this._profileService = _profileService;
        _this.model = new reset_password_model_1.ResetPasswordModel();
        _this.saving = false;
        return _this;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.titleSrvice.setTitle(this.l('ResetPassword'));
        this.model.userId = this._activatedRoute.snapshot.queryParams['userId'];
        this.model.resetCode = this._activatedRoute.snapshot.queryParams['resetCode'];
        this._appSessionService.changeTenantIfNeeded(this.parseTenantId(this._activatedRoute.snapshot.queryParams['tenantId']));
    };
    ResetPasswordComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        this.saving = true;
        this._accountService
            .resetPassword(this.model)
            .pipe(operators_1.finalize(function () {
            _this.saving = false;
        }))
            .subscribe(function (result) {
            if (!result.canLogin) {
                _this._router.navigate(['account/login']);
                return;
            }
            // Autheticate
            _this.saving = true;
            _this._loginService.authenticateModel.userNameOrEmailAddress = result.userName;
            _this._loginService.authenticateModel.password = _this.model.password;
            _this._loginService.authenticate(function () {
                _this.saving = false;
            });
        });
    };
    ResetPasswordComponent.prototype.parseTenantId = function (tenantIdAsStr) {
        // tslint:disable-next-line:radix
        var tenantId = !tenantIdAsStr ? undefined : parseInt(tenantIdAsStr);
        if (tenantId === NaN) {
            tenantId = undefined;
        }
        return tenantId;
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            templateUrl: './reset-password.component.html',
            styleUrls: ['./password.less'],
            animations: [routerTransition_1.accountModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.AccountServiceProxy,
            router_1.Router,
            router_1.ActivatedRoute,
            login_service_1.LoginService,
            app_url_service_1.AppUrlService,
            app_session_service_1.AppSessionService,
            service_proxies_2.ProfileServiceProxy])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}(app_component_base_1.AppComponentBase));
exports.ResetPasswordComponent = ResetPasswordComponent;
