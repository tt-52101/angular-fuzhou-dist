"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageExtension = /** @class */ (function () {
    function MessageExtension() {
    }
    /**
     * 覆盖abp.message替换为ng-zorro的全局message
     * @param _nzMessageService
     * @param _nzModalService
     */
    MessageExtension.overrideAbpMessageByMini = function (_nzMessageService, _nzModalService) {
        if (_nzModalService) {
            if (abp.nzModal) {
                return;
            }
            abp.nzModal = _nzModalService;
        }
        if (abp.nzMessage) {
            return;
        }
        abp.nzMessage = _nzMessageService;
        abp.message.info = function (message, title) {
            //   const timingCounts = parseInt(title, 0);
            // (<any>abp).nzMessage.info(message, { nzDuration: timingCounts });
            abp.nzMessage.info(message);
        };
        abp.message.warn = function (message, title) {
            abp.nzMessage.warning(message);
        };
        abp.message.error = function (message, title) {
            abp.nzMessage.error(message);
        };
        abp.message.success = function (message, title) {
            abp.nzMessage.success(message);
        };
        abp.message.confirm = this.confirm;
    };
    /**
     * 覆盖abp.message替换为ng-zorro的模态框
     * @param _nzModalService
     */
    MessageExtension.overrideAbpMessageByNgModal = function (_nzModalService) {
        if (abp.nzModal) {
            return;
        }
        abp.nzModal = _nzModalService;
        abp.message.info = function (message, title) {
            abp.nzModal.info({
                nzTitle: title,
                nzContent: message,
                nzMask: true,
            });
        };
        abp.message.warn = function (message, title) {
            abp.nzModal.warning({
                nzTitle: title,
                nzContent: message,
                nzMask: true,
            });
        };
        abp.message.error = function (message, title) {
            abp.nzModal.error({
                nzTitle: title,
                nzContent: message,
                nzMask: true,
            });
        };
        abp.message.success = function (message, title) {
            abp.nzModal.success({
                nzTitle: title,
                nzContent: message,
                nzMask: true,
            });
        };
        abp.message.confirm = this.confirm;
    };
    // 覆盖abp.message替换为ng-zorro的notify
    MessageExtension.overrideAbpNotify = function (_nzNotificationService) {
        if (abp.nzNotify) {
            return;
        }
        abp.nzNotify = _nzNotificationService;
        abp.notify.info = function (message, title, options) {
            abp.nzNotify.info(message, title, options);
        };
        abp.notify.warn = function (message, title, options) {
            abp.nzNotify.warning(message, title, options);
        };
        abp.notify.error = function (message, title, options) {
            abp.nzNotify.error(message, title, options);
        };
        abp.notify.success = function (message, title, options) {
            abp.nzNotify.success(message, title, options);
        };
    };
    MessageExtension.confirm = function (message, titleOrCallBack, callback) {
        if (typeof titleOrCallBack === 'string') {
            abp.nzModal.confirm({
                nzTitle: titleOrCallBack,
                nzContent: message,
                nzOnOk: function () {
                    if (callback)
                        callback(true);
                },
                nzOnCancel: function () {
                    if (callback)
                        callback(false);
                },
            });
        }
        else {
            abp.nzModal.confirm({
                nzTitle: abp.localization.localize('MessageConfirmOperation', abp.localization.defaultSourceName),
                nzContent: message,
                nzOnOk: function () {
                    if (titleOrCallBack)
                        titleOrCallBack(true);
                },
                nzOnCancel: function () {
                    if (titleOrCallBack)
                        titleOrCallBack(false);
                },
            });
        }
    };
    return MessageExtension;
}());
exports.MessageExtension = MessageExtension;
