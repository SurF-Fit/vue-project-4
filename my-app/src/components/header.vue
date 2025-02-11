<template>
  <header>
    <div class="wrapper">
      <router-link to="/">Главная</router-link>
      <router-link to="/products">Каталог товаров</router-link>
      <router-link to="/register">Регистрация</router-link>
      <router-link to="/login">Авторизация</router-link>
      <router-link to="/basket">Корзина</router-link>
      <router-link to="/completeOrders">Оформленные заказы</router-link>
    </div>
  </header>
</template>

<style>
.wrapper {
  margin: 0 auto;
  gap: 20px;
  display: flex;
}

router-link {
  color: black;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>

<script>
export default {
  name: 'HeaderList',
};
</script>
