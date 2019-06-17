import '../src/background.js'
function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'injects.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    document.body.appendChild(temp);
}

import manifest from '../manifest.json'
if(manifest.injects) {
    injectCustomJs()
}