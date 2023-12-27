<script setup lang="ts">
import {ref, reactive, computed} from "vue";
import {FormInstance} from "element-plus";


const props = defineProps({
    components: {
        type: Array<any>,
        default: [],
    },
});

const emit = defineEmits(['create', 'delete', 'update']);

const formRef = ref<FormInstance>();

const componentsData = computed(() => {
    return [...props.components];
});

const showForm = ref<boolean>(false);

const activeIndex = ref<number | null>(null);
const activeItem = reactive({
    name: '',
    category: '',
    tags: '',
    connectorType: '',
    credentials: '',
    data: {},
    headers: '',
    location: '',
});

const selectActiveItem = (index: number) => {
    showForm.value = true;
    activeIndex.value = index;
    Object.assign(activeItem, componentsData.value[index]);
};

const onSubmit = () => {
    emit('update', activeItem);

    showForm.value = false;
    activeIndex.value = null;
};

const onDelete = () => {
    emit('delete', activeItem.name);

    showForm.value = false;
    activeIndex.value = null;
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl || activeIndex.value === null) return;
    Object.assign(activeItem, componentsData.value[activeIndex.value]);
};

const addItem = () => {
    showForm.value = true;
    activeIndex.value = null;
    Object.assign(
        activeItem,
        {
            name: '',
            category: '',
            tags: null,
            connectorType: '',
            credentials: null,
            data: {},
            headers: null,
            location: '',
        });
};
</script>

<template>
    <div class="content">
        <el-card class="list-container">
            <div v-for="(item, index) in componentsData">
                <el-button link @click="selectActiveItem(index)"><span>{{ item.name }}</span></el-button>
            </div>

            <div style="margin-top: 15px">
                <el-button type="primary" @click="addItem">Add</el-button>
            </div>
        </el-card>
        <div class="form-container">
            <el-form v-if="showForm" ref="formRef" :model="activeItem" label-width="120px">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="activeItem.name" :disabled="activeIndex !== null" />
                </el-form-item>
                <el-form-item label="Category">
                    <el-input v-model="activeItem.category" />
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
<!--                <el-form-item label="Data">
                    <el-input v-model="activeItem.data" />
                </el-form-item>-->
<!--                <el-form-item label="Headers">
                    <el-input v-model="activeItem.headers" />
                </el-form-item>-->
                <el-form-item label="Location">
                    <el-input v-model="activeItem.location" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">{{ activeIndex === null ? 'Create' : 'Save' }}</el-button>
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