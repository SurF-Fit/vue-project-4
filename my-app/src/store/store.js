import { createStore } from 'vuex';
import { dispatch } from 'vuex'
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
      alert("продукт добавлен в корзину")
    },
    LOAD_CART(state, products) {
      state.cart = products;
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
      alert("продукт удален из корзины")
    },
    CLEAR_CART(state) {
      state.cart = [];
      alert("Корзина почищена")
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
    saveData({ state }) {
      localStorage.setItem('ПростоКупить', JSON.stringify(state.cart));
    },
    addToCart({ commit, dispatch  }, product) {
      commit('ADD_TO_CART', product);
      dispatch('saveData');
    },
    loadData({ commit }) {
      const savedData = localStorage.getItem('ПростоКупить');
      if (savedData) {
        commit('LOAD_CART', JSON.parse(savedData));
      }
    },
    removeFromCart({ commit, dispatch  }, productId) {
      commit('REMOVE_FROM_CART', productId);
      this.cart[productId].splice(productId, 1);
      dispatch('saveData');
    },
    clearCart({ commit, dispatch  }) {
      commit('CLEAR_CART');
      dispatch('saveData');
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