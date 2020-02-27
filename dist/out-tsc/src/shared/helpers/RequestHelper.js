"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var RequestHelper = /** @class */ (function () {
    function RequestHelper() {
    }
    /**
     * 创建请求头
     */
    RequestHelper.createHttpHeaders = function () {
        var modifiedHeaders = new http_1.HttpHeaders();
        modifiedHeaders.append("Pragma", "no-cache");
        modifiedHeaders.append("Cache-Control", "no-cache");
        modifiedHeaders.append("Expires", "Sat, 01 Jan 2000 00:00:00 GMT");
        modifiedHeaders = this.addXRequestedWithHeader(modifiedHeaders);
        modifiedHeaders = this.addAuthorizationHeaders(modifiedHeaders);
        modifiedHeaders = this.addAspNetCoreCultureHeader(modifiedHeaders);
        modifiedHeaders = this.addAcceptLanguageHeader(modifiedHeaders);
        modifiedHeaders = this.addTenantIdHeader(modifiedHeaders);
        return modifiedHeaders;
    };
    /**
     * 创建请求
     * @param httpClient
     * @param url 地址
     * @param methad 请求方式, GET\POST\PUT\DELETE,默认值get
     * @param formDate formDate
     * @param headers 请求头
     */
    RequestHelper.createRequest = function (httpClient, url, methad, formDate, headers) {
        debugger;
        if (!headers) {
            headers = RequestHelper.createHttpHeaders();
        }
        if (!methad) {
            methad = 'GET';
        }
        var request = new http_1.HttpRequest(methad, url, formDate, {
            headers: headers
        });
        return httpClient.request(request);
    };
    RequestHelper.addXRequestedWithHeader = function (headers) {
        if (headers) {
            headers = headers.set('X-Requested-With', 'XMLHttpRequest');
        }
        return headers;
    };
    RequestHelper.addAspNetCoreCultureHeader = function (headers) {
        var cookieLangValue = abp.utils.getCookieValue("Abp.Localization.CultureName");
        if (cookieLangValue && headers && !headers.has('.AspNetCore.Culture')) {
            headers = headers.set('.AspNetCore.Culture', cookieLangValue);
        }
        return headers;
    };
    RequestHelper.addAcceptLanguageHeader = function (headers) {
        var cookieLangValue = abp.utils.getCookieValue("Abp.Localization.CultureName");
        if (cookieLangValue && headers && !headers.has('Accept-Language')) {
            headers = headers.set('Accept-Language', cookieLangValue);
        }
        return headers;
    };
    RequestHelper.addTenantIdHeader = function (headers) {
        var cookieTenantIdValue = abp.utils.getCookieValue('Abp.TenantId');
        if (cookieTenantIdValue && headers && !headers.has('Abp.TenantId')) {
            headers = headers.set('Abp.TenantId', cookieTenantIdValue);
        }
        return headers;
    };
    RequestHelper.addAuthorizationHeaders = function (headers) {
        var authorizationHeaders = headers ? headers.getAll('Authorization') : null;
        if (!authorizationHeaders) {
            authorizationHeaders = [];
        }
        if (!this.itemExists(authorizationHeaders, function (item) { return item.indexOf('Bearer ') == 0; })) {
            var token = abp.auth.getToken();
            if (headers && token) {
                headers = headers.set('Authorization', 'Bearer ' + token);
            }
        }
        return headers;
    };
    RequestHelper.itemExists = function (items, predicate) {
        for (var i = 0; i < items.length; i++) {
            if (predicate(items[i])) {
                return true;
            }
        }
        return false;
    };
    return RequestHelper;
}());
exports.RequestHelper = RequestHelper;
