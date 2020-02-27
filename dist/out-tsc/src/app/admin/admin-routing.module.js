"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var users_component_1 = require("@app/admin/users/users.component");
var roles_component_1 = require("@app/admin/roles/roles.component");
var audit_logs_component_1 = require("@app/admin/audit-logs/audit-logs.component");
var maintenance_component_1 = require("@app/admin/maintenance/maintenance.component");
var host_settings_component_1 = require("@app/admin/host-settings/host-settings.component");
var editions_component_1 = require("@app/admin/editions/editions.component");
var languages_component_1 = require("@app/admin/languages/languages.component");
var language_texts_component_1 = require("@app/admin/language-texts/language-texts.component");
var tenants_component_1 = require("@app/admin/tenants/tenants.component");
var organization_units_component_1 = require("@app/admin/organization-units/organization-units.component");
var subscription_management_component_1 = require("@app/admin/subscription-management/subscription-management.component");
var tenant_settings_component_1 = require("@app/admin/tenant-settings/tenant-settings.component");
var hangfire_component_1 = require("./hangfire/hangfire.component");
var login_logs_component_1 = require("@app/admin/login-logs/login-logs.component");
var routes = [
    { path: 'users', component: users_component_1.UsersComponent, data: { title: '用户管理' } },
    { path: 'roles', component: roles_component_1.RolesComponent, data: { title: '角色管理' } },
    { path: 'auditLogs', component: audit_logs_component_1.AuditLogsComponent, data: { title: '操作日志' } },
    { path: 'loginLogs', component: login_logs_component_1.LoginLogsComponent, data: { title: '登录日志' } },
    { path: 'maintenance', component: maintenance_component_1.MaintenanceComponent },
    { path: 'host-settings', component: host_settings_component_1.HostSettingsComponent },
    { path: 'editions', component: editions_component_1.EditionsComponent },
    { path: 'languages', component: languages_component_1.LanguagesComponent },
    { path: 'languagetexts', component: language_texts_component_1.LanguageTextsComponent },
    { path: 'tenants', component: tenants_component_1.TenantsComponent },
    { path: 'organization-units', component: organization_units_component_1.OrganizationUnitsComponent },
    {
        path: 'subscription-management',
        component: subscription_management_component_1.SubscriptionManagementComponent
    },
    { path: 'tenant-settings', component: tenant_settings_component_1.TenantSettingsComponent },
    {
        path: 'hangfire',
        component: hangfire_component_1.HangfireComponent,
        data: { title: '调度管理' }
    },
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
exports.AdminRoutingModule = AdminRoutingModule;
