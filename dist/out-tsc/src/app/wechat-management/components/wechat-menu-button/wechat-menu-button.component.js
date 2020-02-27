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
var WechatMenuButtonComponent = /** @class */ (function (_super) {
    __extends(WechatMenuButtonComponent, _super);
    function WechatMenuButtonComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.dataChanged = new core_1.EventEmitter();
        _this.menuClicked = new core_1.EventEmitter();
        _this.maxLength = 3;
        return _this;
    }
    Object.defineProperty(WechatMenuButtonComponent.prototype, "menuList", {
        get: function () {
            if (this._menuList) {
                this.showAddMenuButton = this._menuList.length < this.maxLength;
            }
            return this._menuList;
        },
        set: function (value) {
            var _this = this;
            this._menuList = value;
            if (this._menuList) {
                this.showAddMenuButton = this._menuList.length < this.maxLength;
                this._menuList.forEach(function (item) {
                    item.component = _this;
                });
            }
            if (this.dataChanged) {
                this.dataChanged.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WechatMenuButtonComponent.prototype, "display", {
        get: function () {
            if (this.isHorizontal) {
                return 'inline-block';
            }
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    WechatMenuButtonComponent.prototype.ngOnInit = function () {
    };
    /**
     * 添加菜单
     */
    WechatMenuButtonComponent.prototype.addMenu = function () {
        if (this.menuList.length === this.maxLength) {
            return;
        }
        var newMenu = {
            parentId: this.parentMenu ? this.parentMenu.id : null,
            parent: this.parentMenu,
            id: this.menuList.length + '',
            text: (this.parentMenu ? '子' : '主') + "菜单" + (this.menuList.length + 1),
            subMenu: this.parentMenu ? null : [],
            subMenuHorizontal: this.subMenuIsHorizontal,
            component: this,
            origin: null
        };
        // 插入菜单项
        var index = this.parentMenu ? 0 : this.menuList.length;
        this.menuList.splice(index, 0, newMenu);
        this.showAddMenuButton = !(this.menuList.length === this.maxLength);
    };
    /**
     * 点击菜单项
     * @param menu
     */
    WechatMenuButtonComponent.prototype.menuClick = function (menu) {
        if (this.menuClicked) {
            this.menuClicked.emit(menu);
        }
    };
    /**
     * 删除一项
     * @param item
     */
    WechatMenuButtonComponent.prototype.removeMenu = function (item) {
        var index = this.menuList.indexOf(item);
        if (index > -1) {
            this.menuList.splice(index, 1);
        }
    };
    /**
     * 移动菜单项
     * @param item 菜单项
     * @param direction 移动方向， left:左移 right:右移  up:上移 down:下移
     */
    WechatMenuButtonComponent.prototype.moveMenuItem = function (item, direction) {
        var index = this.menuList.indexOf(item);
        if (this.isHorizontal) {
            // 显示和使用是相同的，所以这里是正的
            if (direction === 'left') {
                this.zIndexDown(this.menuList, index);
                return;
            }
            if (direction === 'right') {
                this.zIndexUp(this.menuList, index, this.menuList.length);
                return;
            }
        }
        else {
            // 显示和实际是相反的，所以这里是反的
            if (direction === 'up') {
                this.zIndexDown(this.menuList, index);
                return;
            }
            if (direction === 'down') {
                this.zIndexUp(this.menuList, index, this.menuList.length);
                return;
            }
        }
    };
    /**
    * 数组元素交换位置
    * @param {array} arr 数组
    * @param {number} index1 添加项目的位置
    * @param {number} index2 删除项目的位置
    * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
    */
    WechatMenuButtonComponent.prototype.swapArray = function (arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };
    /**
     * 上移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位
     * @param arr
     * @param index
     * @param length
     */
    WechatMenuButtonComponent.prototype.zIndexUp = function (arr, index, length) {
        if (index + 1 != length) {
            this.swapArray(arr, index, index + 1);
        }
        else {
        }
    };
    /**
     * 下移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位
     * @param arr
     * @param index
     */
    WechatMenuButtonComponent.prototype.zIndexDown = function (arr, index) {
        if (index != 0) {
            this.swapArray(arr, index, index - 1);
        }
        else {
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WechatMenuButtonComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WechatMenuButtonComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WechatMenuButtonComponent.prototype, "parentMenu", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WechatMenuButtonComponent.prototype, "dataChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], WechatMenuButtonComponent.prototype, "menuList", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WechatMenuButtonComponent.prototype, "menuClicked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], WechatMenuButtonComponent.prototype, "maxLength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WechatMenuButtonComponent.prototype, "isHorizontal", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WechatMenuButtonComponent.prototype, "subMenuIsHorizontal", void 0);
    WechatMenuButtonComponent = __decorate([
        core_1.Component({
            selector: 'app-wechat-menu-button',
            templateUrl: './wechat-menu-button.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], WechatMenuButtonComponent);
    return WechatMenuButtonComponent;
}(component_base_1.AppComponentBase));
exports.WechatMenuButtonComponent = WechatMenuButtonComponent;
