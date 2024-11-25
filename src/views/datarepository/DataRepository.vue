<script setup lang="ts">
import {onMounted, ref} from "vue";

import {getDataRepository} from "@/api/common";
import {IDataRepositoryItem} from "@/types/repository.interface.ts";


const data = ref<IDataRepositoryItem[]>([]);

onMounted(async () => {
    try {
        const response = await getDataRepository();
        data.value = response.data;
    } catch (error) {
        console.error("Failed to fetch data repository:", error);
    }
});
</script>
<template>
    <div class="dashboard">
        <div class="info-panel">
            Data Repository
            <div class="actions-container">
                <el-button type="info" @click="$router.push('/dashboard')">Back</el-button>
            </div>
        </div>
        <div class="data-panel">
            <el-table :data="data" stripe>
                <el-table-column prop="name" label="Name" />
                <el-table-column prop="value" label="Value" />
                <el-table-column label="Formulas">
                    <template #default="scope">
                        <div v-for="formula in scope.row.formulas" :key="formula">
                            <span>{{ formula }}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style scoped lang="scss">
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
.actions-container {
    margin-left: auto;
}
</style>