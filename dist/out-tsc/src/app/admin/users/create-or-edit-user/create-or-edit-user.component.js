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
var AppConsts_1 = require("abpPro/AppConsts");
var _ = require("lodash");
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
// tslint:disable-next-line:max-line-length
var organization_unit_tree_component_1 = require("@app/admin/shared/organization-unit-tree/organization-unit-tree.component");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var token_service_1 = require("@abp/auth/token.service");
var CreateOrEditUserComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditUserComponent, _super);
    //#endregion
    function CreateOrEditUserComponent(injector, _profileService, _userService, _tokenService) {
        var _this = _super.call(this, injector) || this;
        _this._profileService = _profileService;
        _this._userService = _userService;
        _this._tokenService = _tokenService;
        /**
         * 发送激活邮件
         */
        _this.sendActivationEmail = true;
        /**
         * 随机密码
         */
        _this.setRandomPassword = false;
        /**
         * 是否启用双重因素身份验证
         */
        _this.isTwoFactorEnabled = _this.setting.getBoolean('Abp.Zero.UserManagement.TwoFactorLogin.IsEnabled');
        /**
         * 是否启用锁定
         */
        _this.isLockoutEnabled = _this.setting.getBoolean('Abp.Zero.UserManagement.UserLockOut.IsEnabled');
        /**用户实体信息 */
        _this.user = new service_proxies_1.UserEditDto();
        /**
         * 是否为管理员
         */
        _this.isAdmin = false;
        //#region 头像功能
        /**
         * 图片最大大小 M
         */
        _this.maxProfilPictureBytesValue = AppConsts_1.AppConsts.maxProfilPictureMb;
        /**
         * 图片上传后台处理地址
         */
        _this.uploadPictureUrl = AppConsts_1.AppConsts.remoteServiceBaseUrl +
            '/Profile/UploadProfilePictureReturnFileId';
        /**
         * 头像列表
         */
        _this.profileList = [];
        /**
         * 编辑时加载图像
         */
        _this.profileLoading = false;
        /**
         * 头像预览地址
         */
        _this.profilePreviewImage = '';
        /**
         * 预览头像Modal控制
         */
        _this.profilePreviewVisible = false;
        //#region 头像功能
        /**
         * 图片上传前
         */
        _this.beforeUpload = function (file) {
            var isJPG = file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'image/gif';
            if (!isJPG) {
                abp.message.error(_this.l('OnlySupportPictureFile'));
            }
            var isLtXM = file.size / 1024 / 1024 < _this.maxProfilPictureBytesValue;
            if (!isLtXM) {
                abp.message.error(_this.l('ProfilePicture_Warn_SizeLimit', _this.maxProfilPictureBytesValue));
            }
            var isValid = isJPG && isLtXM;
            return isValid;
        };
        /**
         * 头像预览处理
         */
        _this.handleProfilePreview = function (file) {
            _this.profilePreviewImage = file.url || file.thumbUrl;
            _this.profilePreviewVisible = true;
        };
        /**
         * 移除头像，同时删除数据中的图像数据
         */
        _this.removeProfilePicture = function (file) {
            if (!_this.user.profilePictureId)
                return rxjs_1.of(true);
            if (!_this.isGranted('Pages.Administration.Users.DeleteProfilePicture')) {
                abp.message.error(_this.l('YouHaveNoXPermissionsWarningMessage', _this.l('DeleteProfilePicture')));
                return rxjs_1.of(false);
            }
            _this._profileService
                .deleteProfilePictureById(_this.user.profilePictureId)
                .pipe(operators_1.catchError(function (err) { return rxjs_1.of('deleteProfilePicture fail!'); }))
                .subscribe(function (res) {
                _this.user.profilePictureId = '';
                abp.message.success(_this.l('SuccessfullyDeleted'));
            });
            return rxjs_1.of(true);
        };
        // 设置头部信息
        _this.uploadHeaders = {
            Authorization: 'Bearer ' + _this._tokenService.getToken()
        };
        return _this;
    }
    CreateOrEditUserComponent.prototype.ngOnInit = function () {
        if (!this.id) {
            this.setRandomPassword = false;
            this.sendActivationEmail = true;
        }
        else {
        }
        this.init();
    };
    CreateOrEditUserComponent.prototype.ngAfterViewInit = function () { };
    /**
     * 获取数据
     */
    CreateOrEditUserComponent.prototype.init = function () {
        var _this = this;
        this._userService.getForEditTree(this.id).subscribe(function (result) {
            _this.user = result.user;
            // 是否为管理员
            _this.isAdmin =
                result.user.userName === AppConsts_1.AppConsts.userManagement.defaultAdminUserName;
            // 角色
            _this.roles = result.roles;
            // 组织机构树
            _this.allOrganizationUnits = result.allOrganizationUnits;
            _this.memberedOrganizationUnits = result.memberedOrganizationUnits;
            _this.getProfilePicture(result.user.profilePictureId);
            if (_this.id) {
                setTimeout(function () {
                    _this.setRandomPassword = false;
                }, 0);
                _this.sendActivationEmail = false;
            }
            // 设置组织机构树
            // this.setOrganizationUnitTreeData();
            // console.log(this.uploadPictureUrl);
        });
    };
    CreateOrEditUserComponent.prototype.setOrganizationUnitTreeData = function () {
        this.organizationUnitTree.data = {
            allOrganizationUnits: this.allOrganizationUnits,
            selectedOrganizationUnits: this.memberedOrganizationUnits
        };
    };
    // 提交保存信息
    CreateOrEditUserComponent.prototype.save = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateUserInput();
        input.user = this.user;
        input.user.emailAddress = '123@qq.com';
        input.setRandomPassword = this.setRandomPassword;
        input.sendActivationEmail = this.sendActivationEmail;
        input.assignedRoleNames = _.map(_.filter(this.roles, { isAssigned: true }), function (role) { return role.roleName; });
        // 组织机构
        // input.organizationUnits = this.organizationUnitTree.getSelectedOrganizations();
        input.organizationUnits = [];
        this._userService
            .createOrUpdate(input)
            .finally(function () {
            _this.saving = false;
        })
            .subscribe(function () {
            _this.notify.success(_this.l('SavedSuccessfully'));
            _this.success();
        });
    };
    /**
     * 是否为编辑状态
     */
    CreateOrEditUserComponent.prototype.isEdit = function () {
        return this.id !== -1;
    };
    /**
     * 获取选中角色的数量
     */
    CreateOrEditUserComponent.prototype.getAssignedRoleCount = function () {
        return _.filter(this.roles, { isAssigned: true }).length;
    };
    /**
     * 选择图片后上传事件
     * @param info 反馈信息
     */
    CreateOrEditUserComponent.prototype.uploadPictureChange = function (info) {
        // 状态选择
        switch (info.file.status) {
            case 'done': // 上传完成
                // 获取服务端返回的信息
                if (info.file.response.success) {
                    // 上传成功后直接把图片Id给user实体
                    this.user.profilePictureId =
                        info.file.response.result.profilePictureId;
                }
                break;
            case 'error': // 上传错误
                abp.message.error(this.l('UploadFailed'));
                break;
        }
    };
    /**
     * 通过头像Id获取头像
     * @param profilePictureId 头像Id
     */
    CreateOrEditUserComponent.prototype.getProfilePicture = function (profilePictureId) {
        var _this = this;
        if (profilePictureId) {
            this.profileLoading = true;
            this._profileService
                .getProfilePictureById(profilePictureId)
                .finally(function () { return (_this.profileLoading = false); })
                .subscribe(function (result) {
                if (result && result.profilePicture) {
                    _this.profilePreviewImage =
                        'data:image/jpeg;base64,' + result.profilePicture;
                    // 把图像加到头像列表 显示
                    _this.profileList = [
                        {
                            uid: -1,
                            name: profilePictureId,
                            status: 'done',
                            url: _this.profilePreviewImage
                        }
                    ];
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild(organization_unit_tree_component_1.OrganizationUnitsTreeComponent, { static: false }),
        __metadata("design:type", organization_unit_tree_component_1.OrganizationUnitsTreeComponent)
    ], CreateOrEditUserComponent.prototype, "organizationUnitTree", void 0);
    CreateOrEditUserComponent = __decorate([
        core_1.Component({
            selector: 'app-create-or-edit-user',
            templateUrl: './create-or-edit-user.component.html',
            styleUrls: ['./create-or-edit-user.component.less']
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.ProfileServiceProxy,
            service_proxies_1.UserServiceProxy,
            token_service_1.TokenService])
    ], CreateOrEditUserComponent);
    return CreateOrEditUserComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditUserComponent = CreateOrEditUserComponent;
