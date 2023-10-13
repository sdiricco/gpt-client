<template>
  <div class="flex align-items-center justify-content-center surface-ground h-screen">
    <div class="surface-card p-4 shadow-1 border-round w-full lg:w-6 m-4">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">GTP Client</div>
        <span class="text-600 font-medium line-height-3">Use GPT 3.5 and GPT 4 API for personal use or your organization</span>
      </div>

      <div class="pt-4">
        <Message severity="error" @close="gptStore.error = ''" v-if="gptStore.error">{{ gptStore.error }}</Message>
        <label for="password1" class="block text-900 font-medium mb-2">Insert your API Key: </label>
        <InputText
          id="password1"
          :disabled="gptStore.loading.initializeGpt"
          v-model:model-value="apiKey"
          type="text"
          placeholder="API key"
          class="w-full mb-3"
          style="font-family: monospace"
          autofocus
          spellcheck="false" />
        <Button
          label="Authenticate"
          class="w-full"
          :disabled="gptStore.loading.initializeGpt || !apiKey"
          :icon="`${gptStore.loading.initializeGpt ? 'pi pi-spin pi-spinner' : 'pi pi-arrow-right'}`"
          icon-pos="right"
          @click="gptStore.initializeGpt(apiKey)"></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGptStore } from "@/stores/gpt";

const apiKey = ref("");
const gptStore = useGptStore();
</script>
