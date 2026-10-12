<script setup>
import { computed } from 'vue';


const props = defineProps({
  cellar: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});


const totalBottles = computed(() => {
  if (!props.items || props.items.length === 0) return 0;
  return props.items.reduce((acc, item) => acc + item.quantity, 0);
});


const availableCapacity = computed(() => {
  return props.cellar.capacity - totalBottles.value;
});
</script>

<template>
  <pv-card class="h-full shadow-2 border-round-xl">
    <!-- Header: Cellar Name -->
    <template #title>
      <div class="text-2xl font-bold text-primary">{{ cellar.name }}</div>
    </template>

    <!-- Content: Vinos o 'Empty' -->
    <template #content>
      <div v-if="items.length === 0" class="text-500 font-italic">
        {{ $t('home.empty') }}
      </div>
      <div v-else>
        <ul class="list-none p-0 m-0">
          <li v-for="item in items" :key="item.id" class="flex justify-content-between border-bottom-1 surface-border py-2">
            <span class="font-medium">{{ item.wineName }}</span>
            <span class="text-600">{{ item.quantity }} bottles</span>
          </li>
        </ul>
      </div>
    </template>

    <!-- Footer: Total Bottles y Available Capacity -->
    <template #footer>
      <div class="flex flex-column gap-2 mt-3 pt-3 border-top-1 surface-border">
        <div class="flex justify-content-between font-bold">
          <span>{{ $t('home.totalBottles') }}:</span>
          <span>{{ totalBottles }}</span>
        </div>
        <div class="flex justify-content-between text-600">
          <span>{{ $t('home.availableCapacity') }}:</span>
          <span>{{ availableCapacity }}</span>
        </div>
      </div>
    </template>
  </pv-card>
</template>