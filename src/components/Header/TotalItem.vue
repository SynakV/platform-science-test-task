<script setup lang="ts">
  defineProps<{
    title: string;
    number: number;
  }>();
</script>

<template>
  <div class="total">
    <div class="total__number">{{ number }}</div>
    <div class="total__title">{{ title }}</div>
  </div>
</template>

<style scoped>
  .total {
    gap: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .total__number {
    font-size: 32px;
    font-weight: 300;
    line-height: 38px;
    color: var(--color-primary-100);
  }

  .total__title {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: var(--color-secondary-100);
  }
</style>
