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
var EditMenuConfigComponent = /** @class */ (function (_super) {
    __extends(EditMenuConfigComponent, _super);
    function EditMenuConfigComponent(_injector) {
        return _super.call(this, _injector) || this;
    }
    Object.defineProperty(EditMenuConfigComponent.prototype, "menuItem", {
        get: function () {
            return this._menuItem;
        },
        set: function (value) {
            this._menuItem = value;
            if (this._menuItem) {
                this.entity = value.origin;
            }
        },
        enumerable: true,
        configurable: true
    });
    EditMenuConfigComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(EditMenuConfigComponent.prototype, "showMenuType", {
        /**
         * 展示菜单类型选择器
         */
        get: function () {
            return this.entity
                && this.menuItem
                && (!this.menuItem.subMenu
                    || this.menuItem.subMenu.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditMenuConfigComponent.prototype, "showKeyInput", {
        /**
         * 展示key输入框
         */
        get: function () {
            return this.showMenuType
                && (this.entity.type === 'click'
                    || this.entity.type === 'location_select'
                    || this.entity.type === 'pic_photo_or_album'
                    || this.entity.type === 'pic_sysphoto'
                    || this.entity.type === 'pic_weixin'
                    || this.entity.type === 'scancode_push'
                    || this.entity.type === 'scancode_waitmsg');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditMenuConfigComponent.prototype, "showMenuUrl", {
        /**
         * 展示菜单Url输入框
         */
        get: function () {
            return this.showMenuType
                && (this.entity.type === 'view'
                    || this.entity.type === 'miniprogram');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditMenuConfigComponent.prototype, "showAppIdAndAppPagePath", {
        /**
         * 展示AppId和AppPagePath输入框
         */
        get: function () {
            return this.showMenuType && this.entity.type === 'miniprogram';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditMenuConfigComponent.prototype, "showMediaId", {
        /**
         * 展示MediaId输入框
         */
        get: function () {
            return this.showMenuType
                && (this.entity.type === 'media_id'
                    || this.entity.type === 'view_limited');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], EditMenuConfigComponent.prototype, "menuItem", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], EditMenuConfigComponent.prototype, "menuTypeList", void 0);
    EditMenuConfigComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-menu-config',
            templateUrl: './edit-menu-config.component.html',
            styleUrls: ['./edit-menu-config.component.less'],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], EditMenuConfigComponent);
    return EditMenuConfigComponent;
}(component_base_1.AppComponentBase));
exports.EditMenuConfigComponent = EditMenuConfigComponent;
