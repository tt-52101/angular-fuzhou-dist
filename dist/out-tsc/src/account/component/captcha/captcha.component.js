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
var forms_1 = require("@angular/forms");
var AppConsts_1 = require("abpPro/AppConsts");
var app_session_service_1 = require("@shared/session/app-session.service");
var CaptchaComponent = /** @class */ (function () {
    function CaptchaComponent(appSession) {
        this.appSession = appSession;
        this._value = '';
        this.onModelChange = function () { };
    }
    CaptchaComponent_1 = CaptchaComponent;
    Object.defineProperty(CaptchaComponent.prototype, "key", {
        /**
         * 验证码key
         */
        set: function (val) {
            this._key = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CaptchaComponent.prototype, "value", {
        /**
         * 输入的验证码的值
         */
        get: function () {
            return this._value;
        },
        /**
         * 输入的验证码的值
         */
        set: function (val) {
            this._value = val;
            if (this.onModelChange) {
                this.onModelChange(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    CaptchaComponent.prototype.ngOnInit = function () { };
    CaptchaComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.value = obj;
        }
    };
    CaptchaComponent.prototype.registerOnChange = function (fn) {
        // 页面值改变时，调用该方法，传入新值实现回传
        this.onModelChange = fn;
    };
    CaptchaComponent.prototype.registerOnTouched = function (fn) { };
    CaptchaComponent.prototype.setDisabledState = function (isDisabled) { };
    /**
     * 初始化验证码图片
     */
    CaptchaComponent.prototype.initImg = function () {
        if (!this._key || this._key === '' || this.captchaUrl || this.checkKey()) {
            return;
        }
        this.clearimg();
    };
    /**
     * 清空图片
     */
    CaptchaComponent.prototype.clearimg = function () {
        if (!this._key || this._key === '') {
            // 未输入验证码key
            return;
        }
        var tid = this.appSession.tenantId;
        if (!tid) {
            tid = '';
        }
        this._oldKey = this._key;
        var timestamp = new Date().getTime();
        this.captchaUrl = AppConsts_1.AppConsts.remoteServiceBaseUrl + "/api/Verification/GenerateCaptcha?name=" + this._key + "&t=" + this.type + "&tid=" + tid + "&timestamp=" + timestamp;
    };
    /**
     * 检查验证码请求key是否相等
     */
    CaptchaComponent.prototype.checkKey = function () {
        // 如果 _oldKey 不为空,并且 _oldKey 不等于key，那么表示是新key
        return this._oldKey && this._oldKey === this._key;
    };
    var CaptchaComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CaptchaComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaptchaComponent.prototype, "captchaUrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], CaptchaComponent.prototype, "key", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaptchaComponent.prototype, "placeholder", void 0);
    CaptchaComponent = CaptchaComponent_1 = __decorate([
        core_1.Component({
            selector: 'yoyo-captcha',
            templateUrl: './captcha.component.html',
            styles: [],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return CaptchaComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [app_session_service_1.AppSessionService])
    ], CaptchaComponent);
    return CaptchaComponent;
}());
exports.CaptchaComponent = CaptchaComponent;
