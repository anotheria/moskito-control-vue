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

<style scoped lang="scss">
.active-widget {
    color: var(--el-menu-active-color) !important;
}
.not-active-widget {
    color: var(--el-menu-text-color) !important;
}
</style>
