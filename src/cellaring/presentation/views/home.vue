<script setup>
import { ref, onMounted } from 'vue';
import { CellarService } from '../../infrastructure/cellar.service.js';
import { StorageItemService } from '../../infrastructure/storage-item.service.js';
import CellarSummary from '../components/cellar-summary.vue';
import { kessickApi } from '../../../shared/infrastructure/base-api.js';

const cellars = ref([]);
const allStorageItems = ref([]);
const cellarService = new CellarService();
const storageItemService = new StorageItemService();

const loadData = async () => {
  try {

    const cellarsResponse = await cellarService.getAllCellars();
    cellars.value = cellarsResponse.data;


    const itemsResponse = await kessickApi.get('/storage-items');
    allStorageItems.value = itemsResponse.data;
  } catch (error) {
    console.error("Error al cargar los datos de Cellars:", error);
  }
};


const getItemsForCellar = (cellarId) => {

  return allStorageItems.value.filter(item => item.cellarId === cellarId);
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="flex flex-column gap-4" aria-label="Home View">
    <div>
      <h1 class="text-3xl font-bold mb-2 text-primary">{{ $t('home.title') }}</h1>
      <p class="text-xl m-0 text-700">{{ $t('home.description') }}</p>
    </div>

    <div>
      <h2 class="text-2xl font-bold mb-4">{{ $t('home.myCellars') }}</h2>


      <div class="grid">
        <div v-for="cellar in cellars" :key="cellar.id" class="col-12 md:col-6">
          <CellarSummary
              :cellar="cellar"
              :items="getItemsForCellar(cellar.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>