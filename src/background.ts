import browser from "webextension-polyfill";

console.log("Hello from the background!");

// browser.runtime.onInstalled.addListener((details) => {
//     console.log("Extension installed:", details);
// });

browser.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        if (request.action === 'startContentScript') {
            console.log('hehe')
            const tabId = await browser.tabs.query({active: true, currentWindow: true})
            await browser.tabs.sendMessage(tabId[0].id, {action: 'getContent'})

        }
    }
);
