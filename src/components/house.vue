<template>
  <div class="personlist">
    <div class="memberList">房屋列表</div>
    <div class="memberListSearch">
      <span>楼栋号：<el-input v-model="houseNum" placeholder="请选择..." clearable style="width: 100px"></el-input></span>
      <el-button size="small" @click="searcheInfo">搜索</el-button>
    </div>
    <div class="tableshow" style="width:100%">
      <el-table :data="tableData" style="width: 100%" @row-click="showHousedetails">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="houseNum" label="楼栋号" width="80"></el-table-column>
        <el-table-column prop="houseCount" label="房屋数" width="80"></el-table-column>
        <el-table-column prop="occupancyRate" label="入住率" width=""></el-table-column>
        <el-table-column prop="personCount" label="人口数" width=""></el-table-column>
        <el-table-column prop="emphasesHelp" label="重点帮扶" width=""></el-table-column>
        <el-table-column prop="emphasesPrevention" label="重点防控" width=""></el-table-column>
        <el-table-column prop="" label=""  width="">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditRule">></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination v-if="total > size" @current-change="pageSizeChange" background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      houseNum: '',
      total: 10,
      size: 10,
      tableData: [],
      page: 1
    }
  },
  created() {
    this.buildingInfo()
  },
  computed: {
    url() {
      return this.$store.state.menuStatus.url
    }
  },
  methods: {
    pageSizeChange(page) {
      this.page = page
      this.buildingInfo()
    },
    // /statisticsPush/pushDatabasedOnBuilding
    buildingInfo() {
      const parmas = {
        start: this.page,
        size: this.size
      }
      axios({
        method: 'post',
        url: this.url + '/statisticsPush/pushDatabasedOnBuilding',
        data: parmas
      }).then(response => {
        if(response.data.code === 200) {
          const res = response.data.data
          this.tableData = res.list
          this.total = res.total
        } else {
          this.$message({
            message: response.data.message,
            type: 'error'
          })
        }
      })
    },
    showHousedetails(info) {
      console.log(info)
      window.location.href = '/houseDetails?' + info.id 
    },
    handleEditRule() {
      console.log()
    },
    searcheInfo() {
      if(this.endTime < this.startTime) {
        this.showMessageInfo('结束时间不能小于开始时间', 'error')
      }
    },
    showMessageInfo(correctMessage, typeInfo) {
      this.$message({
        showClose: true,
        message: correctMessage,
        type: typeInfo
      })
      return false
    }
  }
}
</script>

<style scoped>
  .memberList {
    padding:5px 10px;
    background: #2a3145;
  }
  .memberListSearch {
    font-size: 12px;
    background: #1f2537;
    padding: 8px 18px;
  }
  .personlist {
    width: 100%;
  }
  .personlist:before {
    height: 3px;
    width:100%;
    position: absolute;
    left:0;
    top:0;
    content: '';
    background: linear-gradient(to right, #00a2ff, #03fffc);
  }
  .tableshow {
    background-color: rgba(14, 19, 34, .8)
  }
  .pages {
    float: right;
    margin-top: 11px;
  }
  .tableshow .el-table .el-table__body-wrapper table tbody tr:hover {
    background-color: rgba(14, 20, 30, 0.8)!important;
    color: #fff!important;
    cursor: pointer;
  }
</style>
