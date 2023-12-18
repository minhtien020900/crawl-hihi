import browser from "webextension-polyfill";
import {BASE_URL, GET_INFO_RESTAURANT} from "./config";

console.log("Hello from the background!");



browser.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        // const response1 = await fetch("https://gappapi.deliverynow.vn/api/delivery/get_from_url?url=ho-chi-minh/taka-cha-tra-sua", {
        // const response1 = await fetch(`${BASE_URL}${GET_INFO_RESTAURANT}?url=ho-chi-minh/taka-cha-tra-sua`, {
        //     "headers": {
        //         "4a5fc2b9": "RJYp1g[irA):%VP#Y*!L02R!:",
        //         "6feab790": "p(*9?g1F/&7qPR=!77%k-3g7?FjAm7niL-Kci+]33b1dL$H,7q+]iNV>3U@[Lk?X?I;<`\\0R.7S8j?[FaTo-Yg2_bSr'L)V%_uVOFo`+^Nk/OZSRVc[YfjA[?W`cZEPp^9iHjcgMQ?A)h*COf&FDm!Z#ruchSE91dL,d?-cVBa-'rEc&95n3GHg?ulrS+UD5Wq/1VBYjIn7lkV3i#/",
        //         "7e669a1f": ":/$W!9.5uBN&?Gg(>\"+3#r2*a",
        //         "accept": "application/json, text/plain, */*",
        //         "accept-language": "en-US,en;q=0.9",
        //         "cache-control": "no-cache",
        //         "pragma": "no-cache",
        //         "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
        //         "sec-ch-ua-mobile": "?0",
        //         "sec-ch-ua-platform": "\"Windows\"",
        //         "sec-fetch-dest": "empty",
        //         "sec-fetch-mode": "cors",
        //         "sec-fetch-site": "cross-site",
        //         "x-foody-access-token": "",
        //         "x-foody-api-version": "1",
        //         "x-foody-app-type": "1004",
        //         "x-foody-client-id": "",
        //         "x-foody-client-language": "vi",
        //         "x-foody-client-type": "1",
        //         "x-foody-client-version": "3.0.0",
        //         "x-sap-ri": "4ead7f6560ac49b40b65f83dadfbb970e9607c560a08915b"
        //     },
        //     "referrer": "https://shopeefood.vn/",
        //     "referrerPolicy": "strict-origin-when-cross-origin",
        //     "body": null,
        //     "method": "GET",
        //     "mode": "cors",
        //     "credentials": "omit"
        // });
        //
        // console.log('call api in background', await response1.json());
        // if (request.action === 'startContentScript') {
        //     console.log('hehe')
        //     const tabId = await browser.tabs.query({active: true, currentWindow: true})
        //     console.log(tabId)
        //     await browser.tabs.sendMessage(tabId[0].id, {action: 'getContent'})
        //
        // }
    }
);
