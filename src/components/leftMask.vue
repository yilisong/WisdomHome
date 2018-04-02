<template>
  <div class="leftMask" :style="{height: height + 'px'}"></div>
</template>

<script>
  export default {
    name: "left-mask",
    data () {
      return {
        height: document.documentElement.clientHeight
      }
    }
  }
</script>

<style scoped>
.leftMask{
  width: 32%;
  position: absolute;
  background: linear-gradient(to right, rgba(33, 35, 45, 1) 0, rgba(33, 35, 45, 0.15) 100%);
  top:0;
  left:0;
}
.leftMask:after{
  content: '';
  position: absolute;
  width:70%;
  right:0;
  top:0;
  bottom:0;
  background: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.1) 20%, rgba(0,0,0,0) 100%);
}
</style>
