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
        class: 'p-0',
      },
    }"
  >
    <div class="grid grid-nogutter">
      <div class="col-fixed">
        <Menu class="m-4" :items="menuItems" :selected-item="selectedMenuItem" @update:selected-item="(item) => selectedMenuItem = item" />
      </div>
      <div class="col p-4">
        
        <ApiKeyMenu v-if="selectedMenuItem.value === 'apiKey'" v-model:model-value="apiKey" />
        <GptControlsMenu v-model:model-value="settings" v-else />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gptModels } from "@/constants/index";
import Menu from "./Menu.vue";
import ApiKeyMenu from "./ApiKeyMenu.vue"
import GptControlsMenu from "./GptControlsMenu.vue"
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

const apiKey = ref('')

const settings = ref({
  model: gptModels[0],
  temperature: 0,
});



const menuItems = [
  {
    name: "Api Key",
    value: "apiKey",
    icon: "pi pi-lock",
  },
  {
    name: "Controls",
    value: "controls",
    icon: "pi pi-sliders-h",
  },
]

const selectedMenuItem = ref(menuItems[0])

onMounted(() => {
  apiKey.value = props.initialSettings.apiKey || "";
  settings.value.model = props.initialSettings.gptModel || gptModels[0];
  settings.value.temperature = props.initialSettings.gptTemperature || 0;
});
</script>
