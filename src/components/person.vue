<template>
  <div class="indexAsideBox">
    <div class="asidePersonInfo">
      人员情况
      <span>今日：3828人</span>
    </div>
    <div class="asidePersonInfo" style="font-size: 14px;">
      每月人员变动
      <ul class="asideChartUl">
        <li>流入</li>
        <li>流出</li>
      </ul>
    </div>
    <div class="asideLineChart" ref="asideLastChart"></div>
    <div class="asidePersonInfo" style="font-size: 14px;">
      人员构成
      <ul class="asideChartUlLi">
        <li>&lt;16</li>
        <li>16~60</li>
        <li>&gt;60</li>
      </ul>
    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <div class="personChart" ref="personMembersB"></div>
        </el-col>
        <el-col :span="12">
          <div class="personChart" ref="personMembersG"></div>
        </el-col>
      </el-row>
    </div>
    <div class="asidePersonInfo">
      重点帮扶人员
      <span>共：{{ totalPersonAboutImportant }}人</span>
    </div>
    <div class="asideLine asideLine-mar5">
      <el-row class="asideLineUl">
        <el-col :span="12">
          <div class="foucseCvs" ref="cvs1"></div>
        </el-col>
        <el-col :span="12">
          <div class="foucseCvs" ref="cvs2"></div>
        </el-col>
      </el-row>
    </div>
    <div class="asideLine asideLine-mar5">
      <el-row class="asideLineUl">
        <!-- <el-col :span="8">
          <div class="foucseCvs" ref="cvs4"></div>
        </el-col> -->
        <!-- <el-col :span="8">
          <div class="foucseCvs" ref="cvs5"></div>
        </el-col> -->
        <el-col :span="12">
          <div ref="cvs6" class="foucseCvs"></div>
        </el-col>
        <el-col :span="12">
          <div ref="cvs3" class="foucseCvs"></div>
        </el-col>
      </el-row>
    </div>
    <div class="asideLine" style="margin-bottom: -0.2rem;">
      <div class="asidePersonInfo">
        重点防控
      </div>
      <div class="asideLineProtect">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="10">&nbsp;</el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <img src="@/assets/images/person/drugrelated.png" alt="">
                  <div style="font-size: 12px">涉毒</div>
                </div>
              </el-col>
              <el-col :span="6" class="protect">
                <div class="grid-content bg-purple">
                  {{ drug }}
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <img src="@/assets/images/person/pyramidSelling.png" alt="">
                  <div style="font-size: 12px;width:100%">刑满释放</div>
                </div>
              </el-col>
              <el-col :span="6" class="protect">
                <div class="grid-content bg-purple">
                  {{ fullReleaseOfPrisoners }}
                </div>
              </el-col>
              <el-col :span="5">&nbsp;</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row :gutter="20">
              <!-- <el-col :span="10">&nbsp;</el-col> -->
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <img src="@/assets/images/person/cult.png" alt="">
                  <div style="font-size: 12px">艾滋</div>
                </div>
              </el-col>
              <el-col :span="6" class="protect">
                <div class="grid-content bg-purple">
                  {{ hiv }}
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
  export default {
    name: 'person',
    data () {
      return {
        totalHeight: document.documentElement.clientHeight - 116,
        rem: document.documentElement.clientWidth / 19.2 * 0.8,
        drug: 0,
        fullReleaseOfPrisoners: 0,
        hiv: 0,
        totalPersonAboutImportant: 0
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
        this.getpersonData()
        this.doBarChart();
      })
    },
    methods: {
      getpersonData() {
        // 当前人员流动数据
        axios({
          method: 'post',
          url: this.url + '/statisticsPush/pushPopFlowData'
        }).then(response => {
          if(response.data.code === 200) {
            const res = response.data
            console.log(res)
            // this.total = res.total
            // this.tableData = res.assets
          } else {
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
        // 人口数据统计
        axios({
          method: 'post',
          url: this.url + '/statisticsPush/pushPopStatistics'
        }).then(response => {
          if(response.data.code === 200) {
            const res = response.data.data
            const fpcStatistics = res.fpcStatistics
            let handicapped //残疾人
            let specialObj //优抚对象
            let oldPerson //老年人
            let righteous //见义勇为
            let withoutJobs //失业人员
            let needHelp //需要救助人员
            fpcStatistics.forEach((v, i) => {
              if(v.parameterKey === 2) {
                handicapped = v.peopleNum
              } else {
                handicapped = 0
              }
              if(v.parameterKey === 3) {
                withoutJobs = v.peopleNum
              } else {
                withoutJobs = 0
              }
              if(v.parameterKey === 4) {
                needHelp = v.peopleNum
              } else {
                needHelp = 0
              }
              if(v.parameterKey === 5) {
                oldPerson = v.peopleNum
              } else {
                oldPerson = 0
              }
              if(v.parameterKey === 6) {
                specialObj = v.peopleNum
              } else {
                specialObj = 0
              }
              if(v.parameterKey === 7) {
                righteous = v.peopleNum
              } else {
                righteous = 0
              }
            })
            this.blueHalfCount('cvs1', '残疾人', handicapped);
            this.violetHalfCount('cvs2', '优抚对象', specialObj);
            this.blueHalfCount('cvs3', '老年人', oldPerson);
            // this.violetHalfCount('cvs4', '见义勇为', righteous);
            // this.blueHalfCount('cvs5', '失业', withoutJobs);
            this.violetHalfCount('cvs6', '需要救助', needHelp);
            this.totalPersonAboutImportant = handicapped + specialObj + oldPerson + righteous + withoutJobs + needHelp
            /**年龄 */
            const ageStatistics = res.ageStatistics
            const female = ageStatistics.female
            const male = ageStatistics.male
            let gdata1 = 0
            let gdata2 = 1
            let gdata3 = 0
            let bdata1 = 0
            let bdata2 = 1
            let bdata3 = 0
            female.forEach((v, i) => {
              if(v.parameterName && v.parameterName === '<16') {
                gdata1 = v.peopleNum
              } else {
                gdata1 = 0
              }
              if(v.parameterName && v.parameterName === '16~60') {
                gdata2 = v.peopleNum
              } else {
                gdata2 = 0
              }
              if(v.parameterName && v.parameterName === '>60') {
                gdata3 = v.peopleNum
              } else {
                gdata3 = 0
              }
            })
            male.forEach((v, i) => {
              if(v.parameterName && v.parameterName === '<16') {
                bdata1 = v.peopleNum
              } else {
                bdata1 = 0
              }
              if(v.parameterName && v.parameterName === '16~60') {
                bdata2 = v.peopleNum
              } else {
                bdata2 = 0
              }
              if(v.parameterName && v.parameterName === '>60') {
                bdata3 = v.peopleNum
              } else {
                bdata3 = 0
              }
            })
            const gdata = [
              {value: gdata1, name:'<16'},
              {value: gdata2, name:'16~60'},
              {value: gdata3, name:'>60'},
              {value: (gdata1 + gdata2 + gdata3), name:'',tooltip:{formatter:function(a){return ""}}}
            ]
            const bdata = [
              {value: bdata1, name:'<16'},
              {value: bdata2, name:'16~60'},
              {value: bdata3, name:'>60'},
              {value: (bdata1 + bdata2 + bdata3), name:'',tooltip:{formatter:function(a){return ""}}}
            ]
            this.personListCharts('personMembersB', bdata, '男')
            this.personListCharts('personMembersG', gdata, '女')
            /**重点防护 */
            // KeySerStatistics
            const KeySerStatistics = res.KeySerStatistics
            let drug = 0 //吸毒 4
            let communityCorrection = 0 //社区矫正
            let KeyYoungsters = 0 //重点青少年
            let hiv = 0 //艾滋 5
            let fullReleaseOfPrisoners = 0//刑满释放人员 1
            KeySerStatistics.forEach((v, i) => {
              if(v.parameterKey === 4) {
                this.drug = v.peopleNum
              }
              if(v.parameterKey === 1) {
                this.fullReleaseOfPrisoners = v.peopleNum
              }
              if(v.parameterKey === 5) {
                this.hiv = v.peopleNum
              }
            })
          } else {
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
      },
      blueHalfCount (dom, name, num) {
        const barcharts = echarts.init(this.$refs[dom])
        barcharts.setOption({
          series: [
          {
            name: name,
            type: 'pie',
            radius: ['90%', '100%'],
            center: ['50%', '50%'],
            startAngle: 225,
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00a2ff'
            }, {
              offset: 1,
              color: '#70ffac'
            }]), "transparent"],
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: 75,
              name: name,
              label: {
                normal: {
                  formatter: name,
                  textStyle: {
                    color: '#fff',
                    fontSize: 12
                  }
                }
              }
            }, {
              value: 25,
              name: '%',
              label: {
                normal: {
                  formatter: '\n' + num,
                  textStyle: {
                    color: '#007ac6',
                    fontSize: 16
                  }
                }
              }
            },
            {
              value: 0,
              name: '%',
              label: {
                normal: {
                  formatter: '人',
                  textStyle: {
                    color: '#ccc',
                    fontSize: 12
                  }
                }
              }
            }]
          }]
        })
      },
      violetHalfCount (dom, name, num) {
        const barcharts = echarts.init(this.$refs[dom])
        barcharts.setOption({
          series: [
          {
            name: name,
            type: 'pie',
            radius: ['90%', '100%'],
            center: ['50%', '50%'],
            startAngle: 225,
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#f125ff'
            }, {
              offset: 1,
              color: '#2dcbff'
            }]), "transparent"],
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: 75,
              name: name,
              label: {
                normal: {
                  formatter: name,
                  textStyle: {
                    color: '#fff',
                    fontSize: 12
                  }
                }
              }
            }, {
              value: 25,
              name: '%',
              label: {
                normal: {
                  formatter: '\n' + num,
                  textStyle: {
                    color: '#f125ff',
                    fontSize: 16
                  }
                }
              }
            },
            {
              value: 0,
              name: '%',
              label: {
                normal: {
                  formatter: '人',
                  textStyle: {
                    color: '#fff',
                    fontSize: 12
                  }
                }
              }
            }]
          }]
        })
      },
      doBarChart(xData, y1name, y1Data, y2name, y2Data) {
        let chart = echarts.init(this.$refs.asideLastChart);
        chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              },
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          grid: {
            show: true,
            top: 5,
            left: '5%',
            right: '5%',
            bottom: '30%',
            borderWidth: 0
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              axisLabel: {
                color: '#aaa',
                margin: 5
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
              },
              data: xData
            }
          ],
          yAxis: [
            {
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              splitNumber: 4,
              splitLine: {
                show: true,
                lineStyle: {
                  color:'#fff',
                  opacity: 0.05
                }
              },
              type: 'value'
            }
          ],
          series: [
            {
              name: y1name,
              type: 'bar',
              barGap: 0,
              barWidth: 12,
              data: y1Data
            },
            {
              name: y2name,
              type: 'bar',
              barWidth: 12,
              data: y2Data
            },
          ],
          animationDuration: 2000,
          color: ['#00e4ff' , '#0078ff']
        })
      },
      personListCharts(dom, data, sex) {
        const personcharts = echarts.init(this.$refs[dom])
        personcharts.setOption({
          title: {
            text: sex,
            textStyle:{ //设置主标题风格
              color: '#fff',//设置主标题字体颜色
              fontWeight: 'normal',
              fontSize: 15
            }
          },
          tooltip: {
          trigger: 'item',
          formatter:function(a){
              return (
                a['data']['name']+":"+a['data']['value']+"("+a['percent']*2+"%)"
              )
            },
            position: ['10%', '50%']
          },
          color: ["#002aff","#09b6f6","#03fffc", "transparent"],
          startAngle: 180,
          series: [
            {
              name:'',
              type:'pie',
              radius: ['50%', '90%'],
              avoidLabelOverlap: false,
              startAngle: 180,
              center:["50%","70%"],
              itemStyle:{ 
                normal:{ 
                  label:{ 
                    show: false, 
                    formatter: '{b} : {c} ({d}%)' 
                  }, 
                  labelLine :{show:false}
                } 
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: data
            }
          ]
        })
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
    left: 2%;
    width: 23%;
    min-width: 422px;
    box-shadow: 0 0 3px 0px rgba(0,0,0,0.6);
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
  .asidePersonInfo{
    color:#fff;
    padding-left: 4.7%;
    font-size: 16px;
    position: relative;
    margin-top: 0.2rem;
    height: 0.15rem;
    line-height: 0.2rem;
  }
  .foucseCvs {
    height: 1rem;
    width: 100%;
  }
  .asidePersonInfo span{
    position: absolute;
    top:0;
    right:4.7%;
    font-size: 14px;
  }
  .asideLineChart{
    height: 2rem;
  }
  .personChart {
    height: 1rem;
  }
  .asidePersonInfo .asideIcon{
    vertical-align: -2px;
  }
  .asideChartUl, .asideChartUlLi{
    position: absolute;
    font-size: 12px;
    top:0;
    right:4.7%;
    display: flex;
    color:#ddd;
  }
  .asideChartUl li, .asideChartUlLi li{
    padding-left: 36px;
    position: relative;
  }
  .asideChartUl li:before, .asideChartUlLi li:before {
    content: '';
    position: absolute;
    height:2px;
    width:20px;
    left: 8px;
    top: 50%;
    margin-top: -1px;
    background: red;
  }
  .asideChartUl li:first-child:before{
    background: linear-gradient(to right, #00a2ff, #03fdfc)
  }
  .asideChartUl li:last-child:before{
    background: #fff;
  }
  .asideChartUlLi li:nth-child(1):before {
    background: linear-gradient(to right, #002aff, #002aff)
  }
  .asideChartUlLi li:nth-child(2):before {
    background: linear-gradient(to right, #09b6f6, #09b6f6)
  }
  .asideChartUlLi li:nth-child(3):before {
    background: linear-gradient(to right, #c3ffec, #c3ffec)
  }

  .asideLine {
    position: relative;
    margin-top: 0.2rem;
    width: 100%;
    height:1rem;
  }
  .asideLine-mar5 {
    padding-left: 5%;
  }
  .asideLineTitle{
    height:0.3rem;
    line-height:0.3rem;
    left: 4.7%;
    position: absolute;
    top:0.23rem;
    font-size: 12px;
    color:#ccc;
  }
  .asideLineTitle .asideIcon{
    vertical-align: -3px;
    margin-right: 4px;
  }
  .asideLineUl{
    display: flex;
  }
  .asideLineUl li{
    width:15%;
    height:1rem;
    text-align: center;
    font-size: 12px;
  }
  .asideLineUl li div:first-child{
    height:0.8rem;
    line-height: 0.8rem;
    color:#fff;
    font-size: 16px;
  }
  .asideLineUl li div:last-child{
    height:0.2rem;
    line-height: 0.2rem;
    color:#ddd;
  }
  .asideLineProtect {
    position: relative;
    margin-top: 0.5rem;
    width: 100%;
    height:1rem;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .asideLineProtect .el-row {
    padding: 0;
    margin: 0;
  }
  .asideCircle{
    position: absolute;
    top:0.6rem;
    left:0.5rem;
    width:1.2rem;
  }
  .asideLastChart{
    position: absolute;
    width:100%;
    height:1.5rem;
    top:0.6rem;
    left:0;
  }
  .protect {
    padding-left: 0;
    padding-right: 0;
    text-align: left;
  }
  .protect>div {
    padding-top: 0.2rem;
    width: 100%;
  }
</style>
