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
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var overlay_component_1 = require("./overlay/overlay.component");
var LoadingService = /** @class */ (function () {
    function LoadingService(overlay, injector) {
        this.overlay = overlay;
        this.injector = injector;
        this.showLoading = false;
    }
    LoadingService_1 = LoadingService;
    LoadingService.include = function (componentType) {
        if (!LoadingService_1.appliedComponents.includes(componentType)) {
            LoadingService_1.appliedComponents.push(componentType);
        }
    };
    LoadingService.prototype.show = function (message, target) {
        if (message === void 0) { message = ''; }
        if (!this.showLoading) {
            var config = new overlay_1.OverlayConfig();
            if (target) {
                config.positionStrategy = this.overlay
                    .position()
                    .flexibleConnectedTo(target.element)
                    .withPositions([
                    {
                        originY: 'center',
                        originX: 'center',
                        overlayX: 'start',
                        overlayY: 'top'
                    }
                ]);
            }
            else {
                config.positionStrategy = this.overlay
                    .position()
                    .global()
                    .centerHorizontally() // 水平居中
                    .centerVertically();
            }
            config.hasBackdrop = true;
            this.overlayRef = this.overlay.create(config); // OverlayRef, overlay层
            this.overlayRef.attach(new portal_1.ComponentPortal(overlay_component_1.OverlayComponent, target));
            this.showLoading = true;
        }
    };
    LoadingService.prototype.hide = function () {
        if (this.showLoading) {
            this.overlayRef.dispose();
            this.showLoading = false;
        }
    };
    var LoadingService_1;
    LoadingService = LoadingService_1 = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [overlay_1.Overlay, core_1.Injector])
    ], LoadingService);
    return LoadingService;
}());
exports.LoadingService = LoadingService;
// export const LoadingServiceProvider: FactoryProvider = {
//   provide: LoadingService,
//   useFactory: (overlay) => new LoadingService(overlay),
//   deps: [Overlay]
// }
