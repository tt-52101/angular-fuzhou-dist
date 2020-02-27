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
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var EditLanguageTextComponent = /** @class */ (function (_super) {
    __extends(EditLanguageTextComponent, _super);
    function EditLanguageTextComponent(injector, languageService) {
        var _this = _super.call(this, injector) || this;
        _this.languageService = languageService;
        _this.saving = false;
        return _this;
    }
    EditLanguageTextComponent.prototype.ngOnInit = function () {
        var self = this;
        self.baseLanguage = self.findLanguage(self.baseLanguageName);
        self.targetLanguage = self.findLanguage(self.targetLanguageName);
    };
    EditLanguageTextComponent.prototype.save = function () {
        var _this = this;
        if (this.data.value && this.data.value !== '') {
            this.saving = true;
            this.languageService
                .updateLanguageText(this.data)
                .finally(function () { return (_this.saving = false); })
                .subscribe(function () {
                _this.notify.success(_this.l('SavedSuccessfully'));
                _this.success();
            });
        }
        else {
            this.message.warn('值不能为空');
        }
    };
    EditLanguageTextComponent.prototype.findLanguage = function (name) {
        return abp.localization.languages.find(function (item, index, array) { return item.name === name; });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", service_proxies_1.UpdateLanguageTextInput)
    ], EditLanguageTextComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditLanguageTextComponent.prototype, "baseText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditLanguageTextComponent.prototype, "baseLanguage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditLanguageTextComponent.prototype, "targetLanguage", void 0);
    EditLanguageTextComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-language-text',
            templateUrl: './edit-language-text.component.html',
            styles: [],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.LanguageServiceProxy])
    ], EditLanguageTextComponent);
    return EditLanguageTextComponent;
}(modal_component_base_1.ModalComponentBase));
exports.EditLanguageTextComponent = EditLanguageTextComponent;
