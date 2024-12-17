<script setup lang="ts">
  import { inject } from 'vue';

  defineProps<{
    title: string;
  }>();

  const triggerAlert = inject<(message: string) => void>('alertProvider');

  const onclick = () => {
    triggerAlert?.('View button clicked');
  }
</script>

<template>
  <div class="header">
    <div class="header__title">{{ title }}</div>
    <div class="header__view" v-on:click="onclick()">View</div>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header__title {
    font-size: 18px;
    font-weight: 550;
    line-height: 32px;
    color: var(--color-primary-200);
  }

  .header__view {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 32px;
    background: #0035800F;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    cursor: pointer;
  }
</style>
