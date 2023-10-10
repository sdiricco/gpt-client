<script setup lang="ts">
import {onMounted, ref} from "vue"
import { useGptStore } from './stores/gpt';
import { storeToRefs } from 'pinia';
import router from './router';

const {apiKey} = storeToRefs(useGptStore())

onMounted(async ()=> {
  if(apiKey.value){
    router.push('/home')
  }
})

</script>

<template>
  <RouterView/>
</template>

