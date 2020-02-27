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
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var CreateOrEditLanguageComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditLanguageComponent, _super);
    function CreateOrEditLanguageComponent(injector, languageService) {
        var _this = _super.call(this, injector) || this;
        _this.languageService = languageService;
        _this.languageId = undefined;
        _this.saving = false;
        _this.language = new service_proxies_1.LanguageEditDto();
        _this.languageNames = [];
        _this.flags = [];
        return _this;
    }
    CreateOrEditLanguageComponent.prototype.ngOnInit = function () {
        this.init();
    };
    CreateOrEditLanguageComponent.prototype.init = function () {
        var _this = this;
        this.languageService
            .getLanguageForEdit(this.languageId)
            .pipe()
            .subscribe(function (result) {
            _this.language = result.language;
            _this.languageNames = result.languageNames;
            _this.flags = result.flags;
            _this.selectedLanguage = result.language.name || '';
            if (!_this.languageId) {
                _this.language.isEnabled = true;
            }
        });
    };
    CreateOrEditLanguageComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        if (!this.selectedLanguage ||
            this.selectedLanguage === '' ||
            !this.language.icon ||
            this.language.icon === '') {
            this.saving = false;
            this.message.warn('值不能为空');
            return;
        }
        this.language.name = this.selectedLanguage;
        var input = new service_proxies_1.CreateOrUpdateLanguageInput();
        input.language = this.language;
        this.languageService
            .createOrUpdateLanguage(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CreateOrEditLanguageComponent.prototype, "languageId", void 0);
    CreateOrEditLanguageComponent = __decorate([
        core_1.Component({
            selector: 'app-create-or-edit-language',
            templateUrl: './create-or-edit-language.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.LanguageServiceProxy])
    ], CreateOrEditLanguageComponent);
    return CreateOrEditLanguageComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditLanguageComponent = CreateOrEditLanguageComponent;
