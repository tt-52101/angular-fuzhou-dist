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
var service_proxies_1 = require("@shared/service-proxies/service-proxies");
var util_1 = require("@delon/util");
var component_base_1 = require("@shared/component-base");
var EditionFeatureTreeComponent = /** @class */ (function (_super) {
    __extends(EditionFeatureTreeComponent, _super);
    function EditionFeatureTreeComponent(arrayService, injector) {
        var _this = _super.call(this, injector) || this;
        _this.arrayService = arrayService;
        /**
         * 树数据
         */
        _this.treeData = [];
        return _this;
    }
    Object.defineProperty(EditionFeatureTreeComponent.prototype, "editData", {
        /**
         * 编辑用的数据
         */
        set: function (val) {
            this._featureSourceData = val;
            this.processsTreeData();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 将数据转换成树
     */
    EditionFeatureTreeComponent.prototype.processsTreeData = function () {
        var _this = this;
        this.treeData = this.arrayService.arrToTreeNode(this._featureSourceData.features, {
            idMapName: 'name',
            parentIdMapName: 'parentName',
            titleMapName: 'displayName',
        });
        this.arrayService.visitTree(this.treeData, function (item) {
            item.isLeaf = true;
            _this.fullTreeData(item, item.origin.name);
        });
    };
    /**
     * 填充数据到节点
     * @param node
     * @param featureName
     */
    EditionFeatureTreeComponent.prototype.fullTreeData = function (node, featureName) {
        var feature = this._featureSourceData.featureValues.find(function (item) { return item.name === featureName; });
        // 默认值
        if (!feature) {
            var defaultValue = this.convertValue(node.origin.inputType, node.origin.defaultValue);
            if (typeof defaultValue === "boolean") {
                node.isChecked = defaultValue;
                node.origin.value = node.isChecked;
            }
            else {
                node.origin.value = defaultValue;
            }
            return;
        }
        var featureValue = this.convertValue(node.origin.inputType, feature.value);
        if (typeof featureValue === "boolean") {
            node.isChecked = featureValue;
            node.origin.value = node.isChecked;
        }
        else {
            node.origin.value = featureValue;
        }
    };
    /**
     * 根据功能绑定控件类型做转换值
     * @param inputType
     * @param value
     */
    EditionFeatureTreeComponent.prototype.convertValue = function (inputType, value) {
        if (inputType.name === "CHECKBOX") {
            return value === "true";
        }
        return value;
    };
    /**
     * 所有的功能和值
     */
    EditionFeatureTreeComponent.prototype.getGrantedFeatures = function () {
        if (!this.treeData) {
            return [];
        }
        var features = [];
        this.arrayService.visitTree(this.treeData, function (item) {
            var feature = new service_proxies_1.NameValueDto();
            feature.name = item.origin.name;
            feature.value = item.origin.value;
            features.push(feature);
        });
        return features;
    };
    /**
     * 遍历树校验数据
     */
    EditionFeatureTreeComponent.prototype.areAllValuesValid = function () {
        var _this = this;
        var result = true;
        this.arrayService.visitTree(this.treeData, function (item) {
            if (!_this.isFeatureValueValid(item.origin, item.origin.value)) {
                result = false;
            }
        });
        return result;
    };
    /**
     * 是否为子节点
     * @param node
     */
    EditionFeatureTreeComponent.prototype.isLeaf = function (node) {
        return node.children && Array.isArray(node.children) && node.children.length > 0;
    };
    /**
     * 是否展开
     * @param node
     * @param value
     */
    EditionFeatureTreeComponent.prototype.setNodeIsExpanded = function (node, value) {
        node.isExpanded = value;
    };
    /**
     * 功能的数据校验
     * @param feature 功能
     * @param value 值
     */
    EditionFeatureTreeComponent.prototype.isFeatureValueValid = function (feature, value) {
        if (!feature || !feature.inputType || !feature.inputType.validator) {
            return true;
        }
        var validator = feature.inputType.validator;
        if (validator.name === 'STRING') {
            if (value === undefined || value === null) {
                return validator.allowNull;
            }
            if (typeof value !== 'string') {
                return false;
            }
            if (validator.minLength > 0 && value.length < validator.minLength) {
                return false;
            }
            if (validator.maxLength > 0 && value.length > validator.maxLength) {
                return false;
            }
            if (validator.regularExpression) {
                return (new RegExp(validator.regularExpression)).test(value);
            }
        }
        else if (validator.name === 'NUMERIC') {
            var numValue = parseInt(value);
            if (isNaN(numValue)) {
                return false;
            }
            var minValue = validator.minValue;
            if (minValue > numValue) {
                return false;
            }
            var maxValue = validator.maxValue;
            if (maxValue > 0 && numValue > maxValue) {
                return false;
            }
        }
        return true;
    };
    EditionFeatureTreeComponent = __decorate([
        core_1.Component({
            selector: 'edition-feature-tree',
            templateUrl: './edition-feature-tree.component.html',
            styleUrls: ['./edition-feature-tree.component.less']
        }),
        __metadata("design:paramtypes", [util_1.ArrayService,
            core_1.Injector])
    ], EditionFeatureTreeComponent);
    return EditionFeatureTreeComponent;
}(component_base_1.AppComponentBase));
exports.EditionFeatureTreeComponent = EditionFeatureTreeComponent;
