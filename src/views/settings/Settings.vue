<script setup lang="ts">
import MoskitoService from "@/services/MoskitoService.ts";
import {onMounted, ref} from "vue";
import ComponentsSettings from "@/views/settings/partials/ComponentsSettings.vue";
import ViewsSettings from "@/views/settings/partials/ViewsSettings.vue";
import ChartsSettings from "@/views/settings/partials/ChartsSettings.vue";
import {IChart, IComponent, ISettingsContent, IView} from "@/types/interfaces.ts";


const activeTab = ref<'components' | 'views'| 'charts'>('components');
const content = ref<ISettingsContent>({
    components: [],
    views: [],
    charts: [],
});

const updateComponent = (component: IComponent) => {
    console.log('updateComponent!', component);

    MoskitoService.updateComponent(component).then((response) => {
        console.log(response);
        MoskitoService.fetchComponents().then((response) => {
            content.value.components = response.results.components;
        });
    });
};

const deleteComponent = (name: string) => {
    console.log('deleteComponent!', name);

    MoskitoService.deleteComponent(name).then((response) => {
        console.log(response);
        MoskitoService.fetchComponents().then((response) => {
            content.value.components = response.results.components;
        });
    });
};

const updateView = (view: IView) => {
    console.log('create view!', view);

    MoskitoService.updateView(view).then((response) => {
        console.log(response);
        MoskitoService.fetchViews().then((response) => {
            content.value.views = response.results.views;
        });
    });
};

const deleteView = (name: string) => {
    console.log('delete view!', name);

    MoskitoService.deleteView(name).then((response) => {
        console.log(response);
        MoskitoService.fetchViews().then((response) => {
            content.value.views = response.results.views;
        });
    });
};

const updateChart = (chart: IChart) => {
    console.log('create chart!', chart);

    MoskitoService.updateChart(chart).then((response) => {
        console.log(response);
        MoskitoService.fetchCharts().then((response) => {
            content.value.charts = response.results.charts;
        });
    });
};

const deleteChart = (name: string) => {
    console.log('delete chart!', name);

    MoskitoService.deleteChart(name).then((response) => {
        console.log(response);
        MoskitoService.fetchCharts().then((response) => {
            content.value.charts = response.results.charts;
        });
    });
};

onMounted(() => {
    Promise.all([
        MoskitoService.fetchViews(),
        MoskitoService.fetchComponents(),
        MoskitoService.fetchCharts()
    ]).then((values) => {
        content.value = {
            views: values[0].results.views,
            components: values[1].results.components,
            charts: values[2].results.charts,
        };
        console.log(content.value);
    });
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
                        @delete="deleteComponent($event)"
                        @update="updateComponent($event)"
                    />
                </el-tab-pane>
                <el-tab-pane label="Charts" name="charts">
                    <charts-settings
                        v-if="content.charts.length"
                        :charts="content.charts"
                        @update="updateChart($event)"
                        @delete="deleteChart($event)"
                    />
                </el-tab-pane>
                <el-tab-pane label="Views" name="views">
                    <views-settings
                        v-if="content.views.length"
                        :views="content.views"
                        :chartOptions="content.charts"
                        :componentsOptions="content.components"
                        @update="updateView($event)"
                        @delete="deleteView($event)"
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