<script setup lang="ts">
  import DataProvider from '@/providers/DataProvider.vue';
  import TheHeader from '@/components/Header/TheHeader.vue';
  import DashboardItems from '@/components/Dashboards/DashboardItems.vue';
  import AlertWrapper from '@/components/Alert/AlertWrapper.vue';
</script>

<template>
  <main class="container">
    <DataProvider>
      <TheHeader />
      <DashboardItems />
    </DataProvider>
    <AlertWrapper />
  </main>
</template>

<style scoped>
  .container {
    gap: 24px;
    display: flex;
    flex-direction: column;
  }
</style>
