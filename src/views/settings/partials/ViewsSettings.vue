<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {FormInstance} from "element-plus";
import {IChart, IComponent, IView} from "@/types/interfaces.ts";
import {Folder, FolderOpened} from "@element-plus/icons-vue";

const props = defineProps({
    views: {
        type: Array<IView>,
        default: [],
    },
    chartOptions: {
        type: Array<IChart>,
        default: [],
    },
    componentsOptions: {
        type: Array<IComponent>,
        default: [],
    },
});
const emit = defineEmits(['delete', 'update']);

const formRef = ref<FormInstance>();
const viewsData = computed(() => {
    return [...props.views];
});
const showForm = ref<boolean>(false);
const activeIndex = ref<number | null>(null);
const activeItem = reactive<IView>({
    name: '',
    chartTags: [],
    charts: [],
    componentCategories: [],
    componentTags: [],
    components: [],
    widgetTags: [],
    widgets: [],
});

const chartOptions = computed(() => {
    return [
        {label: 'All', value: '*'},
        ...(props.chartOptions.map(chart => ({ label: chart.name, value: chart.name })))
    ];
});

const componentsOptions = computed(() => {
    return [
        {label: 'All', value: '*'},
        ...(props.componentsOptions.map(component => ({ label: component.name, value: component.name })))
    ];
});

const selectHelper = (newValue: string[], fieldName: keyof IView) => {
    if (newValue.includes('*')) {
        activeItem[fieldName] = ['*'];
    }
};

const selectActiveItem = (index: number) => {
    showForm.value = true;
    activeIndex.value = index;
    Object.assign(activeItem, viewsData.value[index]);
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl || activeIndex.value === null) return;
    Object.assign(activeItem, viewsData.value[activeIndex.value]);
};

const addItem = () => {
    showForm.value = true;
    activeIndex.value = null;
    formRef.value?.resetFields();

    Object.assign(
        activeItem,
        {
            name: null,
            chartTags: [],
            charts: [],
            componentCategories: [],
            componentTags: [],
            components: [],
            widgetTags: [],
            widgets: [],
        });
}

const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    formEl.validate((valid) => {
        if (valid) {
            emit('update', activeItem);
            showForm.value = false;
            activeIndex.value = null;
        } else {
            return false;
        }
    });
};

const onDelete = () => {
    emit('delete', activeItem.name);

    showForm.value = false;
    activeIndex.value = null;
};
</script>
<template>
    <div class="content">
        <el-card class="list-container">
            <div v-for="(item, index) in viewsData">
                <el-button
                    link
                    :icon="activeIndex === index ? FolderOpened : Folder"
                    @click="selectActiveItem(index)"
                >
                    <span>{{ item.name }}</span>
                </el-button>
            </div>

            <div style="margin-top: 15px">
                <el-button type="info" @click="addItem">New</el-button>
            </div>
        </el-card>
        <div class="form-container">
            <el-form v-if="showForm" ref="formRef" :model="activeItem" label-width="180px">
                <el-form-item
                    label="Name"
                    prop="name"
                    :rules="{ required: true, message: 'Name can not be null', trigger: ['blur', 'change'] }">
                    <el-input v-model="activeItem.name" :disabled="activeIndex !== null" />
                </el-form-item>
                <el-form-item label="Charts">
                    <el-select
                        @change="selectHelper($event, 'charts')"
                        v-model="activeItem.charts"
                        multiple
                        class="w-100">
                        <el-option
                            v-for="item in chartOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Chart Tags">
                    <el-select
                        v-model="activeItem.chartTags"
                        @change="selectHelper($event, 'chartTags')"
                        multiple
                        allow-create
                        filterable
                        default-first-option
                        class="w-100"
                    >
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Components">
                    <el-select
                        @change="selectHelper($event, 'components')"
                        v-model="activeItem.components"
                        multiple
                        class="w-100">
                        <el-option
                            v-for="item in componentsOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Component Tags">
                    <el-select
                        v-model="activeItem.componentTags"
                        @change="selectHelper($event, 'componentTags')"
                        multiple
                        allow-create
                        filterable
                        default-first-option
                        class="w-100"
                    >
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Component Categories">
                    <el-select
                        v-model="activeItem.componentCategories"
                        @change="selectHelper($event, 'componentCategories')"
                        multiple
                        allow-create
                        filterable
                        default-first-option
                        class="w-100"
                    >
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Widgets">
                    <el-select
                        v-model="activeItem.widgets"
                        @change="selectHelper($event, 'widgets')"
                        multiple
                        allow-create
                        filterable
                        default-first-option
                        class="w-100"
                    >
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Widget Tags">
                    <el-select
                        v-model="activeItem.widgetTags"
                        @change="selectHelper($event, 'widgetTags')"
                        multiple
                        allow-create
                        filterable
                        default-first-option
                        class="w-100"
                    >
                        <el-option label="All" value="*" />
                    </el-select>
                </el-form-item>
                <el-divider />
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(formRef)">{{ activeIndex === null ? 'Create' : 'Save' }}</el-button>
                    <el-button v-if="activeIndex !== null" @click="resetForm(formRef)">Reset</el-button>
                    <el-button v-if="activeIndex !== null" type="danger" @click="onDelete">Delete</el-button>
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
.w-100 {
    width: 100%;
}
</style>