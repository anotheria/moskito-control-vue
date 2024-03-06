<script setup lang="ts">
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
</script>

<template>
    <el-dialog
        v-model="props.dialogVisible"
        :title="component?.name ?? ''"
        destroy-on-close
        width="50%"
    >
        <el-tabs v-if="Object.keys(component.capabilities).length" type="border-card">
            <el-tab-pane v-if="component.capabilities.thresholds" label="Threshold">
                <el-table v-if="component.thresholds" :data="component.thresholds" stripe>
                    <el-table-column prop="name" label="Name" />
                    <el-table-column prop="status" label="Status" />
                    <el-table-column prop="lastValue" label="Last Value" />
                    <el-table-column prop="statusChangeTimestamp" label="Status change timestamp" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="component.capabilities.accumulators" label="Accumulators">accumulators</el-tab-pane>
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

</style>


