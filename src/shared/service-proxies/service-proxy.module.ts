import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';
import { YoYoHttpInterceptor } from './YoYoHttpInterceptor';

import * as ApiServiceProxies from '@shared/service-proxies/service-proxies';

@NgModule({
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


  //游客
  ApiServiceProxies.OperServiceProxy,


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

  ApiServiceProxies.JsonWRServiceProxy,

  //系统
  ApiServiceProxies.CheckRecordServiceProxy,
  ApiServiceProxies.ClientVersionServiceProxy,

  //旅行社
  ApiServiceProxies.TravelAgencyServiceProxy,
  ApiServiceProxies.RechargeRecordServiceProxy,

  //设备
  ApiServiceProxies.DeviceServiceProxy,
  ApiServiceProxies.GateRecordServiceProxy,
  ApiServiceProxies.VerifiableSetServiceProxy,

  ApiServiceProxies.HistoryServiceProxy,
  ApiServiceProxies.RecordServiceProxy,

  //船运
  ApiServiceProxies.BoatServiceProxy,
  ApiServiceProxies.RouteServiceProxy,
  ApiServiceProxies.ScheduleServiceProxy,
  ApiServiceProxies.WharfServiceProxy,

  // ============= wechat ==================
  ApiServiceProxies.WechatAppConfigServiceProxy,
  ApiServiceProxies.WechatMenuAppSeviceServiceProxy,
  ApiServiceProxies.WechatMediaServiceProxy,
  { provide: HTTP_INTERCEPTORS, useClass: YoYoHttpInterceptor, multi: true },
  ApiServiceProxies.BooksServiceProxy
  ]
})
export class ServiceProxyModule {}
