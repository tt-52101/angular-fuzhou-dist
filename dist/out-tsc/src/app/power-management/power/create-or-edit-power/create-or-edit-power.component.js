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
var CreateOrEditPowerComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditPowerComponent, _super);
    /**
    * 初始化的构造函数
    */
    function CreateOrEditPowerComponent(injector, _powerService, _menuService) {
        var _this = _super.call(this, injector) || this;
        _this._powerService = _powerService;
        _this._menuService = _menuService;
        _this.entity = new service_proxies_1.PowerEditDto();
        _this.menuId = '';
        _this.menuarr = [];
        _this.menulist = [];
        _this.iocName = "";
        _this.iconarr = [
            { title: "anticon anticon-api", icon: 'api' },
            { title: "anticon anticon-appstore", icon: 'appstore' },
            { title: "anticon anticon-book", icon: 'book' },
            { title: "anticon anticon-cloud", icon: 'cloud' },
            { title: "anticon anticon-copyright", icon: 'copyright' },
            { title: "anticon anticon-dashboard", icon: 'dashboard' },
            { title: "anticon anticon-database", icon: 'database' },
            { title: "anticon anticon-dingding", icon: 'dingding' },
            { title: "anticon anticon-dislike", icon: 'dislike' },
            { title: "anticon anticon-download", icon: 'download' },
            { title: "anticon anticon-edit", icon: 'edit' },
            { title: "anticon anticon-ellipsis", icon: 'ellipsis' },
            { title: "anticon anticon-file", icon: 'file' },
            { title: "anticon anticon-fork", icon: 'fork' },
            { title: "anticon anticon-frown", icon: 'frown' },
            { title: "anticon anticon-fullscreen", icon: 'fullscreen' },
            { title: "anticon anticon-github", icon: 'github' },
            { title: "anticon anticon-global", icon: 'global' },
            { title: "anticon anticon-hdd", icon: 'hdd' },
            { title: "anticon anticon-laptop", icon: 'laptop' },
            { title: "anticon anticon-like", icon: 'like' },
            { title: "anticon anticon-lock", icon: 'lock' },
            { title: "anticon anticon-logout", icon: 'logout' },
            { title: "anticon anticon-mail", icon: 'mail' },
            { title: "anticon anticon-message", icon: 'message' },
            { title: "anticon anticon-printer", icon: 'printer' },
            { title: "anticon anticon-rocket", icon: 'rocket' },
            { title: "anticon anticon-scan", icon: 'scan' },
            { title: "anticon anticon-search", icon: 'search' },
            { title: "anticon anticon-setting", icon: 'setting' },
            { title: "anticon anticon-sound", icon: 'sound' },
            { title: "anticon anticon-star", icon: 'star' },
            { title: "anticon anticon-taobao", icon: 'taobao' },
            { title: "anticon anticon-team", icon: 'team' },
            { title: "anticon anticon-tool", icon: 'tool' },
            { title: "anticon anticon-trophy", icon: 'trophy' },
            { title: "anticon anticon-usb", icon: 'usb' },
            { title: "anticon anticon-user", icon: 'user' },
        ];
        _this.showselect = false;
        _this.ismenu = false;
        return _this;
    }
    CreateOrEditPowerComponent.prototype.ngOnInit = function () {
        this.init();
    };
    /**
    * 初始化方法
    */
    CreateOrEditPowerComponent.prototype.init = function () {
        var _this = this;
        this._powerService.getForEdit(this.id).subscribe(function (result) {
            _this._menuService.getMenuDropDown().subscribe(function (res) {
                _this.menuarr = res;
            });
            _this._menuService.getPaged(null, 999, 0).subscribe(function (result) {
                _this.menulist = result.items;
            });
            _this.entity = result.power;
            if (_this.entity.category == service_proxies_1.PowerTypeEnum.Data) {
                _this.showselect = true;
            }
            if (_this.entity.category == service_proxies_1.PowerTypeEnum.MENU) {
                _this.ismenu = true;
            }
            _this.menuId = result.power.menuId;
        });
    };
    CreateOrEditPowerComponent.prototype.catetorychange = function () {
        this.entity.powerCode = '';
        this.entity.powerName = '';
        console.log(this.entity.category);
        console.log(service_proxies_1.PowerTypeEnum.Data);
        if (this.entity.category == service_proxies_1.PowerTypeEnum.Data) {
            this.showselect = true;
            this.ismenu = false;
        }
        else if (this.entity.category == service_proxies_1.PowerTypeEnum.MENU) {
            this.ismenu = true;
            this.showselect = false;
            this.entity.powerName = '拥有菜单';
            this.entity.powerCode = 'ownmenu';
        }
        else {
            this.ismenu = false;
            this.showselect = false;
        }
    };
    CreateOrEditPowerComponent.prototype.onChange = function ($event) {
        // console.log($event)
        for (var i = 0; i < this.menulist.length; i++) {
            if (this.menulist[i].id == $event) {
                this.menuId = $event;
                this.entity.menuId = $event;
                this.entity.menuPath = this.menulist[i].navigateUrl;
            }
        }
    };
    CreateOrEditPowerComponent.prototype.iconChange = function ($event) {
        // console.log($event);
        this.iocName = $event;
        this.entity.iocName = $event;
        this.entity.iocClassName = $event;
    };
    /**
    * 保存方法,提交form表单
    */
    CreateOrEditPowerComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdatePowerInput();
        this.entity.method = 'null';
        this.entity.params = 'null';
        this.entity.groupName = 'null';
        input.power = this.entity;
        this.saving = true;
        this._powerService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditPowerComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-power',
            templateUrl: './create-or-edit-power.component.html',
            styleUrls: [
                'create-or-edit-power.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.PowerServiceProxy,
            service_proxies_2.MenuServiceProxy])
    ], CreateOrEditPowerComponent);
    return CreateOrEditPowerComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditPowerComponent = CreateOrEditPowerComponent;
