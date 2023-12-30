<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {FormInstance} from "element-plus";
import {IChart, IChartLine} from "@/types/interfaces.ts";


const props = defineProps({
    charts: {
        type: Array<IChart>,
        default: [],
    },
});
const emit = defineEmits(['delete', 'update']);

const formRef = ref<FormInstance>();

const chartsData = computed(() => {
    return [...props.charts];
});
const showForm = ref<boolean>(false);
const activeIndex = ref<number | null>(null);
const activeItem = reactive<IChart>({
    name: null,
    tags: null,
    // limit: 0,
    lines: [],
});

const selectActiveItem = (index: number) => {
    showForm.value = true;
    activeIndex.value = index;
    Object.assign(activeItem, chartsData.value[index]);
};

const addChartLine = () => {
    if (!activeItem.lines) activeItem.lines = [];

    activeItem.lines.push({
        component: '',
        componentTags: '',
        accumulator: '',
        caption: '',
    });
};

const removeChartLine = (item: IChartLine) => {
    if (!activeItem.lines) return false;

    const index = activeItem.lines.indexOf(item);
    if (index !== -1) {
        activeItem.lines.splice(index, 1);
    }
};

const addItem = () => {
    showForm.value = true;
    activeIndex.value = null;
    formRef.value?.resetFields();

    Object.assign(
        activeItem,
        {
            name: null,
            tags: null,
            // limit: 0,
            lines: [],
        });
};

const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    formEl.validate((valid) => {
        if (valid) {
            delete activeItem.limit;
            emit('update', activeItem);
            showForm.value = false;
            activeIndex.value = null;
        } else {
            return false;
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl || activeIndex.value === null) return;
    Object.assign(activeItem, chartsData.value[activeIndex.value]);
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
            <div v-for="(item, index) in chartsData">
                <el-button link @click="selectActiveItem(index)"><span>{{ item.name }}</span></el-button>
            </div>

            <div style="margin-top: 15px">
                <el-button type="primary" @click="addItem">Add</el-button>
            </div>
        </el-card>
        <div class="form-container">
            <el-form v-if="showForm" ref="formRef" :model="activeItem" label-width="100px">
                <el-form-item
                    label="Name"
                    prop="name"
                    :rules="{ required: true, message: 'Name can not be null', trigger: ['blur', 'change'] }">
                    <el-input v-model="activeItem.name" :disabled="activeIndex !== null" />
                </el-form-item>
                <el-form-item label="Tags">
                    <el-input v-model="activeItem.tags" />
                </el-form-item>
<!--                <el-form-item label="Limit">
                    <el-input v-model="activeItem.limit" type="number"/>
                </el-form-item>-->
                <el-form-item label="Lines">
                    <el-button type="primary" @click="addChartLine">Add line</el-button>
                </el-form-item>
                <el-form-item v-for="(line) in activeItem.lines">
                    <div style="margin-right: 15px">
<!--                        <el-form-item label="accumulator">
                            <el-input v-model="line.accumulator" :label="'Accumulator'" placeholder="Accumulator" style="margin-bottom: 5px"/>
                        </el-form-item>
                        <el-form-item label="caption">
                            <el-input v-model="line.caption" :label="'Caption'" placeholder="Caption" style="margin-bottom: 5px"/>
                        </el-form-item>
                        <el-form-item label="component">
                            <el-input v-model="line.component" placeholder="Component" style="margin-bottom: 5px"/>
                        </el-form-item>
                        <el-form-item label="componentTags">
                            <el-input v-model="line.componentTags" placeholder="Component Tags"/>
                        </el-form-item>-->
                        <el-input v-model="line.component" placeholder="Component" style="margin-bottom: 5px"/>
                        <el-input v-model="line.componentTags" placeholder="Component Tags" style="margin-bottom: 5px"/>
                        <el-input v-model="line.accumulator" :label="'Accumulator'" placeholder="Accumulator" style="margin-bottom: 5px"/>
                        <el-input v-model="line.caption" :label="'Caption'" placeholder="Caption" style="margin-bottom: 5px"/>
                    </div>
                    <el-button class="mt-2" type="danger" @click.prevent="removeChartLine(line)">Delete line</el-button>
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