<template>
  <div>
    <h2>Корзина</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - {{ item.price }} руб. (Количество: {{ item.length }})
        <button @click="minusItem(item.id)">-</button>
        <button @click="plassItem(item.id)">+</button>
        <button @click="removeFromCart(item.id)">Удалить</button>
      </li>
    </ul>
    <button @click="clearCart">Очистить корзину</button>
  </div>
</template>

<style scoped>

</style>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "basket",
  computed: {
    ...mapGetters(['cartItems', 'cartItemCount']),
  },
  methods: {
    ...mapActions(['removeFromCart', 'clearCart', 'plassItem', 'minusItem']),
  },
};
</script>