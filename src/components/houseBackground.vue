<template>
  <div :style="{ height: height + 'px' }" class="box">
    <div class="wrap" ref="wrap">
        <div class="imgDiv imgDiv_left"></div>
        <div class="img_content">
            <div>
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
            <div class="bg-img">
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
            <div class="bg-img">
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
            <div class="bg-img">
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
            <div class="bg-img">
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
            <div class="bg-img">
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
            <div class="bg-img">
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
            <div class="bg-img">
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
            <div class="bg-img">
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
            <div class="bg-img">
                <img src="@/assets/images/house/Shading.png" alt="" style="width: 100%">
            </div>
        </div>
        <div class="imgDiv"></div>
        <img src="" alt="">
    </div>
  </div>
</template>

<script>

  export default {
    name: "village",
    data () {
      return {
        scale: 1,
        left: 0,
        top: 0,
        imgWidth: 0,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        rate: document.documentElement.clientHeight / document.documentElement.clientWidth,
        canWheel: true
      }
    },
    computed: {
    
    },
    methods: {
      jumpToHouse() {
        window.location.href = '/houseDetails'
      }
    },
    mounted () {
    //   
    }
  }
</script>

<style scoped>
  .bg-img {
    display: inline-block;
    margin-top: -120px;
  }
  .imgDiv {
    width:2px;
    height:100vh;
    display: inline-block;
    float: left;
    background:linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255,255, 0.7), rgba(255, 255, 255, 0));
  }
  .imgDiv_left {
      margin-left: 120px;
  }
  .img_content {
    width:500px;
    float: left;
  }
  .box{
    background: #141c2b;
    overflow: hidden;
    position: relative;
    cursor: crosshair;
  }
  .wrap{
    position: absolute;
  }
  .imgHouse{
    cursor: pointer;
    position: absolute;
    top:42.4%;
    left:59.8%;
    width: 7%;
    padding-bottom: 9.3%;
    background: url(../assets/img/house.png) no-repeat;
    background-size: 100%;
  }
  .imgHouse:hover{
    background: url(../assets/img/house_active.png) no-repeat;
    background-size: 100%;
  }
  .circleImg{
    position: absolute;
    top:5%;
    left:19%;
    width:78%;
  }
  .imgTitle{
    position: absolute;
    top:13%;
    left: 43%;
    width:25%;
  }
</style>
