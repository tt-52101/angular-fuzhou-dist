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
var CreateOrEditPowerRoleComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditPowerRoleComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditPowerRoleComponent(injector, _powerRoleService) {
        var _this = _super.call(this, injector) || this;
        _this._powerRoleService = _powerRoleService;
        _this.roleList = [];
        _this.powerList = []; //所有权限
        _this.powerIdList = []; //选中权限
        _this.selectedPermission = [];
        return _this;
    }
    CreateOrEditPowerRoleComponent.prototype.ngOnInit = function () {
        this.init();
    };
    /**
    * 初始化方法
    */
    CreateOrEditPowerRoleComponent.prototype.init = function () {
        this.getrolepower();
    };
    CreateOrEditPowerRoleComponent.prototype.getrolepower = function () {
        var _this = this;
        this._powerRoleService.getPowerRoleListById(this.id)
            .subscribe(function (result) {
            // console.log(result)
            var items = result.items;
            var powerList = [];
            var hadmenu = 0;
            for (var i = 0; i < items.length; i++) {
                for (var j = 0; j < powerList.length; j++) {
                    if (items[i].isEnabled) {
                        if (items[i].menuId == powerList[j].menuId) {
                            powerList[j].child.push({
                                label: items[i].powerName,
                                value: items[i].id,
                                checked: items[i].isCheck
                            });
                            hadmenu = 1;
                        }
                    }
                }
                if (hadmenu == 0) {
                    if (items[i].isEnabled) {
                        powerList.push({
                            menuId: items[i].menuId,
                            menuname: items[i].menu.menuName,
                            child: [{
                                    label: items[i].powerName,
                                    value: items[i].id,
                                    checked: items[i].isCheck
                                }]
                        });
                    }
                }
                if (items[i].isEnabled && items[i].isCheck) {
                    _this.powerIdList.push(items[i].id);
                }
            }
            ;
            // console.log(powerList)
            // console.log(this.powerIdList)
            _this.powerList = powerList;
        });
    };
    CreateOrEditPowerRoleComponent.prototype.ngModelChange = function (a) {
        console.log(a);
        for (var i = 0; i < a.length; i++) {
            if (a[i].checked) {
                if (this.powerIdList.indexOf(a[i].value) == -1) {
                    this.powerIdList.push(a[i].value);
                }
            }
            else {
                this.powerIdList.splice(this.powerIdList.indexOf(a[i].value), 1);
            }
        }
    };
    CreateOrEditPowerRoleComponent.prototype.allcheckChange = function () {
        var powerIdList = [];
        for (var i = 0; i < this.powerList.length; i++) {
            for (var j = 0; j < this.powerList[i].child.length; j++) {
                this.powerList[i].child[j].checked = true;
                powerIdList.push(this.powerList[i].child[j].value);
            }
        }
        this.powerIdList = powerIdList;
    };
    CreateOrEditPowerRoleComponent.prototype.allnotcheckChange = function () {
        for (var i = 0; i < this.powerList.length; i++) {
            for (var j = 0; j < this.powerList[i].child.length; j++) {
                this.powerList[i].child[j].checked = false;
            }
        }
        this.powerIdList = [];
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditPowerRoleComponent.prototype.submitForm = function () {
        var _this = this;
        this.saving = true;
        this._powerRoleService.batchAddOrUpdate(this.id, this.powerIdList)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditPowerRoleComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-power-role',
            templateUrl: './create-or-edit-power-role.component.html',
            styleUrls: [
                'create-or-edit-power-role.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.PowerRoleServiceProxy])
    ], CreateOrEditPowerRoleComponent);
    return CreateOrEditPowerRoleComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditPowerRoleComponent = CreateOrEditPowerRoleComponent;
