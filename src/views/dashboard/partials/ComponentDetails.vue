<script setup lang="ts">
import VueStatus from "@/components/VueStatus.vue";
import { defineProps, ref } from "vue";

const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false,
    },
    component: {
        type: Object,
        default: {},
    },
});

const multipleSelection = ref<any>([]);

const handleAccumulatorSelection = (acc: any) => {
    console.log('Selected accumulator', acc);
    multipleSelection.value = acc;
}
</script>

<template>
    <el-dialog
        v-model="props.dialogVisible"
        :title="component?.name ?? ''"
        destroy-on-close
        width="50%"
    >
        <template #header="{ titleId, titleClass }">
            <div class="dialog-header">
                <span :id="titleId" :class="titleClass">
                    <vue-status :status-color="component.color.toUpperCase()"/>
                    {{ component?.name ?? '' }}
                </span>
            </div>
        </template>
        <el-tabs v-if="Object.keys(component.capabilities).length" type="border-card">
            <el-tab-pane v-if="component.capabilities.thresholds" label="Threshold">
                <el-table v-if="component.thresholds" :data="component.thresholds" stripe>
                    <el-table-column prop="name" label="Name" />
                    <el-table-column label="Status">
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                                <vue-status :status-color="scope.row.status.toUpperCase()"/>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastValue" label="Last Value" />
                    <el-table-column prop="statusChangeTimestamp" label="Status change timestamp" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="component.capabilities.accumulators" label="Accumulators">
                <el-table
                    ref="multipleTableRef"
                    :data="component.accumulators"
                    style="width: 100%"
                    @selection-change="handleAccumulatorSelection"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column property="name" label="Accumulator name" show-overflow-tooltip />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="component.capabilities.connectorInfo" label="Connector Info">
                <el-table v-if="component.connectorInfo" :data="component.connectorInfo" stripe>
                    <el-table-column width="150" prop="key" label="Property" />
                    <el-table-column  prop="value" label="Value" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="component.capabilities.componentInfo" label="Component Info">
                <el-table v-if="component.componentInfo" :data="component.componentInfo" stripe>
                    <el-table-column width="150" prop="key" label="Property" />
                    <el-table-column  prop="value" label="Value" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="component.capabilities.actions" label="Actions">actions</el-tab-pane>
            <el-tab-pane v-if="component.capabilities.history" label="History">history</el-tab-pane>
            <el-tab-pane v-if="component.capabilities.config" label="Config">
                <pre style="overflow-x: auto">{{ component.config }}</pre>
            </el-tab-pane>
            <!--              <el-tab-pane v-if="activeComponentCapabilities.nowRunning" label="Now Running">nowRunning</el-tab-pane>-->
        </el-tabs>
    </el-dialog>
</template>

<style scoped>
.dialog-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 16px;
}
</style>


