import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';


import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';


import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Card from 'primevue/card';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';

import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
        en,
        es
    }
});

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


app.component('pv-toolbar', Toolbar);
app.component('pv-button', Button);
app.component('pv-select-button', SelectButton);
app.component('pv-card', Card);
app.component('pv-select', Select);
app.component('pv-input-number', InputNumber);

app.mount('#app');