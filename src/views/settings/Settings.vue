<script setup lang="ts">
import {onMounted, ref} from "vue";
import ComponentsSettings from "@/views/settings/partials/ComponentsSettings.vue";
import ViewsSettings from "@/views/settings/partials/ViewsSettings.vue";
import ChartsSettings from "@/views/settings/partials/ChartsSettings.vue";
import {
    fetchCharts,
    updateChart,
    deleteChart,
    fetchComponents,
    updateComponent,
    deleteComponent,
    fetchViews,
    updateView,
    deleteView
} from "@/api/configuration/index.ts";
import {ISettingsContent} from "@/types/interfaces.ts";
import {IChart} from "@/types/chart.interface.ts";
import {IComponent} from "@/types/component.interface.ts";
import {IView} from "@/types/view.interface.ts";


const activeTab = ref<'components' | 'views'| 'charts'>('components');
const content = ref<ISettingsContent>({
    components: [],
    views: [],
    charts: [],
});

const updateComponentData = async (component: IComponent) => {
    await updateComponent(component);
    const response = await fetchComponents();
    content.value.components = response.components;
};

const deleteComponentData = async (name: string) => {
    await deleteComponent(name);
    const response = await fetchComponents();
    content.value.components = response.components;
};

const updateViewData = async (view: IView) => {
    await updateView(view);
    const response = await fetchViews();
    content.value.views = response.views;
};

const deleteViewData = async (name: string) => {
    await deleteView(name);
    const response = await fetchViews();
    content.value.views = response.views;
};

const updateChartData = async (chart: IChart) => {
    await updateChart(chart);
    const response = await fetchCharts();
    content.value.charts = response.charts;
};

const deleteChartData = async (name: string) => {
    await deleteChart(name);
    const response = await fetchCharts();
    content.value.charts = response.charts;
};

onMounted(async () => {
    const [viewsResponse, componentsResponse, chartsResponse] = await Promise.all([
        fetchViews(),
        fetchComponents(),
        fetchCharts()
    ]);

    content.value = {
        views: viewsResponse.views,
        components: componentsResponse.components,
        charts: chartsResponse.charts,
    };
});
</script>

<template>
    <div  class="dashboard">
        <div class="info-panel">
            Settings
            <div class="actions-container">
                <el-button type="info" @click="$router.push('/dashboard')">Back</el-button>
            </div>
        </div>
        <div class="data-panel">
            <el-tabs
                v-model="activeTab"
                type="card"
            >
                <el-tab-pane label="Components" name="components">
                    <components-settings
                        v-if="content.components.length"
                        :components="content.components"
                        @delete="deleteComponentData($event)"
                        @update="updateComponentData($event)"
                    />
                </el-tab-pane>
                <el-tab-pane label="Charts" name="charts">
                    <charts-settings
                        v-if="content.charts.length"
                        :charts="content.charts"
                        @update="updateChartData($event)"
                        @delete="deleteChartData($event)"
                    />
                </el-tab-pane>
                <el-tab-pane label="Views" name="views">
                    <views-settings
                        v-if="content.views.length"
                        :views="content.views"
                        :chartOptions="content.charts"
                        :componentsOptions="content.components"
                        @update="updateViewData($event)"
                        @delete="deleteViewData($event)"
                    />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: row;
    gap: 15px;
    padding: 30px;
}
.list-container {
    flex-basis: 25%;
    border: 1px solid var(--mc-zinc-700);
    border-radius: 8px;
}
.form-container {
    flex-basis: 75%;
    background-color: var(--mc-zinc-100);
    padding: 15px;
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
.dashboard {
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
.actions-container {
    margin-left: auto;
}
</style>