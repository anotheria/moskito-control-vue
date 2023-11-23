<script setup lang="ts">
import { onMounted } from 'vue';
import MoskitoService from '@/services/MoskitoService.ts';

const getViews = async () => {
  const response = await MoskitoService.fetchViews();
  console.log(response);
}
onMounted(() => {
  getViews();
});
</script>

<template>
  <div class="dashboard-wrapper">
    <aside class="aside-panel">
      sidebar
    </aside>
    <main class="content">
      <div class="selector-panel">view selector</div>
      <div class="info-panel">info panel with controls Settings | Data Repository</div>
      <div class="data-panel">
        components and data views
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-wrapper {
  width: 100vw;
  min-height: 100vh;
  background-color: var(--mc-zinc-900);
  color: var(--mc-zinc-100);
  display: grid;
  grid-template-columns: 200px 1fr;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 0 30px 30px;
}
.selector-panel {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15px;
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
</style>