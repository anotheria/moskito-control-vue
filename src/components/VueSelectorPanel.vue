<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '@/store/mainStore.ts';
import ViewControl from '@/components/ViewControl.vue';

const mainStore = useMainStore();
const viewsList = computed(() => mainStore.getViews);

</script>

<template>
  <div class="selector-panel">
    <view-control
        v-for="(view, idx) in viewsList"
        :key="idx"
        :status-color="view.viewColor"
        :selected="mainStore.activeView === view.name"
        @click="mainStore.setActiveView(view.name)"
    >
      {{ view.name }}
    </view-control>
  </div>
</template>

<style scoped lang="scss">
.selector-panel {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
</style>