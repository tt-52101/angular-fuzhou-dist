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
var EditionComboComponent = /** @class */ (function (_super) {
    __extends(EditionComboComponent, _super);
    function EditionComboComponent(_editionService, injector) {
        var _this = _super.call(this, injector) || this;
        _this._editionService = _editionService;
        _this.editions = [];
        _this.selectedEdition = undefined;
        _this.selectedEditionChange = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(EditionComboComponent.prototype, "editionId", {
        set: function (value) {
            this._editionId = value;
            this.autoSelect();
        },
        enumerable: true,
        configurable: true
    });
    EditionComboComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._editionService.getEditionComboboxItems(0, true, false)
            .subscribe(function (editions) {
            _this.editions = editions;
            _this.autoSelect();
        });
    };
    EditionComboComponent.prototype.autoSelect = function () {
        var _this = this;
        if (!this.editions || !this._editionId) {
            return;
        }
        this.selectedEdition = this.editions.find(function (item) {
            return item.value === _this._editionId.toString();
        });
        if (this.selectedEditionChange) {
            this.selectedEditionChange.emit(this.selectedEdition);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditionComboComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", service_proxies_1.SubscribableEditionComboboxItemDto)
    ], EditionComboComponent.prototype, "selectedEdition", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditionComboComponent.prototype, "selectedEditionChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], EditionComboComponent.prototype, "editionId", null);
    EditionComboComponent = __decorate([
        core_1.Component({
            selector: 'edition-combo',
            templateUrl: './edition-combo.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [service_proxies_1.EditionServiceProxy,
            core_1.Injector])
    ], EditionComboComponent);
    return EditionComboComponent;
}(component_base_1.AppComponentBase));
exports.EditionComboComponent = EditionComboComponent;
