<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useMainStore} from '@/store/mainStore.ts';
import MoskitoService from '@/services/MoskitoService.ts';
import ComponentDetails from "@/views/dashboard/partials/ComponentDetails.vue";
import VueSelectorPanel from "@/components/VueSelectorPanel.vue";
import NotificationService from "@/services/NotificationService.ts";
import HistoryWidget from "@/views/dashboard/partials/HistoryWidget.vue";
import TVWidget from "@/views/dashboard/partials/TVWidget.vue";
import ChartWidget from "@/views/dashboard/partials/ChartWidget.vue";
import DataWidget from "@/views/dashboard/partials/DataWidget.vue";
import StatusWidget from "@/views/dashboard/partials/StatusWidget.vue";


let refreshIntervalId: number;
let timerIntervalId: number;
const mainStore = useMainStore();
const remainingTime = ref<number>(60);
const lastRefreshTime = ref<string>('');
const showData = ref<boolean>(false);
const dialogVisible = ref(false);
const component = ref<any>({});


const components = computed(() => mainStore.views?.find((view: any) => view.name === mainStore.activeView)?.components ?? []);
const historyData = computed(() => mainStore.historyData);
const dataWidgets = computed(() => mainStore.views?.find((view: any) => view.name === mainStore.activeView)?.dataWidgets ?? []);

const formatDate = (date: Date): string => {
    return date.toISOString().replace('T', ' ').split('.')[0];
};

const getViews = async () => {
    const { results: { views } } = await MoskitoService.getControl();
    mainStore.views = views;
    mainStore.setInitialActiveView();
    // await mainStore.fetchHistory();
    // await getHistory();
    showData.value = true;
    lastRefreshTime.value = formatDate(new Date());
}

const updateRemainingTime = () => {
    clearInterval(timerIntervalId);
    remainingTime.value = 60;
    timerIntervalId = setInterval(() => {
        if (remainingTime.value > 0) {
            remainingTime.value -= 1;
        }
    }, 1000);
};

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

onMounted(() => {
    getViews();
    refreshIntervalId = setInterval(() => {
        getViews();
        updateRemainingTime();
    }, 60000); // 60 seconds
    updateRemainingTime();
});

onUnmounted(() => {
    clearInterval(refreshIntervalId);
    clearInterval(timerIntervalId);
});
</script>

<template>
    <div class="dashboard">
        <component-details :dialog-visible="dialogVisible" :component="component"/>
        <vue-selector-panel />
        <div class="info-panel">
            <div class="timer">
                <span> Last refresh: {{ lastRefreshTime }} </span>
                <span> Next refresh in: {{ remainingTime }} seconds </span>
            </div>
            <div class="actions-container">
                <el-button type="info" @click="$router.push('/settings')">Settings</el-button>
                <el-button type="info" @click="$router.push('/datarepository')"> Data Repository </el-button>
            </div>
        </div>

        <div v-if="showData" class="data-panel">
            <TVWidget v-if="mainStore.getShowTV" :viewStatus="mainStore.getActiveViewStatus.toLowerCase()"/>
            <status-widget v-if="mainStore.getShowStatus" :components="components" @component-selected="openComponentSetting"/>
            <data-widget :data-widgets="dataWidgets"/>
            <chart-widget v-if="mainStore.getShowCharts && mainStore.getChartData.length" :chart-data="mainStore.getChartData"/>
            <history-widget v-if="mainStore.getShowHistory" :historyData="historyData" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dashboard {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.timer {
    display: flex;
    justify-content: space-between;
    gap: 25px;
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
</style>
<style>
.widget-header {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
