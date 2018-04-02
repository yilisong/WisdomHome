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
    <div class="showDetails" v-if="!showList" @click="showDetailsInfo">
      &gt;
    </div>
    <div class="hiddenDetails" v-else @click="hiddenDetailsInfo">
      &lt;
    </div>
    <background-village></background-village>
    <transition name="fade">
      <div v-if="showList">
        <div class="leftHouseList">
          <house-modal></house-modal>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import backgroundVillage from '@/components/village'
import houseModal from '@/components/house'
export default {
  name: 'house',
  components: {
    backgroundVillage,
    houseModal
  },
  data() {
    return {
      showList: false,
      className: ['', '', 'active', '', '', '']
    }
  },
  methods: {
    hiddenDetailsInfo() {
      this.showList = false
    },
    showDetailsInfo() {
      this.showList = true
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

<style scoped>
  .leftHouseList {
    width: 40%;
    min-width: 576px;
    background-color: rgba(14, 20, 30, 0.9);;
    position: fixed;
    left: 2%;
    top: 93px;
    bottom: 23px;
    z-index: 999;
    color: #fff;
    font-size: 16px;
  }
  .hiddenDetails {
    width: 27px;
    height: 65px;
    background-color: #040f27;
    position: fixed;
    left: 42%;
    top: 48%;
    z-index: 999;
    color: #fff;
    font-size: 16px;
    line-height: 65px;
    text-align: center;
    cursor: pointer;
  }
  .showDetails {
    width: 27px;
    height: 65px;
    background-color: #040f27;
    position: fixed;
    left: 0px;
    top: 48%;
    z-index: 999;
    color: #fff;
    font-size: 16px;
    line-height: 65px;
    text-align: center;
    cursor: pointer;
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

