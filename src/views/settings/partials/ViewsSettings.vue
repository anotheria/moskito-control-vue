<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {FormInstance} from "element-plus";

const props = defineProps({
    views: {
        type: Array<any>,
        default: [],
    },
});
const emit = defineEmits(['create', 'delete', 'update']);

const formRef = ref<FormInstance>();
const viewsData = computed(() => {
    return [...props.views];
});
const activeItem = reactive({
    name: '',
    chartTags: [],
    charts: [],
    componentCategories: [],
    componentTags: [],
    components: [],
    widgetTags: [],
    widgets: [],
});

const selectActiveItem = (index: any) => {
    Object.assign(activeItem, viewsData.value[index]);
};
</script>
<template>
    <div class="content">
        <el-card class="list-container">
            <div v-for="(item, index) in viewsData">
                <el-button link @click="selectActiveItem(index)"><span>{{ item.name }}</span></el-button>
            </div>
        </el-card>
        <div class="form-container">
            {{ activeItem }}

            <el-form ref="formRef" :model="activeItem" label-width="180px">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="activeItem.name" />
                </el-form-item>
                <el-form-item label="Charts">
                    <el-select v-model="activeItem.charts" multiple>
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Chart Tags">
                    <el-select v-model="activeItem.chartTags" multiple>
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Components">
                    <el-select v-model="activeItem.components" multiple>
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Component Tags">
                    <el-select v-model="activeItem.componentTags" multiple>
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Component Categories">
                    <el-select v-model="activeItem.componentCategories" multiple>
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Widgets">
                    <el-select v-model="activeItem.widgets" multiple>
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Widget Tags">
                    <el-select v-model="activeItem.widgetTags" multiple>
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">Save</el-button>
                </el-form-item>
            </el-form>
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
    height: fit-content;
    flex-basis: 25%;
    border: 1px solid var(--mc-zinc-700);
    border-radius: 8px;
}
.form-container {
    flex-basis: 75%;
    background-color: var(--mc-zinc-100);
    padding: 15px;
}
</style>