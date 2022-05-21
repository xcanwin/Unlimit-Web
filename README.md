# Unlimit-Web

## 简介
- 可以解除常见的网页限制：恢复文本的选中，恢复文本的复制，移除文本小尾巴，恢复右键菜单
- 兼容99%的网站，实测发现：本项目的兼容性比号称"通杀大部分网站"的同类项目还强
- 喜欢这个脚本的小伙伴，可以点个STAR支持一下

## 项目来源
- 在上网学习过程中，常常遇到以下的痛点：
- 看到好的知识点，想复制文字时无法选中
- 即使可以选中了，还不允许复制
- 即使可以复制了，还弹窗提示需要先登录
- 即使成功复制了，粘贴时发现还加一个提示来源的文本小尾巴
- 我看网站开发者是有什么大病
- 本脚本的作用就是解决以上自己的痛点和网站开发者的大病，解除网页限制，实现畅快地上网学习
- 原项目Html-Lock-Hunter不再更新，Unlimit-Web是全新的版本

## 解除以下网页限制
1. 恢复文本的选中和复制
2. 过滤文本小尾巴（同时解决了一些安全问题，例如有些中毒的网站会在用户复制时加入恶意小尾巴：&& reboot）
3. 恢复右键菜单

## 用法
1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器插件，俗称：油猴；
2. 安装 Unlimit-Web 脚本，可从下面三个渠道安装：

| 序号 | UserScript源 |
| --- | --- |
| 1 | [Github](https://raw.githubusercontent.com/xcanwin/Unlimit-Web/master/Unlimit-Web.user.js) |
| 2 | [OpenUserJS](https://openuserjs.org/scripts/xcanwin/Unlimit-Web) |
| 3 | [GreasyFork](https://greasyfork.org/zh-CN/scripts/400515-unlimit-web) |

## 测试案例
- [csdn](https://blog.csdn.net/yilovexing/article/details/53256713)
- [bilibili](https://www.bilibili.com/read/cv5496952)
- [360doc](http://www.360doc.com/content/20/0406/19/1575720_904264035.shtml)
- [yuedu.163](https://guofeng.yuedu.163.com/book_reader/654ebfbcccd64b3ea0a51934953f300e_4)
- [kuwo](https://www.kuwo.cn/play_detail/6871880)
- [chuangshi.qq](https://chuangshi.qq.com/bk/xh/AGwENV1oVjIAP1RkATUBYA-r-1.html)
- [qidian](https://read.qidian.com/chapter/ofR4ZgMW6xioLoerY3WDhg2/2G3lb7hex5z4p8iEw--PPw2/)
- [vue-iscroll](https://dafrok.github.io/vue-iscroll-view/)
- [shushan.zhangyue](http://shushan.zhangyue.net/book/89159/13507319/)
- [aqistudy](https://www.aqistudy.cn/)
- [xuexila](https://www.xuexila.com/zw/zhidao/c1405991.html)
- [51test](https://www.51test.net/show/10550483.html)

## 友情链接
对百x度文库、道x客巴巴等文库类网站有需要的可以试试隔壁老哥的项目 [TKScript](https://greasyfork.org/zh-CN/scripts/405130-%E6%96%87%E6%9C%AC%E9%80%89%E4%B8%AD%E5%A4%8D%E5%88%B6)，他有针对文库的方案
