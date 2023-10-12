<template>
  <Dialog
    :visible="props.visible"
    @update:visible="(visibility) => emit('update:visible', visibility)"
    blockScroll
    modal
    header="Settings"
    :style="{ width: '50vw' }"
    :pt="{
      header: {
        class: 'border-bottom-1 surface-border',
      },
      footer: {
        class: 'border-top-1 surface-border p-4',
      },
    }">
    <div class="pt-4">
      <div class="mb-4">
        <label for="gpt_model" class="block text-900 font-medium mb-2">Gpt temperature</label>
        <div class="flex align-items-center w-full  md:w-20rem">
          <Slider v-model="settings.gptTemperature" class="w-full mr-3" :min="0" :max="2" :step="0.1" />
          <code>{{ settings.gptTemperature.toFixed(1) }}</code>
        </div>
      </div>

      <div class="mb-4">
        <label for="gpt_model" class="block text-900 font-medium mb-2">Gpt Model</label>
        <Dropdown id="gpt_model" v-model="settings.gptModel" :options="gptModels" placeholder="Gpt model" class="w-full md:w-20rem" />
      </div>

      <div class="mb-4">
        <label for="password1" class="block text-900 font-medium mb-2">API Key</label>
        <InputText
          v-model:modelValue="settings.apiKey"
          id="password1"
          type="text"
          placeholder="sk-xyz..."
          class="w-full mb-3"
          style="font-family: monospace"
          spellcheck="false" />
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="emit('cancel')" outlined />
      <Button label="Apply" icon="pi pi-check" @click="emit('update:settings', settings)" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const gptModels = [
  "gpt-4",
  "gpt-4-0314",
  "gpt-4-0613",
  "gpt-4-32k",
  "gpt-4-32k-0314",
  "gpt-4-32k-0613",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo-0301",
  "gpt-3.5-turbo-0613",
  "gpt-3.5-turbo-16k-0613",
];

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  initialSettings: {
    type: Object,
    default: () => {
      return {
        apiKey: "",
      };
    },
  },
});
const emit = defineEmits(["update:visible", "update:settings", "cancel"]);

const settings = ref({
  apiKey: "",
  gptModel: gptModels[0],
  gptTemperature: 1
});

onMounted(() => {
  settings.value.apiKey = props.initialSettings.apiKey;
});
</script>
