import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from './shared/presentation/views/page-not-found.vue';
import Home from './cellaring/presentation/views/home.vue';
import NewStorageItem from './cellaring/presentation/views/new-storage-item.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/storage/items/new', component: NewStorageItem },
    { path: '/:pathMatch(.*)*', component: PageNotFound }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;