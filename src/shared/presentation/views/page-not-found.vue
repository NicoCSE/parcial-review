<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const goHome = () => {
  router.push('/home');
};
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center min-h-screen">
    <h1 class="text-4xl text-primary font-bold mb-2">404 - Page Not Found</h1>
    <p class="text-xl mb-4">The requested route <strong>{{ route.path }}</strong> was not found.</p>
    <pv-button label="Return to Home" icon="pi pi-home" @click="goHome" />
  </div>
</template>