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
var component_base_1 = require("@shared/component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var operators_1 = require("rxjs/operators");
var _ = require("lodash");
var NotificationSettingsComponent = /** @class */ (function (_super) {
    __extends(NotificationSettingsComponent, _super);
    function NotificationSettingsComponent(injector, _notificationService) {
        var _this = _super.call(this, injector) || this;
        _this._notificationService = _notificationService;
        _this.settings = new service_proxies_1.GetNotificationSettingsOutput();
        return _this;
    }
    NotificationSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loding = true;
        this._notificationService.getNotificationSettings()
            .pipe(operators_1.finalize(function () {
            _this.loding = false;
        }))
            .subscribe(function (result) {
            _this.settings = result;
        });
    };
    NotificationSettingsComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        var input = new service_proxies_1.UpdateNotificationSettingsInput();
        input.receiveNotifications = this.settings.receiveNotifications;
        input.notifications = _.map(this.settings.notifications, function (n) {
            var subscription = new service_proxies_1.NotificationSubscriptionDto();
            subscription.name = n.name;
            subscription.isSubscribed = n.isSubscribed;
            return subscription;
        });
        this._notificationService.updateNotificationSettings(input)
            .pipe(operators_1.finalize(function () {
            _this.saving = false;
        }))
            .subscribe(function () {
            _this.notify.info(_this.l('SavedSuccessfully'));
            _this.close();
        });
    };
    NotificationSettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-notification-settings',
            templateUrl: './notification-settings.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.NotificationServiceProxy])
    ], NotificationSettingsComponent);
    return NotificationSettingsComponent;
}(component_base_1.ModalComponentBase));
exports.NotificationSettingsComponent = NotificationSettingsComponent;
