// ==UserScript==
// @name         Unlimit-Web
// @description  解除网页限制: 恢复文本的选中和复制, 过滤文本小尾巴, 恢复右键菜单. Remove webpage restrictions: restore the selection and copy of text, clear the text tail, and restore the right-click menu.
// @version      5.0
// @author       xcanwin
// @namespace    https://github.com/xcanwin/Unlimit-Web/
// @supportURL   https://github.com/xcanwin/Unlimit-Web/
// @updateURL    https://raw.githubusercontent.com/xcanwin/Unlimit-Web/main/Unlimit-Web.user.js
// @downloadURL  https://raw.githubusercontent.com/xcanwin/Unlimit-Web/main/Unlimit-Web.user.js
// @icon         data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" stroke-width="2" fill="none" stroke="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
// @license      GPL-2.0-only
// @match        *://*/*
// @match        *://blog.csdn.net/*
// @match        *://www.bilibili.com/*
// @match        *://360doc.com/*
// @match        *://guofeng.yuedu.163.com/*
// @match        *://kuwo.cn/*
// @match        *://chuangshi.qq.com/*
// @match        *://read.qidian.com/*
// @match        *://dafrok.github.io/*
// @match        *://shushan.zhangyue.net/*
// @match        *://aqistudy.cn/*
// @match        *://xuexila.com/*
// @match        *://51test.net/*
// @match        *://laokaoya.com/*
// @match        *://utaten.com/*
// @match        *://book.qq.com/*
// @match        *://doc.mbalib.com/*
// @match        *://oh100.com/*
// @match        *://51test.net/*
// @match        *://cspengbo.com/*
// @match        *://diyifanwen.com/*
// @match        *://ahsrst.cn/*
// @match        *://kt250.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const $ = (Selector, el) => (el || document).querySelector(Selector);
    const $$ = (Selector, el) => (el || document).querySelectorAll(Selector);

    const main = () => {
        $$("*").forEach(el => {
            [
                "user-select", "-webkit-user-select", "-moz-user-select", "-ms-user-select", "-khtml-user-select", "pointer-events",
            ].forEach(xcanwin => {
                const ec = el.childNodes;
                const j1 = ec && ec.length == 1 && ec[0] && ec[0].nodeType && ec[0].nodeType == 3;
                const style = document.defaultView.getComputedStyle(el, null)[xcanwin];
                const j2 = style && style != 'auto';
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
                el[xcanwin] = e => {
                    // 处理能影响文本的事件
                    e.stopImmediatePropagation();
                }
            });

            [
                "onmouseenter", "onmousedown", "onmouseup", "onmouseout", "onmouseleave", "onmouseover",
            ].forEach(xcanwin => {
                el[xcanwin] = e => {
                    if ([ "P" ].indexOf(e.target.nodeName) >=0 && e.button == 0) {
                        // 处理单击左键和滑动左键下的html文本标签
                        e.stopImmediatePropagation();
                    }
                }
            });

            [
                "onkeypress", "onkeyup", "onkeydown",
            ].forEach(xcanwin => {
                el[xcanwin] = e => {
                    const keyCode = e.keyCode || e.which || e.charCode;
                    const ctrlKey = e.ctrlKey || e.metaKey;
                    if ((ctrlKey && keyCode == 67) || keyCode == 123) {
                        // 处理ctrl+c和F12
                        e.stopImmediatePropagation();
                    }
                }
            });

            [
                "oncontextmenu",
            ].forEach(xcanwin => {
                el[xcanwin] = e => {
                    if (e.target && e.target.points == undefined){
                        // 处理普通的单击右键，跳过滑动右键
                        e.stopImmediatePropagation();
                    }
                }
            });
        });

        console.clear = () => {};
        window.debugger = () => {};
    };

    main();

})();
