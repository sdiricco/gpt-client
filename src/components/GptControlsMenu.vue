<template>
  <div class="mb-4">
    <label for="gpt_model" class="block text-900 font-medium mb-2"
      >Gpt temperature</label
    >
    <div class="flex align-items-center w-full md:w-20rem">
      <Slider
        class="w-full mr-3"
        :min="0"
        :max="2"
        :step="0.1"
      />
      <!-- <code>{{ settings.gptTemperature.toFixed(1) }}</code> -->
    </div>
  </div>

  <div class="mb-4">
    <label for="gpt_model" class="block text-900 font-medium mb-2"
      >Gpt Model</label
    >
<!--     <Dropdown
      id="gpt_model"
      v-model="settings.gptModel"
      :options="gptModels"
      placeholder="Gpt model"
      class="w-full md:w-20rem"
    /> -->

		<Dropdown
      id="gpt_model"
      placeholder="Gpt model"
      class="w-full md:w-20rem"
    />
  </div>
</template>
