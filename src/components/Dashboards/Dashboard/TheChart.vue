<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { Doughnut } from 'vue-chartjs';
  import { dataColors } from '@/utils/constants';
  import InfoIcon from '@/components/Icons/InfoIcon.vue';
  import TheTooltip from '@/components/Tooltip/TheTooltip.vue';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from 'chart.js';

  ChartJS.register(ArcElement, Tooltip, Legend);

  const { chart } = defineProps<{
    tooltip: string;
    chart: number[];
    totals: number;
  }>();

  const data = ref<ChartData<"doughnut">>({
    datasets: []
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 75,
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    plugins: {
      tooltip: {
        enabled: false,
        displayColors: false,
      },
    }
  };

  watch(
    () => chart,
    (newData) => {
      data.value = {
        datasets: [
          {
            data: newData,
            backgroundColor: dataColors.map(color => color.background),
          }
        ]
      }
    }
  );
</script>

<template>
  <div v-if="chart.length" class="chart">
    <Doughnut :data="data" :options="options" />
    <div class="chart__inner-content">
      <div class="chart__engines-number">
        {{ totals }}
      </div>
      <div class="chart__engines-text">
        <span>Engines</span>
        <TheTooltip :message="tooltip">
          <InfoIcon />
        </TheTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .chart {
    height: 220px;
    position: relative;
  }

  .chart__inner-content {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    transform: translate(-50%, -50%);
  }

  .chart__engines-number {
    position: relative;
    font-size: 44px;
    font-weight: 300;
    line-height: 53px;
    color: var(--color-primary-100);
  }

  .chart__engines-text {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: var(--color-secondary-100);
    gap: 4px;
    display: flex;
    align-items: center;
  }
</style>
