<template>
  <div>
    <h2>Корзина</h2>
    <ul>
      <li class="item" v-for="item in cartItems" :key="item.id">
        <img :src="getImageUrl(item.image)" alt="Изображение товара" class="item-image" />
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
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  img{
    width: 50px;
    height: 50px;
  }

  button{
    background-color: white;
    width: max-content;
  }

  button:hover{
    background-color: #d3d3d3;
    cursor: pointer;
  }
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
    getImageUrl(imagePath) {
      const baseUrl = 'http://lifestealer86.ru/';
      return `${baseUrl}${imagePath}`;
    }
  },
};
</script>