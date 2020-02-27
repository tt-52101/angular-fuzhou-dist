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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("@shared/shared.module");
var form_1 = require("@delon/form");
// import { TinymceWidget } from './widgets/tinymce/tinymce.widget';
// import { UEditorWidget } from './widgets/ueditor/ueditor.widget';
exports.SCHEMA_THIRDS_COMPONENTS = [
// TinymceWidget,
// UEditorWidget
];
var JsonSchemaModule = /** @class */ (function () {
    function JsonSchemaModule(widgetRegistry) {
        // widgetRegistry.register(TinymceWidget.KEY, TinymceWidget);
        // widgetRegistry.register(UEditorWidget.KEY, UEditorWidget);
    }
    JsonSchemaModule = __decorate([
        core_1.NgModule({
            declarations: exports.SCHEMA_THIRDS_COMPONENTS,
            entryComponents: exports.SCHEMA_THIRDS_COMPONENTS,
            imports: [
                shared_module_1.SharedModule,
                form_1.DelonFormModule.forRoot()
            ],
            exports: __spreadArrays(exports.SCHEMA_THIRDS_COMPONENTS)
        }),
        __metadata("design:paramtypes", [form_1.WidgetRegistry])
    ], JsonSchemaModule);
    return JsonSchemaModule;
}());
exports.JsonSchemaModule = JsonSchemaModule;
