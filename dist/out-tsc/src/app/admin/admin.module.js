"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var admin_routing_module_1 = require("@app/admin/admin-routing.module");
// import { PowerManagementRoutingModule } from '@app/admin/power-management/power-management-routing.module';
var users_component_1 = require("@app/admin/users/users.component");
var languages_component_1 = require("@app/admin/languages/languages.component");
var organization_units_component_1 = require("@app/admin/organization-units/organization-units.component");
var roles_component_1 = require("@app/admin/roles/roles.component");
var audit_logs_component_1 = require("@app/admin/audit-logs/audit-logs.component");
var login_logs_component_1 = require("@app/admin/login-logs/login-logs.component");
var tenants_component_1 = require("@app/admin/tenants/tenants.component");
var maintenance_component_1 = require("@app/admin/maintenance/maintenance.component");
var editions_component_1 = require("@app/admin/editions/editions.component");
var host_settings_component_1 = require("@app/admin/host-settings/host-settings.component");
var tenant_settings_component_1 = require("@app/admin/tenant-settings/tenant-settings.component");
var subscription_management_component_1 = require("@app/admin/subscription-management/subscription-management.component");
var language_texts_component_1 = require("@app/admin/language-texts/language-texts.component");
var http_1 = require("@angular/common/http");
var shared_module_1 = require("@shared/shared.module");
var abp_module_1 = require("@abp/abp.module");
var create_or_edit_user_component_1 = require("@app/admin/users/create-or-edit-user/create-or-edit-user.component");
var edit_user_permissions_component_1 = require("@app/admin/users/edit-user-permissions/edit-user-permissions.component");
var permission_tree_component_1 = require("@app/admin/shared/permission-tree/permission-tree.component");
var create_or_edit_role_component_1 = require("@app/admin/roles/create-or-edit-role/create-or-edit-role.component");
var audit_logs_detail_component_1 = require("@app/admin/audit-logs/audit-logs-detail/audit-logs-detail.component");
// tslint:disable-next-line:max-line-length
var add_member_component_1 = require("@app/admin/organization-units/add-member/add-member.component");
var create_or_edit_language_component_1 = require("@app/admin/languages/create-or-edit-language/create-or-edit-language.component");
var edit_language_text_component_1 = require("@app/admin/language-texts/edit-language-text/edit-language-text.component");
var create_tenant_component_1 = require("@app/admin/tenants/create-tenant/create-tenant.component");
var edit_tenant_component_1 = require("@app/admin/tenants/edit-tenant/edit-tenant.component");
// tslint:disable-next-line:max-line-length
var create_or_edit_organiaztion_unit_component_1 = require("@app/admin/organization-units/create-or-edit-organiaztion-unit/create-or-edit-organiaztion-unit.component");
var permission_combox_component_1 = require("@app/admin/shared/permission-combox/permission-combox.component");
var role_combox_component_1 = require("@app/admin/shared/role-combox/role-combox.component");
// tslint:disable-next-line:max-line-length
var organization_unit_tree_panel_component_1 = require("@app/admin/organization-units/organization-unit-tree-panel/organization-unit-tree-panel.component");
// tslint:disable-next-line:max-line-length
var organization_unit_members_panel_component_1 = require("@app/admin/organization-units/organization-unit-members-panel/organization-unit-members-panel.component");
var organization_unit_tree_component_1 = require("@app/admin/shared/organization-unit-tree/organization-unit-tree.component");
var forms_1 = require("@angular/forms");
var edition_combo_component_1 = require("./shared/edition-combo/edition-combo.component");
var create_or_edit_edition_component_1 = require("./editions/create-or-edit-edition/create-or-edit-edition.component");
var timezone_combo_component_1 = require("./shared/timing/timezone-combo.component");
var edition_feature_tree_component_1 = require("./shared/edition-feature-tree/edition-feature-tree.component");
var edit_tenant_features_component_1 = require("./tenants/edit-tenant-features/edit-tenant-features.component");
var common_lookup_component_1 = require("./common/common-lookup/common-lookup.component");
var hangfire_component_1 = require("./hangfire/hangfire.component");
var jobdetail_component_1 = require("./hangfire/components/jobdetail/jobdetail.component");
var jobcommontable_component_1 = require("./hangfire/components/jobcommontable/jobcommontable.component");
var index_history_chart_component_1 = require("./hangfire/components/index-history-chart/index-history-chart.component");
var dynamic_table_component_1 = require("./hangfire/components/dynamic-table/dynamic-table.component");
var organization_unit_role_panel_component_1 = require("./organization-units/organization-unit-role-panel/organization-unit-role-panel.component");
var add_role_component_1 = require("./organization-units/add-role/add-role.component");
var create_or_edit_power_role_component_1 = require("@app/admin/roles/create-or-edit-power-role/create-or-edit-power-role.component");
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule,
                http_1.HttpClientModule,
                shared_module_1.SharedModule,
                abp_module_1.AbpModule,
                admin_routing_module_1.AdminRoutingModule
            ],
            declarations: [
                users_component_1.UsersComponent,
                languages_component_1.LanguagesComponent,
                organization_units_component_1.OrganizationUnitsComponent,
                roles_component_1.RolesComponent,
                audit_logs_component_1.AuditLogsComponent,
                login_logs_component_1.LoginLogsComponent,
                tenants_component_1.TenantsComponent,
                maintenance_component_1.MaintenanceComponent,
                editions_component_1.EditionsComponent,
                host_settings_component_1.HostSettingsComponent,
                tenant_settings_component_1.TenantSettingsComponent,
                subscription_management_component_1.SubscriptionManagementComponent,
                language_texts_component_1.LanguageTextsComponent,
                permission_combox_component_1.PermissionComboxComponent,
                role_combox_component_1.RoleComboxComponent,
                create_or_edit_user_component_1.CreateOrEditUserComponent,
                organization_unit_tree_component_1.OrganizationUnitsTreeComponent,
                edit_user_permissions_component_1.EditUserPermissionsComponent,
                permission_tree_component_1.PermissionTreeComponent,
                create_or_edit_role_component_1.CreateOrEditRoleComponent,
                create_or_edit_power_role_component_1.CreateOrEditPowerRoleComponent,
                audit_logs_detail_component_1.AuditLogsDetailComponent,
                create_or_edit_organiaztion_unit_component_1.CreateOrEditOrganiaztionUnitComponent,
                add_member_component_1.AddMemberComponent,
                create_or_edit_language_component_1.CreateOrEditLanguageComponent,
                edit_language_text_component_1.EditLanguageTextComponent,
                create_tenant_component_1.CreateTenantComponent,
                organization_unit_tree_panel_component_1.OrganizationUnitTreePanelComponent,
                organization_unit_members_panel_component_1.OrganizationUnitMembersPanelComponent,
                edit_tenant_component_1.EditTenantComponent,
                edition_combo_component_1.EditionComboComponent,
                create_or_edit_edition_component_1.CreateOrEditEditionComponent,
                timezone_combo_component_1.TimeZoneComboComponent,
                edition_feature_tree_component_1.EditionFeatureTreeComponent,
                edit_tenant_features_component_1.EditTenantFeaturesComponent,
                common_lookup_component_1.CommonLookupComponent,
                hangfire_component_1.HangfireComponent,
                jobdetail_component_1.JobdetailComponent,
                jobcommontable_component_1.JobcommontableComponent,
                index_history_chart_component_1.IndexHistoryChartComponent,
                dynamic_table_component_1.DynamicTableComponent,
                organization_unit_role_panel_component_1.OrganizationUnitRolePanelComponent,
                add_role_component_1.AddRoleComponent,
            ],
            entryComponents: [
                create_or_edit_user_component_1.CreateOrEditUserComponent,
                edit_user_permissions_component_1.EditUserPermissionsComponent,
                create_or_edit_role_component_1.CreateOrEditRoleComponent,
                create_or_edit_power_role_component_1.CreateOrEditPowerRoleComponent,
                audit_logs_detail_component_1.AuditLogsDetailComponent,
                create_or_edit_organiaztion_unit_component_1.CreateOrEditOrganiaztionUnitComponent,
                add_member_component_1.AddMemberComponent,
                add_role_component_1.AddRoleComponent,
                create_or_edit_language_component_1.CreateOrEditLanguageComponent,
                edit_language_text_component_1.EditLanguageTextComponent,
                create_tenant_component_1.CreateTenantComponent,
                edit_tenant_component_1.EditTenantComponent,
                create_or_edit_edition_component_1.CreateOrEditEditionComponent,
                edit_tenant_features_component_1.EditTenantFeaturesComponent,
                common_lookup_component_1.CommonLookupComponent
            ],
            providers: []
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
