<script setup lang="ts">
import MoskitoService from "@/services/MoskitoService.ts";
import {onMounted, ref} from "vue";
import ComponentsSettings from "@/views/settings/partials/ComponentsSettings.vue";
import ViewsSettings from "@/views/settings/partials/ViewsSettings.vue";


const activeTab = ref<'components' | 'views'| 'charts'>('components');
const activeItem = ref<any>(null);

const content = ref<any>({
    components: [],
    views: [],
    charts: [],
});


const createComponent = (component: any) => {
    console.log('create!', component);

    MoskitoService.createComponent(component).then((response) => {
        console.log(response);
        MoskitoService.fetchComponents().then((response) => {
            content.value.components = response.results.components;
        });
    });
}

const deleteComponent = (name: any) => {
    console.log('deleteComponent!', name);

    MoskitoService.deleteComponent(name).then((response) => {
        console.log(response);
        MoskitoService.fetchComponents().then((response) => {
            content.value.components = response.results.components;
        });
    });
}

const updateComponent = (component: any) => {
    console.log('updateComponent!', component);
}

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
                        @create="createComponent($event)"
                        @delete="deleteComponent($event)"
                    />
                </el-tab-pane>
                <el-tab-pane label="Charts" name="charts">
                    <div class="content">
                        <el-card class="list-container">
                            <div v-for="item in content.charts">
                                <el-button link @click="activeItem = item"><span>{{ item.name }}</span></el-button>
                            </div>
                        </el-card>
                        <div class="form-container">
                            {{ activeItem }}
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Views" name="views">
                    <views-settings
                        v-if="content.views.length"
                        :views="content.views"
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