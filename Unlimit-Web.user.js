// ==UserScript==
// @name         解除网页限制-Unlimit-Web
// @description  解除网页限制: 恢复文本的选中和复制, 过滤文本小尾巴, 恢复右键菜单. Remove webpage restrictions: restore the selection and copy of text, clear the text tail, and restore the right-click menu.
// @version      18.0
// @author       xcanwin
// @namespace    https://github.com/xcanwin/Unlimit-Web/
// @supportURL   https://github.com/xcanwin/Unlimit-Web/
// @icon         data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" stroke-width="2" fill="none" stroke="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
// @license      GPL-2.0-only
// @match        *://www.zhihu.com/*
// @match        *://blog.csdn.net/*
// @match        *://www.bilibili.com/*
// @match        *://www.cnblogs.com/*
// @match        *://www.360doc.com/*
// @match        *://blog.51cto.com/*
// @match        *://guofeng.yuedu.163.com/*
// @match        *://www.kuwo.cn/*
// @match        *://chuangshi.qq.com/*
// @match        *://read.qidian.com/*
// @match        *://dafrok.github.io/*
// @match        *://shushan.zhangyue.net/*
// @match        *://aqistudy.cn/*
// @match        *://www.xuexila.com/*
// @match        *://www.51test.net/*
// @match        *://www.laokaoya.com/*
// @match        *://utaten.com/*
// @match        *://book.qq.com/*
// @match        *://doc.mbalib.com/*
// @match        *://www.oh100.com/*
// @match        *://51test.net/*
// @match        *://www.cspengbo.com/*
// @match        *://www.diyifanwen.com/*
// @match        *://www.ahsrst.cn/*
// @match        *://kt250.com/*
// @match        *://boke112.com/*
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_addStyle
// @run-at       document-end
// @downloadURL https://update.greasyfork.org/scripts/400515/Unlimit-Web.user.js
// @updateURL https://update.greasyfork.org/scripts/400515/Unlimit-Web.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const $ = (Selector, el) => (el || document).querySelector(Selector);
    const $$ = (Selector, el) => (el || document).querySelectorAll(Selector);

    const muob = (Selector, el, func) => {
        const observer = new MutationObserver((mutationsList, observer2) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const target = mutation.target.querySelector(Selector);
                    if (target && !target.hasAttribute('data-duplicate')) {
                        target.setAttribute('data-duplicate', 'true');
                        func(target);
                    }
                }
            }
        });
        observer.observe(el, {
            childList: true,
            subtree: true
        });
    };

    /*黑名单: 需解除限制*/
    const block_list = {
        // 域名
        domain: {
            // 初始化，首次安装插件时使用此列表，之后使用插件存储的列表
            init: ["www.zhihu.com", "blog.csdn.net","www.bilibili.com","www.cnblogs.com","www.360doc.com","blog.51cto.com","guofeng.yuedu.163.com","www.kuwo.cn","chuangshi.qq.com","read.qidian.com","dafrok.github.io","shushan.zhangyue.net","aqistudy.cn","www.xuexila.com","www.51test.net","www.laokaoya.com","utaten.com","book.qq.com","doc.mbalib.com","www.oh100.com","51test.net","www.cspengbo.com","www.diyifanwen.com","www.ahsrst.cn","kt250.com","boke112.com"],
            // 硬编码，除了使用插件存储的列表，每次也会使用此硬编码列表
            hard: [],
        },
    };

    /*白名单: 指的是放行，无需解除限制*/
    const allow_list = {
        // 网页元素名称
        element: ['script', 'style', 'video'],
        // 网页元素id
        id: ['video'],
        // 网页元素className
        className: ['video'],
    };

    const symbol = ["❎", "✅"];
    const symbol2 = ["未勾选", "已勾选"];
    let mc = [];

    const sv = (key, value = "") => {
        GM_setValue(key, value);
    };

    const gv = (key, value = "") => {
        return GM_getValue(key, value);
    };

    const purify_style = `
.unslcl {
    /* 浅色模式下的文本选中样式 */
    @media (prefers-color-scheme: light) {
        :not(foo):not(bar):not(baz):not(qux)::selection {
          background-color: #007BFF !important;
          color: white !important;
        }
    }

    /* 深色模式下的文本选中样式 */
    @media (prefers-color-scheme: dark) {
        :not(foo):not(bar):not(baz):not(qux)::selection {
          background-color: #5DACDD !important;
          color: black !important;
        }
    }
}
`;

    /*枚举网页元素*/
    const eNumUnLimit = (EL = document) => {
        $('html').classList.add('unslcl');
        $$("*", EL).forEach(unLimit);
        try {
            console.clear = () => {};
            window.debugger = () => {};
        } catch (e) {
        }
    };

    /*判断是否包含*/
    const isIn = (el, list, type) => {
        /*
        例如 'video' 包含于 ['hello', 'video']
        例如 'video' 模糊包含于 ['hello', 'good_player_top']
        例如 'good_video_top' 特殊包含于 ['hello', 'video']
        */
        switch (type) {
            case 'fuzzy': // 模糊包含
                return list.some(item => item === el || item.includes(el));
            case 'fancy': // 特殊包含
                return list.some(item => item === el || el.includes(item));
            default: // 正常包含
                return list.some(item => item === el);
        }
    };

    /*解除限制*/
    const unLimit = (el = null) => {
        if (
            isIn(el.nodeName.toLowerCase(), allow_list.element)
            || isIn(el.id?.toString().toLowerCase(), allow_list.id, 'fancy')
            || isIn(el.className?.toString().toLowerCase(), allow_list.className, 'fancy')
        ) return;

        [
            "user-select", "-webkit-user-select", "-moz-user-select", "-ms-user-select", "-khtml-user-select",
        ].forEach(xcanwin => {
            const ec = el.childNodes;
            const j1 = ec && ec.length == 1 && ec[0] && ec[0].nodeType && ec[0].nodeType == 3;
            const style = document.defaultView.getComputedStyle(el, null)[xcanwin];
            const j2 = style && style != 'auto';
            if (j1 || j2){
                // 处理第一个子标签是text类型的标签 或者 处理select值被修改过的标签
                el.style.setProperty(xcanwin, "unset", "important");
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
    };

    /*加入自动破解列表*/
    const switchAuto = (domain) => {
        let autolist = JSON.parse(gv("ul_autolist", "[]"));
        domain = domain ? domain : getdomain();
        if (isIn(domain, autolist)) {
            autolist = autolist.filter(el => el !== domain);
        } else {
            autolist.push(domain);
        }
        sv("ul_autolist", JSON.stringify(autolist));
        rmc();
        eNumUnLimit();
    };

    /*查看自动破解列表*/
    const showAuto = () => {
        // 避免重复弹窗
        if ($('#ul-modal-mask')) return;

        let list;
        try {
            list = JSON.parse(gv("ul_autolist", "[]"));
        } catch (e) {
            list = [];
        }
        // 每行一个域名，对小白用户更友好
        const value = list.join("\n");

        const mask = document.createElement('div');
        mask.id = 'ul-modal-mask';
        mask.innerHTML = `
<div id="ul-modal">
    <div id="ul-modal-head">自动破解列表</div>
    <div id="ul-modal-tip">每行填写一个网址域名，例如：www.google.com</div>
    <textarea id="ul-modal-text" spellcheck="false" placeholder="每行一个域名">${value.replace(/</g, '&lt;')}</textarea>
    <div id="ul-modal-foot">
        <button id="ul-modal-cancel" type="button">取消</button>
        <button id="ul-modal-save" type="button">保存</button>
    </div>
</div>`;
        document.body.appendChild(mask);

        const close = () => mask.remove();
        $('#ul-modal-cancel', mask).onclick = close;
        mask.onclick = e => { if (e.target === mask) close(); };
        $('#ul-modal-save', mask).onclick = () => {
            // 按行拆分，去掉空行和首尾空白，并去重
            const arr = [...new Set(
                $('#ul-modal-text', mask).value
                    .split("\n")
                    .map(s => s.trim())
                    .filter(s => s)
            )];
            sv("ul_autolist", JSON.stringify(arr));
            rmc();
            close();
        };
    };

    const modal_style = `
#ul-modal-mask {
    position: fixed; inset: 0; z-index: 2147483647;
    background: rgba(0, 0, 0, .45);
    display: flex; align-items: center; justify-content: center;
    font-family: -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif;
}
#ul-modal {
    width: 420px; max-width: 90vw;
    background: #fff; color: #1f2328;
    border-radius: 12px; overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, .25);
}
#ul-modal-head {
    padding: 16px 20px; font-size: 16px; font-weight: 600;
    border-bottom: 1px solid #eef0f2;
}
#ul-modal-tip {
    padding: 12px 20px 0; font-size: 12px; color: #8a9099; line-height: 1.5;
}
#ul-modal-text {
    display: block; box-sizing: border-box;
    width: calc(100% - 40px); height: 220px; resize: vertical;
    padding: 12px 14px; border: 1px solid #d5d8dc; border-radius: 8px;
    margin: 10px 20px 16px;
    font: 13px/1.6 ui-monospace, Menlo, Consolas, monospace;
    color: #1f2328; background: #fafbfc; outline: none;
}
#ul-modal-text:focus { border-color: #007BFF; }
#ul-modal-foot {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 0 20px 18px;
}
#ul-modal-foot button {
    padding: 8px 20px; border-radius: 8px; font-size: 14px;
    cursor: pointer; border: 1px solid transparent; transition: .15s;
}
#ul-modal-cancel { background: #f2f3f5; color: #40454c; border-color: #e2e4e8; }
#ul-modal-cancel:hover { background: #e7e9ec; }
#ul-modal-save { background: #007BFF; color: #fff; }
#ul-modal-save:hover { background: #0069d9; }
@media (prefers-color-scheme: dark) {
    #ul-modal { background: #1f2226; color: #e6e8eb; }
    #ul-modal-head { border-bottom-color: #33373d; }
    #ul-modal-tip { color: #9aa1ab; }
    #ul-modal-text { background: #17191d; color: #e6e8eb; border-color: #3a3f46; }
    #ul-modal-cancel { background: #2b2f35; color: #d0d3d8; border-color: #3a3f46; }
    #ul-modal-cancel:hover { background: #343941; }
}
`;
    GM_addStyle(modal_style);

    /*初始化自动破解列表*/
    const initAutoList = () => {
        const init = block_list.domain.init;
        //为空或者为[]时，说明首次运行，进行初始化
        if (gv("ul_autolist", "[]") === "[]") {
            sv("ul_autolist", JSON.stringify(init));
        }
        //解析移除时，进行初始化
        try {
            JSON.parse(gv("ul_autolist", "[]"));
        } catch (e) {
            sv("ul_autolist", JSON.stringify(init));
        }
    };

    /*取消注册菜单*/
    const unrmc = () => {
        mc.forEach(x => GM_unregisterMenuCommand(x));
    };

    /*注册菜单*/
    const rmc = () => {
        unrmc();
        let isauto;
        const autolist = JSON.parse(gv("ul_autolist", "[]"));
        const domain = getdomain();
        if (isIn(domain, autolist.concat(block_list.domain.hard))) {
            isauto = 1;
        } else {
            isauto = 0;
        }
        mc.push(GM_registerMenuCommand(`查看自动破解列表`, () => showAuto()));
        mc.push(GM_registerMenuCommand(`临时破解：${domain}`, () => eNumUnLimit()));
        mc.push(GM_registerMenuCommand(`自动破解：${domain} ${symbol[isauto]}${symbol2[isauto]}`, () => switchAuto(domain)));
    };

    const getdomain = () => {
        return (new URL(location.href)).hostname;
    };

    const main = () => {
        initAutoList();
        rmc();
        const autolist = JSON.parse(gv("ul_autolist", "[]"));
        const domain = getdomain();
        if (isIn(domain, autolist.concat(block_list.domain.hard))) {
            eNumUnLimit();
            setInterval(() => eNumUnLimit(), 3000);
            muob(`*`, $(`body`), unLimit);
            GM_addStyle(purify_style);
        }
    };

    main();

})();
