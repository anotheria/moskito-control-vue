<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useMainStore } from '@/store/mainStore.ts';
import MoskitoService from '@/services/MoskitoService.ts';
import VueSelectorPanel from "@/components/VueSelectorPanel.vue";

const mainStore = useMainStore();

const getViews = async () => {
  const { results: { views } } = await MoskitoService.getControl();
  mainStore.views = views;
  mainStore.setInitialActiveView();
  showData.value = true;
}

onMounted(() => {
  getViews();
});

const showData = ref<boolean>(false);
const dialogVisible = ref(false);
const activeComponent = ref<string>('');
const activeComponentCapabilities = ref<any>({});
const activeComponentConfig = ref<any>({});
const activeComponentConnectorInfo = ref<any>(null);
const activeComponentThresholds = ref<any>(null);

const components = computed(() => mainStore.views.find((view: any) => view.name === mainStore.activeView)?.components ?? []);

const openComponentSetting = async (name: string): Promise<void> => {
    activeComponent.value = name;

    try {
        const res = await MoskitoService.getComponentCapabilities(activeComponent.value);
        activeComponentCapabilities.value = res.results;

        await Promise.all([
            res.results.threshold && MoskitoService.getComponentThresholds(activeComponent.value).then((res: any) => {
                activeComponentThresholds.value = res.results.thresholds ?? [];
            }),
            res.results.config && MoskitoService.getComponentConfig(activeComponent.value).then((res: any) => {
                activeComponentConfig.value = res.results.config ?? {};
            }),
            res.results.info && MoskitoService.getComponentConnectorInfo(activeComponent.value).then((res: any) => {
                activeComponentConnectorInfo.value = Object.keys(res.results ?? {}).map(key => ({ key, value: res.results[key] }));
            }),
        ]);

        dialogVisible.value = true;
    } catch (error) {
        console.error("Error:", error);
    }
};
</script>

<template>
  <div class="dashboard">
      <el-dialog
          v-model="dialogVisible"
          :title="activeComponent"
          width="50%"
      >
          <el-tabs v-if="Object.keys(activeComponentCapabilities).length" type="border-card">
              <el-tab-pane v-if="activeComponentCapabilities.threshold" label="Threshold">
                  <el-table v-if="activeComponentThresholds" :data="activeComponentThresholds" stripe>
                      <el-table-column prop="name" label="Name" />
                      <el-table-column prop="status" label="Status" />
                      <el-table-column prop="lastValue" label="Last Value" />
                      <el-table-column prop="statusChangeTimestamp" label="Status change timestamp" />
                  </el-table>
              </el-tab-pane>
              <el-tab-pane v-if="activeComponentCapabilities.accumulators" label="Accumulators">accumulators</el-tab-pane>
<!--              <el-tab-pane v-if="activeComponentCapabilities.connectorInfo" label="Connector Info">{{activeComponentConnectorInfo}}</el-tab-pane>-->
              <el-tab-pane v-if="activeComponentCapabilities.info" label="Connector Info">
                  <el-table v-if="activeComponentConnectorInfo" :data="activeComponentConnectorInfo" stripe>
                      <el-table-column width="150" prop="key" label="Property" />
                      <el-table-column  prop="value" label="Value" />
                  </el-table>
              </el-tab-pane>
              <el-tab-pane v-if="activeComponentCapabilities.componentInfo" label="Component Info">componentInfo</el-tab-pane>
              <el-tab-pane v-if="activeComponentCapabilities.actions" label="Actions">actions</el-tab-pane>
              <el-tab-pane v-if="activeComponentCapabilities.history" label="History">history</el-tab-pane>
              <el-tab-pane v-if="activeComponentCapabilities.config" label="Config">
                  <pre style="overflow-x: auto">{{ activeComponentConfig }}</pre>
              </el-tab-pane>
<!--              <el-tab-pane v-if="activeComponentCapabilities.nowRunning" label="Now Running">nowRunning</el-tab-pane>-->
          </el-tabs>
      </el-dialog>
    <vue-selector-panel />
      <div class="info-panel">
          info panel with controls Settings | Data Repository
          <div class="actions-container">
              <el-button type="info" @click="$router.push('/settings')">Settings</el-button>
          </div>
      </div>
    <div class="data-panel">
        <div v-if="showData" style="margin: 15px">
            <el-button
                v-for="component in components"
                @click="openComponentSetting(component.name)"
                style="margin-right: 8px"
                :size="'large'"
            >
                {{component.name}}
            </el-button>
        </div>
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