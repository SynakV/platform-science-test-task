<script setup lang="ts">
  import { ref, provide, onMounted } from 'vue';
  import type { FleetType } from '@/utils/types';

  const state = ref<FleetType | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('src/api/data.json');

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: FleetType = (await response.json()).data;

      state.value = data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message || 'An unknown error occurred');
      }
    }
  };

  onMounted(fetchData);

  provide('dataProvider', state);
</script>

<template>
  <slot></slot>
</template>
