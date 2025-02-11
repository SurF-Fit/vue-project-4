import { createStore } from 'vuex';
import { getProducts } from '@/api/products';

export default createStore({
  state: {
    products: [],
    isLoading: false,
    cart: [],
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isNotAuthenticated: (state) => !state.token,
    cartItems: (state) => state.cart,
    cartItemCount: (state) => state.cart.length,
  },
  mutations: {
    ADD_TO_CART(state, product) {
      state.cart.push(product);
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
      state.errorMessage = null; // Сбрасываем сообщение об ошибке
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) { // Новая мутация для установки ошибки
      state.errorMessage = error;
    },
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => { // Добавлена мутация
      state.token = '';
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true);
      try {
        const products = await getProducts();
        commit('SET_PRODUCTS', products);
      } catch (error) {
        commit('SET_ERROR', 'Ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.');
        console.error('Ошибка при загрузке продуктов:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
            .then((token) => {
              commit('AUTH_SUCCESS', token);
              localStorage.setItem('myAppToken', token);
              resolve();
            })
            .catch(() => { // Исправлено на .catch
              commit('AUTH_ERROR');
              localStorage.removeItem('myAppToken');
              reject();
            });
      });
    },
  },
  modules: {
  }
});