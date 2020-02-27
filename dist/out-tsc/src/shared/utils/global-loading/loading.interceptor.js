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
var loading_service_1 = require("./loading.service");
var operators_1 = require("rxjs/operators");
var LoadingInterceptor = /** @class */ (function () {
    function LoadingInterceptor(loadingOverlayService) {
        this.loadingOverlayService = loadingOverlayService;
    }
    LoadingInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        this.loadingOverlayService.show();
        return next.handle(req).pipe(operators_1.finalize(function () {
            setTimeout(function () {
                _this.loadingOverlayService.hide();
            }, 500);
        }));
        // return next.handle(req);
    };
    LoadingInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [loading_service_1.LoadingService])
    ], LoadingInterceptor);
    return LoadingInterceptor;
}());
exports.LoadingInterceptor = LoadingInterceptor;
