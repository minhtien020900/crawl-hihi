import browser from "webextension-polyfill";

console.log("Hello from the content!");

browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request, sender, sendResponse)

        if (request.action === 'getContent') {
            const restaurantItems = document.querySelectorAll('.item-restaurant-row');


            if (restaurantItems) {
                // Thực hiện các hành động với container ở đây
                console.log(restaurantItems);
            } else {
                console.log('Không tìm thấy #container trên trang web.');
            }
        }
    }
);

