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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var AppConsts_1 = require("abpPro/AppConsts");
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var MySettingsModalComponent = /** @class */ (function (_super) {
    __extends(MySettingsModalComponent, _super);
    function MySettingsModalComponent(injector, profileService) {
        var _this = _super.call(this, injector) || this;
        _this.profileService = profileService;
        _this.user = new service_proxies_1.CurrentUserProfileEditDto();
        _this.isAdmin = true;
        return _this;
    }
    MySettingsModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profileService.getCurrentUserProfileForEdit().subscribe(function (result) {
            _this.user = result;
            _this.isAdmin =
                _this.user.userName === AppConsts_1.AppConsts.userManagement.defaultAdminUserName;
        });
    };
    MySettingsModalComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        this.profileService
            .updateCurrentUserProfile(this.user)
            .finally(function () {
            _this.saving = false;
        })
            .subscribe(function () {
            _this.appSession.user.userName = _this.user.userName;
            _this.appSession.user.emailAddress = _this.user.emailAddress;
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success();
        });
    };
    MySettingsModalComponent = __decorate([
        core_1.Component({
            selector: 'app-my-settings-modal',
            templateUrl: './my-settings-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector, service_proxies_1.ProfileServiceProxy])
    ], MySettingsModalComponent);
    return MySettingsModalComponent;
}(modal_component_base_1.ModalComponentBase));
exports.MySettingsModalComponent = MySettingsModalComponent;
