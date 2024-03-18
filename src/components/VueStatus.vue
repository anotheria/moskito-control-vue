<script setup lang="ts">
import { computed } from 'vue';
type StatusColors = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' | 'PURPLE' ;

interface Props {
    statusColor: StatusColors | string;
}

const props = withDefaults(defineProps<Props>(), {
    statusColor: undefined,
});

const status = computed(() => {
    return {
        'GREEN': 'var(--mc-status-green)',
        'YELLOW': 'var(--mc-status-yellow)',
        'ORANGE': 'var(--mc-status-orange)',
        'RED': 'var(--mc-status-red)',
        'PURPLE': 'var(--mc-status-purple)'
    }[props.statusColor];
})
</script>

<template>
    <span class="view-status" />
</template>

<style scoped lang="scss">
.view-status {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    background-color: v-bind(status);
    margin-right: 8px;
    border: 1px solid var(--mc-zinc-200);
}
</style>