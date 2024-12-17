<script setup lang="ts">
  import { dataColors } from '@/utils/constants';
  import type { DashboardTableType } from '@/components/Dashboards/Dashboard/types';

  defineProps<{
    table: DashboardTableType;
  }>();

  const onclick = () => {
    window.dispatchEvent(
      new CustomEvent('trigger-alert', {
        detail: 'Click'
      })
    );
  }
</script>

<template>
  <table class="table">
    <thead class="table__header">
      <tr>
        <th v-for="header in table.headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="(row, rowIndex) in table.rows" :key="rowIndex">
        <td v-for="(item, itemIndex) in row" :key="item" v-on="itemIndex !== 0 ? { click: onclick } : {}">
          <div
            v-if="itemIndex === 0"
            class="table__circle"
            :style="{
              background: dataColors[rowIndex].background,
              border: `1px solid ${dataColors[rowIndex].border}`
            }"></div>
          {{ item }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  .table {
    border-collapse: collapse;
  }

  .table__header tr th {
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    color: var(--color-primary-200);
  }

  /* first item in a row */
  .table tr td:first-child {
    gap: 8px;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    color: var(--color-primary-200);
  }

  /* all non-first items in a row */
  .table tr td:not(:first-child) {
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: #0A1B33A6;
    cursor: pointer;
    text-underline-offset: 3px;
    text-decoration: underline solid;
  }

  /* all row's first item */
  .table tr > *:first-child {
    text-align: start;
    padding-left: 12px;
  }

  /* all non-first row's item */
  .table tr > *:not(:first-child) {
    width: auto;
    padding: 16px 0;
    text-align: center;
  }

  .table__body tr {
    vertical-align: baseline;
    border-top: 1px solid var(--border);
  }

  .table__circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
</style>
