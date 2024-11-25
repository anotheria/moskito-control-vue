<script setup lang="ts">
import {Bottom, Top} from "@element-plus/icons-vue";
import {defineProps} from "vue";
import {IWidget} from "@/types/interfaces.ts";


interface Props {
    dataWidgets: Array<IWidget> | [];
}

const props = withDefaults(defineProps<Props>(), {
    dataWidgets: [],
});

const getArrowColor = (arrow: string): string => {
    return arrow === 'arrow-up' ? 'green' : arrow === 'arrow-down' ? 'red' : 'black';
};

const getChartData = (caption, percent) => {
    return {
        series: [Math.round(percent)],
        chartOptions: {
            chart: {
                type: 'radialBar',
                offsetY: -10,
                sparkline: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    hollow: {
                        size: '75%',
                    },
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '100%',
                        width: '50%',
                        margin: 5, // margin is in pixels
                    },
                    dataLabels: {
                        name: {
                            show: true,
                            offsetY: -5,
                            color: 'black',
                        },
                        value: {
                            show: true,
                            offsetY: -40,
                            fontSize: '15px',
                            color: '#94cc19'
                        }
                    }
                }
            },
            grid: {
                padding: {
                    top: -10
                }
            },
            fill: {
                type: 'solid',
                colors: ['#94cc19']
            },
            labels: [caption],
        },
    }
};

</script>
<template>
    <div class="widget-header">
        <h4>Data</h4>
    </div>
    <div class="data-widget-container">
        <el-card v-for="widget in dataWidgets" class="data-widget-card">
            <div v-if="widget.type === 'HalfGauge'">
                <div class="centered-number">
                    {{ widget.data.number }}
                </div>
                <apexchart
                    type="radialBar"
                    height="250"
                    :options="getChartData(widget.caption, widget.data.percent * 100).chartOptions"
                    :series="getChartData(widget.caption, widget.data.percent * 100).series"/>
            </div>
            <div v-else class="data-widget-content">
                <div class="data-widget-text">
                    <div class="data-widget-number">
                        {{ widget.data.number }}
                    </div>
                    <div v-if="widget.type !== 'Number'">
                        <el-icon :color="getArrowColor(widget.data.arrow)">
                            <Top v-if="widget.data.arrow === 'arrow-up'"/>
                            <Bottom v-if="widget.data.arrow === 'arrow-down'"/>
                        </el-icon>
                        <span v-if="widget.type === 'NumberWithCompare'">
                            {{ widget.data.change }}
                        </span>
                    </div>
                    <div class="data-widget-caption">
                        {{ widget.caption }}
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<style lang="scss" scoped>
.data-widget-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px 30px;
}

.data-widget-card {
    width: 24%;
    height: 135px;
    position: relative;
}

.data-widget-content {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: 100px;
}

.data-widget-text {
    text-align: center;
}

.data-widget-number {
    line-height: 36px;
    font-size: 34px;
}

.data-widget-caption {
    margin-top: 10px;
}

.centered-number {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
}
</style>