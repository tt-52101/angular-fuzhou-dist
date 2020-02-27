"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var ArrayToTreeConverterService = /** @class */ (function () {
    function ArrayToTreeConverterService() {
    }
    ArrayToTreeConverterService.prototype.createTree = function (array, parentIdProperty, idProperty, parentIdValue, childrenProperty, fieldMappings) {
        var _this = this;
        var tree = [];
        var nodes = _.filter(array, [parentIdProperty, parentIdValue]);
        _.forEach(nodes, function (node) {
            var newNode = {
                data: node
            };
            _this.mapFields(node, newNode, fieldMappings);
            newNode[childrenProperty] = _this.createTree(array, parentIdProperty, idProperty, node[idProperty], childrenProperty, fieldMappings);
            tree.push(newNode);
        });
        return tree;
    };
    ArrayToTreeConverterService.prototype.mapFields = function (node, newNode, fieldMappings) {
        _.forEach(fieldMappings, function (fieldMapping) {
            if (!fieldMapping['target']) {
                return;
            }
            if (fieldMapping.hasOwnProperty('value')) {
                newNode[fieldMapping['target']] = fieldMapping['value'];
            }
            else if (fieldMapping['source']) {
                newNode[fieldMapping['target']] = node[fieldMapping['source']];
            }
            else if (fieldMapping['targetFunction']) {
                newNode[fieldMapping['target']] = fieldMapping['targetFunction'](node);
            }
        });
    };
    ArrayToTreeConverterService = __decorate([
        core_1.Injectable()
    ], ArrayToTreeConverterService);
    return ArrayToTreeConverterService;
}());
exports.ArrayToTreeConverterService = ArrayToTreeConverterService;
