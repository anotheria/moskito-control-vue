<script setup lang="ts">
import {ref, reactive, computed} from "vue";
import {FormInstance} from "element-plus";
import {IArrayDataItem, IComponent, IComponentData, IHeader} from "@/types/interfaces.ts";
import {Folder, FolderOpened} from '@element-plus/icons-vue'


const props = defineProps({
    components: {
        type: Array<IComponent>,
        default: [],
    },
});
const emit = defineEmits(['delete', 'update']);

const formRef = ref<FormInstance>();
const componentsData = computed(() => {
    return [...props.components];
});

const showForm = ref<boolean>(false);

const activeIndex = ref<number | null>(null);
const activeItem = reactive<IComponent>({
    name: null,
    category: null,
    tags: null,
    connectorType: null,
    credentials: null,
    data: {},
    headers: [],
    location: null,
});

const selectActiveItem = (index: number) => {
    showForm.value = true;
    activeIndex.value = index;
    Object.assign(activeItem, componentsData.value[index]);
    activeItem.data = Object.entries(activeItem.data).map(([key, value]) => ({key, value}));
};

const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    activeItem.headers = (activeItem.headers ?? [])
        .filter((header: IHeader) => header.key?.trim() !== '' && header.value?.trim() !== '');

    formEl.validate((valid) => {
        if (valid) {
            activeItem.data = activeItem.data
                .reduce((acc: Array<IArrayDataItem>, {key, value}: IArrayDataItem) => ({...acc, [key]: value}), {});
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

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl || activeIndex.value === null) return;
    Object.assign(activeItem, componentsData.value[activeIndex.value]);
    activeItem.data = Object.entries(activeItem.data).map(([key, value]) => ({key, value}));
};

const addItem = () => {
    showForm.value = true;
    activeIndex.value = null;
    formRef.value?.resetFields();

    Object.assign(
        activeItem,
        {
            name: null,
            category: null,
            tags: null,
            connectorType: null,
            credentials: null,
            data: {},
            headers: [],
            location: null,
        });
};

const addHeader = () => {
    if (!activeItem.headers) activeItem.headers = [];

    activeItem.headers.push({
        key: '',
        value: '',
    });
};

const addData = () => {
    if (!activeItem.data) activeItem.data = [];
    activeItem.data.push({
        key: '',
        value: '',
    });
};

const removeHeader = (item: IHeader) => {
    if (!activeItem.headers) return false;

    const index = activeItem.headers.indexOf(item);
    if (index !== -1) {
        activeItem.headers.splice(index, 1);
    }
};
const removeData = (item: IComponentData) => {
    if (!activeItem.data) return false;

    const index = activeItem.data.indexOf(item);
    if (index !== -1) {
        activeItem.data.splice(index, 1);
    }
};
</script>

<template>
    <div class="content">
        <el-card class="list-container">
            <div v-for="(item, index) in componentsData">
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
            <el-form v-if="showForm" ref="formRef" :model="activeItem" label-width="120px">
                <el-form-item
                    label="Name"
                    prop="name"
                    :rules="{ required: true, message: 'Name can not be null', trigger: ['blur', 'change'] }">
                    <el-input v-model="activeItem.name" :disabled="activeIndex !== null" />
                </el-form-item>
                <el-form-item label="Category">
                    <el-input v-model="activeItem.category"/>
                </el-form-item>
                <el-form-item label="Tags">
                    <el-input v-model="activeItem.tags" />
                </el-form-item>
                <el-form-item label="Connector Type">
                    <el-select v-model="activeItem.connectorType" class="w-100">
                        <el-option label="HTTP" value="HTTP" />
                        <el-option label="URL" value="URL" />
                        <el-option label="DISTRIBUTEME" value="DISTRIBUTEME" />
                        <el-option label="RMI" value="RMI" />
                        <el-option label="JDBC" value="JDBC" />
                        <el-option label="MONGO" value="MONGO" />
                        <el-option label="NOOP" value="NOOP" />
                        <el-option label="LOCALMOSKITO" value="LOCALMOSKITO" />
                        <el-option label="CONTROL" value="CONTROL" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Credentials">
                    <el-input v-model="activeItem.credentials" />
                </el-form-item>
                <el-form-item label="Location">
                    <el-input v-model="activeItem.location" />
                </el-form-item>
                <el-form-item label="Headers">
                    <el-button type="primary" @click="addHeader">Add header</el-button>
                </el-form-item>
                <el-form-item v-for="(header) in activeItem.headers">
                    <div style="margin-right: 15px">
                        <el-input v-model="header.key" placeholder="Header key" style="margin-bottom: 5px"/>
                        <el-input v-model="header.value" placeholder="Header value" />
                    </div>
                    <el-button class="mt-2" type="danger" @click.prevent="removeHeader(header)">Delete header</el-button>
                </el-form-item>
                <el-form-item label="Data">
                    <el-button type="primary" @click="addData">Add data</el-button>
                </el-form-item>
                <el-form-item v-for="(data) in activeItem.data">
                    <div style="margin-right: 15px">
                        <el-input v-model="data.key" placeholder="Data key" style="margin-bottom: 5px"/>
                        <el-input v-model="data.value" placeholder="Data value" />
                    </div>
                    <el-button class="mt-2" type="danger" @click.prevent="removeData(data)">Delete data</el-button>
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