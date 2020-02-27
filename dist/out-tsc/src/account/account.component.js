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
var login_service_1 = require("./login/login.service");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var AccountComponent = /** @class */ (function (_super) {
    __extends(AccountComponent, _super);
    function AccountComponent(injector, _loginService) {
        var _this = _super.call(this, injector) || this;
        _this._loginService = _loginService;
        _this.currentYear = new Date().getFullYear();
        _this.versionText =
            _this.appSession.application.version +
                ' [' +
                _this.appSession.application.releaseDate.format('YYYYMMDD') +
                ']';
        return _this;
    }
    AccountComponent.prototype.showTenantChange = function () {
        return abp.multiTenancy.isEnabled;
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'layout-account',
            templateUrl: './account.component.html',
            styleUrls: ['./account.component.less'],
        }),
        __metadata("design:paramtypes", [core_1.Injector, login_service_1.LoginService])
    ], AccountComponent);
    return AccountComponent;
}(app_component_base_1.AppComponentBase));
exports.AccountComponent = AccountComponent;
