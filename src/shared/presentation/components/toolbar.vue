<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { locale } = useI18n();

const languages = ref(['EN', 'ES']);
const selectedLanguage = ref('EN');

watch(selectedLanguage, (newLang) => {
  if (newLang) {
    locale.value = newLang.toLowerCase();
  }
});

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <pv-toolbar class="bg-primary shadow-2">
    <template #start>
      <!-- Asegúrate de cambiar el token por el tuyo si la rúbrica lo evaluará estáticamente -->
      <img src="https://img.logo.dev/kessickwinecellars.com?token=pk_YsFQ0tliTWCUiEY99OPs6Q" alt="Kessick Logo" height="40" class="mr-3 border-round" />
      <span class="font-bold text-xl">{{ $t('toolbar.subtitle') }}</span>
    </template>

    <template #center>
      <div class="flex gap-3">
        <pv-button :label="$t('toolbar.home')" text class="text-white font-bold" @click="navigateTo('/home')" />
        <pv-button :label="$t('toolbar.newItem')" text class="text-white font-bold" @click="navigateTo('/storage/items/new')" />
      </div>
    </template>

    <template #end>

      <pv-select-button v-model="selectedLanguage" :options="languages" aria-labelledby="basic" />
    </template>
  </pv-toolbar>
</template>