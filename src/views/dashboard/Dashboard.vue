<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useMainStore} from '@/store/mainStore.ts';
import MoskitoService from '@/services/MoskitoService.ts';
import ComponentDetails from "@/views/dashboard/partials/ComponentDetails.vue";
import {getAverageStatus} from "@/types/consts.ts";
import VueSelectorPanel from "@/components/VueSelectorPanel.vue";
import VueStatus from "@/components/VueStatus.vue";
import {Clock, Right} from '@element-plus/icons-vue';
import NotificationService from "@/services/NotificationService.ts";

const mainStore = useMainStore();
const getViews = async () => {
  const { results: { views } } = await MoskitoService.getControl();
  mainStore.views = views;
  mainStore.setInitialActiveView();
  // await mainStore.fetchHistory();
  // await getHistory();
  showData.value = true;
}

onMounted(() => {
  getViews();
});

const showData = ref<boolean>(false);
const dialogVisible = ref(false);
const component = ref<any>({});

const components = computed(() => mainStore.views?.find((view: any) => view.name === mainStore.activeView)?.components ?? []);
const historyData = computed(() => mainStore.historyData);

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
            res.results.actions && MoskitoService.getComponentActions(component.value.name).then((res: any) => {
                component.value.actions = res.results.actions ?? [];
            }),
            res.results.history && MoskitoService.getComponentHistory(component.value.name).then((res: any) => {
                component.value.history = res.results.history ?? [];
            }),
        ]);

        dialogVisible.value = true;
    } catch (error) {
        console.error("Error:", error);
        NotificationService.notifyFailure('An error occurred while fetching component capabilities')
    }
};

const getChartData = (index: number) => {
    return {
        chartOptions: {
            chart: {
                type: 'line',
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight',
                width: 1
            },
            title: {
                text: mainStore.getChartData[index]?.name,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: mainStore.getChartData[index]?.captions,
                /*labels: {
                    format: 'HH:mm',
                },
                type: 'datetime',*/
            }
        },
        seriesData: mainStore.getChartData[index]?.lines.map((line: any) => ({ name: line["lineName"], data: line["values"] }))
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

        <div v-if="showData" class="data-panel">
            <div v-if="mainStore.getShowStatus">
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
            <div v-if="mainStore.getShowCharts && mainStore.getChartData.length">
                <div class="widget-header">
                    <h4>Charts</h4>
                </div>
                <div v-for="(chart, index) in mainStore.getChartData">
                    <apexchart
                        height="500"
                        :options="getChartData(index).chartOptions"
                        :series="getChartData(index).seriesData"
                    />
                    <el-divider />
                </div>
            </div>
            <div v-if="mainStore.getShowHistory">
                <div class="widget-header">
                    <h4>History</h4>
                </div>
                <el-table v-if="historyData" :data="historyData" stripe>
                    <el-table-column prop="isoTimestamp" label="Timestamp" />
                    <el-table-column prop="componentName" label="Name" />
                    <el-table-column prop="newMessages[0]" label="Reason" />
                    <el-table-column label="Status change">
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                                <vue-status :status-color="scope.row.oldStatus"/>
                                <el-icon style="margin-right: 8px;"><Right /></el-icon>
                                <vue-status :status-color="scope.row.newStatus"/>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
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
  font-size: 14px;
  padding: 0 15px;
  border-top-left-radius: 5px;
}
.data-panel {
  background-color: var(--mc-zinc-100);
  flex-grow: 1;
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

.widget-header {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
