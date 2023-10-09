<template>
  <div class="h-screen surface-0">
    <div class="h-full flex flex-column">
      <div class="header flex align-items-center justify-content-between p-3 w-full border-bottom-2 surface-border">
        <div class="w-full flex align-items-center justify-content-center">
          <div class="text-xl text-color-secondary font-bold">GPT Client</div>

        </div>
        <Button icon="pi pi-sign-out" aria-label="Filter" @click="gptStore.logOut" />
      </div>
      <div class="overflow-auto flex flex-column justify-content-between h-full">
        <div id="textarea" class="h-full overflow-auto">
          <div
            v-for="(htmlMessageObj, index) in gptStore.getMessagesExtended"
            :key="`message-${index}`"
            class="p-4"
            :class="{ 'surface-ground': index%2 }">
            <div class="text-xl font-bold flex align-items-center justify-content-center" >
              <div style="width: 800px;">{{ capitalize(htmlMessageObj.role) }}</div>
            </div>
            
            <div class="text-color text-xl flex align-items-center justify-content-center">
              <div v-html="htmlMessageObj.contentHtml" style="width: 800px;"></div>
            </div>
          </div>
          <div v-if="gptStore.status === 1" class="p-4 surface-ground">
            <div class="text-xl font-bold flex align-items-center justify-content-center">
              <div style="width: 800px;">{{capitalize(gptStore.getMessageExtended.role) }}</div>
            </div>
            <div class="text-xl text-color flex align-items-center justify-content-center" >
              <div v-html="gptStore.getMessageExtended.contentHtml" style="width: 800px;"></div>
            </div>
          </div>
        </div>
        <div class="p-4 flex align-items-center justify-content-center" style="margin-right: 8px;">
          <div class="flex align-items-center surface-0 border-round-2xl shadow-3" style="width: 800px;">
            <Textarea v-model="gptStore.userInput" autoResize rows="1" cols="2" class="custom-textarea w-full border-round-3xl p-4 text-xl" autofocus spellcheck="false" @keydown.enter.prevent="gptStore.sendMessage" />
              <div class="cursor-pointer mr-4" @click="gptStore.sendMessage">
              <i class="pi pi-arrow-right text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useGptStore } from "@/stores/gpt";
import { capitalize } from "lodash";

const gptStore = useGptStore();

const { getMessageExtended, getMessagesExtended } = storeToRefs(gptStore);

const scrollToBottom = () => {
  const textArea: any = document.getElementById("textarea");
  textArea.scrollTop = textArea.scrollHeight;
};

watch(getMessageExtended, () => {
  scrollToBottom();
}, {deep:true});
watch(
  getMessagesExtended,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

onMounted(async () => {
  scrollToBottom();
});
</script>

<style scoped>
.custom-input {
  border: 2px solid #666;
  border-radius: 32px;
  margin-right: 8px;
  background: transparent;
  padding: 8px !important;
}

.custom-textarea {
  border: none;
  box-shadow: none;
}

.custom-textarea.p-inputtext:enabled:focus {
  box-shadow: none;
  border-color: transparent;
}

/* Personalizza la scrollbar solo per Chrome e Safari */
::-webkit-scrollbar {
    width: 8px; /*Larghezza della scrollbar*/
}
::-webkit-scrollbar-thumb {
    background-color: #888; /* Colore della parte mobile della scrollbar */
}
</style>
