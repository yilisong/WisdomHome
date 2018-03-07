<template lang="html">
  <div class="areaMapBackground">
    <div class="left">
      <div class="areaTitle left1">
        <div>
          <span class="years">{{years}}<br/>
            <span class="week">{{week}}</span>
          </span>
          <span class="chinaWeek">周 <br/> {{chinaWeek}}</span>
          <span class="hours">{{hours}}</span>
        </div>
      </div>
      <div class="left2 eventTrend">
        <div id="trendEvent"></div>
      </div>
      <div class="left3 downTime">
        <div class="imgPostion">
          <img src="./assets/img/Shape.png">
        </div>
        <div class="downTimes">
          <span class="downTimesValue">{{monitorNumbe}}</span>
          <span class="downTimesUnit">次</span>
        </div>
      </div>
      <div class="left4 sensitiveWords">
        <div id="sensitiveWordsChart"></div>
      </div>
      <div class="left5 riskRanking">
        <div>
          <img src="./assets/img/fxpm.png">
        </div>
        <div class="riskRankingTable">
          <table>
              <thead>
                <tr>
                  <td><span>漏洞名</span></td>
                  <td><span>出现次数</span></td>
                  <td><span>影响页面</span></td>
                </tr>
              </thead>
              <tbody id="riskRankingTable">
                <tr v-for="(item, index) in riskRanking">
                    <td><span>{{ item.loophole_type }}</span></td>
                    <td><span>{{ item.count_number }}</span></td>
                    <td><span>{{ item.influence_page }}</span></td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="areaMap title">
        <div id="areaMap"></div>
    </div>
    <div class="right">
        <div class="right1">
            <div class="chartsBarWebsite" id="abnormalWebsite"></div>
            <div class="chartsBar" id="highRiskOf"></div>
            <div class="chartsBar" id="tamperingWith"></div>
            <div class="chartsBar" id="sensitiveWords"></div>
            <div class="chartsBar" id="hijackingOfDNS"></div>
            <div class="chartsBar" id="outage"></div>
        </div>
        <div class="right1_title">
            <div class="chartsBarWebsite_title">异常网站</div>
            <div class="chartsBar_title">高风险占比</div>
            <div class="chartsBar_title">篡改</div>
            <div class="chartsBar_title">敏感词</div>
            <div class="chartsBar_title">DNS劫持</div>
            <div class="chartsBar_title">宕机</div>
        </div>
        <div class="right2">
            <div>
                <img src="./assets/img/zxcg.png">
            </div>
            <div class="tampering">
                <table>
                    <thead>
                        <tr>
                          <td><span>域名URL（资源）</span></td>
                          <td><span>时间</span></td>
                        </tr>
                    </thead>
                    <tbody id="tampering">
                       <tr v-for="(item, index) in tamperTop">
                         <td>
                           <el-tooltip placement="left" effect="light">
                             <div slot="content">{{ item.tamper_url }}</div>
                             <span>{{ item.tamper_url }}</span>
                           </el-tooltip>
                         </td>
                         <td><span>{{ item.tamper_time }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="right3">
            <div>
                <img src="./assets/img/ldfb.png">
            </div>
            <div class="distribution">
                <table>
                    <thead>
                        <tr>
                          <td><span>域名</span></td>
                          <td><span><span class="high">●</span>高</span></td>
                          <td><span><span class="middle">●</span>中</span></td>
                          <td><span><span class="low">●</span>低</span></td>
                        </tr>
                    </thead>
                    <tbody id="distribution">
                        <tr v-for="(item, index) in loopholeCount">
                            <td><span>{{ item.domain }}</span></td>
                            <td><span>{{ item.level_high }}</span></td>
                            <td><span>{{ item.level_middle }}</span></td>
                            <td><span>{{ item.level_low }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="right4">
            <div class="tab_banner">
                <div class="tab_title loophole active" id="loophole_banner" @click="tabPageChange('loophole')">漏洞<span>({{taskTotalList[5]}})</span></div>
                <div class="tab_title tamper" id="tamper_banner" @click="tabPageChange('tamper')">篡改<span>({{taskTotalList[0]}})</span></div>
                <div class="tab_title" id="antistop_banner" @click="tabPageChange('antistop')">关键词<span>({{taskTotalList[2]}})</span></div>
                <div class="tab_title sensitiveWord" id="sensitiveWord_banner" @click="tabPageChange('sensitiveWord')">敏感词<span>({{taskTotalList[1]}})</span></div>
                <div class="tab_title abnormalStatusCode" id="abnormalStatusCode_banner" @click="tabPageChange('abnormalStatusCode')">异常状态码<span>({{taskTotalList[3]}})</span></div>
            </div>
            <div class="tab_content">
                <div class="tabContent" id="loophole">
                    <div class="loophole_div">
                        <div class="loopholeDiv">
                            <div class="active" @click="mainWords($event, 0, 'loophole')">
                                <img src="./assets/img/all.png"> 全部漏洞</div>
                            <div @click="mainWords($event, 3, 'loophole')">
                                <img src="./assets/img/high.png"> 高危漏洞</div>
                            <div @click="mainWords($event, 2, 'loophole')">
                                <img src="./assets/img/middle.png"> 中危漏洞</div>
                            <div @click="mainWords($event, 1, 'loophole')">
                                <img src="./assets/img/low.png"> 低危漏洞</div>
                        </div>
                    </div>
                    <div class="loopholeTable_div">
                        <div class="riskRankingTable loopholeTable">
                          <table>
                              <thead>
                                <tr>
                                  <td><span>域名</span></td>
                                  <td><span>风险名称</span></td>
                                  <td><span>数量</span></td>
                                </tr>
                              </thead>
                              <tbody id="loopholeTable">
                                <tr v-for="(item, index) in LoopholeData" @click="showLoopholeDetails($event, item.id)">
                                    <td><span class="wap wapDmain">{{ item.scan_domain }}</span></td>
                                    <td>
                                        <span v-if="item.level === '1'" class="low">●</span>
                                        <span v-else-if="item.level === '2'" class="middle">●</span>
                                        <span v-else class="high">●</span>
                                        <span class="wap">{{ item.loophole_name }}</span>
                                    </td>
                                    <td>{{ item.number }}</td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="loophole_detials">
                        <div class="polygon">详情</div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">风险名称：</div>
                            <div class="detailsContent">
                                <span>{{ loopholeListDataDetails.loophole_name }}</span>
                            </div>
                        </div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">风险等级：</div>
                            <div class="detailsContent" v-if="loopholeListDataDetails.level === '1'">
                                <span>低</span>
                                <div class="lineGradient lineLow"></div>
                            </div>
                            <div class="detailsContent" v-else-if="loopholeListDataDetails.level === '2'">
                                <span>中</span>
                                <div class="lineGradient lineMiddle"></div>
                            </div>
                            <div class="detailsContent" v-else-if="loopholeListDataDetails.level === '3'">
                                <span>高</span>
                                <div class="lineGradient lineHigh"></div>
                            </div>
                            <div v-else></div>
                        </div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">影响URL：</div>
                            <div class="detailsContent detailsUrl">
                                <div v-for="(item, index) in loopholeListDataDetails.influence_url">{{ item }}</div>
                            </div>
                        </div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">风险描述：</div>
                            <div class="detailsContent">
                                <div>{{ loopholeListDataDetails.loophole_desc }}</div>
                            </div>
                        </div>
                        <div class="loophole_detials_content">
                            <div class="detailsTitle">解决方案：</div>
                            <div class="detailsContent">
                                <div v-if="loopholeListDataDetails.solution !== ''">{{ loopholeListDataDetails.solution }}</div>
                                <div v-else>暂无数据</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContent" id="tamper">
                    <div class="tamperTable_div">
                        <div class="riskRankingTable tamperTable">
                          <table>
                              <thead>
                                <tr>
                                  <td><span>域名</span></td>
                                  <td><span>数量</span></td>
                                </tr>
                              </thead>
                              <tbody id="tamperTable">
                                <tr @click="showLoopholeDetails($event, item.id)" v-for="(item, index) in tabTamper">
                                    <td><span>{{ item.domain }}</span></td>
                                    <td><span>{{ item.number }}</span></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="tamper_detials">
                        <div class="polygon">详情</div>
                        <!-- one -->
                        <div v-for="(item, index) in tamperDetails">
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">影响URL：</div>
                                <div class="detailsContent detailsUrl">
                                    <div>{{item.influence_url}}</div>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">疑似篡改数量：</div>
                                <div class="detailsContent">
                                    <span>{{item.number}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">发现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.first_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">最近出现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.last_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">快照查看：</div>
                                <div class="phoneHeight detailsContent">
                                    <div class="phone">
                                        <div class="swiper-container">
                                            <div class="swiper-wrapper">
                                                <div v-for="(item, index) in item.risk_image_url" class="swiper-slide">
                                                    <a :href="item" target="_blank">
                                                        <img :src="item">
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="swiper-button-next"></div>
                                            <div class="swiper-button-prev"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContent" id="antistop">
                    <div class="antistop_div">
                        <div class="antistopDiv">
                            <div class="active" @click="mainWords($event, '', 'antistop')">所有关键词</div>
                            <div v-for="(item, index) in bannerAntistop" @click="mainWords($event, item.content, 'antistop')">{{ item.content }}</div>
                        </div>
                    </div>
                    <div class="antistopTable_div">
                        <div class="riskRankingTable antistopTable">
                          <table>
                              <thead>
                                <tr>
                                  <td><span>域名</span></td>
                                  <td><span>关键词</span></td>
                                  <td><span>数量</span></td>
                                </tr>
                              </thead>
                              <tbody id="antistopTable">
                                <tr @click="showLoopholeDetails($event, item.id)" v-for="(item, index) in tabAntistop">
                                    <td><span>{{ item.domain }}</span></td>
                                    <td><span>{{ item.content }}</span></td>
                                    <td><span>{{ item.number }}</span></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="antistop_detials">
                        <div class="polygon">详情</div>
                        <!-- one -->
                        <div v-for="(item, index) in antistopDetails">
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">影响URL：</div>
                                <div class="detailsContent detailsUrl">
                                    <div>{{item.influence_url}}</div>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">疑似篡改数量：</div>
                                <div class="detailsContent">
                                    <span>{{item.number}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">发现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.first_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">最近出现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.last_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">快照查看：</div>
                                <div class="phoneHeight detailsContent">
                                    <div class="phone">
                                        <div class="swiper-container">
                                            <div class="swiper-wrapper">
                                                <div v-for="(item, index) in item.risk_image_url" class="swiper-slide">
                                                    <a :href="item" target="_blank">
                                                        <img :src="item">
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="swiper-button-next"></div>
                                            <div class="swiper-button-prev"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContent" id="sensitiveWord">
                    <div class="antistop_div">
                        <div class="antistopDiv">
                            <div class="active" @click="mainWords($event, '', 'sensitiveWord')">所有敏感词</div>
                            <div v-for="(item, index) in bannerSensitiveWord" @click="mainWords($event, item.content, 'sensitiveWord')">{{ item.content }}</div>
                        </div>
                    </div>
                    <div class="antistopTable_div">
                        <div class="riskRankingTable antistopTable">
                          <table>
                              <thead>
                                <tr>
                                  <td><span>域名</span></td>
                                  <td><span>敏感词</span></td>
                                  <td><span>数量</span></td>
                                </tr>
                              </thead>
                              <tbody id="sensitiveWordTable">
                                <tr @click="showLoopholeDetails($event, item.id)" v-for="(item, index) in tabSensitiveWord">
                                    <td><span>{{ item.domain}}</span></td>
                                    <td><span>{{ item.content }}</span></td>
                                    <td><span>{{ item.number }}</span></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="antistop_detials">
                        <div class="polygon">详情</div>
                        <!-- one -->
                        <div v-for="(item, index) in sensitiveWordDetails">
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">影响URL：</div>
                                <div class="detailsContent detailsUrl">
                                    <div>{{item.influence_url}}</div>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">疑似篡改数量：</div>
                                <div class="detailsContent">
                                    <span>{{item.number}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">发现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.first_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">最近出现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.last_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">快照查看：</div>
                                <div class="phoneHeight detailsContent">
                                    <div class="phone">
                                        <div class="swiper-container">
                                            <div class="swiper-wrapper">
                                                <div v-for="(item, index) in item.risk_image_url" class="swiper-slide">
                                                    <a :href="item" target="_blank">
                                                        <img :src="item">
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="swiper-button-next"></div>
                                            <div class="swiper-button-prev"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContent" id="abnormalStatusCode">
                    <div class="antistop_div">
                        <div class="antistopDiv">
                            <div class="active" @click="mainWords($event, '', 'abnormalStatusCode')">所有</div>
                            <div v-for="(item, index) in bannerAbnormalStatusCode" @click="mainWords($event, item.content, 'abnormalStatusCode')">{{ item.content }}</div>
                        </div>
                    </div>
                    <div class="antistopTable_div">
                        <div class="riskRankingTable antistopTable">
                          <table>
                              <thead>
                                <tr>
                                  <td>域名</td>
                                  <td>异常状态码</td>
                                  <td>数量</td>
                                </tr>
                              </thead>
                              <tbody id="abnormalStatusCodeTable">
                                <tr @click="showLoopholeDetails($event, item.id)" v-for="(item, index) in tabAbnormalStatusCode">
                                    <td><span>{{ item.domain}}</span></td>
                                    <td><span>{{ item.content }}</span></td>
                                    <td><span>{{ item.number }}</span></td>
                                </tr>
                              </tbody>
                          </table>
                        </div>
                    </div>
                    <div class="antistop_detials">
                        <div class="polygon">详情</div>
                        <!-- one -->
                        <div v-for="(item, index) in abnormalStatusCodeDetails">
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">影响URL：</div>
                                <div class="detailsContent detailsUrl">
                                    <div>{{item.influence_url}}</div>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">出现次数：</div>
                                <div class="detailsContent">
                                    <span>{{item.number}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">发现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.first_time}}</span>
                                </div>
                            </div>
                            <div class="antistop_detials_content">
                                <div class="detailsTitle">最近出现时间：</div>
                                <div class="detailsContent">
                                    <span>{{item.last_time}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mimicryBox" id="mimicryBox">
        <div class="mimicryBox_body">
            <div class="cursor closeMimicryBox" @click="closeMimicryBox"><img src="./assets/img/close.png"></div>
            <div>
                <div class="titleOfWarning">
                    <div class="titleOfWarning1">
                        <span class="warningInfo">您的网站发现 {{scanLog.name}}
                        </span>
                        <br>
                        <span class="warningDomain">{{scanLog.domain}}</span>
                    </div>
                    <div class="titleOfWarning2">
                        <span class="beforeTime">{{beforeTime}}</span></span>
                        <br>
                        <span class="timeOfOccurrence">{{scanLog.updated_at}}</span>
                    </div>
                </div>
                <div class="warningDiv">
                    <div>
                        <div class="warningTitle">网站名称:</div>
                        <div class="warningDetails">
                          {{scanLog.website_name  ? scanLog.website_name : '暂无'}}
                        </div>
                    </div>
                    <div>
                        <div class="warningTitle">告警内容:</div>
                        <div class="warningDetails">
                          {{scanLog.content  ? scanLog.content : '暂无'}}
                        </div>
                    </div>
                    <div>
                        <div class="warningTitle">影响URL:</div>
                        <div class="warningDetails">
                            <div v-for="(item, index) in scanLog.influence_url">{{item}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'
import ConversionTime from 'common/utils/conversionTime'
import EchartsLine from 'echarts/lib/chart/line'
import EchartsBar from 'echarts/lib/chart/bar'
import areaJson from 'common/json/china.json'
import EchartsChinaMap from 'echarts/map/js/china'
import Swiper from 'swiper'
import Perception from './resource/perception'

export default {
  components: {
    Echarts,
    ConversionTime
  },
  data() {
    return {
        /*弹框*/
        beforeTime: '当前',
        /**/
        globalDistributionSeries: [],
        years: '',
        hours: '',
        week: '',
        chinaWeek: '',
        sensitiveWordsChartSeries: [],
        abnormalWebsiteSeries: [],
        tabStatus: 1,
        tabPageId: 'scan',
        riskRanking: [],
        loopholeCount: [],
        LoopholeData: [],
        loopholeListDataDetails: {},
        chinaData: [],
        sevensjqsData: {
            time: [],
            value: []
        },
        taskTotalList:[],
        monitorNumbe: '0',
        featureCount: [],
        tamperTop: [{ tamper_url: '暂无数据', tamper_time: '0' }],
        tabTamper: [],
        tabAntistop: [],
        tabSensitiveWord: [],
        tabAbnormalStatusCode: [],
        bannerAntistop: [],
        bannerSensitiveWord: [],
        bannerAbnormalStatusCode: [],
        tamperDetails: [{
            first_time: '暂无信息',
            last_time: '暂无信息',
            number: '0',
            influence_url: '暂无信息',
            risk_image_url: []
        }],
        antistopDetails: [{
            first_time: '暂无信息',
            last_time: '暂无信息',
            number: '0',
            influence_url: '暂无信息',
            risk_image_url: []
        }],
        sensitiveWordDetails: [{
            first_time: '暂无信息',
            last_time: '暂无信息',
            number: '0',
            influence_url: '暂无信息',
            risk_image_url: []
        }],
        abnormalStatusCodeDetails: [{
            first_time: '暂无信息',
            last_time: '暂无信息',
            number: '0',
            influence_url: '暂无信息',
            risk_image_url: []
        }],
        /*弹框信息*/
        logStatus: '1',
        scanLog: {},
        tamperLog: {},
        sensitiveWordLog: {},
        keywordLog: {},
        abnormalStatusCodeLog: {}
    }
  },
  created() {
    this.clickButton()
    this.getnewtasknoticeinfo()
  },
  watch: {
  },
  mounted() {
    this.weekCheck()
    this.timeR()
    this.swiperRun()
    document.getElementById('loophole').style.display = 'block'
  },
  methods: {
    getnewtasknoticeinfo() {
      const scheme = 'https:' === document.location.protocol ? 'wss://' : 'ws://'
      const socket = new WebSocket(scheme + 'ws.yundun.com/tsgz_map_service')
      socket.addEventListener('open', event => {
        socket.send(JSON.stringify({ action: { name: 'getnewtasknoticeinfo' } }))
      })
      socket.addEventListener('message', event => {
        const data = JSON.parse(event.data)
        this.scanLog = data.data
        document.getElementById('mimicryBox').style.display = 'block'
        const alarmPromptNone = function() {
          document.getElementById('mimicryBox').style.display = 'none'
        }
        const t1 = setTimeout(alarmPromptNone, 3000)
      })
    },
    clickButton() {
      const scheme = 'https:' === document.location.protocol ? 'wss://' : 'ws://'
      const socket = new WebSocket(scheme + 'ws.yundun.com/tsgz_map_service')
      const socketName = ['geteventlist', 'todaymonitornumber', 'getsensitivewordviewtop', 'getrankinglist', 'getloopholetoplist', 'getregioncountdata', 'getrisktampertoplist', 'gettaskfeaturecount', 'getdomainloopholelist', 'getdomainloopholedetail', 'getriskcontentlistbytype', 'getrisklogcontentlist', 'getrisklogdetaillist', 'getriskfeaturecount', 'getnewtasknoticeinfo']

      // for (let i = 0; i < socketName.length; i++) {
      //   socket.addEventListener('open', event => {
      //     socket.send(JSON.stringify({ action: { name: socketName[i] } }))
      //   })
      // }
      socket.addEventListener('open', event => {
        socket.send(JSON.stringify({ action: { name: 'all' } }))
      })
      socket.addEventListener('message', event => {
        const data = JSON.parse(event.data)
        switch (data.action.name) {
          case 'todayMonitorNumber': {
            this.monitorNumbe = data.data.total
            break
          }
          case 'getLoopholeTopList': {
            const loopholeCountData = []
            for (let i = 0; i < 10; i++) {
              loopholeCountData[i] = data.data[i]
            }
            this.loopholeCount = loopholeCountData
            break
          }
          case 'getEventList': {
            const len = data.data.length
            for (let i = 0; i < len; i++) {
              this.sevensjqsData.time[i] = this.timeForSimplify(data.data[i].date)
              this.sevensjqsData.value[i] = data.data[i].value
            }
            this.chartsOfTrend('trendEvent')
            break
          }
          case 'getRankingList': {
            this.riskRanking = data.data
            break
          }
          case 'getRegionCountData': {
            this.chinaData = data.data
            this.chartsOfChongQingMap()
            break
          }
          case 'getSensitiveWordViewTop': {
            const len = data.data.length
            const y = [50.8, 78.7, 85.9, 28.5, 40.8]
            const lagerData = [888489430, 359399270, 550345700, 213895620, 239689730]
            for (let i = 0; i < len; i++) {
              this.sensitiveWordsChartSeries[i] = [Number(data.data[i].value), y[i], lagerData[i], data.data[i].name]
            }
            this.chartsOfSensitiveWords('sensitiveWordsChart')
            break
          }
          case 'getRiskTamperTopList': {
            const tamperTopData = []
            for (let i = 0; i < 10; i++) {
              tamperTopData[i] = data.data[i]
            }
            this.tamperTop = tamperTopData
            break
          }
          case 'getTaskFeatureCount': {
            this.featureCount = data.data
            this.chartsOfTheRing('abnormalWebsite', '异常网站', this.featureCount[0].value)
            this.chartsOfTheRing('highRiskOf', '高风险占比', this.featureCount[1].value)
            this.chartsOfTheRing('tamperingWith', '篡改', this.featureCount[2].value)
            this.chartsOfTheRing('sensitiveWords', '敏感词', this.featureCount[3].value)
            this.chartsOfTheRing('hijackingOfDNS', 'DNS劫持', this.featureCount[4].value)
            this.chartsOfTheRing('outage', '宕机', this.featureCount[5].value)
            break
          }
          case 'getDomainLoopholeList': {
            this.LoopholeData = data.data
            break
          }
          case 'getRiskFeatureCount': {
            for (let i = 0; i < data.data.length; i++) {
              this.taskTotalList[i] = Number(data.data[i].total_number)
            }
            break
          }
          default:
        }
      })
    },
    swiperRun() {
        new Swiper('.swiper-container', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 30
        })
    },
    showLoopholeDetails(event, domain) {
      const eve = event.target.parentNode.parentNode.parentNode.getElementsByTagName('tr')
      const len = eve.length
      for (let i = 0; i < len; i++) {
        eve[i].className = ''
      }
      event.target.parentNode.parentNode.className = 'sensitize'
      const switchKey = this.tabPageId
      const scheme = 'https:' === document.location.protocol ? 'wss://' : 'ws://'
      const socket = new WebSocket(scheme + 'ws.yundun.com/tsgz_map_service')
      if (switchKey === 'scan') {
        socket.addEventListener('open', event => {
          socket.send(JSON.stringify({ action: { name: 'getdomainloopholedetail', id: domain } }))
        })
        socket.addEventListener('message', event => {
          const data = JSON.parse(event.data)
          this.loopholeListDataDetails = data.data
        })
      } else {
        switch (switchKey) {
          case 'tamper':
          console.log(domain)
          socket.addEventListener('open', event => {
            socket.send(JSON.stringify({ action: { name: 'getrisklogdetaillist', id: domain, type: 0 } }))
          })
          socket.addEventListener('message', event => {
            console.log()
            const data = JSON.parse(event.data)
            this.tamperDetails = data.data
          })
          break
          case 'keyword':
          socket.addEventListener('open', event => {
            socket.send(JSON.stringify({ action: { name: 'getrisklogdetaillist', id: domain, type: 2 } }))
          })
          socket.addEventListener('message', event => {
            const data = JSON.parse(event.data)
            this.antistopDetails = data.data
          })
          break
          case 'sensitiveWord':
          socket.addEventListener('open', event => {
            socket.send(JSON.stringify({ action: { name: 'getrisklogdetaillist', id: domain, type: 1 } }))
          })
          socket.addEventListener('message', event => {
            const data = JSON.parse(event.data)
            this.sensitiveWordDetails = data.data
          })
          break
          case 'abnormalStatusCode':
          socket.addEventListener('open', event => {
            socket.send(JSON.stringify({ action: { name: 'getrisklogdetaillist', id: domain, type: 3 } }))
          })
          socket.addEventListener('message', event => {
            const data = JSON.parse(event.data)
            this.abnormalStatusCodeDetails = data.data
          })
          break
          default:
        }
      }
    },
    mainWords(event, nameVal, type) {
        const ev = event.target
        const len = ev.parentNode.getElementsByTagName('div').length
        for (let i = 0; i < len; i++) {
            ev.parentNode.getElementsByTagName('div')[i].className = ''
        }
        ev.className = 'active'
        let params
        const scheme = 'https:' === document.location.protocol ? 'wss://' : 'ws://'
        const socket = new WebSocket(scheme + 'ws.yundun.com/tsgz_map_service')
        if (type === 'loophole') {
          //漏洞
          socket.addEventListener('open', event => {
            socket.send(JSON.stringify({ action: { name: 'getdomainloopholelist', level: nameVal } }))
          })
          socket.addEventListener('message', event => {
            const data = JSON.parse(event.data)
            this.LoopholeData = data.data
          })
        } else {
          switch (type) {
            case 'tamper':
              // socket.addEventListener('open', event => {
              //   socket.send(JSON.stringify({ action: { name: 'getrisklogcontentlist', content: nameVal } }))
              // })
              // socket.addEventListener('message', event => {
              //   const data = JSON.parse(event.data)
              //   this.tabTamper = data.data
              // })
                // 篡改
              break
            case 'antistop':
              //关键词
              socket.addEventListener('open', event => {
                socket.send(JSON.stringify({ action: { name: 'getrisklogcontentlist',content: nameVal, type: 2 } }))
              })
              socket.addEventListener('message', event => {
                const data = JSON.parse(event.data)
                this.tabAntistop = data.data
              })
              break
            case 'sensitiveWord':
              //敏感词
              socket.addEventListener('open', event => {
                socket.send(JSON.stringify({ action: { name: 'getrisklogcontentlist', content: nameVal, type: 1 } }))
              })
              socket.addEventListener('message', event => {
                const data = JSON.parse(event.data)
                this.tabSensitiveWord = data.data
              })
              break
            case 'abnormalStatusCode':
              //错误码
              socket.addEventListener('open', event => {
                socket.send(JSON.stringify({ action: { name: 'getrisklogcontentlist', content: nameVal, type: 3 } }))
              })
              socket.addEventListener('message', event => {
                const data = JSON.parse(event.data)
                this.tabAbnormalStatusCode = data.data
              })
              break
            default:
          }
        }
        this.swiperRun()
    },
    tabPageChange(id) {
      const scheme = 'https:' === document.location.protocol ? 'wss://' : 'ws://'
      const socket = new WebSocket(scheme + 'ws.yundun.com/tsgz_map_service')
      if (id === 'loophole') {
        this.tabPageId = 'scan'
        //漏洞
        socket.addEventListener('open', event => {
          socket.send(JSON.stringify({ action: { name: 'getdomainloopholelist', level: 0 } }))
        })
        socket.addEventListener('message', event => {
          const data = JSON.parse(event.data)
          this.LoopholeData = data.data
        })
      } else {
        switch (id) {
          case 'tamper':
              // 篡改
            this.tabPageId = 'tamper'
            socket.addEventListener('open', event => {
              socket.send(JSON.stringify({ action: { name: 'getrisklogcontentlist', type: 0 } }))
            })
            socket.addEventListener('message', event => {
              const data = JSON.parse(event.data)
              this.tabTamper = data.data
            })
            break
          case 'antistop':
              //关键词
            this.tabPageId = 'keyword'
            socket.addEventListener('open', event => {
              socket.send(JSON.stringify({ action: { name: 'getrisklogcontentlist', type: 2 } }))
            })
            socket.addEventListener('open', event => {
              socket.send(JSON.stringify({ action: { name: 'getriskcontentlistbytype', type: 2 } }))
            })
            socket.addEventListener('message', event => {
              const data = JSON.parse(event.data)
              switch (data.action.name) {
                case 'getRiskContentListByType':
                this.bannerAntistop = data.data
                break
                case 'getRiskLogContentList':
                this.tabAntistop = data.data
                break
              }
            })
            break
          case 'sensitiveWord':
              //敏感词
            this.tabPageId = 'sensitiveWord'
            socket.addEventListener('open', event => {
              socket.send(JSON.stringify({ action: { name: 'getrisklogcontentlist', type: 1 } }))
            })
            socket.addEventListener('open', event => {
              socket.send(JSON.stringify({ action: { name: 'getriskcontentlistbytype', type: 1 } }))
            })
            socket.addEventListener('message', event => {
              const data = JSON.parse(event.data)
              switch (data.action.name) {
                case 'getRiskContentListByType':
                this.bannerSensitiveWord = data.data
                break
                case 'getRiskLogContentList':
                this.tabSensitiveWord = data.data
                break
              }
            })
            break
          case 'abnormalStatusCode':
              //错误码
            this.tabPageId = 'abnormalStatusCode'
            socket.addEventListener('open', event => {
              socket.send(JSON.stringify({ action: { name: 'getrisklogcontentlist', type: 3 } }))
            })
            socket.addEventListener('open', event => {
              socket.send(JSON.stringify({ action: { name: 'getriskcontentlistbytype', type: 3 } }))
            })
            socket.addEventListener('message', event => {
              const data = JSON.parse(event.data)
              switch (data.action.name) {
                case 'getRiskContentListByType':
                this.bannerAbnormalStatusCode = data.data
                break
                case 'getRiskLogContentList':
                this.tabAbnormalStatusCode = data.data
                break
              }
            })
            break
          default:
        }
      }
      const eventId = document.getElementById(id)
      const banner = document.getElementById(id + '_banner')
      for (let i = 0; i < 5; i++) {
          eventId.parentNode.getElementsByClassName('tabContent')[i].style.visibility = 'hidden'
          banner.parentNode.getElementsByTagName('div')[i].className = 'tab_title'
      }
      eventId.style.visibility = 'visible'
      banner.className = document.getElementById(id + '_banner').className + ' ' + 'active'
      this.swiperRun()
    },
    chartsOfChongQingMap() {
      if (!document.getElementById('areaMap')) {
        return
      }
      this.areaCharts = Echarts.init(document.getElementById('areaMap'))
      this.areaCharts.setOption({
        tooltip: {
          trigger: 'item',
          formatter(params) {
            const  res = '态势感知<br/>' + params.name + ': ' + (params.value ? params.value : 0) + '次'
            return res
          }
        },
        series: [{
          name: '全国分布',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter(params) {
                 const value = params.value ? params.value : 0
                 return params.name + '(' + value + '次)'
              },
              textStyle: {
                 color: '#444'
              }
            },
            emphasis: {
              show: true
            }
          },
          itemStyle:{
            normal:{
              areaColor: 'rgba(47, 47, 47, 0.4)',
              borderColor: '#424242',
              label:{
                show:true
              }
            },
            emphasis:{
              areaColor: '#444',
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 1,
              // areaStyle: {
              //     color: 'rgba(68, 68, 68, 0.8)'
              // },
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            }
          },
          data: this.chinaData
        }]
      })
    },
    chartsOfTrend() {
      //趋势图
      this.eventTrendChart = Echarts.init(document.getElementById('trendEvent'))
      this.eventTrendChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
              splitLine: false,
              type : 'category',
              boundaryGap : false,
              data : this.sevensjqsData.time
            }
        ],
        yAxis : [
            {
              type : 'value',
              splitLine: false,
              scale: false,
              axisLine: {
                lineStyle: {
                    color: 'rgba(0, 0, 0, 0)'
                }
              }
            }
        ],
        series : [
          {
            name: '事件趋势',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            itemStyle : {
              normal : {
                color:'#2d90e6',
                lineStyle:{
                  color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: 'rgba(97, 0, 153, 0.5)' // 0% 处的颜色
                      }, {
                          offset: 1, color: 'rgba(0, 198, 255, 0.5)' // 100% 处的颜色
                      }]
                  }
                }
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [{
                      offset: 0, color: 'rgba(97, 0, 153, 0.3)' // 0% 处的颜色
                  }, {
                      offset: 1, color: 'rgba(0, 198, 255, 0.3)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: this.sevensjqsData.value
          }
        ]
      })
    },
    chartsOfSensitiveWords() {
      //敏感词
      this.sensitiveWordsChart = Echarts.init(document.getElementById('sensitiveWordsChart'))
      this.sensitiveWordsChart.setOption({
        tooltip: {
            trigger: 'axis',
            formatter(params) {
               const value = params[0].value[0] ? params[0].value[0] : 0
               return params[0].value[3] + '(' + value + '次)'
            }
        },
        xAxis: {
            splitLine: false,
            axisLine: {
                lineStyle: {
                    color: '#5a5a5a'
                }
            }
        },
        yAxis: {
            splitLine: false,
            scale: false,
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 0, 0, 0)'
                }
            }
        },
        series: [{
            name: '2015',
            data: this.sensitiveWordsChartSeries,
            type: 'scatter',
            symbolSize(data) {
                return Math.sqrt(data[2]) / 5e2
            },
            showAllSymbol: true,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter(params) {
                        return params.data[3]
                    },
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: (0.4, 0.3, 0.2, [{
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                    }, {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                    }])
                }
            }
        }]
      })
    },
    chartsOfTheRing(id, name, val) {
      //右上角圆环图
      this.chartsOfTheRingChart = Echarts.init(document.getElementById(id))
      this.chartsOfTheRingChart.setOption({
        series: [{
            type: 'pie',
            radius: ['55%', '75%'],
            silent: true,
            data: [{
                value: 1,
                itemStyle: {
                    normal: {
                        color: '#050f58',
                        // borderColor: '#162abb',
                        // borderWidth: 2,
                        shadowBlur: 50,
                        shadowColor: 'rgba(21,41,185,.75)'
                    }
                }
            }]
        }, {
            type: 'pie',
            radius: ['55%', '75%'],
            silent: true,
            label: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 1,
                itemStyle: {
                    normal: {
                        color: '#050f58',
                        shadowBlur: 50,
                        shadowColor: 'rgba(21,41,185,.75)'
                    }
                }
            }]
        }, {
            name: '占比',
            type: 'pie',
            radius: ['59%', '72%'],
            hoverAnimation: false,
            data: [{
                value: val,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 15,
                                fontWeight: 'bold'
                            },
                            position: 'center'
                        },
                        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(27, 123, 206, 1)'
                        }, {
                            offset: 1,
                            color: 'rgba(103, 53, 254, 1)'
                        }])
                    }
                }
            }, {
                value: (100 - val),
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 15,
                                fontWeight: 'bold'
                            },
                            position: 'center'
                        },
                        color: '#21242c'
                    }
                }
            }]
        }, {
            name: '',
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: [200, 200],
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [{
                value: 0,
                label: {
                    normal: {
                        formatter: val + '%',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    }
                }
            }]
        }]
      })
    },
    weekCheck() {
      const d = new Date()
      const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const chinaWeek = ['日', '一', '二', '三', '四', '五', '六']
      this.week = weekday[d.getDay()]
      this.chinaWeek = chinaWeek[d.getDay()]
    },
    timeR() {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        this.years = year + '.' + ((month > 9) ? month : (0 + '' + month))  + '.' + ((day > 9) ? day : (0 + '' + day))
        this.hours = ((hours > 9) ? hours : (0 + '' + hours)) + ':' + ((minutes > 9) ? minutes : (0 + '' + minutes)) + ':' + ((seconds > 9) ? seconds : (0 + '' + seconds))
        setTimeout(this.timeR, 1000)
    },
    timeStart() {
      document.getElementById('mimicryBox').style.display = 'block'
    },
    closeMimicryBox() {
      document.getElementById('mimicryBox').style.display = 'none'
    },
    //读取透明度
    setOpacity(elem, level) {
        if (elem.filters) {
            elem.style.filter = 'alpha(opacity=' + level + ')'
        } else {
            elem.style.opacity = level / 100
        }
    },
    //渐现
    fadeIn(elem, speed) {
        const e = typeof elem === 'string' ? document.getElementById(elem) : elem
        this.setOpacity(e, 0)
        e.style.display = 'block'
        let i = 0
        const dg = () => {
            if (i <= 100) {
                (() => {
                    const pos = i
                    setTimeout((() => { this.setOpacity(e, pos) }), (pos + 1) * speed)
                })()
                i += 1
                dg()
            }
        }
        dg()
    },
    //渐隐
    fadeout(elem, speed) {
        const e = typeof elem === 'string' ? document.getElementById(elem) : elem
        this.setOpacity(e, 1)
        let i = 0
        const dg = () => {
            if (i <= 100) {
                (() => {
                    const pos = i
                    setTimeout((() => {this.setOpacity(e, (100 - pos))}), (pos + 1) * speed)
                })()
                i += 1
                dg()
            } else if (i = 0) {
                e.style.display = 'none'
            }
        }
        dg()
    },
    timeForSimplify(date) {
        const currentDate = new Date(date)
        const videosInformation = (currentDate.getMonth() + 1) + '/' + currentDate.getDate()
        return videosInformation
    }
  }
}
</script>
<style scoped>
  .lineGradient {
    width: 9.375rem;
    height: 0.625rem;
    display: inline-block;
    border-radius: 0.3125rem;
  }
  .lineHigh {
    background: linear-gradient(to right, #ff5f00, #ff0000);
  }
  .lineMiddle {
    background: linear-gradient(to right, #00c6ff, #2139b7);
  }
  .lineLow {
    background: linear-gradient(to right, #50ec91, #52eb64);
  }
</style>
<style lang="css">
  .sensitize {
    background: rgba(0, 132, 255, 0.5);
    color: #fff;
    height: 1.625rem;
  }
  .high {
    color: #ff0042;
  }
  .middle {
    color: #0b89c3;
  }
  .low {
    color: #00c295;
  }
  .areaMapBackground {
    width: 100%;
    height: 100%;
  }
  .areaMap {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
  }
  .areaMap #areaMap {
    width: 70rem;
    height: 37rem;
    margin: 5.5rem auto;
  }
  .border {
    border: 1px solid skyblue;
  }
  .left {
    position: absolute;
    height: 100%;
    padding-left: 0.625rem;
  }
  .left1 {
    height: 7rem;
    background: url('./assets/img/logo.png') no-repeat 0 0;
    width: 37.5rem;
    color: #e3e3e4;
    display: inline-block;
  }
  .left1 .years {
    display: block;
    padding-left: 2%;
    padding-top: 5rem;
  }
  .left1 .hours {
    color: #e3e3e4;
    font-size: 2rem;
    padding-left: 22%;
    display: block;
    margin-top: -5%;
  }
  .chinaWeek {
    display: block;
    margin-left: 17%;
    margin-top: -5%;
  }
  .week {
    font-size: 0.6rem;
  }
  .left2 {
    height: 10.125rem;
    width: 13.5rem;
    position: absolute;
    z-index: 3;
    /* margin-top: 1.25rem; */
  }
  .left3 {
    height: 8.875rem;
    width: 13.875rem;
    position: absolute;
    z-index: 3;
    margin-top: 10rem;
  }
  .left4 {
    height: 9.5rem;
    width: 13.875rem;
    position: absolute;
    z-index: 3;
    /*margin-top: 20rem;*/
    position: fixed;
    bottom: 16rem;
  }
  .left5 {
    height: 15.6rem;
    width: 17.4rem;
    position: absolute;
    z-index: 3;
    /*margin-top: 29rem;*/
    bottom: 0px;
    position: fixed;
  }
  .title {
    color: #e3e3e4;
    font-size: 1rem;
  }
  /*事件趋势样式*/
  .eventTrend {
    background: url('./assets/img/sjqs.png') no-repeat 0 0;
  }
  #trendEvent {
    height: 9.5rem;
    width: 13.5rem;
  }
  /*宕机*/
  .downTime {
    background: url('./assets/img/djcs.png') no-repeat 0 0;
  }
  .imgPostion img{
    margin-top: 1.875rem;
  }
  .downTime .max {
    color: rgb(219, 245, 255);
    font-size: 0.75rem;
    display: block;
    margin-left: 4.4375rem;
    margin-top: -8.125rem;
  }
  .downTime .downTimesValue, .downTime .downTimesUnit {
    font-size: 2.25rem;
    color: #0084ff;
    font-style: italic;
  }
  .downTime .downTimesUnit{
    font-size: 1.375rem;
  }
 .downTime .downTimes {
    margin-left: 3.125rem;
    margin-top: -5.9375rem/*0.625rem*/;
  }
  /*敏感词*/
  .sensitiveWords {
    background: url('./assets/img/mgc.png') no-repeat 0 0;
  }
  #sensitiveWordsChart {
    height: 9.5rem;
    width: 13.25rem;
  }
  /*风险排名*/
  .riskRankingTable table, .tampering table, .distribution table {
    width: 100%;
    color: #e3e3e4;
    font-size: 0.75rem;
    border-collapse: collapse;
  }
  .riskRankingTable table>thead>tr>td, .tampering table>thead>tr>td, .distribution table>thead>tr>td {
    font-size: 0.6rem;
  }
  .riskRankingTable table thead, .tampering table thead, .distribution table thead {
    border: 1px solid #1b3953;
    background: rgba(0, 132, 255, 0.2);
    color: #017ff5;
    padding: 0.3125rem 0;
    display:block;
  }
  .riskRankingTable table>tbody>tr>td, .tampering table>tbody>tr>td, .distribution table>tbody>tr>td {
    border: 1px solid rgba(0, 0, 0, 0.4);
    background: rgba(49, 49, 49, 0.3);
    padding: 0.125rem 0;
  }
 .riskRankingTable table>tbody, .tampering table>tbody, .distribution table>tbody {
    margin-top: 0.125rem;
  }
  .riskRankingTable table>tbody>tr>td:nth-child(2), .riskRankingTable table>thead>tr>td:nth-child(2), .riskRankingTable table>tbody>tr>td:nth-child(3), .riskRankingTable table>thead>tr>td:nth-child(3) {
    text-align: right;
    padding-right: 0.1875rem;
    width: 5.3125rem;
  }
  .riskRankingTable table>tbody>tr>td:nth-child(1) span, .riskRankingTable table>thead>tr>td:nth-child(1) span {
    padding-left: 0.1875rem;
    width: 10.625rem;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .riskRankingTable table>tbody>tr:hover, .tampering table>tbody>tr:hover, .distribution table>tbody>tr:hover {
    background: rgba(49, 49, 49, 0.8);
    cursor: pointer;
    width: 21.875rem;
    height: 1.625rem;
  }
  .riskRankingTable tbody {
    height: 14.9rem;
    overflow-y: scroll;
    display:block;
  }
  .tampering tbody, .distribution tbody {
    display:block;
  }
  .tampering, .distribution {
    margin-top: -0.1875rem;
  }
  /*right*/
  .right {
    position: relative;
    float: right;
  }
  .right1 {
    height: 8.5rem;
    width: 42.5rem;
    position: absolute;
    z-index: 3;
    right: 0px;
  }
  .right1_title {
    width: 43rem;
    right: 0px;
    position: absolute;
    z-index: 3;
    height: 2.875rem;
    margin-top: 8rem;
  }
  .right2 {
    height: 13rem;
    width: 17.9rem;
    float: right;
    margin-top: 9rem;
    right: 0px;
    position: absolute;
    z-index: 3;
  }
  .right3 {
    height: 13rem;
    width: 18rem;
    clear: both;
    float: right;
    margin-top: 22.5rem;
    position: absolute;
    right: 0px;
    z-index: 3;
    position: fixed;
    bottom: 19rem;
  }
  .right4 {
    height: 18rem;
    width: 57rem;
    clear: both;
    float: right;
    z-index: 888;
    position: absolute;
    /*margin-top: 35.5rem;*/
    right: 0px;
    bottom: 0px;
    position: fixed;
  }
 .chartsBar {
     width: 6.8rem;
     height: 7.5rem;
  }
  .chartsBar_title {
    width: 7.5rem;
    height: 1.875rem;
    margin-left: -1rem;
  }
 .chartsBarWebsite {
     width: 8rem;
     height: 8rem;
  }
 .right1 div ,.right1_title div{
     float: left;
  }
  .right1_title div {
    text-align: center;
    color: #d8d8d8;
  }
 .chartsBarWebsite_title {
     width: 10rem;
     height: 1.875rem;
     margin-top: 0.3125rem!important;
  }
  .wap {
    width: 6.2rem;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .detailsUrl {
    display: block;
    word-break: break-all;
  }
  .wapDmain {
    width: 12.5rem;
  }
  #loopholeTable .low, #loopholeTable .middle, #loopholeTable .high {
    float: left;
  }
  /*tampering*/
  .tampering table>tbody>tr>td:nth-child(1) span, .tampering table>thead>tr>td:nth-child(1) span, .distribution table>tbody>tr>td:nth-child(1) span, .distribution table>thead>tr>td:nth-child(1) span {
    padding-left: 0.1875rem;
    width: 9.5rem;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tampering table>tbody>tr>td:nth-child(2), .tampering table>thead>tr>td:nth-child(2) {
    text-align: right;
    padding-right: 0.1875rem;
    width: 9.375rem;
  }
  /*distribution*/
  .distribution table>tbody>tr>td:nth-child(2), .distribution table>thead>tr>td:nth-child(2), .distribution table>tbody>tr>td:nth-child(3), .distribution table>thead>tr>td:nth-child(3), .distribution table>tbody>tr>td:nth-child(4), .distribution table>thead>tr>td:nth-child(4) {
    text-align: right;
    padding-right: 0.1875rem;
    width: 3.125rem;
  }
  .distribution table>tbody>tr>td:nth-child(2) {
    color: #ff0042;
  }
  .distribution table>tbody>tr>td:nth-child(3) {
    color: #0b89c3;
  }
  .distribution table>tbody>tr>td:nth-child(4) {
    color: #00c295;
  }
 
  /*滚动条样式（不兼容火狐）*/
  ::-webkit-scrollbar-track-piece {
    background-color:#f5f5f5;
    border-left:1px solid #d2d2d2;
  }
  ::-webkit-scrollbar{
    width:5px;
    height:5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color:#c2c2c2;
    background-clip:padding-box;
    border:1px solid #979797;
    min-height:28px;
  }
  ::-webkit-scrollbar-thumb:hover {
    border:1px solid #636363;
    background-color:#929292;
  }
</style>
<style>
 /*****************************************************/
  /*tab pages*/
  .tab_banner {
    color: #e3e3e4;
    background: rgba(34, 34, 34, 0.4);
    height: 2.1875rem;
  }
  .tab_title {
    width: 11.35rem;
    display: inline-block;
    float: left;
    text-align: center;
    font-size: 0.875rem;
    padding: 0.5rem 0;
    cursor: pointer;
    border-bottom: 0.125rem solid #0171dc;
  }
  .right4 .tab_content {
     /*height: 17.5rem;*/
     color: #e3e3e4;
  }
  .tab_content>div {
     height: 16rem;
     background: rgba(0, 132, 255, 0.2);
     color: #017ff5;
  }
  .active {
     background: rgba(0, 132, 255, 0.2);
     color: #017ff5;
     border: 2px solid #0171dc;
     border-bottom: none;
     display: block;
  }
  .loophole_div, .antistop_div {
     width: 7.75rem;
     height: 100%;
     display: inline-block;
  }
  .loopholeDiv, .antistopDiv {
    /*padding-top: 0.625rem;
     */
     margin-left: 0.625rem;
  }
  .loophole_div .loopholeDiv>div, .antistop_div .antistopDiv>div {
     line-height: 2.0625rem;
     width: 100%;
     text-align: center;
     cursor: pointer;
     margin-top: 0.625rem;
  }
  .loophole_div .active, .antistop_div .active {
     border: 2px solid #0171dc;
     border-right: none;
  }
  .antistop_div {
     height: 16rem;
     overflow-y: scroll;
  }
  .loopholeTable_div, .loophole_detials, .tamper_detials, .antistopTable_div, .antistop_detials {
     display: inline-block;
     position: absolute;
     float: left;
     margin-left: 0.25rem;
     margin-top: 0.625rem;
  }
  .loopholeTable_div, .antistopTable_div {
     width: 26.875rem;
  }
  .tamperTable_div {
     width: 27rem;
     display: inline-block;
  }
  .tamperTable_div table {
     margin-top: 0.625rem;
     display: inline-block;
     margin-left: 0.625rem;
  }
  .antistopTable_div tbody, .loopholeTable_div tbody, .tamperTable_div tbody {
     background: rgba(0, 132, 255, 0.1);
  }
  .antistopTable_div table>thead>tr>td:nth-child(1), .antistopTable_div table>tbody>tr>td:nth-child(1), .loopholeTable_div table>thead>tr>td:nth-child(1), .loopholeTable_div table>tbody>tr>td:nth-child(1) {
     width: 12.5rem;
     padding-left: 0.1875rem;
  }
  .tamperTable_div table>thead>tr>td:nth-child(1), .tamperTable_div table>tbody>tr>td:nth-child(1) {
     width: 22.5rem;
     padding-left: 0.1875rem;
  }
  .tamperTable_div table>thead>tr>td:nth-child(2), .tamperTable_div table>tbody>tr>td:nth-child(2) {
     width: 11.875rem;
     padding-left: 0.1875rem;
     text-align: right;
  }
  .antistopTable_div table>thead>tr>td:nth-child(2), .antistopTable_div table>tbody>tr>td:nth-child(2), .loopholeTable_div table>thead>tr>td:nth-child(2), .loopholeTable_div table>tbody>tr>td:nth-child(2) {
     text-align: left;
     padding-left: 0.1875rem;
     width: 9.375rem;
  }
  .antistopTable_div table>thead>tr>td:nth-child(3), .antistopTable_div table>tbody>tr>td:nth-child(3), .loopholeTable_div table>thead>tr>td:nth-child(3), .loopholeTable_div table>tbody>tr>td:nth-child(3) {
     text-align: right;
     padding-right: 0.1875rem;
     width: 5rem;
  }
  .antistopTable_div table>thead>tr:hover, .loopholeTable_div table>tbody>tr:hover, .tamperTable_div table>tbody>tr:hover {
     background: rgba(0, 132, 255, 0.4);
     background: url('./assets/img/polygon.png') no-repeat 10 0;
  }
  .loophole_detials, .tamper_detials, .antistop_detials {
     height: 15.2rem;
     width: 21.25rem;
     overflow-y: scroll;
     right: 0;
     background: rgba(0, 132, 255, 0.3);
     padding-left: 0.625rem;
  }
  .tamper_detials{
     margin-left: 1.25rem;
     margin-top: 0.625rem;
     width: 28.4375rem;
  }
  .polygon {
     padding-top: 0.1875rem;
     background: url('./assets/img/polygon.png') no-repeat 0 0.375rem;
     padding-left: 1rem;
     color: #e3e3e4;
  }
  .detailsTitle {
     font-size: 0.75rem;
     display: inline-block;
     width: 4.75rem;
     text-align: center;
     line-height: 1.875rem;
  }
  .loophole_detials_content {
     font-size: 0.75rem;
     width: 20rem;
  }
  .detailsContent {
     font-size: 0.75rem;
     width: 15.3125rem;
     display: inline-block;
     float: right;
     margin-top: -1.3625rem;
     color: #e3e3e4;
     word-wrap:break-word;
  }
  .tamper_detials_content {
     width: 26.875rem;
  }
  .tamper_detials_content .detailsContent {
     width: 22rem;
  }
  .tamper_detials_content .detailsTitle, .antistop_detials_content .detailsTitle {
     width: 6.25rem;
     text-align: left;
     padding-left: 0.625rem;
  }
  .phoneSize img{
     width: 5.3125rem;
     height: 3.75rem;
     border: 1px solid #0171dc;
     margin-left: 0.3125rem;
  }
  #loopholeTable, #tamperTable, #antistopTable, #sensitiveWordTable, #abnormalStatusCodeTable {
    height: 13.8rem;
  }
  #tamper, #antistop, #sensitiveWord, #abnormalStatusCode {
    visibility: hidden;
    margin-top: -16rem;
  }
  #tamper .detailsContent {
    font-size: 0.75rem;
    width: 22rem;
    display: inline-block;
    float: right;
    color: #e3e3e4;
    word-wrap: break-word;
  }
