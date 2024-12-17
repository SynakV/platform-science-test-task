<script setup lang="ts">
  import { ref, nextTick, onMounted, onUnmounted } from 'vue';
  import TheAlert from '@/components/Alert/TheAlert.vue';

  const alertMessage = ref('');
  const alertVisible = ref(false);
  let timeoutId: number | null = null;

  const showAlert = async (message: string) => {
    if (alertVisible.value) {
      alertVisible.value = false;
      await nextTick();
    }

    alertMessage.value = message;
    alertVisible.value = true;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      alertVisible.value = false;
    }, 3000);
  };

  const handleAlertEvent = (event: CustomEvent) => {
    showAlert(event.detail);
  };

  onMounted(() => {
    window.addEventListener('trigger-alert', handleAlertEvent as EventListener);
  });

  onUnmounted(() => {
    window.removeEventListener('trigger-alert', handleAlertEvent as EventListener);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
</script>

<template>
  <TheAlert :message="alertMessage" :isVisible="alertVisible" />
</template>
