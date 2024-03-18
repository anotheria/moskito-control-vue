<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useMainStore} from '@/store/mainStore.ts';
import MoskitoService from '@/services/MoskitoService.ts';
import ComponentDetails from "@/views/dashboard/partials/ComponentDetails.vue";
import {getAverageStatus} from "@/types/consts.ts";
import VueSelectorPanel from "@/components/VueSelectorPanel.vue";
import VueStatus from "@/components/VueStatus.vue";
import {Clock} from '@element-plus/icons-vue';
import {ElMessage, ElNotification} from 'element-plus'

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
const component = ref<any>({});

const components = computed(() => mainStore.views?.find((view: any) => view.name === mainStore.activeView)?.components ?? []);

const groupedComponents = computed(() => {
    return components.value?.reduce((acc: any, component: any) => {
        const category = component.category || 'No Category';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(component);
        return acc;
    }, {});
});

const openComponentSetting = async (name: string, status: string): Promise<void> => {
    dialogVisible.value = false;
    component.value.name = name;
    component.value.color = status;

    try {
        const res = await MoskitoService.getComponentCapabilities(component.value.name);
        component.value.capabilities = res.results;

        await Promise.all([
            res.results.thresholds && MoskitoService.getComponentThresholds(component.value.name).then((res: any) => {
                component.value.thresholds = res.results.thresholds ?? [];
            }),
            res.results.config && MoskitoService.getComponentConfig(component.value.name).then((res: any) => {
                component.value.config = res.results.config ?? {};
            }),
            res.results.connectorInfo && MoskitoService.getComponentConnectorInfo(component.value.name).then((res: any) => {
                component.value.connectorInfo = Object.keys(res.results ?? {}).map(key => ({ key, value: res.results[key] }));
            }),
            res.results.componentInfo && MoskitoService.getComponentComponentInformation(component.value.name).then((res: any) => {
                component.value.componentInfo = Object.keys(res.results ?? {}).map(key => ({ key, value: res.results[key] }));
            }),
            res.results.accumulators && MoskitoService.getComponentAccumulators(component.value.name).then((res: any) => {
                component.value.accumulators = res.results.accumulators.map((acc: any) => ({ name: acc }));
            }),
        ]);

        dialogVisible.value = true;
    } catch (error) {
        console.error("Error:", error);

        /*ElNotification({
            title: 'Error',
            message: 'An error occurred while fetching component capabilities',
            type: 'error',
        });*/

        ElMessage({
            showClose: true,
            message: 'An error occurred while fetching component capabilities',
            type: 'error',
        })
    }
};
</script>

<template>
  <div class="dashboard">
      <component-details :dialog-visible="dialogVisible" :component="component"/>
    <vue-selector-panel />
      <div class="info-panel">
          info panel with controls Settings | Data Repository
          <div class="actions-container">
              <el-button type="info" @click="$router.push('/settings')">Settings</el-button>
          </div>
      </div>
    <div class="data-panel">
        <div v-if="showData">
            <div v-for="(value, key) in groupedComponents">
                <el-card shadow="never">
                    <template #header>
                        <div>
                            <vue-status :status-color="getAverageStatus(value.map((component: any) => component.color))"/>
                            <span>{{key}}</span>
                        </div>
                    </template>

                    <span v-for="component in value">
                        <el-tooltip
                            effect="dark"
                            placement="top"
                        >
                            <template #content>
                                <div v-for="msg in component.messages">
                                    <span>
                                    {{ msg }}
                                    </span>
                                    <br />
                                </div>
                                <div class="tooltip-time">
                                    <el-icon color="white">
                                        <Clock />
                                    </el-icon>
                                    <span>{{ component.ISO8601Timestamp }}</span>
                                </div>
                            </template>
                            <el-button
                                @click="openComponentSetting(component.name, component.color)"
                                style="margin-right: 8px"
                                :size="'large'"
                            >
                                <vue-status :status-color="component.color"/>
                                {{ component.name }}
                            </el-button>
                        </el-tooltip>
                    </span>
                </el-card>
            </div>
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
.status {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 8px;
    border: 1px solid var(--mc-zinc-200);
}
.tooltip-time {
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>