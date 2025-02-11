<template>
  <div>
    <h2>Оформленные заказы</h2>
    <button @click="clearOreder">Очистить</button>
    <ul>
      <li v-for="order in completedOrders" :key="order.id">
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
/* Добавьте стили по вашему усмотрению */
</style>
