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
var app_url_service_1 = require("@shared/nav/app-url.service");
var routerTransition_1 = require("@shared/animations/routerTransition");
var operators_1 = require("rxjs/operators");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var ForgotPasswordComponent = /** @class */ (function (_super) {
    __extends(ForgotPasswordComponent, _super);
    function ForgotPasswordComponent(injector, _accountService, _appUrlService, _router) {
        var _this = _super.call(this, injector) || this;
        _this._accountService = _accountService;
        _this._appUrlService = _appUrlService;
        _this._router = _router;
        _this.model = new service_proxies_1.SendPasswordResetCodeInput();
        _this.saving = false;
        return _this;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.titleSrvice.setTitle(this.l('ForgotPassword'));
    };
    ForgotPasswordComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        this._accountService
            .sendPasswordResetCode(this.model)
            .pipe(operators_1.finalize(function () {
            _this.saving = false;
        }))
            .subscribe(function () {
            _this.message
                .success(_this.l('PasswordResetMailSentMessage'), _this.l('MailSent'))
                .done(function () {
                _this._router.navigate(['account/login']);
            });
        });
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            templateUrl: './forgot-password.component.html',
            styleUrls: ['./password.less'],
            animations: [routerTransition_1.accountModuleAnimation()],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.AccountServiceProxy,
            app_url_service_1.AppUrlService,
            router_1.Router])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}(app_component_base_1.AppComponentBase));
exports.ForgotPasswordComponent = ForgotPasswordComponent;
