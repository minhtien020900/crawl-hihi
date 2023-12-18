import browser, {tabs} from "webextension-polyfill";

console.log("Hello from the content!");

async function getTab() {
    const queryOptions = {active: true, currentWindow: true}
    const tabs = await browser.tabs.query(queryOptions)
    return tabs[0].url
}

browser.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        console.log(request, sender, sendResponse)

        const url = await getTab();
        console.log(url)
        if (request.action === 'getContent') {
            const restaurantItems = document.querySelectorAll('.item-restaurant-row');
            const response1 = await fetch("https://gappapi.deliverynow.vn/api/delivery/get_from_url?url=ho-chi-minh/taka-cha-tra-sua", {
                "headers": {
                    "4a5fc2b9": "RJYp1g[irA):%VP#Y*!L02R!:",
                    "6feab790": "p(*9?g1F/&7qPR=!77%k-3g7?FjAm7niL-Kci+]33b1dL$H,7q+]iNV>3U@[Lk?X?I;<`\\0R.7S8j?[FaTo-Yg2_bSr'L)V%_uVOFo`+^Nk/OZSRVc[YfjA[?W`cZEPp^9iHjcgMQ?A)h*COf&FDm!Z#ruchSE91dL,d?-cVBa-'rEc&95n3GHg?ulrS+UD5Wq/1VBYjIn7lkV3i#/",
                    "7e669a1f": ":/$W!9.5uBN&?Gg(>\"+3#r2*a",
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "no-cache",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "x-foody-access-token": "",
                    "x-foody-api-version": "1",
                    "x-foody-app-type": "1004",
                    "x-foody-client-id": "",
                    "x-foody-client-language": "vi",
                    "x-foody-client-type": "1",
                    "x-foody-client-version": "3.0.0",
                    "x-sap-ri": "4ead7f6560ac49b40b65f83dadfbb970e9607c560a08915b"
                },
                "referrer": "https://shopeefood.vn/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "omit"
            });

            console.log('id:', await response1.json());
            const response = await fetch("https://gappapi.deliverynow.vn/api/dish/get_delivery_dishes?id_type=2&request_id=104701", {
                "headers": {
                    "1ed98208": "iO6\"Ia0qD7>.0itr:O0JndK,r-N=Hpcn[0b$usndo=VQeqV`8P;s9%kW_M)@6$--C-TqD1F&kf*qJckj:*p^i\\qXI'g6)91!JA0fA\"Vo7[os0YRaTs1S(fJ3J#@(!@UO_jV@1:k:T$:qj1\\NEFeFSU2hiI`\"a7mg2j1tNVcNX!g,m$hc4o8_!.$$AMDCiuG9gHUONb`Or=HqU?I9Fd",
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-US,en;q=0.9",
                    "c562b48": "0R]ZkB%VIX=2hp(X@[i&/L2Aa",
                    "cache-control": "no-cache",
                    "d1b4709a": "jiseSU`_D-/\"9H8rEH)+jdFAl",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "x-foody-access-token": "",
                    "x-foody-api-version": "1",
                    "x-foody-app-type": "1004",
                    "x-foody-client-id": "",
                    "x-foody-client-language": "vi",
                    "x-foody-client-type": "1",
                    "x-foody-client-version": "3.0.0",
                    // "x-sap-ri": "a6127c65d7e201ff98d53b31f6469e8d7173a83a15bc7e19"
                },
                "referrer": "https://shopeefood.vn/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "no-cors",
                "credentials": "omit"
            });
            const dishes = await response.json();
            console.log('response', response.json(), dishes);

            if (restaurantItems) {
                // Thực hiện các hành động với container ở đây
                console.log(restaurantItems);
            } else {
                console.log('Không tìm thấy #container trên trang web.');
            }
        }
    }
);

