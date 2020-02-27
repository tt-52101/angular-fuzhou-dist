"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var hmr_1 = require("@angularclass/hmr");
var ng_zorro_antd_1 = require("ng-zorro-antd");
exports.hmrBootstrap = function (module, bootstrap) {
    var ngModule;
    module.hot.accept();
    bootstrap().then(function (mod) { return (ngModule = mod); });
    module.hot.dispose(function () {
        var appRef = ngModule.injector.get(core_1.ApplicationRef);
        var modalService = ngModule.injector.get(ng_zorro_antd_1.NzModalService, null);
        if (modalService)
            modalService.closeAll();
        var elements = appRef.components.map(function (c) { return c.location.nativeElement; });
        var makeVisible = hmr_1.createNewHosts(elements);
        ngModule.destroy();
        makeVisible();
    });
};
