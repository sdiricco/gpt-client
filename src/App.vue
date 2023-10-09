<script setup lang="ts">
import { useGptStore } from './stores/gpt';
import { storeToRefs } from 'pinia';
import router from './router';


const {apiKey} = storeToRefs(useGptStore())

if(apiKey.value){
  useGptStore().initializeGpt(apiKey.value).then(()=> {
    router.push('/home')

  })
}

</script>

<template>
  <RouterView />
</template>

