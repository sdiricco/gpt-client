<template>
  <div>
    <label for="api_key" class="block text-900 font-medium mb-2">API Key</label>
    <InputText
      :model-value="props.modelValue"
      @update:model-value="(evt:any) => emit('update:modelValue', evt)"
      id="api_key"
      type="text"
      placeholder="sk-xyz..."
      class="w-full mb-4"
      style="font-family: monospace"
      autofocus
      spellcheck="false"
    />
    <Button
      label="Validate"
      class="w-full"
      :disabled="gptStore.loading.initializeGpt || !props.modelValue"
      :icon="`${
        gptStore.loading.initializeGpt
          ? 'pi pi-spin pi-spinner'
          : 'pi pi-lock'
      }`"
      icon-pos="right"
      @click="gptStore.initializeGpt(props.modelValue)"
    ></Button>
  </div>
</template>

<script setup lang="ts">
import {useGptStore} from "@/stores/gpt"
const gptStore = useGptStore();
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>
