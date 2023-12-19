<script lang="ts" setup>
import browser from "webextension-polyfill";
import { ref, onMounted } from "vue";
import { BASE_URL, GET_MENU_INFO, GET_INFO_RESTAURANT, SF_DOMAIN, FETCH_DATA_CONFIG, GET_DETAIL } from "../config";
import Step from './Step.vue'
const restaurant_id = ref('')
const restaurant_info = ref({})
const delivery_id = ref('')
const menu_infos = ref([])
const url = ref('')
const isLoading = ref(false)
const startStep1 = ref(false)

const steps = ref([{
  active: false,
  is_last: false,
  text: 'get info'
}, {
  active: false,
  is_last: false,
  text: 'get dishes'
},
{
  active: false,
  is_last: true,
  text: 'success'
},])
const onCraw = async () => {
  isLoading.value = true
  const tabId = await browser.tabs.query({ active: true, currentWindow: true })
  const splitUrl = tabId[0].url.split(SF_DOMAIN)

  steps.value[0].active = true

  url.value = splitUrl[splitUrl.length - 1]

  // fetch delivery_id, restaurant_id
  const response = await fetch(`${BASE_URL}${GET_INFO_RESTAURANT}?url=${url.value}`, FETCH_DATA_CONFIG);

  const result = await response.json()
  if (result) {
    delivery_id.value = result.reply.delivery_id
    restaurant_id.value = result.reply.restaurant_id

    // fetch restaurant info
    const res_info = await getRestaurantInfo(delivery_id.value)

    // fetch dishes
    const menu_response = await getDishes(delivery_id.value)
    if (menu_response) {
      menu_infos.value = menu_response
      isLoading.value = false
    }
  }

  // browser.runtime.sendMessage({ action: 'startContentScript' })
}
const getDishes = async (delivery_id: string) => {
  const response = await fetch(` ${BASE_URL}${GET_MENU_INFO}?id_type=2&request_id=${delivery_id}`, FETCH_DATA_CONFIG);
  const result = await response.json();
  if (result) {
    return result.reply.menu_infos
  }
  return null
}

const getRestaurantInfo = async (delivery_id: string) => {
  const response = await fetch(`${BASE_URL}${GET_DETAIL}?id_type=2&request_id=${delivery_id}`, FETCH_DATA_CONFIG)
  const result = await response.json()
  return result
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

})
</script>

<template>
  <main class="container small-padding background scroll">
    <div class="small-height center-align ">
      <!-- <div class="center-align"> -->
      <button class="border disabled small-round primary-border primary-text small small-elevate" @click="onCraw">
        <progress v-if="isLoading" class="circle small">

        </progress>
        <i v-else>power_settings_new</i>
      </button>
      <!-- </div> -->
      <div class="max"></div>
      <nav class="scroll">
        <template v-for="(step, index ) in steps" :key="index">
          <div class="center-align">
            <progress v-if="step.active" class="circle small"></progress>

            <button v-else class="circle small fill">
              {{ index + 1 }}

            </button>

            <div class="medium-margin">{{ step.text }}</div>
          </div>
          <div v-if="!step.is_last" class="max divider"></div>

        </template>

      </nav>
    </div>

  </main>
</template>

<style scoped lang='scss'>
main {
  width: 400px;
}
</style>
