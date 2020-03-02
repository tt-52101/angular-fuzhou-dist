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
var HeaderStorageComponent = /** @class */ (function (_super) {
    __extends(HeaderStorageComponent, _super);
    function HeaderStorageComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.clicked = true;
        return _this;
    }
    HeaderStorageComponent.prototype._click = function () {
        var _this = this;
        this.message.confirm(this.l('MakeSureClearAllLocalStorage'), function (res) {
            if (res) {
                localStorage.clear();
                _this.message.success(_this.l('ClearFinished'));
            }
        });
    };
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HeaderStorageComponent.prototype, "_click", null);
    HeaderStorageComponent = __decorate([
        core_1.Component({
            selector: 'header-storage',
            template: "\n  <div>\n    <i nz-icon type=\"tool\"></i>\n    {{l('ClearAllLocalStorage')}}\n  </div>\n  ",
            host: {
                '[class.d-block]': 'true',
            },
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], HeaderStorageComponent);
    return HeaderStorageComponent;
}(component_base_1.AppComponentBase));
exports.HeaderStorageComponent = HeaderStorageComponent;