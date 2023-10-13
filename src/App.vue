<script setup lang="ts">
import {onMounted, ref} from "vue"
import { useGptStore } from './stores/gpt';
import { storeToRefs } from 'pinia';
import router from './router';

const {settings} = storeToRefs(useGptStore())

onMounted(async ()=> {
  if(settings.value.apiKey){
    router.push('/home')
  }
})

</script>

<template>
  <RouterView/>
</template>

