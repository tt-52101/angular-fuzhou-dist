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
var organization_unit_tree_component_1 = require("@app/admin/shared/organization-unit-tree/organization-unit-tree.component");
var CreateOrEditComponent = /** @class */ (function (_super) {
    __extends(CreateOrEditComponent, _super);
    function CreateOrEditComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.forminfo = {
            info1: '',
            info2: '',
            info3: 1,
            info4: [],
            info5: '',
            info6: '',
            info7: [],
            info8: '',
        };
        _this.selectlist = [
            { key: "订阅号", value: 1 },
            { key: "认证订阅号", value: 2 },
            { key: "服务号", value: 3 },
            { key: "认证服务号", value: 4 }
        ];
        return _this;
    }
    CreateOrEditComponent.prototype.ngOnInit = function () {
        this.init();
    };
    CreateOrEditComponent.prototype.init = function () {
    };
    CreateOrEditComponent.prototype.EditorCreated = function (quill) {
        // console.log(quill)
        var toolbar = quill.getModule('toolbar');
        // console.log(toolbar)
        toolbar.addHandler('image', this.imageHandler.bind(this));
        // console.log(toolbar)
        this.editor = quill;
    };
    CreateOrEditComponent.prototype.imageHandler = function () {
        var _this = this;
        var Imageinput = document.createElement('input');
        Imageinput.setAttribute('type', 'file');
        Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        Imageinput.classList.add('ql-image');
        Imageinput.addEventListener('change', function () {
            console.log(Imageinput.files);
            var file = Imageinput.files[0];
            var data = new FormData();
            data.append('file', file, file.name);
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            var options = { headers: headers };
            // console.log(data)
            if (Imageinput.files != null && Imageinput.files[0] != null) {
                // this.http.post('http://xxxx/upload', data, options)
                // .subscribe(res => {
                var range = _this.editor.getSelection(true);
                var index = range.index + range.length;
                // this.editor.insertEmbed(range.index, 'image','http://'+res.url);
                // });
            }
        });
        Imageinput.click();
    };
    CreateOrEditComponent.prototype.contentChanged = function (quill) {
        // console.log(quill.html)
        this.forminfo.info8 = quill.html;
    };
    CreateOrEditComponent.prototype.save = function () {
    };
    __decorate([
        core_1.ViewChild(organization_unit_tree_component_1.OrganizationUnitsTreeComponent, { static: false }),
        __metadata("design:type", organization_unit_tree_component_1.OrganizationUnitsTreeComponent)
    ], CreateOrEditComponent.prototype, "organizationUnitTree", void 0);
    CreateOrEditComponent = __decorate([
        core_1.Component({
            selector: 'app-create-or-edit',
            templateUrl: './create-or-edit.component.html',
            styleUrls: ['./create-or-edit.component.less']
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], CreateOrEditComponent);
    return CreateOrEditComponent;
}(modal_component_base_1.ModalComponentBase));
exports.CreateOrEditComponent = CreateOrEditComponent;
