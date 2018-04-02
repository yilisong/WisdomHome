<template>
  <div class="indexAsideBox">
    <div class="equipmentTitle">
      <el-row class="marginTop30">
        <el-col :span="12" class="font18">
          设备列表
        </el-col>
        <el-col :span="12" class="float-right text-right font14">
          共有设备: {{equipmentTotal}} 个
        </el-col>
      </el-row>
    </div>
    <div class="equipmentSearch">
      <el-row>
        <el-col :span="24" class="font14">
          <span>设备类型：<el-input v-model="typeOfEq" placeholder="请选择..." clearable style="width: 100px"></el-input></span>
          <span>设备编码：<el-input v-model="eqCode" placeholder="请输入..." clearable style="width: 100px"></el-input></span>
          <el-button size="small" @click="searcheInfo()">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="tableshow" style="width:100%">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="spec" label="设备类型" width="180"></el-table-column>
        <el-table-column prop="code" label="设备编号" width=""></el-table-column>
        <el-table-column prop="name" label="名称" width=""></el-table-column>
        <el-table-column prop="description" label="位置" width=""></el-table-column>
        <el-table-column prop="address" label="状态" width=""></el-table-column>
      </el-table>
    </div>
    <div class="pages float-right">
      <el-pagination ref="pages" v-if="total > size" @current-change="pageSizeChange" background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
    import echarts from 'echarts'
    import axios from 'axios'
    export default {
        name: "index-aside",
        data () {
          return {
            totalHeight: document.documentElement.clientHeight - 116,
            rem: document.documentElement.clientWidth / 19.2 * 0.8,
            equipmentTotal: 0,
            typeOfEq: null,
            eqCode: null,
            tableData: [],
            total: 0,
            size: 10,
            page: 1
          }
        },
        beforeCreate () {
          document.documentElement.style.fontSize = document.documentElement.clientWidth / 19.2 + 'px';
        },
        computed: {
          url() {
            return this.$store.state.menuStatus.url
          }
        },
        mounted () {
          this.$nextTick(() => {
          })
        },
        created() {
          this.getList()
        },
        methods: {
          pageSizeChange(current) {
            this.page = current
            this.getList()
          },
          getList() {
            const parmas = {
              spec: this.typeOfEq,
              start: this.page,
              size: this.size,
              code: this.eqCode
            }
            axios({
              method: 'post',
              url: this.url + '/statisticsPush/pushDataLike',
              data: parmas
            }).then(response => {
              if(response.data.code === 200) {
                  const res = response.data.data
                  this.equipmentTotal = res.total
                  this.tableData = res.list
                  this.total = res.total
              } else {
                
              }
            })
          },
          searcheInfo(page) {
            this.$refs['pages'].currentPage = 1;
            this.page = 1
            this.getList()
          }
        }
    }
</script>

<style scoped>
  .indexAsideBox{
    background: rgba(14, 20, 30, 0.9);
    position: absolute;
    top: 93px;
    bottom: 23px;
    left: 42px;
    min-width: 600px;
    box-shadow: 0 0 3px 0px rgba(0,0,0,0.6);
    color: #fff;
  }
  .indexAsideBox:before{
    height: 3px;
    width:100%;
    position: absolute;
    left:0;
    top:0;
    content: '';
    background: linear-gradient(to right, #00a2ff, #03fffc);
  }
  .font18 {
    font-size: 18px;
  }
  .font14 {
    font-size: 14px;
  }
  .equipmentTitle, .equipmentSearch {
      height: 54px;
      background:rgba(42,49,69,1);
      padding: 0 10px;
      vertical-align: middle;
      line-height: 54px;
  }
  .equipmentSearch {
      background:rgba(31,37,55,1);
  }
</style>
