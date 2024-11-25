<script setup lang="ts">
import VueStatus from "@/components/VueStatus.vue";
import {Right} from "@element-plus/icons-vue";
import {IHistoryItem} from "@/types/component.interface.ts";

interface Props {
    historyData: Array<IHistoryItem> | [];
}

const props = withDefaults(defineProps<Props>(), {
    historyData: [],
});
</script>
<template>
    <div class="widget-header">
        <h4>History</h4>
    </div>
    <el-table v-if="historyData" :data="historyData" stripe>
        <el-table-column prop="isoTimestamp" label="Timestamp" />
        <el-table-column prop="componentName" label="Name" />
        <el-table-column prop="newMessages[0]" label="Reason" />
        <el-table-column label="Status change">
            <template #default="scope">
                <div class="status-change">
                    <vue-status :status-color="scope.row.oldStatus"/>
                    <el-icon class="status-icon"><Right /></el-icon>
                    <vue-status :status-color="scope.row.newStatus"/>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<style lang="scss" scoped>
.status-change {
    display: flex;
    align-items: center;
}

.status-icon {
    margin-right: 8px;
}
</style>