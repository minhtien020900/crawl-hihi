<script lang="ts" setup>
import browser from "webextension-polyfill";
import { ref, onMounted } from "vue";
import { BASE_URL, GET_MENU_INFO, GET_INFO_RESTAURANT, SF_DOMAIN, FETCH_DATA_CONFIG, GET_DETAIL } from "../config";

const restaurant_id = ref('')
const restaurant_info = ref({})
const delivery_id = ref('')
const menu_infos = ref([])
const url = ref('')

const getDOM = async () => {
  const tabId = await browser.tabs.query({ active: true, currentWindow: true })
  const splitUrl = tabId[0].url.split(SF_DOMAIN)

  url.value = splitUrl[splitUrl.length - 1]
  const response = await fetch(`${BASE_URL}${GET_INFO_RESTAURANT}?url=${url.value}`, FETCH_DATA_CONFIG);

  const result = await response.json()
  if (result) {
    restaurant_id.value = result.reply.restaurant_id
    delivery_id.value = result.reply.delivery_id
  }

  // browser.runtime.sendMessage({ action: 'startContentScript' })
}
const getDishes = async () => {
  const response = await fetch(` ${BASE_URL}${GET_MENU_INFO}?id_type=2&request_id=${delivery_id.value}`, FETCH_DATA_CONFIG);
  const result = await response.json();
  if (result) {
    menu_infos.value = result.reply.menu_infos
  }
  console.log('response', menu_infos.value);
}

const getRestaurantInfo = async () => {

  const response = await fetch(`${BASE_URL}${GET_DETAIL}?id_type=2&request_id=${delivery_id.value}`, FETCH_DATA_CONFIG)
  const result = await response.json()
  restaurant_info.value = result.reply.delivery_detail.name
}

const onSave = async () => {
  const url = 'http://127.0.0.1:8000/api/save-menu'
  const payload = {
    delivery_id: delivery_id.value,
    menus: menu_infos.value
  }
  const res = await postData(url, payload)
  console.log(res)
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
onMounted(() => {
  console.log('mount');

})
</script>

<template>
  <div class="container p-5 has-background-grey ">
    <div class=" card">
      <div class="card-content">
        <div class="content">
          <div class="buttons">
            <button class="button is-primary is-small ">Start craw</button>
            <button class="button is-primary is-small is-loading">Start craw</button>
            <button class="button is-small">Link</button>
          </div>

          <button class="button is-primary is-small is-rounded" @click="getDOM">send message</button>

          <p>url: {{ url }}</p>
          <p>restaurant-id: {{ restaurant_id }}</p>
          <p>delivery_id: {{ delivery_id }}</p>
          <button class="button is-primary is-small is-rounded" @click="getRestaurantInfo">get restaurant info</button>
          <p>info: {{ restaurant_info }}</p>

          <button class="button is-primary is-small is-rounded" is-small is-rounded @click="getDishes">get dishes</button>
          {{ menu_infos }}

          <button class="button is-primary is-small is-rounded" @click="onSave">save data</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang='scss'>
body {}
</style>
