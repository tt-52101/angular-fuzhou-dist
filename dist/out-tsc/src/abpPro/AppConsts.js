"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConsts = /** @class */ (function () {
    function AppConsts() {
    }
    AppConsts.uploadApiUrl = '/api/File/Upload';
    AppConsts.maxProfilPictureMb = 1; // 个人头像上传最大MB
    AppConsts.userManagement = {
        defaultAdminUserName: 'admin'
    };
    AppConsts.localization = {
        defaultLocalizationSourceName: 'Yozeev'
    };
    AppConsts.authorization = {
        encrptedAuthTokenName: 'enc_auth_token'
    };
    /**
     * 数据表格设置
     */
    // tslint:disable-next-line:member-ordering
    AppConsts.grid = {
        /**
         * 每页显示条目数
         */
        defaultPageSize: 10,
        /**
         * 每页显示条目数下拉框值
         */
        defaultPageSizes: [5, 10, 15, 20, 25, 30, 50, 80, 100]
    };
    /**
     * top bar通知组件中获取通知数量
     */
    AppConsts.notificationCount = 5;
    return AppConsts;
}());
exports.AppConsts = AppConsts;
