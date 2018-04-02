<template>
  <div class="housedis">
    <div v-if="houseDetails">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <div class="textCenter"><i class="el-icon-warning"></i></div>
            <div class="textCenter">楼栋概述</div>
          </span>
          <div class="disDoors">
            <div class="titleFont">新青浦家园-73栋</div>
            <div class="titleFont-info">
              <i class="el-icon-location-outline"></i>
              上海市静安区威海路298号73栋
            </div>
            <div class="marginTop20">
              <div class="titleFont2">楼栋概况</div>
              <div class="house_content1">
                <el-row :gutter="20">
                  <el-col :span="8" class="marginTop20">
                    <img src="@/assets/images/house/area.png" alt="">
                    <span class="title3">楼栋建筑面积</span>
                  </el-col>
                  <el-col :span="8">
                    <el-row>
                      <el-col :span="12">
                        <div>
                          <img src="@/assets/images/house/mapArea.png" alt="">
                        </div>
                        <div class="title-info12">占地面积</div>
                      </el-col>
                      <el-col :span="12" class="marginTop20"><span class="areaInfo">{{ areaMap }}</span> <span class="areaUnit">㎡</span></el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row>
                      <el-col :span="12">
                        <div>
                          <img src="@/assets/images/house/liveArea.png" alt="">
                        </div>
                        <div class="title-info12">居住面积</div>
                      </el-col>
                      <el-col :span="12" class="marginTop20"><span class="areaInfo">{{ liveArea }}</span> <span class="areaUnit">㎡</span></el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div class="house_content2">
                <el-row :gutter="20">
                  <el-col :span="8" class="marginTop30">
                    <img src="@/assets/images/house/person.png" alt="">
                    <span class="title3">楼栋实有人口</span>
                  </el-col>
                  <el-col :span="4" class="marginTop20">
                    <div>{{ total }}</div>
                    <div class="title-info12 marginTop20">总数</div>
                  </el-col>
                  <el-col :span="6" class="text-center">
                    <div class="charts">
                      <canvas ref="cvs1" :width="rem" :height="rem"></canvas>
                    </div>
                    <div class="title-info12">常驻</div>
                  </el-col>
                  <el-col :span="6"  class="text-center">
                    <div class="charts">
                      <canvas ref="cvs2" :width="rem" :height="rem"></canvas>
                    </div>
                    <div class="title-info12">暂驻</div>
                  </el-col>
                </el-row>
              </div>
              <div class="house_content3">
                <el-row :gutter="20">
                  <el-col :span="8" class="marginTop30">
                    <img src="@/assets/images/house/doors.png" alt="">
                    <span class="title3">楼栋总层数</span>
                  </el-col>
                  <el-col :span="4" class="marginTop20">
                    <div>{{ floos }}</div>
                    <div class="title-info12 marginTop20">总数</div>
                  </el-col>
                  <el-col :span="12">&nbsp;</el-col>
                </el-row>
              </div>
            </div>
            <div class="marginTop20">
              <div class="titleFont2">开门记录</div>
              <div class="openDoorsTable">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="time" label="开门时间" width="170"></el-table-column>
                  <el-table-column prop="buildingName" label="户室" width=""></el-table-column>
                  <el-table-column prop="name" label="姓名" width=""></el-table-column>
                  <el-table-column prop="accessControlType" label="开门方式" width=""></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <div class="textCenter">
              <div class="details-icon"></div>
            </div>
            <div class="textCenter">人员统计</div>
          </span>
          <div>
            <div class="marginTop20 personnelstatistics">
              <el-table :data="personnelstatistics" style="width: 100%" @row-click="showPersonDetails">
                <el-table-column prop="door" label="户室" width=""></el-table-column>
                <el-table-column prop="houseLayoutCV" label="房屋户型"></el-table-column>
                <el-table-column prop="houseStatusCV" label="房屋状态" width=""></el-table-column>
                <el-table-column prop="realPopNum" label="实有人口" width=""></el-table-column>
                <el-table-column prop="" label="重点防控" width="" align="center">
                  <template slot-scope="scope">
                    <div v-if="scope.row.focusPcNum !== 0">
                      <img src="@/assets/images/house/redDot.png" alt="">
                    </div>
                    <div v-else>
                      <span></span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="" width="">
                  <template slot-scope="scope">
                    <span class="">></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pages">
              <el-pagination v-if="totalSize > size" @current-change="pageSizeChange" background layout="prev, pager, next" :total="totalSize"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="personDis" v-if="!houseDetails">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label" @click="showpersonList">
            <el-row>
              <el-col :span="2" style="line-height: 50px">&lt;</el-col>
              <el-col :span="22">
                <div class="textCenter">
                  <img src="@/assets/images/house/countActive.png" alt="">
                </div>
                <div class="textCenter">{{ personInformationdoors }}</div>
              </el-col>
            </el-row>
          </span>
          <div class="" v-for="(item, index) in personInformation" :key="index">
            <div class="personInformation">
              <div class="personDiv">
                <div class="triangle-topright"></div>
                <el-row>
                  <el-col :span="6">
                    <div class="personImg">
                      <div class="phonePicter">
                        <img :src="item.src" alt="">
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="18" class="personInfo">
                    <div>{{ item.name }}</div>
                    <div class="marginTop10 personalInformation">
                      <span> {{ item.sex }} </span>
                      <span> | </span>
                      <span> {{ item.age }} </span>
                      <span> | </span>
                      <span> {{ item.phone }} </span>
                    </div>
                    <div class="marginTop10 personalInformation">
                      <span> {{ item.political }} </span>
                      <span> | </span>
                      <span> {{ item.county }} </span>
                      <span> | </span>
                      <span> {{ item.personCard }} </span>
                    </div>
                  </el-col>
                </el-row>
                <div class="margin20 personalInformation">
                  <el-row class="elrowBg">
                    <el-col :span="4">
                      <span class="personInfoTitle">证件地址</span>
                    </el-col>
                    <el-col :span="20">
                      {{ item.address }}
                    </el-col>
                  </el-row>
                  <el-row class="elrowBg2">
                    <el-col :span="4">
                      <span class="personInfoTitle">居住属性</span>
                    </el-col>
                    <el-col :span="10">{{ item.residentialProperty }}</el-col>
                    <el-col :span="4">
                      <span class="personInfoTitle">婚姻状态</span>
                    </el-col>
                    <el-col :span="6">{{ item.maritalStatus }}</el-col>
                  </el-row>
                  <el-row class="elrowBg">
                    <el-col :span="4">
                      <span class="personInfoTitle">与房主关系</span>
                    </el-col>
                    <el-col :span="10">{{ item.relationship }}</el-col>
                    <el-col :span="4">
                      <span class="personInfoTitle">居民属性</span>
                    </el-col>
                    <el-col :span="6">{{ item.attribute }}</el-col>
                  </el-row>
                  <el-row class="elrowBg2">
                    <el-col :span="4">
                      <span class="personInfoTitle">工作单位</span>
                    </el-col>
                    <el-col :span="10">{{ item.jobs }}</el-col>
                    <el-col :span="4">
                      <span class="personInfoTitle">工作行业</span>
                    </el-col>
                    <el-col :span="6">{{ item.workType }}</el-col>
                  </el-row>
                </div>
                <div class="triangle-bottomleft"></div>
              </div>
            </div>
            <br><br>
          </div>
        </el-tab-pane>
      </el-tabs>    
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
  data() {
    return{
      personInformationdoors: '301',
      personInformation: [{
        name: '章三',
        sex: '男',
        age: '26岁',
        phone: '15861380000',
        political: '面貌',
        county: '中国',
        personCard: '5201031990011206412',
        address: '贵州省贵阳市云岩区松柏巷10号2单元202室',
        jobs: '新智认知数据服务有限公司',
        workType: '互联网IT',
        attribute: '无',
        relationship: '其它',
        maritalStatus: '未婚',
        residentialProperty: '常住',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521036768236&di=da6c1fbe335a6cf4e96dc1556a4ca484&imgtype=0&src=http%3A%2F%2Fp2.wmpic.me%2Farticle%2F2017%2F09%2F20%2F1505894755_ewcKzzYJ.jpg'
      },{
        name: '章三',
        sex: '男',
        age: '26岁',
        phone: '15861380000',
        political: '面貌',
        county: '中国',
        personCard: '5201031990011206412',
        address: '贵州省贵阳市云岩区松柏巷10号2单元202室',
        jobs: '新智认知数据服务有限公司',
        workType: '互联网IT',
        attribute: '无',
        relationship: '其它',
        maritalStatus: '未婚',
        residentialProperty: '常住',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521036768236&di=da6c1fbe335a6cf4e96dc1556a4ca484&imgtype=0&src=http%3A%2F%2Fp2.wmpic.me%2Farticle%2F2017%2F09%2F20%2F1505894755_ewcKzzYJ.jpg'
      },{
        name: '章三',
        sex: '男',
        age: '26岁',
        phone: '15861380000',
        political: '面貌',
        county: '中国',
        personCard: '5201031990011206412',
        address: '贵州省贵阳市云岩区松柏巷10号2单元202室',
        jobs: '新智认知数据服务有限公司',
        workType: '互联网IT',
        attribute: '无',
        relationship: '其它',
        maritalStatus: '未婚',
        residentialProperty: '常住',
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521036768236&di=da6c1fbe335a6cf4e96dc1556a4ca484&imgtype=0&src=http%3A%2F%2Fp2.wmpic.me%2Farticle%2F2017%2F09%2F20%2F1505894755_ewcKzzYJ.jpg'
      }],
      areaMap: '223',
      liveArea: '1232',
      total: '4728',
      floos: '11',
      size: 15,
      totalSize: 0,
      page: 1,
      houseDetails: true,
      rem: document.documentElement.clientWidth / 19.2 * 0.8,
      tableData: [],
      personnelstatistics: []
    }
  },
  computed: {
    url() {
      return this.$store.state.menuStatus.url
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.doCircle('cvs1');
      this.doCircle('cvs2');
      this.openRecord()
    })
  },
  methods: {
    timestampToTime(timestamp) {
      const date = new Date(timestamp)
      const Y = date.getFullYear() + '-'
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = date.getDate() + ' '
      const h = date.getHours() + ':'
      const m = date.getMinutes() + ':'
      const s = date.getSeconds()
      return Y + M + D + h + m + s 
    },
    pageSizeChange(currage) {
      this.page = currage
      this.personListInfo()
    },
    personListInfo() {
      const parmas = {
        start: this.page,
        size: this.size
      }
      axios({
        method: 'post',
        url: this.url + '/statisticsPush/pushDatabasedOnHome',
        data: parmas
      }).then(response => {
        if(response.data.code === 200) {
          const res = response.data.data
          this.totalSize = res.total
          this.personnelstatistics = res.list
        } else {
          this.$message({
            message: response.data.message,
            type: 'error'
          })
        }
      })
    },
    openRecord() {
      // 人员信息列表
      this.personListInfo()
      // 刷卡记录
      axios({
        method: 'post',
        url: this.url + '/statisticsPush/pushDataAccessLog',
        data: {}
      }).then(response => {
        this.tableData = []
        if(response.data.code === 200) {
          const res = response.data.data
          res.list.forEach((v, i) => {
            this.tableData.push({
              time: this.timestampToTime(v.insertDate),
              buildingName: v.buildingName,
              name: v.name,
              accessControlType: v.accessControlType
            })
          });
        } else {
          this.$message({
            message: response.data.message,
            type: 'error'
          })
        }
      })
    },
    showpersonList() {
      this.houseDetails = true
    },
    showPersonDetails(data) {
      this.houseDetails = false
      console.log(data.id)
    },
    doCircle(name) {
      var cvs = this.$refs[name];
      var ctx = cvs.getContext('2d');

      let center = this.rem *0.5;

      var gradient = ctx.createLinearGradient(60, 0, 0, 60);
      gradient.addColorStop(0, '#0078ff');
      gradient.addColorStop(1, '#00e4ff');

      var endAngle = -Math.PI / 2;
      function draw(){
        ctx.clearRect(0,0,cvs.width,cvs.height)

        ctx.fillStyle ='#fff';
        ctx.font="12px Arial";
        ctx.fillText('1324',center - 14,center + 4);

        ctx.beginPath();
        ctx.arc(center, center, 22, 0, Math.PI*2, true)
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ccc';
        ctx.stroke();

        endAngle += 0.1;
        if (endAngle >= Math.PI) {
          endAngle = Math.PI;
        } else {
          requestAnimationFrame(draw);
        }

        ctx.beginPath();
        ctx.arc(center, center, 22, -Math.PI / 2, endAngle, false)
        ctx.lineWidth = 3;
        ctx.strokeStyle = gradient;
        ctx.lineCap = 'round';
        ctx.stroke();

      }
      draw();
    }
  }
}
</script>

