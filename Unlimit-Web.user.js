// ==UserScript==
// @name         Unlimit-Web
// @description  解除网页限制: 恢复文本的选中和复制, 过滤文本小尾巴, 恢复右键菜单. Remove webpage restrictions: restore the selection and copy of text, clear the text tail, and restore the right-click menu.
// @version      3.7
// @author       xcanwin
// @namespace    https://github.com/xcanwin/Unlimit-Web/
// @supportURL   https://github.com/xcanwin/Unlimit-Web/
// @license      AGPL-3.0-only
// @icon         data:image/png;base64,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
// @updateURL    https://raw.githubusercontent.com/xcanwin/Unlimit-Web/master/Unlimit-Web.user.js
// @downloadURL  https://raw.githubusercontent.com/xcanwin/Unlimit-Web/master/Unlimit-Web.user.js
// @run-at       document-end
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let main = function(){
        Array.prototype.forEach.call(document.getElementsByTagName("*"), function(el) {
            [
                "user-select", "-webkit-user-select", "-moz-user-select", "-ms-user-select", "-khtml-user-select", "pointer-events",
            ].forEach(xcanwin => {
                let ec = el.childNodes;
                let j1 = ec && ec.length == 1 && ec[0] && ec[0].nodeType && ec[0].nodeType == 3;
                let style = document.defaultView.getComputedStyle(el, null)[xcanwin];
                let j2 = style && style != 'auto';
                if (j1 || j2){
                    // 处理第一个子标签是text类型的标签，处理select值被修改过的标签
                    el.style.setProperty(xcanwin, "text", "important");
                }
            });

            [
                "onselect", "onselectstart", "onselectionchange",
                "oncopy", "onbeforecopy",
                "onpaste", "onbeforepaste", "oncut", "onbeforecut",
                "onpointercancel", "onpointerdown", "onpointerenter", "onpointerleave", "onpointerlockchange", "onpointerlockerror", "onpointermove", "onpointerout", "onpointerover", "onpointerrawupdate", "onpointerup",
            ].forEach(xcanwin => {
                el[xcanwin] = function(e) {
                    // 处理能影响文本的事件
                    e.stopImmediatePropagation();
                }
            });

            [
                "onmouseenter", "onmousedown", "onmouseup", "onmouseout", "onmouseleave", "onmouseover",
            ].forEach(xcanwin => {
                el[xcanwin] = function(e) {
                    if ([ "P" ].indexOf(e.target.nodeName) >=0 && e.button == 0) {
                        // 处理单击左键和滑动左键下的html文本标签
                        e.stopImmediatePropagation();
                    }
                }
            });

            [
                "onkeypress", "onkeyup", "onkeydown",
            ].forEach(xcanwin => {
                el[xcanwin] = function(e) {
                    let keyCode = e.keyCode || e.which || e.charCode;
                    let ctrlKey = e.ctrlKey || e.metaKey;
                    if ((ctrlKey && keyCode == 67) || keyCode == 123) {
                        // 处理ctrl+c和F12
                        e.stopImmediatePropagation();
                    }
                }
            });

            [
                "oncontextmenu",
            ].forEach(xcanwin => {
                el[xcanwin] = function(e) {
                    if (e.target && e.target.points == undefined){
                        // 处理普通的单击右键，跳过滑动右键
                        e.stopImmediatePropagation();
                    }
                }
            });
        });
    };

    main();
})();