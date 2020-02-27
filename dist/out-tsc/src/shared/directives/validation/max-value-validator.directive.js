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
var MaxValueValidator = /** @class */ (function () {
    function MaxValueValidator() {
    }
    MaxValueValidator_1 = MaxValueValidator;
    MaxValueValidator.prototype.validate = function (control) {
        var currentValue = control.value;
        var validationResult = null;
        if (!currentValue)
            return validationResult;
        var maxValue = this.maxValue;
        if (maxValue && currentValue > maxValue) {
            validationResult = validationResult || {};
            validationResult.maxValue = true;
        }
        return validationResult;
    };
    var MaxValueValidator_1;
    __decorate([
        core_1.Input('maxValue'),
        __metadata("design:type", Number)
    ], MaxValueValidator.prototype, "maxValue", void 0);
    MaxValueValidator = MaxValueValidator_1 = __decorate([
        core_1.Directive({
            selector: '[maxValue]',
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return MaxValueValidator_1; }),
                    multi: true,
                },
            ],
        })
    ], MaxValueValidator);
    return MaxValueValidator;
}());
exports.MaxValueValidator = MaxValueValidator;
