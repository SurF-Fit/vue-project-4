import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/store'; // Импорт store

import basket from "../views/basket.vue";
import completedOrders from "../views/completedOrders.vue";
import HomeView from "../views/HomeView.vue";
import ProductList from "../views/ProductList.vue";
import register from "../views/register.vue";

// Проверка, не аутентифицирован ли пользователь
const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
    } else {
        next('/'); // Перенаправляем на главную страницу, если пользователь аутентифицирован
    }
};

// Проверка, аутентифицирован ли пользователь
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
    } else {
        next('/login'); // Перенаправляем на страницу входа, если пользователь не аутентифицирован
    }
};

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/basket',
        name: 'basket',
        component: basket,
        meta: {
            layout: "basket",
        },
    },
    {
        path: '/completeOrders',
        name: 'completeOrders',
        component: completedOrders,
        meta: {
            layout: "completedOrders",
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        beforeEnter: ifNotAuthenticated, // Только для неаутентифицированных пользователей
    },
    {
        path: '/register',
        name: 'register',
        component: register,
    },
    {
        path: '/products',
        name: 'products',
        component: ProductList,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;