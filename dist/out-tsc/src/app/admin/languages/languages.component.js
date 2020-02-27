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
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var router_1 = require("@angular/router");
var create_or_edit_language_component_1 = require("@app/admin/languages/create-or-edit-language/create-or-edit-language.component");
var _ = require("lodash");
var LanguagesComponent = /** @class */ (function (_super) {
    __extends(LanguagesComponent, _super);
    function LanguagesComponent(injector, _languageService, router) {
        var _this = _super.call(this, injector) || this;
        _this._languageService = _languageService;
        _this.router = router;
        return _this;
    }
    LanguagesComponent.prototype.changeTexts = function (language) {
        var self = this;
        setTimeout(function () {
            self.router.navigate([
                'app/admin/languagetexts',
                { lang: language.name }
            ]);
        }, 300);
    };
    LanguagesComponent.prototype.setAsDefaultLanguage = function (language) {
        var _this = this;
        var input = new service_proxies_1.SetDefaultLanguageInput();
        input.name = language.name;
        this._languageService.setDefaultLanguage(input).subscribe(function () {
            _this.refresh();
            _this.notify.success(_this.l('SuccessfullySaved'));
        });
    };
    // deleteLanguage(language: LanguageListDto): void {
    //   this.message.confirm(
    //     this.l('LanguageDeleteWarningMessage', language.displayName),
    //     isConfirmed => {
    //       if (isConfirmed) {
    //         this.languageService.deleteLanguage(language.id).subscribe(() => {
    //           this.refresh();
    //           this.notify.success(this.l('SuccessfullyDeleted'));
    //         });
    //       }
    //     },
    //   );
    // }
    LanguagesComponent.prototype.createOrEditLanguage = function (languageId) {
        var _this = this;
        this.modalHelper
            .open(create_or_edit_language_component_1.CreateOrEditLanguageComponent, { languageId: languageId })
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    LanguagesComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._languageService
            .getLanguages()
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.defaultLanguageName = result.defaultLanguageName;
            _this.pageSize = result.items.length;
            //      this.showPaging(result);
        });
    };
    /**
     * 删除
     * @param language 语言实体
     */
    LanguagesComponent.prototype.delete = function (language) {
        var _this = this;
        this._languageService.deleteLanguage(language.id).subscribe(function () {
            _this.refresh();
            _this.notify.success(_this.l('SuccessfullyDeleted'));
        });
    };
    /**
     * 批量删除
     */
    LanguagesComponent.prototype.batchDelete = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        abp.message.confirm(this.l('ConfirmDeleteXItemsWarningMessage', selectCount), function (res) {
            if (res) {
                var ids = _.map(_this.selectedDataItems, 'id');
                _this._languageService.batchDelete(ids).subscribe(function () {
                    _this.refresh();
                    _this.notify.success(_this.l('SuccessfullyDeleted'));
                });
            }
        });
    };
    LanguagesComponent.prototype.log = function (data) {
        console.log(data);
    };
    LanguagesComponent = __decorate([
        core_1.Component({
            selector: 'app-languages',
            templateUrl: './languages.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.LanguageServiceProxy,
            router_1.Router])
    ], LanguagesComponent);
    return LanguagesComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.LanguagesComponent = LanguagesComponent;
