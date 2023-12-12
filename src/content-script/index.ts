import browser from "webextension-polyfill";

console.log("Hello from the content!");

browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request, sender, sendResponse)
        console.log('sss22')
        if (request.action === 'getContent') {
            var container = document.getElementById('container');
            if (container) {
                // Thực hiện các hành động với container ở đây
                console.log(container);
            } else {
                console.log('Không tìm thấy #container trên trang web.');
            }
        }
    }
);

// browser.runtime.onInstalled.addListener((details) => {
//   console.log("Hello from the content!");
//
// });
