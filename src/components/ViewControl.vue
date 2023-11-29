<script setup lang="ts">
import { computed } from 'vue';
type StatusColors = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' | 'PURPLE' ;

interface Props {
  statusColor: StatusColors;
  selected: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  statusColor: undefined,
  selected: false,
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

// const statusBorder = computed(() => {
//   return {
//     'GREEN': 'var(--mc-green-600)',
//     'YELLOW': 'var(--mc-status-yellow)',
//     'ORANGE': 'var(--mc-status-orange)',
//     'RED': 'var(--mc-status-red)',
//     'PURPLE': 'var(--mc-status-purple)'
//   }[props.statusColor];
// })
</script>

<template>
  <button class="view-button" :class="[selected && 'view-button--selected']">
    <span class="view-button__status" /><slot />
  </button>
</template>

<style scoped lang="scss">
.view-button {
  background-color: transparent;
  border: none;
  color: var(--mc-zinc-50);
  font-size: 14px;
  height: 60px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  &--selected {
    background-color: v-bind(status);
  }
  &__status {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    background-color: v-bind(status);
    margin-right: 8px;
    border: 1px solid var(--mc-zinc-200);
  }
}
</style>