<template>
  <div>
    <div class="searchInfo">
      <el-select v-model="value8" filterable placeholder="搜索楼栋号/室号/姓名">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <header-nav></header-nav>
    <background-village></background-village>
    <left-mask></left-mask>
    <index-aside></index-aside>    
  </div>
</template>

<script>
  import headerNav from '@/components/headerNav'
  import backgroundVillage from '@/components/equipmentbag'
  import leftMask from '@/components/leftMask'
  import indexAside from '@/components/indexAside'

  export default {
    name: "index",
    components: {
      headerNav,
      backgroundVillage,
      leftMask,
      indexAside,
    },
    data() {
      return {
        options: [{
          value: '72栋',
          label: '72栋'
        }, {
          value: '72栋302室',
          label: '72栋302室'
        }, {
          value: '72栋305室',
          label: '72栋305室'
        }, {
          value: '72栋502室',
          label: '72栋502室'
        },{
          value: '72栋3021室',
          label: '72栋3021室'
        }, {
          value: '72栋3051室',
          label: '72栋3051室'
        }, {
          value: '72栋5021室',
          label: '72栋5021室'
        }, {
          value: '72栋602室',
          label: '72栋602室'
        }],
        value8: ''
      }
    }
  }
</script>

<style scoped>
.searchInfo {
  float: right;
  display: inline-block;
  position: absolute;
  z-index: 9999;
  display: flex;
  right: 20px;
  top: 50px;
}
</style>
