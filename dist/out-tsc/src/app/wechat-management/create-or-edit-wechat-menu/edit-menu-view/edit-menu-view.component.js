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
var EditMenuViewComponent = /** @class */ (function (_super) {
    __extends(EditMenuViewComponent, _super);
    function EditMenuViewComponent(_injector) {
        var _this = _super.call(this, _injector) || this;
        _this.dataChanged = new core_1.EventEmitter();
        _this.menuClicked = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(EditMenuViewComponent.prototype, "menuList", {
        get: function () {
            return this._menuList;
        },
        set: function (value) {
            this._menuList = value;
            if (this.dataChanged) {
                this.dataChanged.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    EditMenuViewComponent.prototype.ngOnInit = function () {
    };
    EditMenuViewComponent.prototype.menuSelectChanged = function (menu) {
        if (this.menuClicked) {
            this.menuClicked.emit(menu);
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditMenuViewComponent.prototype, "dataChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], EditMenuViewComponent.prototype, "menuList", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditMenuViewComponent.prototype, "menuClicked", void 0);
    EditMenuViewComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-menu-view',
            templateUrl: './edit-menu-view.component.html',
            styleUrls: ['./edit-menu-view.component.less'],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], EditMenuViewComponent);
    return EditMenuViewComponent;
}(component_base_1.AppComponentBase));
exports.EditMenuViewComponent = EditMenuViewComponent;
