<script setup lang="ts">
  import DataProvider from '@/providers/DataProvider.vue';
  import TheHeader from '@/components/Header/TheHeader.vue';
  import TheDashboards from '@/components/Dashboards/TheDashboards.vue';
  import AlertProvider from '@/providers/AlertProvider.vue';
</script>

<template>
  <main class="container">
    <AlertProvider>
      <DataProvider>
        <TheHeader />
        <TheDashboards />
      </DataProvider>
    </AlertProvider>
  </main>
</template>

<style scoped>
  .container {
    gap: 24px;
    display: flex;
    flex-direction: column;
  }
</style>
