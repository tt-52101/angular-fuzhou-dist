"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppConsts_1 = require("abpPro/AppConsts");
var FileDownloadService = /** @class */ (function () {
    function FileDownloadService() {
    }
    FileDownloadService.prototype.downloadTempFile = function (file) {
        var url = AppConsts_1.AppConsts.remoteServiceBaseUrl + "/File/DownloadTempFile?fileType=" + file.fileType + "&fileToken=" + file.fileToken + "&fileName=" + file.fileName;
        location.href = url; // TODO: 这将导致在Firefox中重新加载相同的页面,需要等待修复
    };
    FileDownloadService = __decorate([
        core_1.Injectable()
    ], FileDownloadService);
    return FileDownloadService;
}());
exports.FileDownloadService = FileDownloadService;
