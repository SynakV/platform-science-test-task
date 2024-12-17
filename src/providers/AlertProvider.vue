<script setup lang="ts">
  import { ref, nextTick, provide } from 'vue';
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

    timeoutId = setTimeout(() => {
      alertVisible.value = false;
    }, 3000);
  };

  provide('alertProvider', showAlert);
</script>

<template>
  <TheAlert :message="alertMessage" :isVisible="alertVisible" />
  <slot></slot>
</template>
