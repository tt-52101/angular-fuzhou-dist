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
Object.defineProperty(exports, "__esModule", { value: true });
var ng_zorro_antd_1 = require("ng-zorro-antd");
var app_component_base_1 = require("@shared/component-base/app-component-base");
/**
 *
 *基于模态框弹出 Form表单提交的基类信息
 */
var ModalComponentBase = /** @class */ (function (_super) {
    __extends(ModalComponentBase, _super);
    /**
     * 构造函数
     * @param injector 注入器
     * @param _nzModalRef nzModal 模态框关闭、销毁等处理帮助，只能在modal中打开的组件中注入，非modal打开的组件注入null即可，否则报错。因为nzModalRef是建立在nzModalComponent之上的。
     */
    function ModalComponentBase(injector) {
        var _this = _super.call(this, injector) || this;
        _this.title = '';
        _this.nzModalRef = injector.get(ng_zorro_antd_1.NzModalRef);
        return _this;
    }
    /**
     * 带参数回传关闭
     * @param result 回传参数
     */
    ModalComponentBase.prototype.success = function (result) {
        if (result === void 0) { result = true; }
        if (result) {
            this.nzModalRef.close(result);
        }
        else {
            this.close();
        }
    };
    ModalComponentBase.prototype.close = function ($event) {
        this.nzModalRef.close();
    };
    return ModalComponentBase;
}(app_component_base_1.AppComponentBase));
exports.ModalComponentBase = ModalComponentBase;
