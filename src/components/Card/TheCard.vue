<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
  .card {
    padding: 24px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background-color: var(--color-secondary-0);
  }
</style>
