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
var modal_component_base_1 = require("@shared/component-base/modal-component-base");
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var utils_service_1 = require("@abp/utils/utils.service");
var AppConsts_1 = require("abpPro/AppConsts");
// import cardreader from 'assets/baseISSOnline.js';
// import ZK from 'assets/baseISSObject.js';
var CreateOrEditPassengerComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditPassengerComponent, _super);
    // issOnlineUrl = "http://127.0.0.1:24010/ZKIDROnline";
    // browserFlag :any;
    /**
     * 初始化的构造函数
     */
    function CreateOrEditPassengerComponent(injector, _customerService, _utilsService) {
        var _this = _super.call(this, injector) || this;
        _this._customerService = _customerService;
        _this._utilsService = _utilsService;
        /**
         * 编辑时DTO的id
         */
        _this.entity = new service_proxies_1.CustomerEditDto();
        _this.uploadurl = '';
        _this.hearder = {
            Authorization: ''
        };
        _this.photo = '';
        _this.cantakepic = true;
        return _this;
    }
    CreateOrEditPassengerComponent.prototype.ngOnInit = function () {
        this.init();
        this.getBrowserType();
        var Cardreaderset = {
            Cert: {
                callBack: function (result) {
                    console.log(result);
                    this.setCertificateData(result);
                },
                select: this.elementRef.nativeElement.querySelector('.readfile')
            },
            Methods: {
                showMessage: function (type, message) {
                    console.log(type, message);
                },
                downloadDrive: function () {
                    abp.message.warn("请安装相关硬件驱动！");
                }
            }
        };
        // cardreader(Cardreaderset);
    };
    CreateOrEditPassengerComponent.prototype.getBrowserType = function () {
        var browserFlag = "";
        //是否支持html5的cors跨域
        if (typeof (Worker) !== "undefined") {
            browserFlag = "html5";
        }
        //此处判断ie8、ie9
        else if (navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent
            .indexOf("MSIE 9.0") > 0) {
            browserFlag = "simple";
        }
        else {
            browserFlag = "upgradeBrowser"; //当前浏览器不支持该功能,请升级浏览器
        }
        // this.browserFlag=browserFlag
    };
    CreateOrEditPassengerComponent.prototype.setCertificateData = function (result) {
        console.log(result.Certificate);
        //姓名
        // F.ui.CustomerName.setText(result.Certificate.Name);
        // //身份证号
        // F.ui.IdNumber.setText(result.Certificate.IDNumber);
        // //性别 
        // var sex = result.Certificate.Sex == "男" ? "M" : "W";
        // F.ui.Sex.setValue(sex);
        //身份证头像
        //imgData =result.Certificate.Base64Photo;
        //$("#id_img_pers").attr("src","data:image/jpg;base64,"+imgData);
        //$("#birthday").val(result.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
        //$("#certNumber").val(result.Certificate.IDNumber);
        //$("#idIssued").val(result.Certificate.IDIssued);
        //$("#issuedValidDate").val(result.Certificate.IssuedData+"-"+result.Certificate.ValidDate);
        //imgData =result.Certificate.Base64Photo;
        //$("#id_img_pers").attr("src","data:image/jpg;base64,"+imgData);
        //$("#personIdPhoto").val(imgData);
        //$("#personPhoto").val("");
        //$("#personName").val(result.Certificate.Name);
        //$("#gender").val(result.Certificate.Sex);
        //$("#nation").val(result.Certificate.Nation);
        //$("#address").val(result.Certificate.Address);
    };
    CreateOrEditPassengerComponent.prototype.legal = function (con) {
        // console.log(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(this.entity.certificatesNum))
        // console.log(/(H|M)(\d{10})$/.test(this.entity.certificatesNum))
        // console.log(/(^\d{8})$/.test(this.entity.certificatesNum))
        console.log(this.entity.verifiableType == service_proxies_1.VerifiableTypeEnum.IdentityCard);
        if (!(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(this.entity.certificatesNum)) && this.entity.verifiableType == service_proxies_1.VerifiableTypeEnum.IdentityCard) { //身份证
            con.setErrors({ legal: true });
        }
        if (!(/(H|M)(\d{10})$/.test(this.entity.certificatesNum)) && this.entity.verifiableType == service_proxies_1.VerifiableTypeEnum.IdentityCard) { //回乡证
            con.setErrors({ legal: true });
        }
        if (!(/(^\d{8})$/.test(this.entity.certificatesNum))) { //台胞证
            con.setErrors({ legal: true });
        }
    };
    CreateOrEditPassengerComponent.prototype.init = function () {
        var _this = this;
        this.uploadurl = AppConsts_1.AppConsts.remoteServiceBaseUrl + '/api/File/UploadImageAsync';
        this.hearder.Authorization = 'Bearer ' + this._utilsService.getCookieValue("Abp.AuthToken");
        var that = this;
        setTimeout(function () {
            _this.video = _this.elementRef.nativeElement.querySelector('video');
            _this.canvas = _this.elementRef.nativeElement.querySelector('canvas');
            // console.log(this.video)
            _this.context = _this.canvas.getContext('2d');
            if (navigator.mediaDevices.getUserMedia) {
                var constraints = { video: { width: 190, height: 200 } };
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(function (mediaStream) {
                    var video = that.elementRef.nativeElement.querySelector('video');
                    video.srcObject = mediaStream;
                    video.onloadedmetadata = function (e) {
                        video.play();
                    };
                })
                    .catch(function (err) {
                    that.cantakepic = false;
                    // console.log(err.name + ": " + err.message); 
                });
            }
            else if (navigator.getUserMedia) {
                // this.getUserMedia({video : {width: 480, height: 320}}, this.success, this.error);
            }
            else {
                // alert('不支持访问用户媒体');
            }
        }, 1000);
    };
    CreateOrEditPassengerComponent.prototype.makepic = function () {
        var _this = this;
        if (this.cantakepic) {
            this.context.drawImage(this.video, 0, 0, 190, 200);
            var basestr = this.canvas.toDataURL("image/png");
            // console.log(basestr)
            var formdata = new service_proxies_1.UploadUserPictureDto;
            formdata.pictureString = basestr.split(',')[1];
            this._customerService.userPictureBase64(formdata)
                .subscribe(function (res) {
                console.log(res.uri);
                _this.entity.photo = res.uri;
            });
        }
        else {
            abp.message.error('无法拍照，请检查设备');
        }
    };
    CreateOrEditPassengerComponent.prototype.search = function () {
        var _this = this;
        if (this.entity.certificatesNum) {
            this._customerService.exists(this.entity.certificatesNum)
                .subscribe(function (res) {
                console.log(res);
                if (res.exist) {
                    // abp.message.success("游客信息已填入表格")
                    // this.notify.success(this.l('SavedSuccessfully'));
                    // delete res.customer.dateOfBirthStr
                    // console.log(this.entity)
                    _this.entity = res.customer;
                    _this.success(res.customer);
                }
                else {
                    abp.message.warn("当前游客信息未录入系统");
                }
            });
        }
        else {
            abp.message.error('请先输入证件号码');
        }
    };
    CreateOrEditPassengerComponent.prototype.handleChange = function (info) {
        // console.log(info)
        switch (info.file.status) {
            case 'done':
                this.photo = info.file.name;
                this.entity.photo = info.file.response.result.uri;
                break;
            case 'error':
                abp.message.error(this.l('UploadFail'));
                break;
        }
    };
    CreateOrEditPassengerComponent.prototype.submitForm = function () {
        var _this = this;
        var input = new service_proxies_1.CreateOrUpdateCustomerInput();
        // console.log(input.customer)
        // console.log(this.entity)
        var formdata = new service_proxies_1.GetCustomersInput();
        var arr = [new service_proxies_1.QueryData({
                field: "certificatesNum",
                method: "=",
                value: this.entity.certificatesNum,
                logic: "and"
            })];
        formdata.queryData = arr;
        formdata.sorting = null;
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;
        this._customerService.getPaged(formdata)
            .subscribe(function (result) {
            console.log(result.items);
            if (result.items.length > 0) {
                abp.message.warn("当前游客信已录入系统，已替换为系统中游客信息");
                _this.success(result.items[0]);
            }
            else {
                _this.entity.loginPwd = "12346";
                input.customer = _this.entity;
                _this.saving = true;
                _this._customerService.createOrUpdate(input)
                    .finally(function () { return (_this.saving = false); })
                    .subscribe(function (res) {
                    console.log(res);
                    _this._customerService.exists(_this.entity.certificatesNum)
                        .subscribe(function (res) {
                        console.log(res);
                        _this.notify.success(_this.l('SavedSuccessfully'));
                        _this.success(res.customer);
                    });
                });
            }
        });
    };
    CreateOrEditPassengerComponent = __decorate([
        core_1.Component({
            selector: 'create-or-edit-passenger',
            templateUrl: './create-or-edit-passenger.component.html',
            styleUrls: [
                'create-or-edit-passenger.component.less'
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            service_proxies_1.CustomerServiceProxy,
            utils_service_1.UtilsService])
    ], CreateOrEditPassengerComponent);
    return CreateOrEditPassengerComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditPassengerComponent = CreateOrEditPassengerComponent;
