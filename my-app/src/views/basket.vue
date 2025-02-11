<template>
  <div>
    <h2>Корзина</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - {{ item.price }} руб.
        <button @click="removeFromCart(item.id)">Удалить</button>
      </li>
    </ul>
    <button @click="clearCart">Очистить корзину</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "basket",
  computed: {
    ...mapGetters(['cartItems']),
  },
  methods: {
    ...mapActions(['removeFromCart', 'clearCart']),
  },
};
</script>