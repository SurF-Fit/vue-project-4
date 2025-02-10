import Vue from 'vue';
import { createStore } from 'vuex'
import { getProducts } from '@/api/products';

export default createStore({
  state: {
    products: [], // Массив для хранения продуктов
    isLoading: false, // Флаг загрузки
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
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
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true);
      try {
        const products = await getProducts();
        commit('SET_PRODUCTS', products);
      } catch (error) {
        commit('SET_ERROR', 'Ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.'); // Устанавливаем ошибку
        console.error('Ошибка при загрузке продуктов:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    AUTH_REQUEST: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
            .then((token) => {
              commit('AUTH_REQUEST', token);
              localStorage.setItem('myAppToken', token);
              resolve();
            })
            .cache(() => {
              commit('AUTH_ERROR');
              localStorage.removeItem('myAppToken');
              reject();
            });
      });
    },
  },
  modules: {
  }
})
