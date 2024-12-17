<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  defineProps<{
    message: string;
  }>();

  const isShowTooltip = ref(false);
  const tooltipWrapper = ref<HTMLElement | null>(null);

  function handleClickOutside(event: MouseEvent) {
    if (tooltipWrapper.value && !tooltipWrapper.value.contains(event.target as Node)) {
      isShowTooltip.value = false;
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<template>
  <div ref="tooltipWrapper" class="tooltip__wrapper" @mouseenter="isShowTooltip = true">
    <slot></slot>
    <div
      v-if="isShowTooltip"
      class="tooltip__banner"
    >
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
  .tooltip__wrapper {
    display: flex;
    align-self: center;
    position: relative;
  }

  .tooltip__banner {
    position: absolute;
    background: var(--color-primary-300);
    color: var(--color-secondary-0);
    padding: 12px;
    font-size: 14px;
    line-height: 20px;
    border-radius: 2px;
    box-shadow: 0 0 2px 0 var(--color-primary-300);
    left: calc(100% + 10px);
    width: 200px;
    bottom: 50px;
  }

  .tooltip__banner::before {
    content: '';
    position: absolute;
    bottom: 15px;
    left: -5px;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: transparent #333 transparent transparent;
    z-index: 10;
  }
</style>
