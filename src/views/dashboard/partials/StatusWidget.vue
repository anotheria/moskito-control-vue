<script setup lang="ts">
import {getAverageStatus} from "@/types/consts.ts";
import VueStatus from "@/components/VueStatus.vue";
import {Clock} from "@element-plus/icons-vue";
import {computed, defineProps, ref} from "vue";


interface Props {
    components: any;
}

const props = withDefaults(defineProps<Props>(), {
    components: [],
});

const emit = defineEmits(['componentSelected']);


const statusFilter = ref([]);
const statuses = ['GREEN', 'YELLOW', 'ORANGE', 'RED', 'PURPLE'];
const categoryFilter = ref('All');

const allComponents2 = ref({});


const groupedComponents = computed(() => {
    const allComponents = props.components?.reduce((acc: any, component: any) => {
        const category = component.category || 'No Category';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(component);
        return acc;
    }, {});

    allComponents2.value = allComponents;

    const filteredKeys = Object.keys(allComponents).filter(key => categoryFilter.value === 'All' || key === categoryFilter.value);

    return filteredKeys.reduce((acc: any, key: string) => {
        acc[key] = allComponents[key].filter((component: any) => statusFilter.value.length === 0 || statusFilter.value.includes(component.color));
        return acc;
    }, {});
});

const statusCount = computed(() => {
    return statuses.reduce((acc: any, status: string) => {
        acc[status] = props.components.filter((component: any) => component.color === status).length;
        return acc;
    }, {});
});


</script>
<template>
    <div class="widget-header">
        <h4>Status</h4>
    </div>
    <div class="filter-container">
        <div class="filter-group">
            <span>Category: </span>
            <el-radio-group v-model="categoryFilter">
                <el-radio-button v-for="category in ['All', ...Object.keys(allComponents2)]" :key="category" :value="category" :label="category">
                    {{ category }} ({{ category === 'All' ? Object.values(allComponents2).flat().length : allComponents2[category]?.length }})
                </el-radio-button>
            </el-radio-group>
        </div>
        <div class="filter-group">
            <span>Status: </span>
            <el-checkbox-group v-model="statusFilter">
                <el-checkbox-button v-for="status in statuses" :key="status" :value="status" :label="status">
                    <vue-status :status-color="status"/>
                    {{ statusCount[status] }}
                </el-checkbox-button>
            </el-checkbox-group>
        </div>
    </div>
    <div v-for="(value, key) in groupedComponents">
        <el-card v-if="value.length" shadow="never">
            <template #header>
                <div>
                    <vue-status :status-color="getAverageStatus(allComponents2[key].map((component: any) => component.color))"/>
                    <span>{{key}}</span>
                </div>
            </template>

            <span v-for="component in value">
                <el-tooltip effect="dark" placement="top">
                    <template #content>
                        <div v-for="msg in component.messages">
                            <span>{{ msg }}</span>
                            <br />
                        </div>
                        <div class="tooltip-time">
                            <el-icon color="white">
                                <Clock />
                            </el-icon>
                            <span>{{ component.ISO8601Timestamp }}</span>
                        </div>
                    </template>
                    <el-button @click="emit('componentSelected', component.name, component.color)"
                               class="component-button"
                               :size="'large'">
                        <vue-status :status-color="component.color"/>
                        {{ component.name }}
                    </el-button>
                </el-tooltip>
            </span>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.filter-container {
    display: flex;
}

.filter-group {
    display: flex;
    align-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px;
}

.tooltip-time {
    display: flex;
    align-items: center;
    gap: 5px;
}

.component-button {
    margin-right: 8px;
}
</style>