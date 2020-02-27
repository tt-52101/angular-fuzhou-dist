"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
function appModuleAnimation() {
    return slideFromBottom();
}
exports.appModuleAnimation = appModuleAnimation;
function accountModuleAnimation() {
    return slideFromUp();
}
exports.accountModuleAnimation = accountModuleAnimation;
function slideFromBottom() {
    return animations_1.trigger('routerTransition', [
        animations_1.state('void', animations_1.style({ 'padding-top': '20px', opacity: '0' })),
        animations_1.state('*', animations_1.style({ 'padding-top': '0px', opacity: '1' })),
        animations_1.transition(':enter', [
            animations_1.animate('0.33s ease-out', animations_1.style({ opacity: '1', 'padding-top': '0px' }))
        ])
    ]);
}
exports.slideFromBottom = slideFromBottom;
function slideFromUp() {
    return animations_1.trigger('routerTransition', [
        animations_1.state('void', animations_1.style({ 'margin-top': '10px', opacity: '0' })),
        animations_1.state('*', animations_1.style({ 'margin-top': '0px', opacity: '1' })),
        animations_1.transition(':enter', [
            animations_1.animate('0.3s ease-out', animations_1.style({ opacity: '1', 'margin-top': '0px' }))
        ])
    ]);
}
exports.slideFromUp = slideFromUp;
