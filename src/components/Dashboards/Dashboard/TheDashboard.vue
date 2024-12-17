<script setup lang="ts">
  import TheCard from '@/components/Card/TheCard.vue';
  import TheChart from '@/components/Dashboards/Dashboard/TheChart.vue';
  import TheHeader from '@/components/Dashboards/Dashboard/TheHeader.vue';
  import TheTable from '@/components/Dashboards/Dashboard/TheTable.vue';
import type { DashboardTableType } from '@/utils/types/dashboard.type';

  defineProps<{
    title: string;
    tooltip: string;
    totals: number;
    table: DashboardTableType;
    chart: number[];
  }>();
</script>

<template>
  <TheCard>
    <TheHeader :title="title" />
    <TheChart :chart="chart" :tooltip="tooltip" :totals="totals" />
    <TheTable :table="table" />
  </TheCard>
</template>

<style scoped>
  .card {
    gap: 24px;
    display: flex;
    flex-direction: column;
  }
</style>
