<script setup lang="ts">
import {onMounted, ref} from "vue"
import { useGptStore } from './stores/gpt';
import { storeToRefs } from 'pinia';
import router from './router';

const {apiKey} = storeToRefs(useGptStore())
const isConnectingToOpenAi = ref(false)

onMounted(async ()=> {
  if(apiKey.value){
    isConnectingToOpenAi.value = true
    await useGptStore().initializeGpt(apiKey.value)
    setTimeout(()=> {
      isConnectingToOpenAi.value = false
    }, 1000)
    router.push('/home')
  }
})

</script>

<template>
  <div class="h-screen w-full flex flex-column align-items-center justify-content-center" v-if="isConnectingToOpenAi">
    <ProgressSpinner class="mb-4"/>
    <div class="text-base">Controllo l'apiKey e mi connetto ad OpenAi</div>
  </div>
  <RouterView v-else/>
</template>

