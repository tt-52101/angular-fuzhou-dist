"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var component_base_1 = require("@shared/component-base");
var TimeZoneComboComponent = /** @class */ (function (_super) {
    __extends(TimeZoneComboComponent, _super);
    function TimeZoneComboComponent(_timingService, injector) {
        var _this = _super.call(this, injector) || this;
        _this._timingService = _timingService;
        _this.selectedTimeZoneChange = new core_1.EventEmitter();
        _this.timeZones = [];
        _this.selectedTimeZone = undefined;
        return _this;
    }
    TimeZoneComboComponent.prototype.ngOnInit = function () {
        var self = this;
        self._timingService.getTimezones(self.defaultTimezoneScope).subscribe(function (result) {
            self.timeZones = result.items;
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TimeZoneComboComponent.prototype, "selectedTimeZoneChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TimeZoneComboComponent.prototype, "selectedTimeZone", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TimeZoneComboComponent.prototype, "defaultTimezoneScope", void 0);
    TimeZoneComboComponent = __decorate([
        core_1.Component({
            selector: 'timezone-combo',
            template: "<nz-select [(ngModel)]=\"selectedTimeZone\" (ngModelChange)=\"selectedTimeZoneChange.emit($event)\">\n        <nz-option *ngFor=\"let timeZone of timeZones\" [nzLabel]=\"timeZone.name\" [nzValue]=\"timeZone.value\"></nz-option>\n    </nz-select>"
        }),
        __metadata("design:paramtypes", [service_proxies_1.TimingServiceProxy,
            core_1.Injector])
    ], TimeZoneComboComponent);
    return TimeZoneComboComponent;
}(component_base_1.AppComponentBase));
exports.TimeZoneComboComponent = TimeZoneComboComponent;
