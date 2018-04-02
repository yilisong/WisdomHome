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
    <background-village></background-village>
    <equipment-list></equipment-list>    
  </div>
</template>

<script>
  import backgroundVillage from '@/components/equipmentbag'
  import equipmentList from '@/components/equipmentList'

  export default {
    name: "index",
    components: {
      backgroundVillage,
      equipmentList
    },
    data() {
      return {
        className: ['', '', '', 'active', '', '']
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
