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
var operators_1 = require("rxjs/operators");
var create_or_edit_edition_component_1 = require("./create-or-edit-edition/create-or-edit-edition.component");
var EditionsComponent = /** @class */ (function (_super) {
    __extends(EditionsComponent, _super);
    function EditionsComponent(injector, _editionService) {
        var _this = _super.call(this, injector) || this;
        _this._editionService = _editionService;
        return _this;
    }
    EditionsComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    EditionsComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._editionService.getEditions()
            .pipe(operators_1.finalize(function () {
            finishedCallback();
        })).subscribe(function (result) {
            _this.dataList = result.items;
        });
    };
    EditionsComponent.prototype.batchDelete = function () {
    };
    EditionsComponent.prototype.create = function () {
        var _this = this;
        this.modalHelper.static(create_or_edit_edition_component_1.CreateOrEditEditionComponent)
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    EditionsComponent.prototype.edit = function (entityId) {
        var _this = this;
        this.modalHelper.static(create_or_edit_edition_component_1.CreateOrEditEditionComponent, { editionId: entityId })
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    EditionsComponent.prototype.delete = function (entity) {
        var _this = this;
        this.message.confirm(this.l('EditionDeleteWarningMessage', entity.displayName), function (isConfirmed) {
            if (isConfirmed) {
                _this._editionService.deleteEdition(entity.id).subscribe(function () {
                    _this.refresh();
                    _this.notify.success(_this.l('SuccessfullyDeleted'));
                });
            }
        });
    };
    /**
   * 强制刷新
   */
    EditionsComponent.prototype.forceRefresh = function () {
        this.refreshGoFirstPage();
    };
    EditionsComponent = __decorate([
        core_1.Component({
            selector: 'app-editions',
            templateUrl: './editions.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.EditionServiceProxy])
    ], EditionsComponent);
    return EditionsComponent;
}(component_base_1.PagedListingComponentBase));
exports.EditionsComponent = EditionsComponent;
