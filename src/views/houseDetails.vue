<template>
  <div>
    <div class="header">
      <h1>智慧社区管理平台</h1>
      <ul>
        <li @click="showIndex" :class="className[0]">首页</li>
        <li @click="person" :class="className[1]">人口</li>
        <li @click="house" :class="className[2]">房屋</li>
        <li @click="equipment" :class="className[3]">设备</li>
        <li @click="faceToface" :class="className[4]">人脸对比</li>
        <!-- <li @click="blackNames" :class="className[5]">黑名单</li> -->
      </ul>
    </div>
    <div class="title-show">
      <div class="floorDoors">{{ 301 }}</div>
    </div>
    <div class="houseType">
      <img class="poniter" src="@/assets/images/house/pointer.png" alt="">
      <img class="door" src="@/assets/images/house/door.png" alt="">
      <img class="floors" src="@/assets/images/house/floors.png" alt="">
      <img class="floorbg" src="@/assets/images/house/floorbg.png" alt="">
    </div>
    <house-background></house-background>
    <div>
      <!-- <div class=""></div>
      <div></div>
      <div></div>
      <div class="lunBanner">
        <el-carousel type="card" height="40px" :autoplay='false'>
          <el-carousel-item v-for="item in 5" :key="item">
            <h3 style="color: #fff!important;">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div> -->
    </div>
    <div class="rightPersonList">
      <house-detail-modal></house-detail-modal>
    </div>
  </div>
</template>

<script>
import houseBackground from '@/components/houseBackground'
import houseDetailModal from '@/components/houseDetails'
export default {
  name: 'house',
  components: {
    houseBackground,
    houseDetailModal
  },
  data() {
    return {
      className: ['', '', 'active', '', '', '']
    }
  },
  methods: {
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
  .el-carousel__item h3 {
    color: #fff;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    position: absolute;
    z-index: 999;
  }
  
  .el-carousel__item:nth-child(2n) {
    /* background-color: #99a9bf; */
  }
  
  .el-carousel__item:nth-child(2n+1) {
    /* background-color: #d3dce6; */
  }
</style>
<style scoped>
  .lunBanner {
    transform:rotate(90deg);
    height: 30px;
    border: 1px solid red;
    color: #fff;
    position: absolute;
    top: 300px;
    color: #fff!important;
    left: 425px;
    width: 479px;
    color: #ffffff;
  }
  .lunBanner .el-carousel__indicators--outside {
    display: none;
  }
  .lunBanner .el-carousel__mask, 
  .lunBanner .el-cascader-menu, 
  .lunBanner .el-cascader-menu__item.is-disabled:hover, 
  .lunBanner .el-collapse-item__header, 
  .lunBanner .el-collapse-item__wrap {
    background: none;
  }
  .floorDoors {
    position: absolute;
    margin-top: -50px;
    font-size: 40px;
    color: #fff;
    font-family: Iceland;
    animation: neon2 1.5s ease-in-out infinite alternate;
  }
  @-webkit-keyframes neon2 {
    from {
      text-shadow: 0 0 10px #fff,
      0 0 20px  #fff,
      0 0 30px  #fff,
      0 0 40px  #228DFF,
      0 0 70px  #228DFF,
      0 0 80px  #228DFF,
      0 0 100px #228DFF,
      0 0 150px #228DFF;
    }
    to {
      text-shadow: 0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px #fff,
      0 0 20px #228DFF,
      0 0 35px #228DFF,
      0 0 40px #228DFF,
      0 0 50px #228DFF,
      0 0 75px #228DFF;
    }
  }
  .title-show {
    width: 80px;
    height: 50px;
    border-left:1px solid #03fffc;
    border-top:1px solid #03fffc;
    position: absolute;
    z-index: 99999;
    margin-top: 200px;
    margin-left: 285px;
    /* transform: rotate(40deg);  */
  }
  .poniter {
    margin-left: 150px;
    position: absolute;
  }
  .door {
    width: 75%;
    height: auto;
    display: inherit;
    margin-top: -50px;
    position: absolute;
    z-index: 999;
  }
  .floorbg {
    width: 100%;
    height: auto;
    /* margin-top: -120px; */
  }
  .floors {
    width: 70%;
    height: auto;
    left: 23px;
    position: absolute;
    margin-top: 70px;
  }
  .houseType {
    height: 400px;
    width: 500px;
    position: absolute;
    z-index: 999;
    margin-left: 120px;
    margin-top: 250px;
    background: url(../assets/images/house/bg.png) no-repeat;
  }
  .rightPersonList {
    width: 40%;
    min-width: 475px;
    background-color: #20283a;
    position: fixed;
    right: 25px;
    top: 93px;
    bottom: 23px;
    z-index: 999;
    color: #fff;
    font-size: 16px;
    overflow-y: scroll;
  }
  .header {
    width:100%;
    position: absolute;
    z-index: 1;
    top:0;
    left:0;
    display: flex;
  }
  .header h1 {
    color:#fff;
    line-height: 94px;
    font-size: 24px;
    font-weight: normal;
    margin-left: 2%;
  }
  .header ul {
    display: flex;
    margin-left: 4%;
    height:94px;
  }
  .header ul li {
    width:120px;
    line-height: 94px;
    color:#fff;
    cursor: pointer;
    position: relative;
    text-align: center;
    font-size: 18px;
  }
  .header ul li.active {
    color: #2dd5ff;
  }
  .header ul li.active:after {
    content: '';
    position: absolute;
    width:80px;
    height:3px;
    left:20px;
    top: 66px;
    background: linear-gradient(to right, #00a2ff, #03fdfc);
  }
</style>

