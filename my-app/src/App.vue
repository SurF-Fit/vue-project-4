<template>
  <div id="app">
    <div id="nav">
      <header-list />
    </div>
    <div class="main">
      <router-view />
    </div>
    <div id="footer">
      <footer-list />
    </div>
  </div>
</template>

<script>
import headerList from '@/components/header.vue';
import footerList from '@/components/footer.vue';

export default {
  components: {
    headerList,
    footerList
  },
  methods: {

  },
  mounted() {
    const savedData = localStorage.getItem('ПростоКупить');
    if (savedData) {
      this.products = JSON.parse(savedData);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

.main {
  margin: 20px;
  min-height: 80vh;
  max-height: max-content;
}
</style>
