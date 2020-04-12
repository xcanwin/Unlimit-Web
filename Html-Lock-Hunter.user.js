// ==UserScript==
// @name         Html-Lock-Hunter
// @namespace    https://github.com/xcanwin/
// @version      0.6.2
// @description  解除网页限制: 恢复文字的选中和复制, 去除复制时的小尾巴, 恢复页面右键菜单. Remove webpage restrictions: restore the selection and copy of text, remove the text tail, and restore the right-click menu.
// @author       xcanwin
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/xcanwin/Html-Lock-Hunter/master/Html-Lock-Hunter.user.js
// @supportURL   https://github.com/xcanwin/Html-Lock-Hunter/
// @match        *://www.bilibili.com/read/*
// @match        *://www.360doc.com/*
// @match        *://www.cnblogs.com/*
// @match        *://read.qidian.com/*
// @match        *://shushan.zhangyue.net/*
//
// @match        *://*/*
//
// @grant        all
// ==/UserScript==

(function() {
	'use strict';
	//Test in: https://www.cnblogs.com/LyShark/p/12411435.html
	//Test in: https://www.bilibili.com/read/cv5496952
	//Test in: http://www.360doc.com/content/20/0406/19/1575720_904264035.shtml
	//Test in: https://www.cnblogs.com/k8gege/p/11223393.html
	//Test in: http://shushan.zhangyue.net/book/89159/13507319/

	var loop = function(func){
		// When reaching the goal, the function should needs to return true to pause the interval.
		var loop_time = 10;
		func.interval = setInterval(function(){
			if (func.time){
				if (func.time >= loop_time){
					clearInterval(func.interval);
					return 0;
				}
				func.time += 1;
			} else {
				func.time = 1;
			}
			//console.log(func.name + ":" + func.time);
			if (func()){
				clearInterval(func.interval);
				return 0;
			}
		}, 500);
	};

	var main = function(){
		Array.prototype.forEach.call(document.getElementsByTagName("*"), function(el) {
			["user-select", "-webkit-user-select", "-moz-user-select", "-ms-user-select"].forEach(xcanwin => {
				var filterstyle = document.defaultView.getComputedStyle(el, null)[xcanwin];
				if (filterstyle && filterstyle == 'none') {
					el.style = xcanwin + ": text !important";
				}
			});

			["onselect", "onselectstart", "oncopy", "onbeforecopy", "oncontextmenu"].forEach(xcanwin => {
				el[xcanwin] = function(e) {
					e.stopImmediatePropagation();
				}
			});
		});
	};
	loop(main);
})();