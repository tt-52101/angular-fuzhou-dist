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
var UserNotificationHelper_1 = require("@shared/helpers/UserNotificationHelper");
var component_base_1 = require("@shared/component-base");
var notification_settings_component_1 = require("../notification-settings/notification-settings.component");
var operators_1 = require("rxjs/operators");
var AppConsts_1 = require("abpPro/AppConsts");
var HeaderNotificationsComponent = /** @class */ (function (_super) {
    __extends(HeaderNotificationsComponent, _super);
    function HeaderNotificationsComponent(injector, _notificationService, _userNotificationHelper, _zone) {
        var _this = _super.call(this, injector) || this;
        _this._notificationService = _notificationService;
        _this._userNotificationHelper = _userNotificationHelper;
        _this._zone = _zone;
        _this.notifications = [];
        _this.unreadNotificationCount = 0;
        return _this;
    }
    HeaderNotificationsComponent.prototype.ngOnInit = function () {
        this.loadNotifications();
        this.registerToEvents();
    };
    HeaderNotificationsComponent.prototype.loadNotifications = function () {
        var _this = this;
        this.loading = true;
        this._notificationService.getPagedUserNotifications(undefined, AppConsts_1.AppConsts.notificationCount, 0)
            .pipe(operators_1.finalize(function () {
            _this.loading = false;
        }))
            .subscribe(function (result) {
            _this.unreadNotificationCount = result.unreadCount;
            _this.notifications = [];
            result.items.forEach(function (item) {
                _this.notifications.push(_this._userNotificationHelper.format(item));
            });
        });
    };
    HeaderNotificationsComponent.prototype.registerToEvents = function () {
        var _this = this;
        abp.event.on('abp.notifications.received', function (userNotification) {
            _this._zone.run(function () {
                _this._userNotificationHelper.show(userNotification);
                _this.loadNotifications();
            });
        });
        abp.event.on('app.notifications.refresh', function () {
            _this._zone.run(function () {
                _this.loadNotifications();
            });
        });
        abp.event.on('app.notifications.read', function (userNotificationId) {
            _this._zone.run(function () {
                for (var i = 0; i < _this.notifications.length; i++) {
                    if (_this.notifications[i].userNotificationId === userNotificationId) {
                        _this.notifications[i].state = 'READ';
                    }
                }
                _this.unreadNotificationCount -= 1;
            });
        });
    };
    HeaderNotificationsComponent.prototype.setAllNotificationsAsRead = function () {
        this._userNotificationHelper.setAllAsRead();
    };
    HeaderNotificationsComponent.prototype.chantNotificationSettings = function () {
        this.modalHelper.create(notification_settings_component_1.NotificationSettingsComponent)
            .subscribe(function (res) {
        });
    };
    HeaderNotificationsComponent.prototype.setNotificationAsRead = function (userNotification) {
        this._userNotificationHelper.setAsRead(userNotification.userNotificationId);
    };
    HeaderNotificationsComponent.prototype.gotoUrl = function (url) {
        if (url) {
            location.href = url;
        }
    };
    HeaderNotificationsComponent = __decorate([
        core_1.Component({
            selector: 'app-header-notifications',
            templateUrl: './header-notifications.component.html',
            styleUrls: [
                './header-notifications.component.less'
            ]
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.NotificationServiceProxy,
            UserNotificationHelper_1.UserNotificationHelper,
            core_1.NgZone])
    ], HeaderNotificationsComponent);
    return HeaderNotificationsComponent;
}(component_base_1.AppComponentBase));
exports.HeaderNotificationsComponent = HeaderNotificationsComponent;
