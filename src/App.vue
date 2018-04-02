<template>
  <div id="app">
    <!-- <header-nav></header-nav> -->
    <router-view/>
  </div>
</template>

<script>
  // import headerNav from '@/components/headerNav'

  export default {
    name: 'App',
    components: {
      // headerNav
    }
  }
</script>

<style>
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
