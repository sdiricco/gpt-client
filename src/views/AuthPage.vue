<template>
  <div class="flex align-items-center justify-content-center surface-ground h-screen">
    <div class="surface-card p-4 shadow-1 border-round w-full lg:w-6 m-4">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">GTP Client</div>
        <span class="text-600 font-medium line-height-3">Use GPT 3.5 and GPT 4 API for personal use or your organization</span>
      </div>

      <div>
        <Message severity="error" @close="gptStore.error = ''" v-if="gptStore.error">{{ gptStore.error }}</Message>
        <label for="password1" class="block text-900 font-medium mb-2 text-center">API Key</label>
        <InputText id="password1" :disabled="gptStore.loading.initializeGpt" v-model:model-value="gptStore.apiKey" type="text" placeholder="sk-xyz..." class="w-full mb-3" style="font-family: monospace;" autofocus spellcheck="false" />
        <Button label="Authenticate" class="w-full" :disabled="gptStore.loading.initializeGpt" :icon="`${gptStore.loading.initializeGpt ? 'pi pi-spin pi-spinner' :  'pi pi-arrow-right'}`" icon-pos="right" @click="gptStore.initializeGpt"></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useGptStore} from "@/stores/gpt"
const gptStore = useGptStore();

</script>
