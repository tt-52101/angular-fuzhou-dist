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
var router_1 = require("@angular/router");
var theme_1 = require("@delon/theme");
var abc_1 = require("@delon/abc");
var SHOWCLS = 'nav-floating-show';
var FLOATINGCLS = 'nav-floating';
var YoYoSidebarNavComponent = /** @class */ (function () {
    function YoYoSidebarNavComponent(menuService, settings, reuseTabService, cd, router) {
        this.menuService = menuService;
        this.settings = settings;
        this.reuseTabService = reuseTabService;
        this.cd = cd;
        this.router = router;
        this.list = [];
        this.click(null);
        this.reuseTabService.mode = 2; //路由复用模式设置
    }
    YoYoSidebarNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.change$ = this.menuService.change.subscribe(function (res) {
            // console.log(this)
            _this.list = res;
            _this.processMenuOpen(_this.reuseTabService.curUrl, _this.list);
            _this.cd.detectChanges();
        });
        this.change$.add(this.settings.notify.subscribe(function (_) { return _this.cd.detectChanges(); }));
    };
    Object.defineProperty(YoYoSidebarNavComponent.prototype, "collapsed", {
        get: function () {
            return this.settings.layout.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    YoYoSidebarNavComponent.prototype.hasChildren = function (item) {
        if (item.childrens && item.childrens.length > 0) {
            return true;
        }
        return false;
    };
    /**
     * 处理菜单展开状态
     */
    YoYoSidebarNavComponent.prototype.processMenuOpen = function (currentUrl, menus, parentMenu) {
        var _this = this;
        menus.forEach(function (item) {
            if (parentMenu && item.link === currentUrl) {
                parentMenu._open = true;
            }
            if (item.childrens && item.childrens.length > 0) {
                _this.processMenuOpen(currentUrl, item.childrens, item);
            }
        });
    };
    Object.defineProperty(YoYoSidebarNavComponent.prototype, "isPad", {
        get: function () {
            return window.innerWidth < 768;
        },
        enumerable: true,
        configurable: true
    });
    YoYoSidebarNavComponent.prototype.click = function (item) {
        if (item) {
            console.log(item);
            sessionStorage.setItem('curmenupower', item.operationNames);
            sessionStorage.setItem('isAllOperation', item.isAllOperation);
        }
        if (this.isPad && !this.collapsed) {
            this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
        }
    };
    YoYoSidebarNavComponent.prototype.ngOnDestroy = function () {
        if (this.change$) {
            this.change$.unsubscribe();
        }
    };
    YoYoSidebarNavComponent = __decorate([
        core_1.Component({
            selector: 'yoyo-sidebar-nav',
            templateUrl: './yoyo-sidebar-nav.component.html',
            styleUrls: ['./yoyo-sidebar-nav.component.less'],
            host: {
                '[class.alain-pro__side-nav]': 'true',
            },
            changeDetection: core_1.ChangeDetectionStrategy.Default,
            preserveWhitespaces: false,
        }),
        __metadata("design:paramtypes", [theme_1.MenuService,
            theme_1.SettingsService,
            abc_1.ReuseTabService,
            core_1.ChangeDetectorRef,
            router_1.Router])
    ], YoYoSidebarNavComponent);
    return YoYoSidebarNavComponent;
}());
exports.YoYoSidebarNavComponent = YoYoSidebarNavComponent;
