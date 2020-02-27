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
var AppConsts_1 = require("abpPro/AppConsts");
var component_base_1 = require("@shared/component-base");
var operators_1 = require("rxjs/operators");
var CommonLookupComponent = /** @class */ (function (_super) {
    __extends(CommonLookupComponent, _super);
    function CommonLookupComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.itemSelected = new core_1.EventEmitter();
        _this.isShown = false;
        _this.isInitialized = false;
        _this.filterText = '';
        _this.dataItems = [];
        return _this;
    }
    CommonLookupComponent.prototype.selectItem = function (item) {
        var _this = this;
        var boolOrPromise = this.options.canSelect(item);
        if (!boolOrPromise) {
            return;
        }
        if (boolOrPromise === true) {
            this.itemSelected.emit(item);
            this.success(item);
            return;
        }
        // assume as observable
        boolOrPromise.subscribe(function (result) {
            if (result) {
                _this.itemSelected.emit(item);
                _this.success(item);
            }
        });
    };
    CommonLookupComponent.prototype.delete = function (entity) { };
    CommonLookupComponent.prototype.getDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this.options
            .dataSource(request.skipCount, request.maxResultCount, this.filterText, this.tenantId)
            .pipe(operators_1.finalize(function () {
            finishedCallback();
        }))
            .subscribe(function (result) {
            _this.dataItems = result.items;
            _this.showPaging(result);
        });
    };
    CommonLookupComponent.defaultOptions = {
        dataSource: null,
        canSelect: function () { return true; },
        loadOnStartup: true,
        isFilterEnabled: true,
        pageSize: AppConsts_1.AppConsts.grid.defaultPageSize
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommonLookupComponent.prototype, "itemSelected", void 0);
    CommonLookupComponent = __decorate([
        core_1.Component({
            selector: 'app-common-lookup',
            templateUrl: './common-lookup.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], CommonLookupComponent);
    return CommonLookupComponent;
}(component_base_1.ModalPagedListingComponentBase));
exports.CommonLookupComponent = CommonLookupComponent;
