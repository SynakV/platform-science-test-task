<script setup lang="ts">
  import { inject, ref, watch, type Ref } from 'vue';
  import type { FleetItemDataType, FleetItemType, FleetType } from '@/utils/types';
  import type { DashboardTableType } from '@/components/Dashboards/Dashboard/types';
  import TheDashboard from '@/components/Dashboards/Dashboard/TheDashboard.vue';

  const state = inject<Ref<FleetType | null>>('dataProvider');

  const diagnosticsChart = ref<number[]>([]);
  const diagnosticsTable = ref<DashboardTableType>({
    headers: [],
    rows: []
  });
  const diagnosticsTotals = ref(0);
  const prognosticsChart = ref<number[]>([]);
  const prognosticsTable = ref<DashboardTableType>({
    headers: [],
    rows: []
  });
  const prognosticsTotals = ref(0);

  watch(
    () => state!.value,
    (newData) => {
      if (newData) {
        diagnosticsChart.value = getChartData(newData.diagnostics.severity);
        diagnosticsTable.value = getDiagnosticsTableData(newData.diagnostics);
        diagnosticsTotals.value = newData.diagnostics.totals.engines;
        prognosticsChart.value = getChartData(newData.prognostics.time_remaining);
        prognosticsTable.value = getPrognosticsTableData(newData.prognostics);
        prognosticsTotals.value = newData.prognostics.totals.engines;
      }
    }
  );

  const getDiagnosticsTableData = (data: FleetItemType) => {
    const severity = data.severity;

    const immediate = severity.immediate;
    const service_3_days = severity.service_3_days;
    const service_7_days = severity.service_7_days;
    const service_next_pm = severity.service_next_pm;

    const getRowData = (row: Record<string, number>, rowSeverity: string) => ([
      rowSeverity,
      row.derated,
      row.shutdown,
      row.total
    ]);

    return {
      headers: ['Severity', 'Derated', 'Shutdown', 'Total'],
      rows: [
        getRowData(immediate, 'Immediate'),
        getRowData(service_3_days, 'Service in 3 days'),
        getRowData(service_7_days, 'Service in 7 days'),
        getRowData(service_next_pm, 'Next PM'),
      ],
    }
  }

  const getPrognosticsTableData = (data: FleetItemType) => {
    const time_remaining = data.time_remaining;

    const less_than_7_days = time_remaining.less_than_7_days;
    const less_than_30_days = time_remaining.less_than_30_days;
    const less_than_60_days = time_remaining.less_than_60_days;
    const less_than_90_days = time_remaining.less_than_90_days;

    const getRowData = (row: Record<string, number>, rowTimeRemaining: string) => ([
      rowTimeRemaining,
      row.prognostic,
      row.maintenance,
      row.total
    ]);

    return {
      headers: ['Time remaining', 'Prognostic', 'Maintenance', 'Total'],
      rows: [
        getRowData(less_than_7_days, 'Less than 1 week'),
        getRowData(less_than_30_days, 'Less than 30 days'),
        getRowData(less_than_60_days, 'Less than 60 days'),
        getRowData(less_than_90_days, 'Less than 90 days'),
      ],
    }
  }

  const getChartData = (data: FleetItemDataType) => Object.values(data).map(item => item.total);
</script>

<template>
  <div class="charts-data">
    <TheDashboard
      :chart="diagnosticsChart"
      :table="diagnosticsTable"
      :totals="diagnosticsTotals"
      title="Diagnostics"
      tooltip="This is the total number of engines with active diagnostic faults from the last 7 days."
    />
    <TheDashboard
      :chart="prognosticsChart"
      :table="prognosticsTable"
      :totals="prognosticsTotals"
      title="Predictive Insights"
      tooltip="This is the total number of engines with active predictive insights from the last 90 days."
    />
  </div>
</template>

<style scoped>
  .charts-data {
    gap: 24px;
    display: flex;
  }

  .charts-data .card {
    flex: 1;
  }
</style>
