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
var ExpressionValidator = /** @class */ (function () {
    function ExpressionValidator() {
    }
    ExpressionValidator_1 = ExpressionValidator;
    ExpressionValidator.prototype.validate = function (control) {
        var validationResult = null;
        if (!this.expression)
            return validationResult;
        if (!control.value || control.value.length < 0)
            return validationResult;
        var currentValue = control.value;
        var error = false;
        var regexp;
        if (Array.isArray(this.expression)) {
            for (var index = 0; index < this.expression.length; index++) {
                regexp = new RegExp(this.expression[index]);
                if (!regexp.test(currentValue)) {
                    error = true;
                    break;
                }
            }
        }
        else {
            regexp = new RegExp(this.expression);
            error = !regexp.test(currentValue);
        }
        if (error) {
            validationResult = {};
            validationResult.expression = true;
        }
        else {
            validationResult = null;
        }
        return validationResult;
    };
    var ExpressionValidator_1;
    __decorate([
        core_1.Input('expression'),
        __metadata("design:type", Object)
    ], ExpressionValidator.prototype, "expression", void 0);
    ExpressionValidator = ExpressionValidator_1 = __decorate([
        core_1.Directive({
            selector: '[expression]',
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return ExpressionValidator_1; }),
                    multi: true,
                },
            ],
        })
    ], ExpressionValidator);
    return ExpressionValidator;
}());
exports.ExpressionValidator = ExpressionValidator;
