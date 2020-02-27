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
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var create_or_edit_component_1 = require("@app/try/test/create-or-edit/create-or-edit.component");
var operators_1 = require("rxjs/operators");
var TestComponent = /** @class */ (function (_super) {
    __extends(TestComponent, _super);
    function TestComponent(injector, _userService) {
        var _this = _super.call(this, injector) || this;
        _this._userService = _userService;
        _this.isEmailConfirmed = false;
        _this.selectedPermission = [];
        _this.isActive = undefined;
        _this.role = undefined;
        _this.dataList = [];
        _this.forminfo = {
            info1: '',
            info2: '',
            info3: ''
        };
        return _this;
    }
    /**
     * 添加信息模态框
     */
    TestComponent.prototype.create = function () {
        var _this = this;
        this.modalHelper
            .static(create_or_edit_component_1.CreateOrEditComponent)
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    /**
     * 编辑信息模态框
     * @param id 需要修改实体信息的ID
     */
    TestComponent.prototype.edit = function () {
        var _this = this;
        var selectCount = this.selectedDataItems.length;
        if (selectCount <= 0) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        else if (selectCount > 1) {
            abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
            return;
        }
        this.modalHelper
            .static(create_or_edit_component_1.CreateOrEditComponent, { id: this.selectedDataItems[0].id })
            .subscribe(function (res) {
            if (res) {
                _this.refresh();
            }
        });
    };
    /**
 * 获取远端数据
 * @param request
 * @param pageNumber
 * @param finishedCallback
 */
    TestComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._userService
            .getPaged(this.selectedPermission, this.role, this.isEmailConfirmed, this.isActive, undefined, this.filterText, request.sorting, request.maxResultCount, request.skipCount)
            .pipe(operators_1.finalize(function () {
            finishedCallback();
        }))
            .subscribe(function (result) {
            _this.dataList = result.items;
            _this.showPaging(result);
        });
    };
    TestComponent = __decorate([
        core_1.Component({
            selector: 'app-test',
            templateUrl: './test.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.UserServiceProxy])
    ], TestComponent);
    return TestComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.TestComponent = TestComponent;
