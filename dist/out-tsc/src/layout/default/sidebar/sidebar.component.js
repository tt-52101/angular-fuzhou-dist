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
var theme_1 = require("@delon/theme");
var component_base_1 = require("@shared/component-base");
var app_auth_service_1 = require("@shared/auth/app-auth.service");
var SidebarComponent = /** @class */ (function (_super) {
    __extends(SidebarComponent, _super);
    // shownLoginName = '';
    // emailAddress = '';
    function SidebarComponent(injector, authService, settings) {
        var _this = _super.call(this, injector) || this;
        _this.authService = authService;
        _this.settings = settings;
        return _this;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        // this.shownLoginName = this.appSession.getShownLoginName();
        // this.emailAddress = this.appSession.user.emailAddress;
    };
    SidebarComponent.prototype.logout = function () {
        this.authService.logout();
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'layout-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.less']
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            app_auth_service_1.AppAuthService,
            theme_1.SettingsService])
    ], SidebarComponent);
    return SidebarComponent;
}(component_base_1.AppComponentBase));
exports.SidebarComponent = SidebarComponent;
