<template>
  <div>
    <h1>Список продуктов</h1>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <div v-else class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img
            :src="getFullImageUrl(product.image)"
            :alt="product.name"
            class="product-image"
            @error="handleImageError"
        />
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">Цена: {{ product.price.toFixed(2) }} руб.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoading: true,
      products: [],
      errorMessage: '',
    };
  },
  methods: {
    getFullImageUrl(imagePath) {
      const baseUrl = 'http://lifestealer86.ru/';
      const fullUrl = baseUrl + imagePath;
      return fullUrl;
    },
    handleImageError(event) {
      event.target.src = '';
      console.error('Ошибка загрузки изображения:', event.target.src);
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://lifestealer86.ru/api-shop/products', {
          headers: {
            'Accept': 'application/json',
          },
          maxRedirects: 0
        });
        this.products = response.data.data;
      } catch (error) {
        this.errorMessage = 'Ошибка при загрузке продуктов: ' + (error.response?.data?.message || error.message);
      } finally {
        this.isLoading = false;
      }
    }

  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
}

.product-image {
  max-width: 100%;
  height: auto;
}
</style>

Найти еще