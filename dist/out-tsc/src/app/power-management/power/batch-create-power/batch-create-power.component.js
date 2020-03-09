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
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var service_proxies_2 = require("@shared/service-proxies/service-proxies");
var BatchCreatePowerComponent = /** @class */ (function (_super) {
    __extends(BatchCreatePowerComponent, _super);
    function BatchCreatePowerComponent(injector, _powerService, _menuService) {
        var _this = _super.call(this, injector) || this;
        _this._powerService = _powerService;
        _this._menuService = _menuService;
        _this.entity = new service_proxies_1.PowerEditDto();
        _this.menuId = '';
        _this.menuarr = [];
        _this.menulist = [];
        _this.powerList = [{
                label: '拥有菜单',
                value: 'ownmenu',
            }, {
                label: '仅查看自己的数据',
                value: 'viewown',
            }, {
                label: '仅查看所在机构的数据',
                value: 'viewownorgan',
            }, {
                label: '仅查看所在机构的子机构的数据',
                value: 'viewsuborgan',
            }, {
                label: '查看所有机构的数据',
                value: 'viewallorgan',
            },];
        _this.powerCodeList = []; //选中权限
        _this.showselect = false;
        return _this;
    }
    BatchCreatePowerComponent.prototype.ngOnInit = function () {
        this.init();
    };
    /**
    * 初始化方法
    */
    BatchCreatePowerComponent.prototype.init = function () {
        var _this = this;
        this._powerService.getForEdit(this.id).subscribe(function (result) {
            _this._menuService.getMenuDropDown().subscribe(function (res) {
                _this.menuarr = res;
            });
            _this._menuService.getPaged(null, 999, 0).subscribe(function (result) {
                _this.menulist = result.items;
            });
            _this.entity = result.power;
            _this.menuId = result.power.menuId;
        });
    };
    BatchCreatePowerComponent.prototype.ngModelChange = function (a) {
        this.powerCodeList = [];
        for (var i = 0; i < a.length; i++) {
            if (a[i].checked) {
                this.powerCodeList.push(a[i].value);
            }
        }
        console.log(this.powerCodeList);
    };
    BatchCreatePowerComponent.prototype.onChange = function ($event) {
        // console.log($event)
        for (var i = 0; i < this.menulist.length; i++) {
            if (this.menulist[i].id == $event) {
                this.menuId = $event;
                this.entity.menuId = $event;
                this.entity.menuPath = this.menulist[i].navigateUrl;
            }
        }
    };
    /**
    * 保存方法,提交form表单
    */
    BatchCreatePowerComponent.prototype.submitForm = function () {
        var _this = this;
        console.log(this.powerCodeList);
        this.saving = true;
        this._powerService.batchCreate(this.menuId, this.powerCodeList)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    BatchCreatePowerComponent = __decorate([
        core_1.Component({
            selector: 'batch-create-power',
            templateUrl: './batch-create-power.component.html',
            styleUrls: [
                'batch-create-power.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.PowerServiceProxy,
            service_proxies_2.MenuServiceProxy])
    ], BatchCreatePowerComponent);
    return BatchCreatePowerComponent;
}(modal_component_base_1.ModalComponentBase));
exports.BatchCreatePowerComponent = BatchCreatePowerComponent;
