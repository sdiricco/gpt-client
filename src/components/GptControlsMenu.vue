<template>
  <div class="mb-4">
    <label for="gpt_model" class="block text-900 font-medium mb-2"
      >Gpt temperature</label
    >
    <div class="flex align-items-center w-full md:w-20rem">
      <Slider
        :model-value="props.modelValue.temperature"
        @update:model-value="(evt:any) => onUpdatedField({temperature: evt})"
        class="w-full mr-3"
        :min="0"
        :max="2"
        :step="0.1"
      />
      <code>{{ props.modelValue.temperature.toFixed(1) }}</code>
    </div>
  </div>

  <div class="mb-4">
    <label for="gpt_model" class="block text-900 font-medium mb-2"
      >Gpt Model</label
    >
    <Dropdown
      id="gpt_model"
      :model-value="props.modelValue.model"
      @update:model-value="(evt:any) => onUpdatedField({model: evt})"
      :options="gptModels"
      placeholder="Gpt model"
      class="w-full md:w-20rem"
    />
  </div>
</template>

<script setup lang="ts">
import { gptModels } from "@/constants/index";
import { merge } from "lodash";

interface IProps {
  modelValue: {
    temperature: number;
    model: string
  }
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: () => ({
    temperature: 0,
    model: gptModels[0]
  })
})

const emit = defineEmits(['update:modelValue'])

function onUpdatedField(payload:any){
  emit('update:modelValue', merge(props.modelValue, payload))
}
</script>
