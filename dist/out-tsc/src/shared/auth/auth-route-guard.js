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
var app_session_service_1 = require("@shared/session/app-session.service");
var router_1 = require("@angular/router");
var permission_service_1 = require("./permission.service");
var AppRouteGuard = /** @class */ (function () {
    function AppRouteGuard(_permissionChecker, _router, _sessionService) {
        this._permissionChecker = _permissionChecker;
        this._router = _router;
        this._sessionService = _sessionService;
    }
    AppRouteGuard.prototype.canActivate = function (route, state) {
        if (!this._sessionService.user) {
            this._router.navigate(['/account/login']);
            return false;
        }
        if (!route.data || !route.data['permission']) {
            return true;
        }
        if (this._permissionChecker.isGranted(route.data['permission'])) {
            return true;
        }
        this._router.navigate([this.selectBestRoute()]);
        return false;
    };
    AppRouteGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    AppRouteGuard.prototype.selectBestRoute = function () {
        // if (!this._sessionService.user) {
        //   return '/account/login';
        // }
        // if (this._permissionChecker.isGranted('Pages.Users')) {
        //   return '/app/admin/users';
        // }
        return '/app/home';
    };
    AppRouteGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [permission_service_1.PermissionService,
            router_1.Router,
            app_session_service_1.AppSessionService])
    ], AppRouteGuard);
    return AppRouteGuard;
}());
exports.AppRouteGuard = AppRouteGuard;
