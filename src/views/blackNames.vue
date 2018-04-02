<template>
  <div>
    <h1>blackNames</h1>
    <button v-on:click="change">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    change: function(){
      this.show = !this.show;
    },
    showIndex() {
      window.location.href = '/'
    },
    person() {
      window.location.href = '/person'
    },
    house() {
      window.location.href = '/house'
    },
    equipment() {
      window.location.href = '/equipment'
    },
    faceToface() {
      window.location.href = '/faceToface'
    },
    blackNames() {
      window.location.href = '/blackNames'
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
