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
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var theme_1 = require("@delon/theme");
var theme_2 = require("@delon/theme");
theme_2.preloaderFinished();
var RootComponent = /** @class */ (function () {
    function RootComponent(_modalService, _messageService, _notifyService, el, renderer, router, titleSrv) {
        this._modalService = _modalService;
        this._messageService = _messageService;
        this._notifyService = _notifyService;
        this.renderer = renderer;
        this.router = router;
        this.titleSrv = titleSrv;
        renderer.setAttribute(el.nativeElement, 'ng-alain-version', theme_1.VERSION.full);
        renderer.setAttribute(el.nativeElement, 'ng-zorro-version', ng_zorro_antd_1.VERSION.full);
    }
    RootComponent.prototype.ngOnInit = function () {
        //  设置标题
        // this.titleSrv.prefix = 'Yozeev';
        var _this = this;
        // console.log(this.titleSrv)
        this.router.events
            .pipe(operators_1.filter(function (evt) { return evt instanceof router_1.NavigationEnd; }))
            .subscribe(function () {
            _this.titleSrv.setTitle();
            _this._modalService.closeAll();
        });
    };
    RootComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: "\n  <router-outlet></router-outlet>\n  "
        }),
        __metadata("design:paramtypes", [ng_zorro_antd_1.NzModalService,
            ng_zorro_antd_1.NzMessageService,
            ng_zorro_antd_1.NzNotificationService,
            core_1.ElementRef,
            core_1.Renderer2,
            router_1.Router,
            theme_1.TitleService])
    ], RootComponent);
    return RootComponent;
}());
exports.RootComponent = RootComponent;
