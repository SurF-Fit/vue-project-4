<template>
  <header>
    <div class="wrapper">
      <router-link to="/"><img src="../assets/корзина.png" alt="корзина"></router-link>
      <router-link to="/products">Каталог товаров</router-link>
      <router-link to="/register">Регистрация</router-link>
      <router-link to="/login">Авторизация</router-link>
      <router-link to="/basket">Корзина</router-link>
      <router-link to="/completeOrders">Оформленные заказы</router-link>
    </div>
    <div>
      <p>Корзина {{ cartItemCount  }}</p>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['cartItemCount']),
  },
  name: 'HeaderList',
  mounted() {
    this.loadData()
  },
  methods: {
    ...mapActions(['loadData']),
  },
};
</script>

<style scoped>

header {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 25%;
  background-color: #f8f8f8;
}

img {
  width: 35px;
  height: 35px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
}

router-link {
  color: black;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
