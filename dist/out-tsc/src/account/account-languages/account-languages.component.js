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
var _ = require("lodash");
var app_component_base_1 = require("@shared/component-base/app-component-base");
var utils_service_1 = require("abp-ng2-module/dist/src/utils/utils.service");
var AccountLanguagesComponent = /** @class */ (function (_super) {
    __extends(AccountLanguagesComponent, _super);
    function AccountLanguagesComponent(injector, utilsService) {
        var _this = _super.call(this, injector) || this;
        _this.utilsService = utilsService;
        return _this;
    }
    AccountLanguagesComponent.prototype.ngOnInit = function () {
        this.languages = _.filter(this.localization.languages, function (l) { return !l.isDisabled; });
        this.currentLanguage = this.localization.currentLanguage;
    };
    AccountLanguagesComponent.prototype.changeLanguage = function (languageName) {
        this.utilsService.setCookieValue('Abp.Localization.CultureName', languageName, new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
        abp.appPath);
        location.reload();
    };
    AccountLanguagesComponent = __decorate([
        core_1.Component({
            // tslint:disable-next-line:component-selector
            selector: 'account-languages',
            templateUrl: './account-languages.component.html',
            styleUrls: ['./account-languages.component.less'],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            utils_service_1.UtilsService])
    ], AccountLanguagesComponent);
    return AccountLanguagesComponent;
}(app_component_base_1.AppComponentBase));
exports.AccountLanguagesComponent = AccountLanguagesComponent;
