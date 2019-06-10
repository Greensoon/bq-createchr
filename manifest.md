#Manifest文件说明

```
{
    "name": "bqcrx",
    "description": "create chrome extend plugin",
    "version": "1.0",
    // 权限为其中之一, 如果不写,为了防止权限不够,默认开启全部权限
    "permissions": [
        "contextMenus", // 右键菜单
        "tabs", // 标签
        "notifications", // 通知
        "webRequest", // web请求
        "webRequestBlocking",
        "storage", // 插件本地存储
        "http://*/*", // 可以通过executeScript或者insertCSS访问的网站
        "https://*/*" // 可以通过executeScript或者insertCSS访问的网站
        "activeTab"
    ],
    "scriptsAndCss": [
        {
            position: 'document_start' // 可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
            css: ['css/index.css'] // css
            js: [js/index.js]
        }
    ],
    // 会一直常驻的后台JS或后台页面 非必填
    "background":
    {
        // 2种指定方式，如果指定JS，那么会自动生成一个背景页
        "page": "background.html"
        "scripts": ["js/background.js"]
    },
    // 浏览器右上角图标设置，browser_action、page_action、app必须三选一
    "browser_action": 
    {
        "icon": "img/icon.png",
        // 图标悬停时的标题，可选
        "title": "这是一个示例Chrome插件",
        "popup": "popup.html"
    },
    // 当某些特定页面打开才显示的图标
    /*"page_action":
    {
        "icon": "img/icon.png",
        "title": "我是pageAction",
        "popup": "popup.html"
    },*/

    "opentab": true | false,
    "register": "" //浏览器keyword
    "devpage": "devtools.html"
    "optionpage": "options.html" // 选项页,
    home: '' //网址,
    injects: ["inject.js"]
  }
  
```