import { createApp } from 'vue'; // Импорт createApp из Vue 3
import App from './App.vue'; // Основной компонент приложения
import router from './router'; // Импорт роутера
import store from './store/store'; // Импорт store

// Импорт компонентов
import Header from './components/header.vue';
import basket from "./components/basket.vue";
import completedOrders from "./components/completedOrders.vue";
import register from "./components/register.vue";
import login from "./components/Login.vue";
import home from "./components/home.vue";
import ProductList from "./components/ProductList.vue";

const app = createApp(App);

app.component('Header', Header);
app.component('basket', basket);
app.component('completedOrders', completedOrders);
app.component('register', register);
app.component('login', login);
app.component('home', home);
app.component('ProductList', ProductList);

app.use(router);
app.use(store);

app.mount('#app');