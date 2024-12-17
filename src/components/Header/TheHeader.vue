<script setup lang="ts">
  import { inject, ref, watch, type Ref } from 'vue';
  import TheCard from '@/components/Card/TheCard.vue';
  import TotalItem from '@/components/Header/TotalItem.vue';
  import type { FleetType } from '@/utils/types/fleet.type';

  const state = inject<Ref<FleetType | null>>('dataProvider');

  const totals = ref<FleetType['totals']>({});

  watch(
    () => state?.value,
    (newData) => {
      if (newData) {
        totals.value = newData.totals
      }
    }
  );
</script>

<template>
  <TheCard>
    <TotalItem title="Total engines" :number="totals.engines || 0" />
    <TotalItem title="Immediate faults" :number="totals.immediate_faults || 0" />
    <TotalItem title="Critical predictive insights" :number="totals.critical_predictive_insights || 0" />
  </TheCard>
</template>

<style scoped>
  .card {
    display: flex;
  }

  .card .total {
    flex: 1;
  }
</style>
