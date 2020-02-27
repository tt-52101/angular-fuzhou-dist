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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// Got from: https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2
var EqualValidator = /** @class */ (function () {
    function EqualValidator(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    EqualValidator_1 = EqualValidator;
    Object.defineProperty(EqualValidator.prototype, "isReverse", {
        get: function () {
            if (!this.reverse) {
                return false;
            }
            return this.reverse === 'true';
        },
        enumerable: true,
        configurable: true
    });
    EqualValidator.prototype.validate = function (control) {
        // 对比的控件
        var confirmControl = control.root.get(this.validateEqual);
        if (!confirmControl) {
            return null;
        }
        // 当前控件的值
        var currtenControlValue = control.value;
        // 对比控件的值
        var confirmControlValue = confirmControl.value;
        if (!currtenControlValue || !confirmControlValue) {
            return null;
        }
        // 如果当前控件是主控件
        if (this.isReverse) {
            // 当前控件值等于确认控件值,
            if (currtenControlValue === confirmControlValue) {
                confirmControl.updateValueAndValidity();
            }
            else { // 当前控件值不等于确认控件值
                confirmControl.setErrors({
                    validateEqual: true
                });
            }
        }
        else { // 如果当前值不是主控件
            if (currtenControlValue !== confirmControlValue) {
                return {
                    validateEqual: true
                };
            }
            else {
                return {};
            }
        }
    };
    var EqualValidator_1;
    EqualValidator = EqualValidator_1 = __decorate([
        core_1.Directive({
            selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return EqualValidator_1; }),
                    multi: true,
                },
            ],
        }),
        __param(0, core_1.Attribute('validateEqual')),
        __param(1, core_1.Attribute('reverse')),
        __metadata("design:paramtypes", [String, String])
    ], EqualValidator);
    return EqualValidator;
}());
exports.EqualValidator = EqualValidator;
