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
var login_service_1 = require("account/login/login.service");
var component_base_1 = require("@shared/component-base");
var UrlHelper_1 = require("@shared/helpers/UrlHelper");
var LoginCallbackComponent = /** @class */ (function (_super) {
    __extends(LoginCallbackComponent, _super);
    function LoginCallbackComponent(_route, injector, _loginService) {
        var _this = _super.call(this, injector) || this;
        _this._route = _route;
        _this._loginService = _loginService;
        return _this;
    }
    LoginCallbackComponent.prototype.ngOnInit = function () {
        var _this = this;
        var providerName = UrlHelper_1.UrlHelper.getQueryParameters().providerName;
        if (providerName) {
            this._loginService.initExternalLoginProviders(function () {
                var selectedProvider = _this._loginService.externalLoginProviders.find(function (x) { return x.name === providerName; });
                _this._loginService.externalAuthenticate(selectedProvider);
            });
        }
    };
    LoginCallbackComponent = __decorate([
        core_1.Component({
            templateUrl: './login-callback.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            core_1.Injector,
            login_service_1.LoginService])
    ], LoginCallbackComponent);
    return LoginCallbackComponent;
}(component_base_1.AppComponentBase));
exports.LoginCallbackComponent = LoginCallbackComponent;
