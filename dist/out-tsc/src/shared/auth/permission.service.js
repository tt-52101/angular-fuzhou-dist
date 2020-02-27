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
var acl_1 = require("@delon/acl");
var PermissionService = /** @class */ (function () {
    function PermissionService(aclService) {
        this.aclService = aclService;
    }
    /**
     * 判断是否拥有某权限
     * @param permissionName (单个/多个) 权限名称
     */
    PermissionService.prototype.isGranted = function (permissionName) {
        if (!permissionName || permissionName.length === 0) {
            return true;
        }
        if (Array.isArray(permissionName)) {
            return this.aclService.can({
                role: permissionName,
                mode: 'allOf'
            });
        }
        else {
            return this.aclService.can(permissionName);
        }
    };
    /**
     * 添加权限名称
     * @param permissionName 添加(单个/多个)权限名称
     */
    PermissionService.prototype.addPermission = function (permissionName) {
        if (!permissionName || permissionName.length === 0) {
            return;
        }
        if (Array.isArray(permissionName)) {
            var _loop_1 = function (i) {
                var tmppermissionName = permissionName[i];
                if (this_1.aclService.data.abilities.find(function (item) { return item === tmppermissionName; })) {
                    return "continue";
                }
                this_1.aclService.attachRole([tmppermissionName]);
            };
            var this_1 = this;
            for (var i = 0; i < permissionName.length; i++) {
                _loop_1(i);
            }
        }
        else {
            if (this.aclService.data.abilities.find(function (item) { return item === permissionName; })) {
                return;
            }
            this.aclService.attachRole([permissionName]);
        }
    };
    /**
     * 移除单个/多个权限
     * @param permissionName (单个/多个)权限名称
     */
    PermissionService.prototype.removePermission = function (permissionName) {
        if (!permissionName || permissionName.length === 0) {
            return;
        }
        if (Array.isArray(permissionName)) {
            this.aclService.removeRole(permissionName);
        }
        else {
            this.aclService.removeRole([permissionName]);
        }
    };
    /**
     * 清空所有权限
     */
    PermissionService.prototype.clear = function () {
        var tmppermissionNames = this.aclService.data.abilities;
        this.removePermission(tmppermissionNames);
    };
    /**
     * 填充数据
     * @param auth
     */
    PermissionService.prototype.extend = function (auth) {
        var permissions = [];
        for (var permission in auth.grantedPermissions) {
            permissions.push(permission);
        }
        this.addPermission(permissions);
    };
    PermissionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [acl_1.ACLService])
    ], PermissionService);
    return PermissionService;
}());
exports.PermissionService = PermissionService;
