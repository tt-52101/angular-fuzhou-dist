"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var YoYoHttpInterceptor_1 = require("./YoYoHttpInterceptor");
var ApiServiceProxies = require("@shared/service-proxies/service-proxies");
var ServiceProxyModule = /** @class */ (function () {
    function ServiceProxyModule() {
    }
    ServiceProxyModule = __decorate([
        core_1.NgModule({
            providers: [
                ApiServiceProxies.AccountServiceProxy,
                ApiServiceProxies.AuditLogServiceProxy,
                ApiServiceProxies.LanguageServiceProxy,
                ApiServiceProxies.NotificationServiceProxy,
                ApiServiceProxies.OrganizationUnitServiceProxy,
                ApiServiceProxies.PermissionServiceProxy,
                ApiServiceProxies.ProfileServiceProxy,
                ApiServiceProxies.RoleServiceProxy,
                ApiServiceProxies.SessionServiceProxy,
                ApiServiceProxies.TenantServiceProxy,
                ApiServiceProxies.TokenAuthServiceProxy,
                ApiServiceProxies.UserServiceProxy,
                ApiServiceProxies.UserLoginServiceProxy,
                ApiServiceProxies.HostSettingsServiceProxy,
                ApiServiceProxies.HostCachingServiceProxy,
                ApiServiceProxies.WebSiteLogServiceProxy,
                ApiServiceProxies.TenantSettingsServiceProxy,
                ApiServiceProxies.TenantRegistrationServiceProxy,
                ApiServiceProxies.EditionServiceProxy,
                ApiServiceProxies.TimingServiceProxy,
                ApiServiceProxies.CommonLookupServiceProxy,
                // ============= Hangfire ==================
                ApiServiceProxies.HangfireServiceServiceProxy,
                //票务逻辑
                ApiServiceProxies.TicketServiceProxy,
                ApiServiceProxies.TicketUserEnableServiceProxy,
                ApiServiceProxies.TicketStationServiceProxy,
                ApiServiceProxies.TicketStationEnableServiceProxy,
                ApiServiceProxies.TicketPriceServiceProxy,
                ApiServiceProxies.TicketIntroduceServiceProxy,
                ApiServiceProxies.TicketDetailServiceProxy,
                ApiServiceProxies.TicketDetailHistoryServiceProxy,
                ApiServiceProxies.PriceAuditServiceProxy,
                ApiServiceProxies.ActivityServiceProxy,
                ApiServiceProxies.ActivityTempServiceProxy,
                ApiServiceProxies.ActivityTempDetailServiceProxy,
                ApiServiceProxies.ActivityDetailServiceProxy,
                ApiServiceProxies.AccountDetailServiceProxy,
                ApiServiceProxies.TicketAccountServiceProxy,
                ApiServiceProxies.ScenicSpotServiceProxy,
                ApiServiceProxies.SourceServiceProxy,
                ApiServiceProxies.FinanceServiceProxy,
                //游客
                ApiServiceProxies.CustomerServiceProxy,
                //统计报表
                ApiServiceProxies.OrderSourceServiceProxy,
                ApiServiceProxies.OtaServiceProxy,
                ApiServiceProxies.SellerTicketServiceProxy,
                ApiServiceProxies.SellerDailyServiceProxy,
                ApiServiceProxies.ScheduleCheckServiceProxy,
                ApiServiceProxies.ScheduleTicketServiceProxy,
                // //开发者
                // ApiServiceProxies.EditionServiceProxy,
                ApiServiceProxies.MenuServiceProxy,
                ApiServiceProxies.PowerServiceProxy,
                ApiServiceProxies.PowerRoleServiceProxy,
                ApiServiceProxies.BranchServiceProxy,
                ApiServiceProxies.BranchUserServiceProxy,
                ApiServiceProxies.PayMethodServiceProxy,
                ApiServiceProxies.DateDictionaryServiceProxy,
                //系统
                ApiServiceProxies.CheckRecordServiceProxy,
                //旅行社
                ApiServiceProxies.TravelAgencyServiceProxy,
                ApiServiceProxies.RechargeRecordServiceProxy,
                //设备
                ApiServiceProxies.DeviceServiceProxy,
                ApiServiceProxies.GateRecordServiceProxy,
                ApiServiceProxies.VerifiableSetServiceProxy,
                //船运
                ApiServiceProxies.BoatServiceProxy,
                ApiServiceProxies.RouteServiceProxy,
                ApiServiceProxies.ScheduleServiceProxy,
                ApiServiceProxies.WharfServiceProxy,
                // ============= wechat ==================
                ApiServiceProxies.WechatAppConfigServiceProxy,
                ApiServiceProxies.WechatMenuAppSeviceServiceProxy,
                ApiServiceProxies.WechatMediaServiceProxy,
                { provide: http_1.HTTP_INTERCEPTORS, useClass: YoYoHttpInterceptor_1.YoYoHttpInterceptor, multi: true },
                ApiServiceProxies.BooksServiceProxy
            ]
        })
    ], ServiceProxyModule);
    return ServiceProxyModule;
}());
exports.ServiceProxyModule = ServiceProxyModule;
