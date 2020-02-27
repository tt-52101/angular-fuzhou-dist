"use strict";
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
var forms_1 = require("@angular/forms");
var PasswordComplexityValidator = /** @class */ (function () {
    function PasswordComplexityValidator() {
    }
    PasswordComplexityValidator_1 = PasswordComplexityValidator;
    PasswordComplexityValidator.prototype.validate = function (control) {
        var givenPassword = control.value;
        var validationResult = null;
        var requireDigit = this.requireDigit;
        if (requireDigit && givenPassword && !/[0-9]/.test(givenPassword)) {
            validationResult = validationResult || {};
            validationResult.requireDigit = true;
        }
        var requireUppercase = this.requireUppercase;
        if (requireUppercase && givenPassword && !/[A-Z]/.test(givenPassword)) {
            validationResult = validationResult || {};
            validationResult.requireUppercase = true;
        }
        var requireLowercase = this.requireLowercase;
        if (requireLowercase && givenPassword && !/[a-z]/.test(givenPassword)) {
            validationResult = validationResult || {};
            validationResult.requireLowercase = true;
        }
        var requiredLength = this.requiredLength;
        if (requiredLength &&
            givenPassword &&
            givenPassword.length < requiredLength) {
            validationResult = validationResult || {};
            validationResult.requiredLength = true;
        }
        // use upperCaseLetters
        var requireNonAlphanumeric = this.requireNonAlphanumeric;
        if (requireNonAlphanumeric &&
            givenPassword &&
            /^[0-9a-zA-Z]+$/.test(givenPassword)) {
            validationResult = validationResult || {};
            validationResult.requireNonAlphanumeric = true;
        }
        return validationResult;
    };
    var PasswordComplexityValidator_1;
    __decorate([
        core_1.Input('requireDigit'),
        __metadata("design:type", Boolean)
    ], PasswordComplexityValidator.prototype, "requireDigit", void 0);
    __decorate([
        core_1.Input('requireUppercase'),
        __metadata("design:type", Boolean)
    ], PasswordComplexityValidator.prototype, "requireUppercase", void 0);
    __decorate([
        core_1.Input('requireLowercase'),
        __metadata("design:type", Boolean)
    ], PasswordComplexityValidator.prototype, "requireLowercase", void 0);
    __decorate([
        core_1.Input('requireNonAlphanumeric'),
        __metadata("design:type", Boolean)
    ], PasswordComplexityValidator.prototype, "requireNonAlphanumeric", void 0);
    __decorate([
        core_1.Input('requiredLength'),
        __metadata("design:type", Number)
    ], PasswordComplexityValidator.prototype, "requiredLength", void 0);
    PasswordComplexityValidator = PasswordComplexityValidator_1 = __decorate([
        core_1.Directive({
            selector: '[requireDigit],[requireLowercase],[requireNonAlphanumeric],[requireUppercase],[requiredLength]',
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return PasswordComplexityValidator_1; }),
                    multi: true,
                },
            ],
        })
    ], PasswordComplexityValidator);
    return PasswordComplexityValidator;
}());
exports.PasswordComplexityValidator = PasswordComplexityValidator;
