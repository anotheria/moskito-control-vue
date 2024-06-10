<script setup lang="ts">
import VueStatus from "@/components/VueStatus.vue";
import { defineProps, ref } from "vue";
import MoskitoService from "@/services/MoskitoService.ts";
import {Right} from "@element-plus/icons-vue";

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
const chartData = ref<any>({});

const handleAccumulatorSelection = (acc: any) => {
    multipleSelection.value = acc;

    const data = {
        component: props.component.name,
        accumulators: acc.map((a: any) => a.name),
    };

    MoskitoService.getAccumulatorsCharts(data).then((res: any) => {
        chartData.value = res.results.charts;
    });
};

const getChartData = (index: number = 0) => {
    return {
        chartOptions: {
            chart: {
                type: 'line',
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight',
                width: 1
            },
            title: {
                text: chartData.value[index]?.name,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: chartData.value[index]?.points.map((point: any) => point["caption"]),
                // categories: chartData.value[index]?.points.map((point: any) => point["debugTs"].split(',')[0]),
                // stepSize: 1,
                /*labels: {
                    format: 'HH:mm',
                },
                tooltip: {
                    formatter: function(val, opts) {
                        console.log('val', val);
                        return new Date(val).toTimeString();
                    }
                },
                type: 'datetime',*/
            }
        },
        seriesData: [{
            name: chartData.value[index]?.name,
            data: chartData.value[index]?.points.map((point: any) => point["values"][0])
        }]
    }
};
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
                <div v-if="multipleSelection.length && chartData.length">
                    <apexchart
                        v-for="(chart, index) in chartData"
                        height="500"
                        :options="getChartData(index).chartOptions"
                        :series="getChartData(index).seriesData"
                    />
                </div>
                <el-table
                    ref="multipleTableRef"
                    :data="component.accumulators"
                    style="width: 100%"
                    @selection-change="handleAccumulatorSelection"
                >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
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
            <el-tab-pane v-if="component.capabilities.actions" label="Actions">
                <el-table v-if="component.actions" :data="component.actions" stripe>
                    <el-table-column prop="name" label="Name" />
                    <el-table-column  prop="type" label="Type" />
                    <el-table-column  prop="command" label="Command" />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="component.capabilities.history" label="History">
                <el-table v-if="component.history" :data="component.history" stripe>
                    <el-table-column prop="isoTimestamp" label="Timestamp" />
                    <el-table-column prop="componentName" label="Name" />
                    <el-table-column label="Status change">
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                                <vue-status :status-color="scope.row.oldStatus"/>
                                <el-icon style="margin-right: 8px;"><Right /></el-icon>
                                <vue-status :status-color="scope.row.newStatus"/>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
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
<style>
.el-table__header-wrapper .el-table__header .el-checkbox {
    display: none;
}
</style>


