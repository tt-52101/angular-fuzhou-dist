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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var util_1 = require("@delon/util");
var theme_1 = require("@delon/theme");
// #region icons
var icons_1 = require("@ant-design/icons-angular/icons");
var ICONS = [
    icons_1.MenuFoldOutline,
    icons_1.MenuUnfoldOutline,
    icons_1.SearchOutline,
    icons_1.SettingOutline,
    icons_1.FullscreenOutline,
    icons_1.FullscreenExitOutline,
    icons_1.BellOutline,
    icons_1.LockOutline,
    icons_1.PlusOutline,
    icons_1.UserOutline,
    icons_1.LogoutOutline,
    icons_1.EllipsisOutline,
    icons_1.GlobalOutline,
    icons_1.ArrowDownOutline,
    // Optional
    icons_1.GithubOutline,
    icons_1.AppstoreOutline
];
var component_base_1 = require("@shared/component-base");
var SignalRAspNetCoreHelper_1 = require("@shared/helpers/SignalRAspNetCoreHelper");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var LayoutDefaultComponent = /** @class */ (function (_super) {
    __extends(LayoutDefaultComponent, _super);
    function LayoutDefaultComponent(injector, iconSrv, router, scroll, menuSrv, settings, el, renderer, doc, _zone, _menuService) {
        var _this = _super.call(this, injector) || this;
        _this.menuSrv = menuSrv;
        _this.settings = settings;
        _this.el = el;
        _this.renderer = renderer;
        _this.doc = doc;
        _this._zone = _zone;
        _this._menuService = _menuService;
        _this.isFetching = false;
        iconSrv.addIcon.apply(iconSrv, ICONS);
        // scroll to top in change page
        router.events.subscribe(function (evt) {
            if (!_this.isFetching && evt instanceof router_1.RouteConfigLoadStart) {
                _this.isFetching = true;
            }
            if (evt instanceof router_1.NavigationError || evt instanceof router_1.NavigationCancel) {
                _this.isFetching = false;
                if (evt instanceof router_1.NavigationError) {
                    _this.message.error("\u65E0\u6CD5\u52A0\u8F7D" + evt.url + "\u8DEF\u7531");
                }
                return;
            }
            if (!(evt instanceof router_1.NavigationEnd)) {
                return;
            }
            setTimeout(function () {
                scroll.scrollToTop();
                _this.isFetching = false;
            }, 100);
        });
        _this._menuService.getMenuTree()
            .subscribe(function (res) {
            // console.log(res)
            // console.log(this.menuSrv)
            _this.menuSrv.add(res);
        });
        return _this;
    }
    Object.defineProperty(LayoutDefaultComponent.prototype, "collapsed", {
        get: function () {
            return this.settings.layout.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    LayoutDefaultComponent.prototype.setClass = function () {
        var _a;
        var _b = this, el = _b.el, renderer = _b.renderer, settings = _b.settings;
        var layout = settings.layout;
        util_1.updateHostClass(el.nativeElement, renderer, (_a = {},
            _a['alain-pro'] = true,
            // [`alain-pro__fixed`]: layout.fixed,
            _a["alain-pro__boxed"] = layout.boxed,
            _a["alain-pro__collapsed"] = layout.collapsed,
            _a), true);
        this.doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
        this.doc.body.classList[layout.theme === undefined || layout.theme === "light" ? 'add' : 'remove']('alain-pro__light');
        this.doc.body.classList[layout.theme === "dark" ? 'add' : 'remove']('alain-pro__dark');
    };
    LayoutDefaultComponent.prototype.ngAfterViewInit = function () { };
    LayoutDefaultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.notify$ = this.settings.notify.subscribe(function (_) { return _this.setClass(); });
        this.setClass();
        // 初始化SignalR连接
        this.initiSignalR();
    };
    LayoutDefaultComponent.prototype.ngOnDestroy = function () {
        this.notify$.unsubscribe();
    };
    LayoutDefaultComponent.prototype.initiSignalR = function () {
        // 连接到signalR
        SignalRAspNetCoreHelper_1.SignalRAspNetCoreHelper.initSignalR(function () { });
    };
    LayoutDefaultComponent = __decorate([
        core_1.Component({
            selector: 'layout-default',
            templateUrl: './layout-default.component.html',
            preserveWhitespaces: false,
            host: {
                '[class.alain-pro]': 'true'
            }
        }),
        __param(8, core_1.Inject(common_1.DOCUMENT)),
        __metadata("design:paramtypes", [core_1.Injector,
            ng_zorro_antd_1.NzIconService,
            router_1.Router,
            theme_1.ScrollService,
            theme_1.MenuService,
            theme_1.SettingsService,
            core_1.ElementRef,
            core_1.Renderer2, Object, core_1.NgZone,
            service_proxies_1.MenuServiceProxy])
    ], LayoutDefaultComponent);
    return LayoutDefaultComponent;
}(component_base_1.AppComponentBase));
exports.LayoutDefaultComponent = LayoutDefaultComponent;
