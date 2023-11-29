<script setup lang="ts">
import { onMounted } from 'vue';
import { useMainStore } from '@/store/mainStore.ts';
import MoskitoService from '@/services/MoskitoService.ts';
import VueSelectorPanel from "@/components/VueSelectorPanel.vue";

const mainStore = useMainStore();

const getViews = async () => {
  const { results: { views } } = await MoskitoService.getControl();
  mainStore.views = views;
  mainStore.setInitialActiveView();
}

onMounted(() => {
  getViews();
});
</script>

<template>
  <div class="dashboard">
    <vue-selector-panel />
      <div class="info-panel">
          info panel with controls Settings | Data Repository
          <div class="actions-container">
              <el-button type="info" @click="$router.push('/settings')">Settings</el-button>
          </div>
      </div>
    <div class="data-panel">
      components and data views
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.info-panel {
  height: 40px;
  display: flex;
  align-items: center;
  background-color: var(--mc-zinc-700);
  font-size: 12px;
  padding: 0 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.data-panel {
  background-color: var(--mc-zinc-100);
  flex-grow: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  color: var(--mc-zinc-900);
}
.actions-container {
    margin-left: auto;
}
</style>