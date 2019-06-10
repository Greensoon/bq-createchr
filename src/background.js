import { contextMenu } from './lib/chrome'

contextMenu({
    title: '请使用老帅比搜索',
    showSelect: true,
    onclick: function() {
        console.log('heiheihei')
    }
})

function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'injects.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    // temp.onload = function()
    // {
    //     // 放在页面不好看，执行完后移除掉
    //     this.parentNode.removeChild(this);
    // };
    document.body.appendChild(temp);
}

import manifest from '../manifest.json'
if(manifest.injects) {
    injectCustomJs()
}