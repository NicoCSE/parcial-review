<script setup>
import ToolbarContent from './shared/presentation/components/toolbar.vue';
</script>

<template>
  <div class="min-h-screen flex flex-column surface-ground">
    <ToolbarContent />


    <main class="flex-grow-1 p-4">
      <router-view />
    </main>
  </div>
</template>

<style>

body, html {
  margin: 0;
  padding: 0;
  font-family: var(--font-family, sans-serif);
}
</style>