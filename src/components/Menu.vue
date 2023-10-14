<template>
  <div class="surface-card select-none">
    <ul class="list-none m-0 p-0">
      <li class="flex" v-for="item in props.items" :key="item.value">
        <div
          class="border-left-2 flex flex-column align-items-center justify-content-center z-1"
          :class="{ 'border-primary': props.selectedItem.value === item.value, 'surface-border ': props.selectedItem.value !== item.value }"></div>
        <a
          v-ripple
          class="flex align-items-center cursor-pointer py-2 px-3 hover:surface-hover transition-colors transition-duration-150 text-700 font-medium line-height-3 p-ripple"
          :class="{ 'text-primary': props.selectedItem.value === item.value }"
          @click="emit('update:selectedItem', item)">
          <i class="mr-2" :class="item.icon"></i>
          <span class="font-medium">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  items:{
    type: Array<any>,
    default: () => ([
      {
        name: 'Api Key',
        value: 'apiKey',
        icon: 'pi pi-lock'
      },
      {
        name: 'Controls',
        value: 'controls',
        icon: 'pi pi-sliders-h'
      }
    ])
  },
  selectedItem: {
    type: Object,
    default: () => ({
      name: 'Api Key',
      value: 'apiKey',
      icon: 'pi pi-lock'
    })
  }
})

const emit = defineEmits(['update:selectedItem'])

</script>
