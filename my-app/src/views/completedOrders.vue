<template>
  <div>
    <h2>Оформленные заказы</h2>
    <button @click="clearOreder">Очистить</button>
    <ul class="box">
      <li class="cart" v-for="order in completedOrders" :key="order.id">
        <h3>Заказ #{{ order.id }}</h3>
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} - {{ item.price }} руб. (Количество: {{ item.length }})
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "completeOrders",
  mounted() {
    this.loadData()
  },
  computed: {
    ...mapGetters(['completedOrders']),
  },
  methods: {
    ...mapActions(['loadData', 'clearOreder']),
  },
};
</script>

<style scoped>

  ul {
    padding: 0;
  }

  li{
    padding: 0;
    list-style: none;
  }

  .cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: max-content;
    padding: 10px;
  }

  .box {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
</style>
