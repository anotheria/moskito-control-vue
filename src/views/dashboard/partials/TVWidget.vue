<script setup lang="ts">
interface Props {
    viewStatus: string;
}

const props = withDefaults(defineProps<Props>(), {
    viewStatus: 'none',
});
</script>
<template>
    <div class="tv-widget">
        <div class="widget-header">
            <h4>TV</h4>
        </div>
        <img :src="`src/assets/smiley_${viewStatus}.png`"
             :alt="`TV status ${viewStatus}`">
    </div>
</template>
<style lang="scss" scoped>
.tv-widget {
    text-align: center;
    margin: 10px 0 30px;
}
</style>