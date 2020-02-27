"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlHelper = /** @class */ (function () {
    function UrlHelper() {
    }
    UrlHelper.getQueryParameters = function () {
        return UrlHelper.getQueryParametersUsingParameters(document.location.search);
    };
    UrlHelper.getQueryParametersUsingParameters = function (search) {
        return search.replace(/(^\?)/, '').split('&').map(function (n) { return n = n.split('='), this[n[0]] = n[1], this; }.bind({}))[0];
    };
    UrlHelper.getQueryParametersUsingHash = function () {
        return document.location.hash.substr(1, document.location.hash.length - 1).replace(/(^\?)/, '').split('&').map(function (n) { return n = n.split('='), this[n[0]] = n[1], this; }.bind({}))[0];
    };
    UrlHelper.getInitialUrlParameters = function () {
        var questionMarkIndex = UrlHelper.initialUrl.indexOf('?');
        if (questionMarkIndex >= 0) {
            return UrlHelper.initialUrl.substr(questionMarkIndex, UrlHelper.initialUrl.length - questionMarkIndex);
        }
        return '';
    };
    UrlHelper.getReturnUrl = function () {
        var queryStringObj = UrlHelper.getQueryParametersUsingParameters(UrlHelper.getInitialUrlParameters());
        if (queryStringObj.returnUrl) {
            return decodeURIComponent(queryStringObj.returnUrl);
        }
        return null;
    };
    // static getSingleSignIn(): boolean {
    //     const queryStringObj = UrlHelper.getQueryParametersUsingParameters(UrlHelper.getInitialUrlParameters());
    //     if (queryStringObj.ss) {
    //         return queryStringObj.ss;
    //     }
    //     return false;
    // }
    UrlHelper.isInstallUrl = function (url) {
        return url && url.indexOf('app/admin/install') >= 0;
    };
    /**
     * The URL requested, before initial routing.
     */
    UrlHelper.initialUrl = location.href;
    return UrlHelper;
}());
exports.UrlHelper = UrlHelper;
