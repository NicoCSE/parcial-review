<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { WineService } from '../../../winery/infrastructure/wine.service.js';
import { CellarService } from '../../infrastructure/cellar.service.js';
import { kessickApi } from '../../../shared/infrastructure/base-api.js';

const router = useRouter();
const wineService = new WineService();
const cellarService = new CellarService();

// Variables de estado
const wineTypes = ref(['reds', 'whites', 'sparkling', 'rose', 'dessert', 'port']);
const selectedType = ref(null);
const availableWines = ref([]);
const selectedWine = ref(null);
const quantity = ref(0);

// Datos locales para validaciones
const cellars = ref([]);
const allStorageItems = ref([]);

onMounted(async () => {
  // Cargamos los cellars y items actuales para validar la capacidad después
  const [cRes, iRes] = await Promise.all([
    cellarService.getAllCellars(),
    kessickApi.get('/storage-items')
  ]);
  cellars.value = cRes.data;
  allStorageItems.value = iRes.data;
});

// Cuando el usuario selecciona un tipo de vino, consumimos el SampleAPI
const onTypeChange = async () => {
  if (!selectedType.value) return;
  selectedWine.value = null; // Reiniciar selección
  try {
    const res = await wineService.getWinesByType(selectedType.value);
    availableWines.value = res.data;
  } catch (error) {
    console.error("Error fetching wines:", error);
  }
};

const onCancel = () => {
  router.push('/home');
};

const onCreate = async () => {
  if (!selectedType.value || !selectedWine.value || quantity.value <= 0) {
    alert("Please complete all fields correctly.");
    return;
  }

  // 1. Determinar el Cellar correspondiente según el tipo de vino
  const cellar = cellars.value.find(c => c.wineType === selectedType.value);
  if (!cellar) return alert("Error: No cellar found for this wine type.");

  // 2. Cálculo analítico: Validar capacidad disponible
  const itemsInCellar = allStorageItems.value.filter(i => i.cellarId === cellar.id);
  const currentTotal = itemsInCellar.reduce((acc, item) => acc + item.quantity, 0);
  const availableCapacity = cellar.capacity - currentTotal;

  if (quantity.value > availableCapacity) {
    alert(`Error: Quantity exceeds available capacity (${availableCapacity} bottles left).`);
    return;
  }

  // 3. Crear el objeto (json-server genera el ID automáticamente)
  const newItem = {
    cellarId: cellar.id,
    wineType: selectedType.value,
    wineId: selectedWine.value.id,
    wineName: selectedWine.value.wine,
    quantity: quantity.value,
    registeredAt: new Date().toISOString()
  };

  try {
    await kessickApi.post('/storage-items', newItem);
    router.push('/home');
  } catch (error) {
    console.error("Error creating item:", error);
  }
};
</script>

<template>
  <div class="flex flex-column align-items-center mt-4">
    <h1 class="text-3xl font-bold text-primary mb-2">{{ $t('newItem.title') || 'New Storage Item' }}</h1>
    <h2 class="text-xl text-600 mb-5">{{ $t('newItem.subtitle') || 'Add Wine Bottles to Your Cellar' }}</h2>

    <pv-card class="w-full md:w-6 shadow-2">
      <template #content>
        <div class="flex flex-column gap-4">
          <!-- Selector de Tipo de Vino -->
          <div class="flex flex-column gap-2">
            <label for="wineType" class="font-bold">Wine Type</label>
            <pv-select id="wineType" v-model="selectedType" :options="wineTypes" placeholder="Select a Wine Type" @change="onTypeChange" class="w-full" />
          </div>

          <!-- Selector de Vino (SampleAPI) -->
          <div class="flex flex-column gap-2">
            <label for="wine" class="font-bold">Wine</label>
            <pv-select id="wine" v-model="selectedWine" :options="availableWines" optionLabel="wine" placeholder="Select a Wine" :disabled="!availableWines.length" class="w-full" />
          </div>

          <!-- Selector de Cantidad -->
          <div class="flex flex-column gap-2">
            <label for="quantity" class="font-bold">Quantity</label>
            <pv-input-number id="quantity" v-model="quantity" showButtons :min="1" class="w-full" />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-content-end gap-3 mt-4">
          <pv-button label="Cancel" severity="secondary" outlined @click="onCancel" />
          <pv-button label="Create" @click="onCreate" />
        </div>
      </template>
    </pv-card>
  </div>
</template>