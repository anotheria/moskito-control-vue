<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useMainStore} from '@/store/mainStore.ts';
import ComponentDetails from "@/views/dashboard/partials/ComponentDetails.vue";
import VueSelectorPanel from "@/components/VueSelectorPanel.vue";
import NotificationService from "@/services/NotificationService.ts";
import HistoryWidget from "@/views/dashboard/partials/HistoryWidget.vue";
import TVWidget from "@/views/dashboard/partials/TVWidget.vue";
import ChartWidget from "@/views/dashboard/partials/ChartWidget.vue";
import DataWidget from "@/views/dashboard/partials/DataWidget.vue";
import StatusWidget from "@/views/dashboard/partials/StatusWidget.vue";
import {getMuteStatus, setMuteStatus, setUnmuteStatus} from "@/api/notification";
import {
    getComponentCapabilities,
    getComponentConfig,
    getComponentConnectorInfo,
    getComponentInformation,
    getComponentThresholds,
    getComponentAccumulators,
    getComponentActions,
    getComponentHistory,
} from "@/api/component";
import {
    IAccumulators,
    IActions, IComponentData,
    IComponentInfo,
    IConfig,
    IConnectorInfo, IHistory,
    IThresholds
} from "@/types/component.interface.ts";
import {getControl} from "@/api/common";
import {IControlView} from "@/types/interfaces.ts";


let refreshIntervalId: number;
let timerIntervalId: number;
const mainStore = useMainStore();
const remainingTime = ref<number>(60);
const lastRefreshTime = ref<string>('');
const showData = ref<boolean>(false);
const dialogVisible = ref(false);
const component = ref<IComponentData>({});


const components = computed(() => mainStore.views?.find((view: IControlView) => view.name === mainStore.activeView)?.components ?? []);
const historyData = computed(() => mainStore.historyData);
const dataWidgets = computed(() => mainStore.views?.find((view: IControlView) => view.name === mainStore.activeView)?.dataWidgets ?? []);

const formatDate = (date: Date): string => {
    return date.toISOString().replace('T', ' ').split('.')[0];
};

const getViews = async () => {
    const { views } = await getControl();
    mainStore.views = views;
    mainStore.setInitialActiveView();
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

const updateMuteTime = async () => {
    const { muteStatus } = await getMuteStatus();
    mainStore.muteStatus = muteStatus;
};

const updateMuteStatus = async () => {
    let muteStatus;
    if (mainStore.getMuteStatus.muted) {
        const response = await setUnmuteStatus();
        muteStatus = response.muteStatus;
    } else {
        const response = await setMuteStatus();
        muteStatus = response.muteStatus;
    }
    mainStore.muteStatus = muteStatus;
};

const openComponentSetting = async (name: string, status: string): Promise<void> => {
    dialogVisible.value = false;
    component.value.name = name;
    component.value.color = status;

    try {
        const capabilities = await getComponentCapabilities(component.value.name);
        component.value.capabilities = capabilities;

        await Promise.all([
            capabilities.thresholds && getComponentThresholds(component.value.name).then((res: IThresholds) => {
                component.value.thresholds = res.thresholds ?? [];
            }),
            capabilities.config && getComponentConfig(component.value.name).then((res: IConfig) => {
                component.value.config = res.config ?? '';
            }),
            capabilities.connectorInfo && getComponentConnectorInfo(component.value.name).then((res: IConnectorInfo) => {
                component.value.connectorInfo = Object.keys(res ?? {}).map(key => ({ key, value: res[key] }));
            }),
            capabilities.componentInfo && getComponentInformation(component.value.name).then((res: IComponentInfo) => {
                component.value.componentInfo = Object.keys(res ?? {}).map(key => ({ key, value: res[key] }));
            }),
            capabilities.accumulators && getComponentAccumulators(component.value.name).then((res: IAccumulators) => {
                component.value.accumulators = res.accumulators.map((acc: string) => ({ name: acc }));
            }),
            capabilities.actions && getComponentActions(component.value.name).then((res: IActions) => {
                component.value.actions = res.actions ?? [];
            }),
            capabilities.history && getComponentHistory(component.value.name).then((res: IHistory) => {
                component.value.history = res.history ?? [];
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
        updateMuteTime();
    }, 60000); // 60 seconds
    updateRemainingTime();
    updateMuteTime();
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
                <span class="mute-status">
                    {{ mainStore.getMuteStatus.muted ? `Remaining muting time ${ mainStore.getMuteStatus.remainingMutingTimeAsString } minutes` : 'Mute for 60 minutes'}}
                </span>
                <el-button type="info" @click="updateMuteStatus()">{{ mainStore.getMuteStatus.muted ? 'Unmute' : 'Mute'}}</el-button>
                <el-divider class="divider" direction="vertical" />
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
    display: flex;
    align-items: center;
    margin-left: auto;
}
.divider {
    --el-border-color: black;
    height: 38px;
    width: 2px;
    margin-left: 20px;
    margin-right: 20px;
}
.mute-status {
    padding-right: 15px;
}
</style>
<style>
.widget-header {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
