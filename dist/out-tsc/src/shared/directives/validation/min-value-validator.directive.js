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
var MinValueValidator = /** @class */ (function () {
    function MinValueValidator() {
    }
    MinValueValidator_1 = MinValueValidator;
    MinValueValidator.prototype.validate = function (control) {
        var currentValue = control.value;
        var validationResult = null;
        if (!currentValue)
            return validationResult;
        var minValue = this.minValue;
        if (minValue && currentValue < minValue) {
            validationResult = validationResult || {};
            validationResult.minValue = true;
        }
        return validationResult;
    };
    var MinValueValidator_1;
    __decorate([
        core_1.Input('minValue'),
        __metadata("design:type", Number)
    ], MinValueValidator.prototype, "minValue", void 0);
    MinValueValidator = MinValueValidator_1 = __decorate([
        core_1.Directive({
            selector: '[minValue]',
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return MinValueValidator_1; }),
                    multi: true,
                },
            ],
        })
    ], MinValueValidator);
    return MinValueValidator;
}());
exports.MinValueValidator = MinValueValidator;
