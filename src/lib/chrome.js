// const chrome = {}

const contextMenus = {}

export function contextMenu(config) {
    config = config || {}
    contextMenus.title = config.showSelect ? config.title + ': %s' : config.title
    config.showSelect ? (contextMenus.contexts = ['selection']) : null
    contextMenus.onclick=config.onclick

    // chrome.contextMenus = contextMenus

    return chrome.contextMenus.create(contextMenus)
}