<script lang="ts" setup>
import {Open, TrendCharts, Files} from '@element-plus/icons-vue';
import {ref} from 'vue';
import {useMainStore} from "@/store/mainStore.ts";


const mainStore = useMainStore();
const widgetSettings = ref(mainStore.getDashboardStatuses);

const setActiveWidget = (event: { index: keyof typeof widgetSettings.value }) => {
    widgetSettings.value[event.index] = !widgetSettings.value[event.index];
    mainStore.setDashboardMode(widgetSettings.value);
};

</script>
<template>
  <div class="dashboard-wrapper">
      <aside class="aside-panel">
          <el-menu default-active="status"
                   style="margin-top: 100px;"
          >
              <el-menu-item
                  index="status"
                  :class="widgetSettings['status'] ? 'active-widget' : 'not-active-widget'"
                  @click="setActiveWidget"
              >
                  <el-icon>
                      <Open />
                  </el-icon>
                  <span>Status</span>
              </el-menu-item>
              <el-menu-item
                  index="charts"
                  :class="widgetSettings['charts'] ? 'active-widget' : 'not-active-widget'"
                  @click="setActiveWidget"
              >
                  <el-icon>
                      <TrendCharts />
                  </el-icon>
                  <span>Charts</span>
              </el-menu-item>
              <el-menu-item
                  index="history"
                  :class="widgetSettings['history'] ? 'active-widget' : 'not-active-widget'"
                  @click="setActiveWidget"
              >
                  <el-icon>
                      <Files />
                  </el-icon>
                  <span>History</span>
              </el-menu-item>
          </el-menu>
      </aside>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --mc-zinc-50: #fafafa;
  --mc-zinc-100: #f4f4f5;
  --mc-zinc-200: #e4e4e7;
  --mc-zinc-300: #d4d4d8;
  --mc-zinc-400: #a1a1aa;
  --mc-zinc-500: #71717a;
  --mc-zinc-600: #52525b;
  --mc-zinc-700: #3f3f46;
  --mc-zinc-800: #27272a;
  --mc-zinc-900: #18181b;
  --mc-zinc-950: #09090b;
  --mc-status-purple: #ff53d6;
  --mc-status-red: #fc3e39;
  --mc-status-orange: #ff8400;
  --mc-status-yellow: #f4e300;
  --mc-status-green: #94cc19;
    --mc-status-none: #cccccc;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
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

.active-widget {
    color: var(--el-menu-active-color) !important;
}
.not-active-widget {
    color: var(--el-menu-text-color) !important;
}
</style>
