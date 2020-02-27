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
var NoDataComponent = /** @class */ (function (_super) {
    __extends(NoDataComponent, _super);
    // endregion
    function NoDataComponent(injector) {
        var _this = _super.call(this, injector) || this;
        /**
         * 图标
         */
        _this.icon = 'anticon anticon-frown-o';
        return _this;
    }
    NoDataComponent.prototype.ngOnInit = function () {
        if (!this.text) {
            this.text = this.l('NoData');
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NoDataComponent.prototype, "text", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NoDataComponent.prototype, "icon", void 0);
    NoDataComponent = __decorate([
        core_1.Component({
            selector: 'no-data',
            template: "\n   <span class=\"no-result-data\">\n    <i *ngIf=\"icon\" [class]=\"icon\"></i>\n    <span>{{text}}</span>\n   </span>\n  ",
            styles: [
                "\n      .no-result-data {\n        color: rgba(0, 0, 0, 0.25);\n        text-align: center;\n        line-height: 64px;\n        font-size: 16px;\n        margin: 0 auto;\n      }\n      .no-result-data i {\n        font-size: 24px;\n        margin-right: 16px;\n        position: relative;\n        top: 3px;\n      }\n    ",
            ],
            preserveWhitespaces: false,
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], NoDataComponent);
    return NoDataComponent;
}(component_base_1.AppComponentBase));
exports.NoDataComponent = NoDataComponent;
