<template>
  <div class="personlist">
    <div class="memberList">人员列表</div>
    <div class="memberListSearch">
      <span>居民类型：<el-input v-model="typeOfPerson" placeholder="请选择..." clearable style="width: 100px"></el-input></span>
      <span>居民姓名：<el-input v-model="name" placeholder="请选择..." clearable style="width: 100px"></el-input></span>
      <span>居民性别：<el-input v-model="sex" placeholder="请选择..." clearable style="width: 100px"></el-input></span>
      <!-- <span>预警时间：
        <el-datePicker v-model="startTime" type="date" placeholder="开始时间" style="width: 140px"></el-datePicker>
        <el-datePicker v-model="endTime" type="date" placeholder="结束时间" style="width: 140px"></el-datePicker>
      </span> -->
      <el-button size="small" @click="searcheInfo">搜索</el-button>
    </div>
    <div class="tableshow" style="width:100%">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="sexCV" label="性别" width="50"></el-table-column>
        <!-- <el-table-column prop="mobile" label="电话" width=""></el-table-column> -->
        <!-- <el-table-column prop="personCard" label="身份证" width="180"></el-table-column> -->
        <el-table-column prop="residenceAddress" label="居住地" width="180"></el-table-column>
        <el-table-column prop="keyService" label="重点帮扶" width=""></el-table-column>
        <el-table-column prop="focusControl" label="重点防控" width=""></el-table-column>
        <el-table-column prop="" label="操作"  width="">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditRule">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination v-if="total > size" @current-change="pageSizeChange" background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialogVisible: false,
      typeOfPerson: '',
      name: '',
      sex: '',
      startTime: '',
      endTime: '',
      total: 5,
      size: 10,
      page: 1,
      tableData: []
    }
  },
  computed: {
    url() {
      return this.$store.state.menuStatus.url
    }
  },
  created() {
    this.getPersonList()
  },
  methods: {
    getPersonList() {
      const parms = {
        start: this.page,
        size: this.size,
      }
      axios({
          method: 'post',
          url: this.url + '/statisticsPush/pushDataPop',
          data: parms
        }).then(response => {
          if(response.data.code === 200) {
            const res = response.data.data
            this.total = res.total
            this.tableData = res.list
          } else {
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
    },
    handleClose() {
      
    },
    handleEditRule() {
      this.dialogVisible = true
    },
    pageSizeChange(page) {
      this.page = page
      this.getPersonList()
      console.log(page)
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

<style>
  /* .v-modal {
    z-index: 999999999!important;
  } */
</style>

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
