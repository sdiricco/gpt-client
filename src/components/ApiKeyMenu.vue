<template>
  <div>
    <label for="api_key" class="block text-900 font-medium mb-2">API Key</label>
    <InputText
      :model-value="props.modelValue"
      @update:model-value="(evt:any) => emit('update:modelValue', evt)"
      id="api_key"
      type="text"
      placeholder="sk-xyz..."
      class="w-full"
      style="font-family: monospace"
      spellcheck="false"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
</script>
