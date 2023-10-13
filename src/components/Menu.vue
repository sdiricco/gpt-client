<template>
  <div class="surface-card select-none">
    <ul class="list-none m-0 p-0">
      <li class="flex">
        <div
          class="border-left-2 flex flex-column align-items-center justify-content-center z-1"
          :class="{ 'border-primary': activeTab2 == 0, 'surface-border ': activeTab2 != 0 }"></div>
        <a
          v-ripple
          class="flex align-items-center cursor-pointer py-2 px-3 hover:surface-hover transition-colors transition-duration-150 text-700 font-medium line-height-3 p-ripple"
          :class="{ 'text-primary': activeTab2 === 0 }"
          @click="activeTab2 = 0">
          <i class="pi pi-lock mr-2"></i>
          <span class="font-medium">Api Key</span>
        </a>
      </li>
      <li class="flex">
        <div
          class="border-left-2 flex flex-column align-items-center justify-content-center z-1"
          :class="{ 'border-primary': activeTab2 == 1, 'surface-border ': activeTab2 != 1 }"></div>
        <a
          v-ripple
          class="flex-1 cursor-pointer py-2 px-3 hover:surface-hover transition-colors transition-duration-150 text-700 font-medium line-height-3 p-ripple"
          :class="{ 'text-primary': activeTab2 === 1 }"
          @click="activeTab2 = 1">
          <i class="pi pi-sliders-h mr-2"></i>
          <span class="font-medium">Controls</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
const activeTab2 = ref(0)

</script>
