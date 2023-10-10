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
      <label for="password1" class="block text-900 font-medium mb-2">API Key</label>
      <InputText
        v-model:modelValue="settings.apiKey"
        id="password1"
        type="text"
        placeholder="sk-xyz..."
        class="w-full mb-3"
        style="font-family: monospace"
        autofocus
        spellcheck="false" />
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="emit('cancel')" outlined />
      <Button label="Apply" icon="pi pi-check" @click="emit('update:settings', settings)" />
    </template>
  </Dialog>
</template>


<script setup lang="ts">
import {ref, onMounted} from "vue"

interface Settings {
  apiKey: string
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  initialSettings: {
    type: Object,
    default: () => {
      return {
        apiKey: ''
      }
    }
  }
})
const emit = defineEmits(['update:visible', 'update:settings', 'cancel'])

const settings = ref({
    apiKey: '',
})

onMounted(()=> {
  settings.value.apiKey = props.initialSettings.apiKey
})
</script>
