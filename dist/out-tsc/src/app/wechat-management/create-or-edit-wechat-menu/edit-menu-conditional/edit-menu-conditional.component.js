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
var component_base_1 = require("@shared/component-base");
var EditMenuConditionalComponent = /** @class */ (function (_super) {
    __extends(EditMenuConditionalComponent, _super);
    function EditMenuConditionalComponent(injector) {
        var _this = _super.call(this, injector) || this;
        /**
         * 个性化菜单匹配规则发生改变
         */
        _this.menuMatchRuleChanged = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(EditMenuConditionalComponent.prototype, "menuMatchRule", {
        /**
         * 个性化菜单匹配规则
         */
        get: function () {
            return this._menuMatchRule;
        },
        set: function (value) {
            this._menuMatchRule = value;
            if (this.menuMatchRuleChanged) {
                this.menuMatchRuleChanged.emit(this._menuMatchRule);
            }
        },
        enumerable: true,
        configurable: true
    });
    EditMenuConditionalComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", service_proxies_1.MenuMatchRule),
        __metadata("design:paramtypes", [service_proxies_1.MenuMatchRule])
    ], EditMenuConditionalComponent.prototype, "menuMatchRule", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditMenuConditionalComponent.prototype, "menuMatchRuleChanged", void 0);
    EditMenuConditionalComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-menu-conditional',
            templateUrl: './edit-menu-conditional.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], EditMenuConditionalComponent);
    return EditMenuConditionalComponent;
}(component_base_1.AppComponentBase));
exports.EditMenuConditionalComponent = EditMenuConditionalComponent;
