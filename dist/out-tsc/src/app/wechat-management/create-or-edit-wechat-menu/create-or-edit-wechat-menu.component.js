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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var core_1 = require("@angular/core");
var component_base_1 = require("@shared/component-base");
var abc_1 = require("@delon/abc");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var CreateOrEditWechatMenuComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditWechatMenuComponent, _super);
    function CreateOrEditWechatMenuComponent(_injector, activatedRoute, reuseTabService, _wechatMenuService) {
        var _this = _super.call(this, _injector) || this;
        _this.activatedRoute = activatedRoute;
        _this.reuseTabService = reuseTabService;
        _this._wechatMenuService = _wechatMenuService;
        /**
         * 加载
         */
        _this.loading = true;
        /**
         * 菜单信息
         */
        _this.allMemu = new service_proxies_1.GetWechatMenuForEditOutput();
        /**
         * 界面展示用的数据结构
         */
        _this.menuList = [];
        return _this;
    }
    CreateOrEditWechatMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params
            .subscribe(function (params) {
            // 初始化获取数据,如果未获取到,跳转到管理列表页
            _this.appId = params['appId'];
            _this.appName = params['appName'];
            if (!_this.appId || !_this.appName) {
                _this.reuseTabService.replace("/app/wechat/wechat-app-config");
                return;
            }
            var currentTitle = _this.l('EditWechatMenu') + ":" + _this.appName;
            _this.reuseTabService.title = currentTitle;
            _this.titleSrvice.setTitle(currentTitle);
            if (!_this.allMemu.menuTypeList) {
                _this.getMenuData();
            }
        });
    };
    /**
     * 获取所有菜单数据
     * @param isRefresh 是否为刷新菜单,如果为true将显示消息通知
     */
    CreateOrEditWechatMenuComponent.prototype.getMenuData = function (isRefresh) {
        var _this = this;
        if (isRefresh === void 0) { isRefresh = false; }
        this.loading = true;
        this.resetDatas();
        this._wechatMenuService.getMenuForEdit(this.appId)
            .pipe(operators_1.finalize(function () {
            _this.loading = false;
        }))
            .subscribe(function (result) {
            _this.allMemu = result;
            _this.resetDatas();
            _this.allMemu.menu.button.forEach(function (item) {
                _this.menuList.push(_this.processMenu(item));
            });
            if (isRefresh) {
                _this.notify.success(_this.l('PullWechatMenusSuccessfully'));
            }
        });
    };
    /**
     * 将数据格式组织成符合菜单按钮组件的数据结构
     */
    CreateOrEditWechatMenuComponent.prototype.processMenu = function (sourceMenuItem, parent) {
        var _this = this;
        var menuItem = {
            parentId: parent ? parent.text : null,
            parent: parent,
            id: sourceMenuItem.name,
            text: sourceMenuItem.name,
            subMenu: parent ? null : [],
            subMenuHorizontal: false,
            origin: sourceMenuItem
        };
        if (sourceMenuItem.sub_button) {
            sourceMenuItem.sub_button.forEach(function (item) {
                menuItem.subMenu.push(_this.processMenu(item, menuItem));
            });
        }
        return menuItem;
    };
    /**
     * 选中的菜单按钮发生了改变
     * @param menu
     */
    CreateOrEditWechatMenuComponent.prototype.menuSelectChanged = function (menuItem) {
        if (!menuItem.origin) {
            menuItem.origin = new service_proxies_1.MenuFull_RootButton();
            menuItem.origin.name = menuItem.text;
            menuItem.origin.type = this.allMemu.menuTypeList[0].value;
        }
        this.currentMenuItem = menuItem;
    };
    /**
     * 提交菜单数据
     */
    CreateOrEditWechatMenuComponent.prototype.save = function () {
        var _this = this;
        this.loading = true;
        var input = new service_proxies_1.CreateOrEditWechatMenuInput();
        input.appId = this.appId;
        input.menu = [];
        this.menuList.forEach(function (item) {
            input.menu.push(_this.processSubmitMenuData(item));
        });
        this._wechatMenuService.createOrWechatEditMenu(input)
            .pipe((operators_1.finalize(function () {
            _this.loading = false;
        })))
            .subscribe(function () {
            _this.notify.success(_this.l('PushWechatMenusSuccessfully'));
        });
    };
    /**
     * 处理当前菜单数据格式为需要提交的数据格式
     * @param menuItem 菜单集合
     * @param parentMenu 父级菜单
     */
    CreateOrEditWechatMenuComponent.prototype.processSubmitMenuData = function (menuItem, parentMenu) {
        var _this = this;
        var meunFull = service_proxies_1.MenuFull_RootButton.fromJS(menuItem.origin);
        if (menuItem.subMenu && menuItem.subMenu.length > 0) {
            meunFull.sub_button = [];
            menuItem.subMenu.forEach(function (item) {
                meunFull.sub_button.push(_this.processSubmitMenuData(item, meunFull));
            });
        }
        return meunFull;
    };
    CreateOrEditWechatMenuComponent.prototype.delete = function (item) {
        this._wechatMenuService.deleteMenuConditional(this.appId, item.menuid)
            .subscribe(function () {
        });
    };
    /**
     * 删除当前菜单项
     */
    CreateOrEditWechatMenuComponent.prototype.removeCurrentMenuItem = function () {
        this.currentMenuItem.component.removeMenu(this.currentMenuItem);
        this.currentMenuItem = null;
    };
    /**
     * 移动菜单
     * @param direction 移动方向， left:左移 right:右移  up:上移 down:下移
     */
    CreateOrEditWechatMenuComponent.prototype.moveMenuItem = function (direction) {
        this.currentMenuItem.component.moveMenuItem(this.currentMenuItem, direction);
    };
    /**
     * 重置数据
     */
    CreateOrEditWechatMenuComponent.prototype.resetDatas = function () {
        this.menuList = [];
        this.currentMenuItem = null;
    };
    CreateOrEditWechatMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-create-or-edit-wechat-menu',
            templateUrl: './create-or-edit-wechat-menu.component.html',
            styleUrls: ['./create-or-edit-wechat-menu.component.less'],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            router_1.ActivatedRoute,
            abc_1.ReuseTabService,
            service_proxies_1.WechatMenuAppSeviceServiceProxy])
    ], CreateOrEditWechatMenuComponent);
    return CreateOrEditWechatMenuComponent;
}(component_base_1.AppComponentBase));
exports.CreateOrEditWechatMenuComponent = CreateOrEditWechatMenuComponent;
