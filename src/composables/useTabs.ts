import browser from "webextension-polyfill";

export const useTabs = () => {
    const getTab = async () => await browser.tabs.query({active: true, currentWindow: true})
}