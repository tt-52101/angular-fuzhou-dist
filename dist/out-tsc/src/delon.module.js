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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 进一步对基础模块的导入提炼
 * 有关模块注册指导原则请参考：https://github.com/ng-alain/ng-alain/issues/180
 */
var core_1 = require("@angular/core");
var module_import_guard_1 = require("@shared/module-import-guard");
var theme_1 = require("@delon/theme");
var abc_1 = require("@delon/abc");
var chart_1 = require("@delon/chart");
var acl_1 = require("@delon/acl");
var cache_1 = require("@delon/cache");
var util_1 = require("@delon/util");
// #region reuse-tab
/**
 * 若需要[路由复用](https://ng-alain.com/components/reuse-tab)需要：
 * 1、增加 `REUSETAB_PROVIDES`
 * 2、在 `src/app/layout/default/default.component.html` 修改：
 *  ```html
 *  <section class="alain-pro__content">
 *    <reuse-tab></reuse-tab>
 *    <router-outlet></router-outlet>
 *  </section>
 *  ```
 */
var router_1 = require("@angular/router");
var reuse_tab_1 = require("@delon/abc/reuse-tab");
var REUSETAB_PROVIDES = [
    {
        provide: router_1.RouteReuseStrategy,
        useClass: reuse_tab_1.ReuseTabStrategy,
        deps: [reuse_tab_1.ReuseTabService],
    },
];
// #endregion
// #region global config functions
var abc_2 = require("@delon/abc");
function fnPageHeaderConfig() {
    return Object.assign(new abc_2.PageHeaderConfig(), { homeI18n: '系统' });
}
exports.fnPageHeaderConfig = fnPageHeaderConfig;
function fnSTConfig() {
    return Object.assign(new abc_1.STConfig(), {
        modal: { size: 'lg' },
    });
}
exports.fnSTConfig = fnSTConfig;
var GLOBAL_CONFIG_PROVIDES = [
    // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `st` 的页码默认为 `20` 行
    { provide: abc_1.STConfig, useFactory: fnSTConfig },
    { provide: abc_2.PageHeaderConfig, useFactory: fnPageHeaderConfig },
];
// #endregion
var DelonModule = /** @class */ (function () {
    function DelonModule(parentModule) {
        module_import_guard_1.throwIfAlreadyLoaded(parentModule, 'DelonModule');
    }
    DelonModule_1 = DelonModule;
    DelonModule.forRoot = function () {
        return {
            ngModule: DelonModule_1,
            providers: __spreadArrays(REUSETAB_PROVIDES, GLOBAL_CONFIG_PROVIDES),
        };
    };
    var DelonModule_1;
    DelonModule = DelonModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                theme_1.AlainThemeModule.forRoot(),
                abc_1.DelonABCModule,
                chart_1.DelonChartModule,
                acl_1.DelonACLModule.forRoot(),
                cache_1.DelonCacheModule,
                util_1.DelonUtilModule,
            ],
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [DelonModule])
    ], DelonModule);
    return DelonModule;
}());
exports.DelonModule = DelonModule;
