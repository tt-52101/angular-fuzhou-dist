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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var core_1 = require("@angular/core");
var component_base_1 = require("@shared/component-base");
var operators_1 = require("rxjs/operators");
var UserNotificationHelper_1 = require("@shared/helpers/UserNotificationHelper");
var AppEnums_1 = require("abpPro/AppEnums");
var abc_1 = require("@delon/abc");
var NotificationsComponent = /** @class */ (function (_super) {
    __extends(NotificationsComponent, _super);
    function NotificationsComponent(injector, _notificationService, _userNotificationHelper, _reuseTabService) {
        var _this = _super.call(this, injector) || this;
        _this._notificationService = _notificationService;
        _this._userNotificationHelper = _userNotificationHelper;
        _this._reuseTabService = _reuseTabService;
        _this.filter = {
            state: undefined
        };
        _this.stateList = [
            { key: _this.l('NotificationRead'), value: AppEnums_1.AppUserNotificationState.Read },
            {
                key: _this.l('NotificationUnread'),
                value: AppEnums_1.AppUserNotificationState.Unread
            }
        ];
        _this._reuseTabService.title = _this.l('Notifications');
        return _this;
    }
    NotificationsComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this._notificationService
            .getPagedUserNotifications(typeof this.filter.state === 'number' ? this.filter.state : undefined, request.maxResultCount, request.skipCount)
            .pipe(operators_1.finalize(function () {
            finishedCallback();
        }))
            .subscribe(function (result) {
            _this.dataList = _this.formatNotifications(result.items);
            _this.showPaging(result);
        });
    };
    NotificationsComponent.prototype.setAsRead = function (item) {
        var _this = this;
        this._userNotificationHelper.setAsRead(item.id, function () {
            _this.refresh();
        });
    };
    NotificationsComponent.prototype.delete = function (item) {
        var _this = this;
        this._notificationService.deleteNotification(item.id).subscribe(function () {
            _this.notify.success(_this.l('SuccessfullyDeleted'));
            _this.refreshGoFirstPage();
        });
    };
    NotificationsComponent.prototype.setAllUserNotificationsAsRead = function () {
        var _this = this;
        this._notificationService.makeAllUserNotificationsAsRead().subscribe(function () {
            _this.refresh();
        });
    };
    NotificationsComponent.prototype.formatNotifications = function (records) {
        var formattedRecords = [];
        for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
            var record = records_1[_i];
            record.formattedNotification = this.formatRecord(record);
            formattedRecords.push(record);
        }
        return formattedRecords;
    };
    NotificationsComponent.prototype.formatRecord = function (record) {
        return this._userNotificationHelper.format(record, false);
    };
    NotificationsComponent = __decorate([
        core_1.Component({
            selector: 'app-notifications',
            templateUrl: './notifications.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.NotificationServiceProxy,
            UserNotificationHelper_1.UserNotificationHelper,
            abc_1.ReuseTabService])
    ], NotificationsComponent);
    return NotificationsComponent;
}(component_base_1.PagedListingComponentBase));
exports.NotificationsComponent = NotificationsComponent;
