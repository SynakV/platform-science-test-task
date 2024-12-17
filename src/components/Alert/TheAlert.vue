<script setup lang="ts">
  defineProps<{
    message: string;
    isVisible: boolean;
  }>();
</script>

<template>
  <div v-if="isVisible" class="alert">
    {{ message }}
  </div>
</template>

<style scoped>
  .alert {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-primary-300);
    color: var(--color-secondary-0);
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px #0000001a;
    animation: fadeInOut 3s;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }

    10%, 90% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }
</style>
