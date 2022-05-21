// ==UserScript==
// @name         Unlimit-Web
// @namespace    https://github.com/xcanwin/
// @version      1.3
// @description  解除网页限制: 恢复文字的选中和复制, 去除复制时的小尾巴, 恢复页面右键菜单. Remove webpage restrictions: restore the selection and copy of text, remove the text tail, and restore the right-click menu.
// @author       xcanwin
// @license      AGPL
// @updateURL    https://raw.githubusercontent.com/xcanwin/Unlimit-Web/master/Unlimit-Web.user.js
// @downloadURL  https://raw.githubusercontent.com/xcanwin/Unlimit-Web/master/Unlimit-Web.user.js
// @supportURL   https://github.com/xcanwin/Unlimit-Web/
// @match        *://*/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
    //Test in: https://dafrok.github.io/vue-iscroll-view/
	//Test in: https://www.cnblogs.com/LyShark/p/12411435.html
	//Test in: https://www.bilibili.com/read/cv5496952
	//Test in: http://www.360doc.com/content/20/0406/19/1575720_904264035.shtml
	//Test in: https://www.cnblogs.com/k8gege/p/11223393.html
	//Test in: http://shushan.zhangyue.net/book/89159/13507319/

	var main = function(){
		Array.prototype.forEach.call(document.getElementsByTagName("*"), function(el) {
            console.log(el.childNodes.length);

			[
                "user-select", "-webkit-user-select", "-moz-user-select", "-ms-user-select", "-khtml-user-select"
            ].forEach(xcanwin => {
				var filterstyle = document.defaultView.getComputedStyle(el, null)[xcanwin];
				if (filterstyle && filterstyle == 'none') {
					el.style[xcanwin] = "text";
				}
			});

			[
                "pointer-events"
            ].forEach(xcanwin => {
				var filterstyle = document.defaultView.getComputedStyle(el, null)[xcanwin];
				if (filterstyle && filterstyle != 'auto') {
					el.style[xcanwin] = "auto !important";
				}
			});

            [
                "onselect", "onselectstart", "onselectionchange",
                "oncontextmenu",
                "oncopy", "onbeforecopy",
                "onkeypress", "onkeyup",
                "onpaste", "onbeforepaste", "oncut", "onbeforecut",
                "onmouseenter", "onmouseleave",
                "onpointercancel", "onpointerdown", "onpointerenter", "onpointerleave", "onpointerlockchange", "onpointerlockerror", "onpointermove", "onpointerout", "onpointerover", "onpointerrawupdate", "onpointerup"
            ].forEach(xcanwin => {
				el[xcanwin] = function(e) {
					e.stopImmediatePropagation();
				}
			});
		});
	};

	main();
})();