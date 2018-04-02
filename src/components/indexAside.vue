<template>
  <div class="indexAsideBox">
    <div class="asidePersonInfo">
      进出人口统计
    </div>
    <div class="asidePersonInfo" style="font-size: 14px;">
      <ul class="asideChartUl">
        <li>进入:{{ personTotal }}人</li>
        <li>离开:{{ personTotal }}人</li>
      </ul>
    </div>
    <div ref="asideLine" class="asideLineChart">
    </div>
    <div class="asidePersonInfo">
      小区基础信息
    </div>
    <div class="asideLine">
      <div class="asideLineTitle2">
        <img src="../assets/img/icon2.png" class="asideIcon">
        持卡人口
      </div>
      <el-row class="asideLineUl">
        <el-col :span="10">
          <div ref="personTotal" class="personTotal">
          </div>
        </el-col>
        <el-col :span="7">
          <div class="cvs" ref="cvs1">
          </div>
          <!-- <div>户籍</div> -->
        </el-col>
        <el-col :span="7">
          <div class="cvs" ref="cvs2"></div>
          <!-- <div>流动</div> -->
        </el-col>
      </el-row>
    </div>
    <div class="asideLine">
      <div class="asideLineTitle2">
        <img src="../assets/img/icon3.png" class="asideIcon">
        实有房屋
      </div>
      <el-row class="asideLineUl">
        <el-col :span="10">
          <div class="personTotal" ref="houseTotal"></div>
          <!-- <div>总数</div> -->
        </el-col>
        <el-col :span="5">
          <div class="cvs" ref="cvs3"></div>
          <!-- <div>自住房</div> -->
        </el-col>
        <el-col :span="4">
          <div class="cvs" ref="cvs4"></div>
          <!-- <div>租住房</div> -->
        </el-col>
        <el-col :span="5">
          <div class="cvs" ref="cvs5"></div>
          <!-- <div>空置房</div> -->
        </el-col>
      </el-row>
    </div>
    <div class="asideLine" style="height: 1.9rem; margin-bottom: -0.2rem;" >
      <div class="asideLineTitle">
        <img src="../assets/img/icon5.png" class="asideIcon">
        <div class="eqTotal">{{ eqTotal }}</div>
        设备统计
      </div>
      <img src="../assets/img/circle2.png" class="asideCircle">
      <ul class="asideLineUl3">
        <li><span>人脸卡口</span>{{ faceEqCount }}</li>
        <li><span>摄像机</span>{{ canmeraEqCount }}</li>
        <li><span>车辆卡口</span>{{ carEqCount }}</li>
        <li><span>wifi采集器</span>{{ wifiEqCount }}</li>
        <!-- <li><span>感知设备</span>{{ fellEqCount }}</li> -->
      </ul>
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
        houseTotal: 0, //房屋总数
        totalNum: 0,  //人口总数
        faceEqCount: 0,
        fellEqCount: 0,
        canmeraEqCount: 0,
        carEqCount: 0,
        wifiEqCount: 0,
        eqTotal: 0,
        personTotal: 0,
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
        this.getData()
      })
    },
    created() {
    },
    methods: {
      getData() {
        // 门禁类型为小区门禁统计、楼栋门禁统计数据数量
        // axios({
        //   method: 'post',
        //   url: this.url + '/statisticsPush/pushAccessLogNumByType'
        // }).then(response => {
        //   if(response.data.code === 200) {
        //     const res = response.data.data
        //   } else {
        //     this.$message({
        //       message: response.data.message,
        //       type: 'error'
        //     })
        //   }
        // })
        // 房屋
        axios({
          method: 'post',
          url: this.url + '/statisticsPush/pushHomeStatistics'
        }).then(response => {
          if(response.data.code === 200) {
            const res = response.data.data
            // this.houseTotal = res.totalNum
            this.houseTotalCount(res.totalNum)
            const houseStatus = res.houseStatus
            let own
            let other
            houseStatus.forEach((v, i) => {
              if(v.category && v.category === '1') {
                own = v.roomNum
              } else {
                own = 0
              }
              if(v.category && v.category === '2') {
                other = v.roomNum
              } else {
                other = 0
              }
            });
            const thirdParty = res.totalNum - own - other
            this.doCircle('cvs3', own, parseInt(own / res.totalNum * 100), '自住房');
            this.doCircle('cvs4', other, parseInt(other / res.totalNum * 100), '租住房');
            this.doCircle('cvs5', thirdParty, parseInt(thirdParty / res.totalNum * 100), '空置房');
          } else {
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
        // 人口
        axios({
          method: 'post',
          url: this.url + '/statisticsPush/pushPopStatistics'
        }).then(response => {
          if(response.data.code === 200) {
            const res = response.data.data
            this.totalCount(res.totalNum)
            const householdPop = res.popTypeStatistics.householdPop
            this.doCircle('cvs1', householdPop, parseInt(householdPop / res.totalNum * 100), '户籍');
            this.doCircle('cvs2', (res.totalNum - householdPop), parseInt((res.totalNum - householdPop) / res.totalNum * 100), '流动');
          } else {
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
        // 设备
        axios({
          method: 'post',
          url: this.url + '/statisticsPush/pushEquipmentStatistics'
        }).then(response => {
          if(response.data.code === 200) {
            const res = response.data.data
            let faceEqCount = 0
            let fellEqCount = 0
            let canmeraEqCount = 0
            let carEqCount = 0
            let wifiEqCount = 0
            res.equipment.forEach((v, i) => {
              if(v.typeCode === '001') {
                faceEqCount = v.equipmentNum
              }
              // if(v.typeCode === '005') {
              //   fellEqCount = v.equipmentNum
              // }
              if(v.typeCode === '002') {
                canmeraEqCount = v.equipmentNum
              }
              if(v.typeCode === '003') {
                carEqCount = v.equipmentNum
              }
              if(v.typeCode === '004') {
                wifiEqCount = v.equipmentNum
              }
            })
            this.faceEqCount = faceEqCount
            this.fellEqCount = fellEqCount
            this.canmeraEqCount = canmeraEqCount
            this.carEqCount = carEqCount
            this.wifiEqCount = wifiEqCount
            this.eqTotal = faceEqCount + canmeraEqCount + carEqCount +wifiEqCount //+ fellEqCount
          } else {
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
        const xx = ['00：00', '00：10', '00：20', '00：30', '00：40', '00：50']
        const yy = {
          y1: [0, 0, 0, 0, 0, 0],
          y2: [0, 0, 0, 0, 0, 0]
        }
        this.doLineChart(xx, yy)
      },
      doLineChart (x, y) {
        const chart = echarts.init(this.$refs.asideLine);
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
            bottom: '20%',
            borderWidth: 0
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
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
              splitLine: {
                show: true,
                lineStyle: {
                  color:'#fff',
                  opacity: 0.1
                }
              },
              data: x
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
              splitLine: {
                show: false,
              },
              type: 'value'
            }
          ],
          series: [
            {
              name: '进入',
              type: 'line',
              smooth: true,
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                    offset: 0, color: '#00a2ff' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#03fdfc' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                width: 2,
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(7, 105, 160, 0.5)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(7, 105, 160, 0)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              },
              symbol: 'none',
              data: y.y1
            },
            {
              name: '离开',
              type: 'line',
              smooth: true,
              lineStyle: {
                color: '#fff',
                width: 2,
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(255, 255, 255, 0.2)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              },
              symbol: 'none',
              data: y.y2
            },
          ],
          animationDuration: 2000,
          color: ['#03fdfc' , '#fff']
        })
      },
      doCircle (name, number, percent, typeInfo) {
        let cvs = echarts.init(this.$refs[name])
        cvs.setOption({
          title: {
            text: number + '\n' + typeInfo,
            x: 'center',
            y: 'center',
            textStyle: {
              fontWeight: 'normal',
              color: '#0580f2',
              fontSize: '12'
            }
          },
          color: ['rgba(229, 229, 229, 1)'], 
          series: [{
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '55%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false, 
            data: [{
              value: percent,
              name: '',
              itemStyle: {
                normal: {
                  color: { // 完成的圆环的颜色
                    colorStops: [{
                      offset: 0,
                      color: '#03FFFC' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#00A2FF' // 100% 处的颜色
                    }]
                  },
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                } 
              }
            }, {
              name: '',
              value: (100 - percent)
            }]
          }]
        })
      },
      doBarChart (x, y) {
        let chart = echarts.init(this.$refs.asideLastChart)
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
              data: x
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
              name: '当月警情',
              type: 'bar',
              barGap: 0,
              barWidth: 12,
              data: y.y1
            },
            {
              name: '同比警情',
              type: 'bar',
              barWidth: 12,
              data: y.y2
            },
          ],
          animationDuration: 2000,
          color: ['#00e4ff' , '#0078ff']
        })
      },
      totalCount (num) {
        const barcharts = echarts.init(this.$refs.personTotal)
        barcharts.setOption({
          series: [
          {
            name: '持卡人口',
            type: 'pie',
            radius: ['75%', '90%'],
            center: ['60%', '60%'],
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
              name: '持卡人口',
              label: {
                normal: {
                  formatter: '持卡人口',
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
      houseTotalCount (num) {
        const barcharts = echarts.init(this.$refs.houseTotal)
        barcharts.setOption({
          series: [
          {
            name: ' 实有房屋',
            type: 'pie',
            radius: ['75%', '90%'],
            center: ['60%', '60%'],
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
              name: '实有房屋',
              label: {
                normal: {
                  formatter: '实有房屋',
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
                  formatter: '房',
                  textStyle: {
                    color: '#fff',
                    fontSize: 12
                  }
                }
              }
            }]
          }]
        })
      }
    }
  }
</script>

<style scoped>
  .eqTotal {
    position: absolute;
    z-index: 9999;
    left: 0.8rem;
    top: 1rem;
  }
  .indexAsideBox{
    background: rgba(14, 20, 30, 0.9);
    position: absolute;
    top: 93px;
    bottom: 23px;
    left: 42px;
    /* width: 23%; */
    min-width: 423px;
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
    font-size: 18px;
    position: relative;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    height: 0.15rem;
    line-height: 0.2rem;
  }
  .asidePersonInfo span{
    position: absolute;
    top:0;
    right:4.7%;
    font-size: 14px;
  }
  .asideLineChart{
    height: 1.4rem;
  }
  .asidePersonInfo .asideIcon{
    vertical-align: -2px;
  }
  .asideChartUl{
    position: absolute;
    font-size: 12px;
    top:0;
    right:4.7%;
    display: flex;
    color:#ddd;
  }
  .asideChartUl li{
    padding-left: 36px;
    position: relative;
  }
  .asideChartUl li:before{
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
  .asideLine{
    position: relative;
    /* padding-left: 25%; */
    height:1.8rem;
  }
  .personTotal, .cvs {
    height:1.4rem;
    width: 100%;
  }
  .asideLineTitle{
    height:0.3rem;
    line-height:0.3rem;
    left: 4.7%;
    position: absolute;
    top:0.23rem;
    font-size: 14px;
    color:#ccc;
  }
  .asideLineTitle2 {
    height:0.3rem;
    line-height:0.3rem;
    left: 4.7%;
    top:0.23rem;
    font-size: 14px;
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
    width:0.8rem;
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
  .asideLineUl2{
    padding-top: 0.18rem;
    padding-left: 8px;
  }
  .asideLineUl2 li{
    font-size: 12px;
    color:#fff;
    display: flex;
    align-items: center;
    height:0.4rem;  
  }
  .asideLineUl2 li span:first-child{
    margin-right: 16px;
    display: block;
    width:0.6rem;
    min-width: 50px;
    text-align: center;
  }
  .asideLineUl2 li div{
    height:2px;
    /* background: #666; */
    width:1.5rem;
    position: relative;
    border-radius: 1px;
  }
  .asideLineUl2 li div div{
    left:0;
    position: absolute;
    height:4px;
    top:-1px;
    width:100%;
    border-radius: 2px;
    /* background: linear-gradient(to right, #00a2ff, #03fdfc); */
  }
  .asideLineUl2 li span:last-child{
    margin-left: 16px;
    font-size: 14px;
  }
  .asideCircle{
    position: absolute;
    top:0.6rem;
    left:0.5rem;
    width:1.2rem;
  }
  .asideLineUl3{
    width: 2rem;
    position: absolute;
    top:0.6rem;
    left:2.3rem;
    font-size: 12px;
  }
  .asideLineUl3 li{
    padding-left: 0.3rem;
    height:0.24rem;
    display: flex;
    color: #fff;
    align-items: center;
    position: relative;
  }
  .asideLineUl3 li span{
    width:1.1rem;
    display: block;
  }
  .asideLineUl3 li:before{
    content: '';
    position: absolute;
    top: 0.08rem;
    left: 0;
    width:0.1rem;
    height:0.1rem;
    border-radius: 0.05rem;
  }
  .asideLineUl3 li:nth-child(1):before{
    background: #07ffc2;
  }
  .asideLineUl3 li:nth-child(2):before{
    background: #00ffe4;
  }
  .asideLineUl3 li:nth-child(3):before{
    background: #09b6f6;
  }
  .asideLineUl3 li:nth-child(4):before{
    background: #033fec;
  }
  .asideLineUl3 li:nth-child(5):before{
    background: #4606ff;
  }
  .asideLine .asideChartUl{
    top:0.33rem;
  }
  .asideLine .asideChartUl li:first-child:before{
    background: #00e4ff;
  }
  .asideLine .asideChartUl li:last-child:before{
    background: #0078ff;
  }
  .asideLastChart{
    position: absolute;
    width:100%;
    height:1.5rem;
    top:0.6rem;
    left:0;
  }
</style>
