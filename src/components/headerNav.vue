<template>
  <div class="header">
    <h1>智慧社区管理平台</h1>
    <ul :data-arr='className'>
      <li @click="showIndex" :class="className[0]">首页</li>
      <li @click="person" :class="className[1]">人口</li>
      <li @click="house" :class="className[2]">房屋</li>
      <li @click="equipment" :class="className[3]">设备</li>
      <li @click="faceToface" :class="className[4]">人脸对比</li>
      <!-- <li @click="blackNames" :class="className[5]">黑名单</li> -->
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    name: 'header-nav',
    data() {
      return {
        className: ['active', '', '', '', '', '']
      }
    },
    computed: {
      // className () {
      //   return this.$store.state.menuStatus.activeArr
      // }
    },
    methods: {
      ...mapActions([
        'setMenuStatus',//设置导航栏激活状态
        'showEquipment'//设置设备是否展示
      ]),
      showIndex() {
        window.location.href = '/'
        this.showEquipment(true)
      },
      person() {
        window.location.href = '/person'
        this.showEquipment(false)
      },
      house() {
        window.location.href = '/house'
        this.showEquipment(false)
      },
      equipment() {
        window.location.href = '/equipment'
        this.showEquipment(true)
      },
      faceToface() {
        window.location.href = '/faceToface'
        this.showEquipment(false)
      },
      blackNames() {
        window.location.href = '/blackNames'
        this.showEquipment(false)
      }
    }
  }
</script>

<style scoped>
  .header{
    width:100%;
    position: absolute;
    z-index: 1;
    top:0;
    left:0;
    display: flex;
  }
  .header h1{
    /* color:#fff;
    line-height: 94px;
    font-size: 24px;
    font-weight: normal;
    margin-left: 2%; */
    width:192px;
    height:23px; 
    font-size:24px;
    /* font-family:MicrosoftYaHei; */
    color:rgba(255,255,255,1);
    /* line-height:0px; */
    margin: 42px 0 0 42px;
  }
  .header ul{
    display: flex;
    margin-left: 92px;
    margin-top: 42px;
  }
  .header ul li{
    width:120px;
    cursor: pointer;
    position: relative;
    text-align: center;
    font-size: 18px;
    font-family:MicrosoftYaHei;
    color:rgba(45,213,255,1);
  }
  .header ul li.active{
    color: #2dd5ff;
  }
  .header ul li.active:after{
    content: '';
    position: absolute;
    width:80px;
    height:3px;
    left:20px;
    top: 30px;
    background: linear-gradient(to right, #00a2ff, #03fdfc);
  }
</style>
