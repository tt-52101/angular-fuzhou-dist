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
var ValidationMessagesComponent = /** @class */ (function (_super) {
    __extends(ValidationMessagesComponent, _super);
    function ValidationMessagesComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.errorDefs = [];
        return _this;
    }
    ValidationMessagesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var targetElement = document.querySelector('[name=\'' + _this.formCtrl.name + '\']');
            if (!targetElement) {
                return;
            }
            targetElement = targetElement;
            if (targetElement.getAttribute('required') ||
                targetElement.getAttributeNode('required')) {
                _this.errorDefs.push({
                    required: _this.l('ThisFieldIsRequired'),
                });
            }
            if (targetElement.getAttribute('minlength')) {
                _this.errorDefs.push({
                    minlength: _this.l('PleaseEnterAtLeastNCharacter', targetElement.getAttribute('minlength')),
                });
            }
            if (targetElement.getAttribute('maxlength')) {
                _this.errorDefs.push({
                    maxlength: _this.l('PleaseEnterNoMoreThanNCharacter', targetElement.getAttribute('maxlength')),
                });
            }
        });
    };
    ValidationMessagesComponent.prototype.getErrorDefinitionIsValid = function (errorDef) {
        return !!this.formCtrl.errors[Object.keys(errorDef)[0]];
    };
    ValidationMessagesComponent.prototype.getErrorDefinitionMessage = function (errorDef) {
        return errorDef[Object.keys(errorDef)[0]];
    };
    ValidationMessagesComponent.prototype.addValidationDefinitionIfNotExists = function (validationKey, validationMessage) {
        if (this.errorDefs[validationKey]) {
            return;
        }
        this.errorDefs.push({ validationKey: validationMessage });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ValidationMessagesComponent.prototype, "formCtrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ValidationMessagesComponent.prototype, "errorDefs", void 0);
    ValidationMessagesComponent = __decorate([
        core_1.Component({
            selector: 'validation-messages',
            template: "\n    <ng-container *ngIf=\"formCtrl.invalid && formCtrl.dirty\">\n        <div *ngFor=\"let errorDef of errorDefs\">\n           <span *ngIf=\"getErrorDefinitionIsValid(errorDef)\">\n                 {{getErrorDefinitionMessage(errorDef)}}\n            </span>\n        </div>\n  </ng-container>\n    ",
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], ValidationMessagesComponent);
    return ValidationMessagesComponent;
}(component_base_1.AppComponentBase));
exports.ValidationMessagesComponent = ValidationMessagesComponent;
