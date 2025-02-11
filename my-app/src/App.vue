<template>
  <div id="app">
    <div id="nav">
      <header-list />
    </div>
    <router-view />
  </div>
</template>

<script>
import headerList from '@/components/header.vue';

export default {
  components: {
    headerList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  padding: 20px;
}
</style>
