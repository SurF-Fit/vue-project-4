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
    cartItems(state) {
      return state.cart;
    },
    cartItemCount(state) {
      return state.cart.reduce((total, item) => total + item.length, 0);
    },
  },
  mutations: {
    PLASS_ITEM(state, productId) {
      const item = state.cart.find(item => item.id === productId);
      if (item) {
        item.length += 1;
      }
    },
    MINUS_ITEM(state, productId) {
      const item = state.cart.find(item => item.id === productId);
      if (item && item.length > 1) {
        item.length -= 1;
      } else if (item) {
        state.cart = state.cart.filter(item => item.id !== productId); // Удаляем, если количество 0
      }
    },
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.length += 1;
      } else {
        state.cart.push({ ...product, length: 1 });
      }
      alert("Продукт добавлен в корзину");
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
    plassItem({ commit, dispatch }, productId) {
      commit('PLASS_ITEM', productId);
      dispatch('saveData');
    },
    minusItem({ commit, dispatch }, productId) {
      commit('MINUS_ITEM', productId);
      dispatch('saveData');
    },
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