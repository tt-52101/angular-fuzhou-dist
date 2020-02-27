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
// tslint:disable-next-line:max-line-length
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var operators_1 = require("rxjs/operators");
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var CreateOrEditOrganiaztionUnitComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditOrganiaztionUnitComponent, _super);
    function CreateOrEditOrganiaztionUnitComponent(injector, organizationUnitService) {
        var _this = _super.call(this, injector) || this;
        _this.organizationUnitService = organizationUnitService;
        _this.organizationUnit = {};
        return _this;
    }
    CreateOrEditOrganiaztionUnitComponent.prototype.ngOnInit = function () { };
    CreateOrEditOrganiaztionUnitComponent.prototype.save = function () {
        if (this.organizationUnit.id) {
            this.updateUnit();
        }
        else {
            // 创建
            this.createUnit();
        }
    };
    CreateOrEditOrganiaztionUnitComponent.prototype.updateUnit = function () {
        var _this = this;
        // 编辑
        var updateInput = new service_proxies_1.UpdateOrganizationUnitInput();
        updateInput.id = this.organizationUnit.id;
        updateInput.displayName = this.organizationUnit.displayName;
        this.saving = true;
        this.organizationUnitService
            .update(updateInput)
            .pipe(operators_1.finalize(function () { return (_this.saving = false); }))
            .subscribe(function (result) {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(result);
        });
    };
    CreateOrEditOrganiaztionUnitComponent.prototype.createUnit = function () {
        var _this = this;
        // 创建
        var input = new service_proxies_1.CreateOrganizationUnitInput();
        input.parentId = this.organizationUnit.parentId;
        input.displayName = this.organizationUnit.displayName;
        this.saving = true;
        this.organizationUnitService
            .create(input)
            .pipe(operators_1.finalize(function () { return (_this.saving = false); }))
            .subscribe(function (result) {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(result);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CreateOrEditOrganiaztionUnitComponent.prototype, "organizationUnit", void 0);
    CreateOrEditOrganiaztionUnitComponent = __decorate([
        core_1.Component({
            selector: 'app-create-or-edit-organiaztion-unit',
            templateUrl: './create-or-edit-organiaztion-unit.component.html',
            styles: [],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.OrganizationUnitServiceProxy])
    ], CreateOrEditOrganiaztionUnitComponent);
    return CreateOrEditOrganiaztionUnitComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditOrganiaztionUnitComponent = CreateOrEditOrganiaztionUnitComponent;
