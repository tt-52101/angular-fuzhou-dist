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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var AppConsts_1 = require("abpPro/AppConsts");
var LocalizationService = /** @class */ (function () {
    function LocalizationService() {
        this.change$ = new rxjs_1.BehaviorSubject(null);
    }
    LocalizationService.prototype.use = function (lang, emit) { };
    LocalizationService.prototype.getLangs = function () {
        return this.langs;
    };
    Object.defineProperty(LocalizationService.prototype, "change", {
        get: function () {
            return this.change$.asObservable().pipe(operators_1.filter(function (w) { return w != null; }));
        },
        enumerable: true,
        configurable: true
    });
    LocalizationService.prototype.fanyi = function (key, interpolateParams, isSafe) {
        return this.localization(key, null);
    };
    /**
     * ABP的本地化翻译
     * @param key 国际化键值
     * @param sourceName 语言源
     */
    LocalizationService.prototype.localization = function (key, sourceName) {
        sourceName =
            sourceName || AppConsts_1.AppConsts.localization.defaultLocalizationSourceName;
        return abp.localization.localize(key, sourceName);
    };
    /**
     * 填充参数到字符串占位符 如: 你好{0} -> 你好世界
     * @param str 有占位符的模板
     * @param args 参数
     */
    LocalizationService.prototype.formatString = function (str, args) {
        var result = str;
        for (var i = 0; i < args.length; i++) {
            var placeHolder = '{' + i + '}';
            result = this.replaceAll(result, placeHolder, args[i]);
        }
        return result;
    };
    LocalizationService.prototype.replaceAll = function (str, search, replacement) {
        var fix = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return str.replace(new RegExp(fix, 'g'), replacement);
    };
    /**
     * 填充数据
     * @param localization
     */
    LocalizationService.prototype.extend = function (localization) {
        abp.localization.defaultSourceName =
            AppConsts_1.AppConsts.localization.defaultLocalizationSourceName;
        this.languages = localization.languages;
        this.currentLanguage = localization.currentLanguage;
    };
    LocalizationService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], LocalizationService);
    return LocalizationService;
}());
exports.LocalizationService = LocalizationService;
