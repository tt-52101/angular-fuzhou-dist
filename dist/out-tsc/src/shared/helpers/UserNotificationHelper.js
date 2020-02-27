"use strict";
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
var moment = require("moment");
var UserNotificationHelper = /** @class */ (function () {
    function UserNotificationHelper(
    // injector: Injector,
    _notificationService) {
        this._notificationService = _notificationService;
        // super(injector);
    }
    UserNotificationHelper.prototype.getUrl = function (userNotification) {
        switch (userNotification.notification.notificationName) {
            case 'App.NewUserRegistered':
                return ('/app/admin/users?filterText=' +
                    userNotification.notification.data.properties.emailAddress);
            case 'App.NewTenantRegistered':
                return ('/app/admin/tenants?filterText=' +
                    userNotification.notification.data.properties.tenancyName);
            //Add your custom notification names to navigate to a URL when user clicks to a notification.
        }
        //No url for this notification
        return '';
    };
    /* PUBLIC functions ******************************************/
    UserNotificationHelper.prototype.getUiIconBySeverity = function (severity) {
        switch (severity) {
            case abp.notifications.severity.SUCCESS:
                return 'success';
            case abp.notifications.severity.WARN:
                return 'warning';
            case abp.notifications.severity.ERROR:
                return 'error';
            case abp.notifications.severity.FATAL:
                return 'fatal';
            case abp.notifications.severity.INFO:
            default:
                return 'default';
        }
    };
    UserNotificationHelper.prototype.format = function (userNotification, truncateText) {
        var formatted = {
            userNotificationId: userNotification.id,
            text: abp.notifications.getFormattedMessageFromUserNotification(userNotification),
            time: moment(userNotification.notification.creationTime).format('YYYY-MM-DD HH:mm:ss'),
            creationTime: userNotification.notification.creationTime,
            icon: this.getUiIconBySeverity(userNotification.notification.severity),
            state: abp.notifications.getUserNotificationStateAsString(userNotification.state),
            data: userNotification.notification.data,
            url: this.getUrl(userNotification),
            isUnread: userNotification.state ===
                abp.notifications.userNotificationState.UNREAD
        };
        if (truncateText || truncateText === undefined) {
            formatted.text = abp.utils.truncateStringWithPostfix(formatted.text, 100);
        }
        return formatted;
    };
    UserNotificationHelper.prototype.show = function (userNotification) {
        var _this = this;
        //Application notification
        abp.notifications.showUiNotifyForUserNotification(userNotification, {
            onclick: function () {
                //Take action when user clicks to live toastr notification
                var url = _this.getUrl(userNotification);
                if (url) {
                    location.href = url;
                }
            }
        });
        // // 唤起桌面通知
        // Push.create("YoYoCmsTemplate", {
        //     body: this.format(userNotification).text,
        //     icon: AppConsts.appBaseUrl + '/assets/images/logos/logo-white-shield.svg',
        //     timeout: 6000,
        //     onClick: function () {
        //         window.focus();
        //         this.close();
        //     }
        // });
    };
    UserNotificationHelper.prototype.setAllAsRead = function (callback) {
        this._notificationService.makeAllUserNotificationsAsRead().subscribe(function () {
            abp.event.trigger('app.notifications.refresh');
            callback && callback();
        });
    };
    UserNotificationHelper.prototype.setAsRead = function (userNotificationId, callback) {
        var input = new service_proxies_1.EntityDtoOfGuid();
        input.id = userNotificationId;
        this._notificationService.makeNotificationAsRead(input).subscribe(function () {
            abp.event.trigger('app.notifications.read', userNotificationId);
            callback && callback(userNotificationId);
        });
    };
    UserNotificationHelper = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [service_proxies_1.NotificationServiceProxy])
    ], UserNotificationHelper);
    return UserNotificationHelper;
}());
exports.UserNotificationHelper = UserNotificationHelper;
