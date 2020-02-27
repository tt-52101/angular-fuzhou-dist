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
var CreateOrEditMenuComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditMenuComponent, _super);
    /**
     * 初始化的构造函数
     */
    function CreateOrEditMenuComponent(injector, _menuService) {
        var _this = _super.call(this, injector) || this;
        _this._menuService = _menuService;
        _this.entity = new service_proxies_1.MenuEditDto();
        _this.parentId = '';
        _this.menuarr = [];
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
        return _this;
    }
    CreateOrEditMenuComponent.prototype.ngOnInit = function () {
        this.init();
    };
    CreateOrEditMenuComponent.prototype.init = function () {
        var _this = this;
        this._menuService.getForEdit(this.id).subscribe(function (result) {
            _this._menuService.getMenuDropDown()
                .subscribe(function (res) {
                // console.log(res)
                _this.menuarr = res;
            });
            _this.entity = result.menu;
            _this.parentId = result.menu.parentId;
        });
    };
    CreateOrEditMenuComponent.prototype.onChange = function ($event) {
        console.log($event);
        this.parentId = $event;
        this.entity.parentId = $event;
    };
    CreateOrEditMenuComponent.prototype.iconChange = function ($event) {
        console.log($event);
        this.iocName = $event;
        this.entity.iocName = $event;
        this.entity.iocClassName = $event;
    };
    CreateOrEditMenuComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.entity.level != 1 && !this.entity.parentId) {
            abp.message.warn(this.l('PleaseSelectParent'));
            return;
        }
        var input = new service_proxies_1.CreateOrUpdateMenuInput();
        if (this.entity.level != 1) {
            this.entity.iocName = 'anticon anticon-file';
            this.entity.iocClassName = 'anticon anticon-file';
        }
        input.menu = this.entity;
        this.saving = true;
        this._menuService.createOrUpdate(input)
            .finally(function () { return (_this.saving = false); })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success(true);
        });
    };
    CreateOrEditMenuComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-menu',
            templateUrl: './create-or-edit-menu.component.html',
            styleUrls: [
                'create-or-edit-menu.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.MenuServiceProxy])
    ], CreateOrEditMenuComponent);
    return CreateOrEditMenuComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditMenuComponent = CreateOrEditMenuComponent;
