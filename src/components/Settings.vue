<template>
  <Dialog
    :visible="props.visible"
    @update:visible="(visibility) => emit('update:visible', visibility)"
    blockScroll
    modal
    header="Settings"
    :style="{ width: '80vw' }"
    :pt="{
      header: {
        class: 'border-bottom-1 surface-border',
      },
      footer: {
        class: 'border-top-1 surface-border p-4',
      },
      content: {
        class: 'p-0'
      }
    }">
    <div class="grid grid-nogutter">
      <div class="col-fixed">
        <Menu class="m-4"/>
      </div>
      <div class="col p-4" >
        <div class="mb-4">
          <label for="password1" class="block text-900 font-medium mb-2">API Key</label>
          <InputText
            v-model:modelValue="settings.apiKey"
            id="password1"
            type="text"
            placeholder="sk-xyz..."
            class="w-full"
            style="font-family: monospace"
            spellcheck="false" />
        </div>

        <div class="mb-4">
          <label for="gpt_model" class="block text-900 font-medium mb-2">Gpt temperature</label>
          <div class="flex align-items-center w-full md:w-20rem">
            <Slider v-model="settings.gptTemperature" class="w-full mr-3" :min="0" :max="2" :step="0.1" />
            <code>{{ settings.gptTemperature.toFixed(1) }}</code>
          </div>
        </div>

        <div class="mb-4">
          <label for="gpt_model" class="block text-900 font-medium mb-2">Gpt Model</label>
          <Dropdown id="gpt_model" v-model="settings.gptModel" :options="gptModels" placeholder="Gpt model" class="w-full md:w-20rem" />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gptModels } from "@/constants/index";
import Menu from "./Menu.vue";
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
        gptModel: gptModels[0],
        gptTemperature: 0,
      };
    },
  },
});
const emit = defineEmits(["update:visible", "update:settings", "cancel"]);

const settings = ref({
  apiKey: "",
  gptModel: gptModels[0],
  gptTemperature: 0,
});

onMounted(() => {
  settings.value.apiKey = props.initialSettings.apiKey || "";
  settings.value.gptModel = props.initialSettings.gptModel || gptModels[0];
  settings.value.gptTemperature = props.initialSettings.gptTemperature || 0;
});
</script>
