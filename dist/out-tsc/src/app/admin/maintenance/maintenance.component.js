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
var _ = require("lodash");
var paged_listing_component_base_1 = require("@shared/component-base/paged-listing-component-base");
var file_download_service_1 = require("@shared/utils/file-download.service");
var MaintenanceComponent = /** @class */ (function (_super) {
    __extends(MaintenanceComponent, _super);
    function MaintenanceComponent(injector, cacheService, webSiteLogService, fileDownloadService) {
        var _this = _super.call(this, injector) || this;
        _this.cacheService = cacheService;
        _this.webSiteLogService = webSiteLogService;
        _this.fileDownloadService = fileDownloadService;
        _this.logs = '';
        _this.downloadWebLogs = function () {
            var _this = this;
            this.webSiteLogService.downloadWebLogs().subscribe(function (result) {
                _this.fileDownloadService.downloadTempFile(result);
            });
        };
        return _this;
    }
    MaintenanceComponent.prototype.ngOnInit = function () {
        this.refresh();
        this.getWebLogs();
    };
    MaintenanceComponent.prototype.fetchDataList = function (request, pageNumber, finishedCallback) {
        var _this = this;
        this.cacheService
            .getAllCaches()
            .finally(function () {
            finishedCallback();
        })
            .subscribe(function (result) {
            _this.dataList = result.items;
        });
    };
    MaintenanceComponent.prototype.delete = function (entity) { };
    MaintenanceComponent.prototype.clearCache = function (cacheName) {
        var _this = this;
        var input = new service_proxies_1.EntityDtoOfString();
        input.id = cacheName;
        this.cacheService.clearCache(input).subscribe(function () {
            _this.notify.success(_this.l('CacheSuccessfullyCleared'));
        });
    };
    MaintenanceComponent.prototype.clearAllCaches = function () {
        var _this = this;
        this.cacheService.clearAllCaches().subscribe(function () {
            _this.notify.success(_this.l('AllCachesSuccessfullyCleared'));
        });
    };
    MaintenanceComponent.prototype.getWebLogs = function () {
        var _this = this;
        this.webSiteLogService.getLatestWebLogs().subscribe(function (result) {
            _this.logs = result.latestWebLogLines;
        });
    };
    MaintenanceComponent.prototype.getLogClass = function (log) {
        if (log.startsWith('DEBUG')) {
            return 'label label-default';
        }
        if (log.startsWith('INFO')) {
            return 'label label-info';
        }
        if (log.startsWith('WARN')) {
            return 'label label-warning';
        }
        if (log.startsWith('ERROR')) {
            return 'label label-danger';
        }
        if (log.startsWith('FATAL')) {
            return 'label label-danger';
        }
        return '';
    };
    MaintenanceComponent.prototype.getLogType = function (log) {
        if (log.startsWith('DEBUG')) {
            return 'DEBUG';
        }
        if (log.startsWith('INFO')) {
            return 'INFO';
        }
        if (log.startsWith('WARN')) {
            return 'WARN';
        }
        if (log.startsWith('ERROR')) {
            return 'ERROR';
        }
        if (log.startsWith('FATAL')) {
            return 'FATAL';
        }
        return '';
    };
    MaintenanceComponent.prototype.getRawLogContent = function (log) {
        return _.escape(log)
            .replace('DEBUG', '')
            .replace('INFO', '')
            .replace('WARN', '')
            .replace('ERROR', '')
            .replace('FATAL', '');
    };
    MaintenanceComponent = __decorate([
        core_1.Component({
            selector: 'app-maintenance',
            templateUrl: './maintenance.component.html',
            styleUrls: [
                './maintenance.component.less'
            ]
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.HostCachingServiceProxy,
            service_proxies_1.WebSiteLogServiceProxy,
            file_download_service_1.FileDownloadService])
    ], MaintenanceComponent);
    return MaintenanceComponent;
}(paged_listing_component_base_1.PagedListingComponentBase));
exports.MaintenanceComponent = MaintenanceComponent;
