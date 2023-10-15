<template>
  <Dialog
    :visible="props.visible"
    @update:visible="(visibility) => emit('update:visible', visibility)"
    blockScroll
    modal
    header="Settings"
    class="w-full m-4 xl:w-9"
    style="max-width: 800px;"
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
        <Menu
          class="m-4"
          :items="menuItems"
          :selected-item="selectedMenuItem"
          @update:selected-item="(item) => (selectedMenuItem = item)"
        />
      </div>
      <div class="col p-4">
        <ApiKeyMenu
          v-if="selectedMenuItem.value === 'apiKey'"
          v-model:model-value="gptStore.settings.apiKey"
        />
        <GptControlsMenu
          :model-value="{
            model: gptStore.settings.model,
            temperature: gptStore.settings.temperature,
          }"
          @update:model-value="updateGptControls"
          v-else
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { gptModels } from "@/constants/index";
import Menu from "./Menu.vue";
import ApiKeyMenu from "./ApiKeyMenu.vue";
import GptControlsMenu from "./GptControlsMenu.vue";
import { useGptStore } from "@/stores/gpt";

const gptStore = useGptStore();

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

const apiKey = ref("");

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
];

const selectedMenuItem = ref(menuItems[0]);

function updateGptControls(payload:any){
  gptStore.settings.model = payload.model;
  gptStore.settings.temperature = payload.temperature
}
</script>

<style scoped>
.max-w-600{
  max-width: 600px;
}
</style>
