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
var component_base_1 = require("@shared/component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var _ = require("lodash");
// import { I18NService } from '@core/i18n/i18n.service';
var HeaderI18nComponent = /** @class */ (function (_super) {
    __extends(HeaderI18nComponent, _super);
    function HeaderI18nComponent(injector, _profileService) {
        var _this = _super.call(this, injector) || this;
        _this._profileService = _profileService;
        return _this;
    }
    HeaderI18nComponent.prototype.ngOnInit = function () {
        // console.log(this.localization.languages)
        this.languages = _.filter(this.localization.languages, function (l) { return !l.isDisabled; });
        this.currentLanguage = this.localization.currentLanguage;
    };
    HeaderI18nComponent.prototype.change = function (languageName) {
        // console.log(languageName)
        var input = new service_proxies_1.ChangeUserLanguageDto();
        input.languageName = languageName;
        this._profileService.changeLanguage(input).subscribe(function () {
            abp.utils.setCookieValue('Abp.Localization.CultureName', languageName, new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
            abp.appPath);
            window.location.reload();
        });
    };
    HeaderI18nComponent = __decorate([
        core_1.Component({
            selector: 'header-i18n',
            template: "\n  <div\n  nz-dropdown\n  [ngClass]=\"'btnClass'\"\n  class=\"alain-pro__item\"\n  nzPlacement=\"bottomRight\"\n  [nzDropdownMenu]=\"dropdownMenu\"\n  >\n  <i nz-icon nzType=\"global\" [ngClass]=\"'btnIconClass'\"></i>\n  {{ currentLanguage.displayName }}\n  <i nz-icon type=\"down\"></i>\n  </div>\n\n  <nz-dropdown-menu #dropdownMenu=\"nzDropdownMenu\">\n  <ul nz-menu>\n  <li\n  nz-menu-item\n  *ngFor=\"let item of languages\"\n  [nzSelected]=\"item.name == currentLanguage.name\"\n  (click)=\"change(item.name)\"\n  >\n  <i class=\"anticon {{ item.icon }}\"></i>\n  <span>{{ item.displayName }}</span>\n  </li>\n  </ul>\n  </nz-dropdown-menu>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ProfileServiceProxy])
    ], HeaderI18nComponent);
    return HeaderI18nComponent;
}(component_base_1.AppComponentBase));
exports.HeaderI18nComponent = HeaderI18nComponent;