</style>
<style scoped>
    /*swiper*/
    .swiper-container {
        width: 100%;
        height: 62px;
        margin: 20px auto;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        width: 85px!important;
        margin-left: 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .append-buttons {
        text-align: center;
        margin-top: 20px;
    }
    .append-buttons a {
        display: inline-block;
        border: 1px solid #007aff;
        color: #007aff;
        text-decoration: none;
        padding: 4px 10px;
        border-radius: 4px;
        margin: 0 10px;
        font-size: 13px;
    }
    .swiper-wrapper, .swiper-container {
        z-index: 889!important;
    }
    .swiper-pagination, .swiper-button-next, .swiper-button-prev {
        z-index: 999!important;
    }
    .phone img{
        width: 85px;
        height: 62px;
    }
    .swiper-button-next, .swiper-button-prev {
        position: absolute;
        top: 60%!important;
        width: 28px!important;
        height: 25px!important;
        margin-top: -22px;
        z-index: 10;
        cursor: pointer;
        background-size: 27px 44px;
        background-position: center;
        background-repeat: no-repeat;
    }
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
        left: 0px!important;
    }
</style>
<style>
    .warningDetails>div {
      width: 420px;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .mimicryBox {
        background: rgba(0, 0, 0, 0);
        width: 100%;
        height: 1080px;
        z-index: 9999999;
        position: absolute;
        display: none;
    }
    .mimicryBox_body {
        height: 410px;
        width: 644px;
        margin-left: 32%;
        margin-top: 12%;
        background: url('./assets/img/alarmPrompt.png') no-repeat 0 0;
    }
    .cursor {
        cursor: pointer;
    }
    .closeMimicryBox {
        float: right;
    }
    .timeOfOccurrence {
        color: #7b6262;
        font-size: 12px;
    }
    .beforeTime {
        color: #fdc2cc;
        font-size: 20px;
    }
    .warningDomain {
        color: #fdc2cc;
        font-size: 20px;
    }
    .warningInfo {
        color: #c4c4c4;
        font-size: 22px;
    }
    .titleOfWarning {
        height: 130px;
    }
    .titleOfWarning1 {
        margin-left: 75px;
        margin-top: 35px;
        display: inline-block;
    }
    .titleOfWarning2 {
        display: inline-block;
        float: right;
        margin-top: 45px;
    }
    .warningTitle {
        font-size: 14px;
        color: #d9d9d9;
        padding-left: 75px;
        display: inline-block;
        position: absolute;
    }
    .warningDetails {
        font-size: 16px;
        color: #fff;
        margin-left: 180px;
    }
    .warningDiv {
        height: 280px;
    }
    .warningDiv>div {
        margin-top: 20px;
    }
</style>
