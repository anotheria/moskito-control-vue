<script setup lang="ts">
import { defineProps } from 'vue';


interface Props {
    chartData: any;
}

const props = withDefaults(defineProps<Props>(), {
    chartData: {},
});

const getChartData = (index: number) => {
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
                text: props.chartData[index]?.name,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: props.chartData[index]?.captions,
                /*labels: {
                    format: 'HH:mm',
                },
                type: 'datetime',*/
            }
        },
        seriesData: props.chartData[index]?.lines.map((line: any) => ({ name: line["lineName"], data: line["values"] }))
    }
};

</script>
<template>
    <div class="widget-header">
        <h4>Charts</h4>
    </div>
    <div v-for="(chart, index) in chartData">
        <apexchart
            height="500"
            :options="getChartData(index).chartOptions"
            :series="getChartData(index).seriesData"
        />
        <el-divider />
    </div>
</template>