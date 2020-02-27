"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConsts_1 = require("abpPro/AppConsts");
var utils_service_1 = require("@abp/utils/utils.service");
var SignalRAspNetCoreHelper = /** @class */ (function () {
    function SignalRAspNetCoreHelper() {
    }
    SignalRAspNetCoreHelper.initSignalR = function (callback) {
        var encryptedAuthToken = new utils_service_1.UtilsService().getCookieValue(AppConsts_1.AppConsts.authorization.encrptedAuthTokenName);
        abp.signalr = {
            autoConnect: true,
            connect: undefined,
            hubs: undefined,
            qs: AppConsts_1.AppConsts.authorization.encrptedAuthTokenName +
                '=' +
                encodeURIComponent(encryptedAuthToken),
            remoteServiceBaseUrl: AppConsts_1.AppConsts.remoteServiceBaseUrl,
            startConnection: undefined,
            url: '/signalr'
        };
        var script = document.createElement('script');
        script.onload = function () {
            callback();
        };
        script.src =
            AppConsts_1.AppConsts.appBaseUrl + '/assets/abp-web-resources/abp.signalr-client.js';
        document.head.appendChild(script);
    };
    return SignalRAspNetCoreHelper;
}());
exports.SignalRAspNetCoreHelper = SignalRAspNetCoreHelper;
