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
var AppConsts_1 = require("abpPro/AppConsts");
var edit_language_text_component_1 = require("@app/admin/language-texts/edit-language-text/edit-language-text.component");
var abc_1 = require("@delon/abc");
var LanguageTextsComponent = /** @class */ (function (_super) {
    __extends(LanguageTextsComponent, _super);
    function LanguageTextsComponent(injector, _languageService, _router, _activatedRoute, _reuseTabService) {
        var _this = _super.call(this, injector) || this;
        _this._languageService = _languageService;
        _this._router = _router;
        _this._activatedRoute = _activatedRoute;
        _this._reuseTabService = _reuseTabService;
        _this.languages = [];
        _this.sourceNames = [];
        _this.targetValueFilters = [
            {
                label: _this.l('All'),
                value: 'ALL',
            },
            {
                label: _this.l('EmptyOnes'),
                value: 'EMPTY',
            },
        ];
        _this.targetValueFilter = 'ALL';
        abp.localization.sources.forEach(function (item, index, array) {
            if (item.type === 'MultiTenantLocalizationSource') {
                _this.sourceNames.push(item.name);
            }
        });
        _this.languages = abp.localization.languages;
        _this.init();
        return _this;
    }
    LanguageTextsComponent.prototype.ngAfterViewInit = function () { };
    LanguageTextsComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._languageService
            .getLanguageTexts(this.sourceName, this.baseLanguageName, this.targetLanguageName, this.targetValueFilter, this.filterText, undefined, request.maxResultCount, request.skipCount)
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.totalItems = result.totalCount;
        });
    };
    LanguageTextsComponent.prototype.init = function () {
        var _this = this;
        this.sourceName = AppConsts_1.AppConsts.localization.defaultLocalizationSourceName;
        this.baseLanguageName = abp.localization.currentLanguage.name;
        this._reuseTabService.title = this.l('LanguageTexts');
        this._activatedRoute.params.subscribe(function (params) {
            _this.targetLanguageName = params['lang'];
        });
    };
    LanguageTextsComponent.prototype.onSearch = function (e) {
        this.pageNumber = 1;
        this.refresh();
    };
    LanguageTextsComponent.prototype.truncateString = function (text) {
        return abp.utils.truncateStringWithPostfix(text, 32, '...');
    };
    LanguageTextsComponent.prototype.findIcon = function (name) {
        var icon = '';
        for (var index = 0; index < this.languages.length; index++) {
            if (this.languages[index].name === name) {
                icon = this.languages[index].icon;
                break;
            }
        }
        return icon;
    };
    LanguageTextsComponent.prototype.backLanguageList = function () {
        this._router.navigate(['app/admin/languages']);
    };
    LanguageTextsComponent.prototype.edit = function (data) {
        var _this = this;
        var pars = new service_proxies_1.UpdateLanguageTextInput();
        pars.sourceName = this.sourceName;
        pars.key = data.key;
        pars.languageName = this.targetLanguageName;
        pars.value = data.targetValue;
        this.modalHelper
            .open(edit_language_text_component_1.EditLanguageTextComponent, {
            data: pars,
            baseText: data.baseValue,
            baseLanguageName: this.baseLanguageName,
            targetLanguageName: this.targetLanguageName,
        })
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    LanguageTextsComponent = __decorate([
        core_1.Component({
            selector: 'app-language-texts',
            templateUrl: './language-texts.component.html',
            styles: [],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.LanguageServiceProxy,
            router_1.Router,
            router_1.ActivatedRoute,
            abc_1.ReuseTabService])
    ], LanguageTextsComponent);
    return LanguageTextsComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.LanguageTextsComponent = LanguageTextsComponent;