<style>
.phonePicter {
  width: 90px;
  height: 100px;
  margin-top: 10px;
  margin-left: 12px;
}
.phonePicter img {
  width: 100%;
  height: 100%;
}
.personDiv {
  width: 96%;
  margin-left: 2%;
  background: #35425a;
}
.personInformation:before{
  height: 2px;
  width: 96%;
  position: absolute;
  left:2%;
  top:0;
  content: '';
  background: linear-gradient(to right, #00a2ff, #03fffc);
  z-index: 999;
}
.personImg {
  height: 123px;
  width: 118px;
  background: url(../assets/images/house/personImg.png) no-repeat;
  float: right;
  margin-top: 20px;
}
.personInfo {
  margin-top: 20px;
  padding-left: 20px;
}
.elrowBg {
  background: #3e4a60;
  padding: 3px 5px;
  border-radius: 2px;
}
.elrowBg2 {
  padding: 3px 5px;
}
.personInfoTitle {
  color: rgba(255, 255, 255, .4);
}
.personalInformation .el-row {
  margin-top: 10px;
}
.marginTop10 {
  margin-top: 10px;
}
.marginbottom10 {
  margin-bottom: 10px;
}
.margin20 {
  margin: 20px;
}
.personalInformation {
  font-size: 14px;
  margin-bottom: 0;
}
.triangle-topright { 
  width: 0; 
  height: 0; 
  border-top: 20px solid #03f6fc; 
  border-left: 20px solid transparent; 
  float: right;
}
.triangle-bottomleft { 
  width: 0; 
  height: 0; 
  border-bottom: 30px solid #20283a; 
  border-right: 30px solid transparent; 
} 
.red {
  color: red;
}
.disDoors {
  padding: 15px;
}
.pages {
    float: right;
    margin-top: 11px;
  }
.housedis:before{
  height: 3px;
  width:100%;
  position: absolute;
  left:0;
  top:0;
  content: '';
  background: linear-gradient(to right, #00a2ff, #03fffc);
  z-index: 999;
}
.housedis .el-tabs--border-card>.el-tabs__content {
  padding: 0;
}
.housedis .el-tabs__nav-scroll .el-tabs__nav {
  width: 100%;
}
.housedis .el-tabs__nav-scroll .el-tabs__nav>div {
  width: 50%;
}
.personDis .el-tabs__nav-scroll .el-tabs__nav>div {
  width: 100%;
}
.housedis .el-tabs__item {
  height: 50px;
  line-height: 25px;
}
.housedis .el-tabs--border-card>.el-tabs__header .el-tabs__item {
  margin: 0;
  font-size: 16px;
  border: none;
}
.housedis .el-tabs--border-card>.el-tabs__header .el-tabs__item .details-icon {
  width: 20px;
  height: 20px;
  background: url(../assets/images/house/count.png) no-repeat;
  margin-left: 46%;
}
.housedis .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  background-color: #3e4759;
  color: #fff;
  border: none;
}
.housedis .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active .details-icon {
  width: 20px;
  height: 23px;
  background: url(../assets/images/house/countActive.png) no-repeat;
  margin-left: 46%;
}
.textCenter {
  width: 100%;
  text-align: center;
}
.text-center {
  text-align: center;
}
.titleFont {
  font-size: 36px;
}
.titleFont2 {
  font-size: 18px;
}
.titleFont-info {
  font-size: 18px;
  color: rgba(255, 255, 255, .35)
}
.marginTop20 {
  margin-top: 20px;
}
.marginTop30 {
  margin-top: 30px;
}
.house_content1, .house_content2, .house_content3 {
  margin-top: 18px;
}
.title3 {
  font-size: 14px;
  color: rgba(255, 255, 255, .4);
  display: inline-block;
  position: absolute;
  padding-left: 5px;
}
.title-info12 {
  font-size: 12px;
  color: rgba(255, 255, 255, .6);
}
.areaUnit {
  font-size: 18px;
  color: #fff;
}
.areaInfo {
  font-size: 20px;
  color: #fff;
}
.openDoorsTable .el-table td, .openDoorsTable .el-table th {
  font-size: 13px;
  padding: 5px 0;
}
.personnelstatistics .el-table td, .personnelstatistics .el-table th {
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  padding: 6px 0;
}
.housedis .el-tabs--border-card {
  border: none!important;
  border-top: 3px solid 
}
.housedis .el-tabs--border-card>.el-tabs__header {
  border-bottom: #20283a;
}
.housedis .el-tabs--border-card {
  box-shadow: none;
}
.personDis .el-tabs__content {
  overflow: scroll;
}
</style>
