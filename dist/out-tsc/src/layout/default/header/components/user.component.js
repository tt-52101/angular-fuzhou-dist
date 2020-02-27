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
var app_auth_service_1 = require("@shared/auth/app-auth.service");
var change_password_modal_component_1 = require("@layout/default/profile/change-password-modal.component");
var login_attempts_modal_component_1 = require("@layout/default/profile/login-attempts-modal.component");
var my_settings_modal_component_1 = require("@layout/default/profile/my-settings-modal.component");
var auth_1 = require("@shared/auth");
var HeaderUserComponent = /** @class */ (function (_super) {
    __extends(HeaderUserComponent, _super);
    function HeaderUserComponent(injector, authService, impersonationService) {
        var _this = _super.call(this, injector) || this;
        _this.authService = authService;
        _this.impersonationService = impersonationService;
        return _this;
    }
    HeaderUserComponent.prototype.ngOnInit = function () {
        this.isImpersonatedLogin = this.abpSession.impersonatorUserId > 0;
        this.loginUserName = this.appSession.getShownLoginName();
    };
    HeaderUserComponent.prototype.changePassword = function () {
        var _this = this;
        this.modalHelper.open(change_password_modal_component_1.ChangePasswordModalComponent).subscribe(function (result) {
            if (result) {
                _this.logout();
            }
        });
    };
    HeaderUserComponent.prototype.showLoginAttempts = function () {
        this.modalHelper.open(login_attempts_modal_component_1.LoginAttemptsModalComponent).subscribe(function (result) { });
    };
    HeaderUserComponent.prototype.changeMySettings = function () {
        this.modalHelper.open(my_settings_modal_component_1.MySettingsModalComponent).subscribe(function (result) { });
    };
    HeaderUserComponent.prototype.backToMyAccount = function () {
        this.impersonationService.backToImpersonator();
    };
    HeaderUserComponent.prototype.logout = function () {
        this.authService.logout();
    };
    HeaderUserComponent = __decorate([
        core_1.Component({
            selector: 'header-user',
            template: "\n    <div\n      class=\"alain-pro__nav-item d-flex align-items-center px-sm\"\n      nz-dropdown\n      nzPlacement=\"bottomRight\"\n      [nzDropdownMenu]=\"dropdownMenu\"\n    >\n      <nz-avatar\n        [nzSrc]=\"'/assets/images/user.png'\"\n        nzSize=\"small\"\n        class=\"mr-sm\"\n      ></nz-avatar>\n      {{ loginUserName }}\n    </div>\n\n    <nz-dropdown-menu #dropdownMenu=\"nzDropdownMenu\">\n      <div nz-menu class=\"width-sm\">\n        <!-- \u8FD4\u56DE\u6211\u7684\u8D26\u6237 -->\n        <div\n          nz-menu-item\n          (click)=\"backToMyAccount()\"\n          *ngIf=\"isImpersonatedLogin\"\n        >\n          <i nz-icon nzType=\"rollback\"></i>\n          {{ l('BackToMyAccount') }}\n        </div>\n        <!-- \u5BC6\u7801\u4FEE\u6539 -->\n        <!--<div nz-menu-item (click)=\"changePassword()\">\n          <i nz-icon nzType=\"ellipsis\"></i>\n          {{ l('ChangePassword') }}\n        </div>-->\n        <!-- \u767B\u9646\u8BB0\u5F55 -->\n        <!--<div nz-menu-item (click)=\"showLoginAttempts()\">\n          <i nz-icon nzType=\"bars\"></i>\n          {{ l('LoginAttempts') }}\n        </div>-->\n        <!-- \u8BBE\u7F6E -->\n        <!--<div nz-menu-item (click)=\"changeMySettings()\">\n          <i nz-icon nzType=\"setting\"></i>\n          {{ l('MySettings') }}\n        </div>-->\n        <!--<li nz-menu-divider></li>-->\n        <!-- \u6CE8\u9500 -->\n        <div nz-menu-item (click)=\"logout()\">\n          <i nz-icon nzType=\"logout\"></i>\n          {{ l('Logout') }}\n        </div>\n      </div>\n    </nz-dropdown-menu>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            app_auth_service_1.AppAuthService,
            auth_1.ImpersonationService])
    ], HeaderUserComponent);
    return HeaderUserComponent;
}(app_component_base_1.AppComponentBase));
exports.HeaderUserComponent = HeaderUserComponent;
