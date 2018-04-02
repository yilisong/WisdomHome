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
    <div class="faceTree">
      <hosers-code></hosers-code>
    </div>
    <div class="face1">
      <div class="marginTop30 marginleft10 marginright10">
        <div>
          <el-row>
            <el-col :span="12">实时抓拍</el-col>
            <el-col :span="12" class="selectStyle">
              <el-select v-model="value" filterable placeholder="">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div class="faceScoll">
          <el-row class="marginTop30">
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot1.png" alt=""></div>
            </el-col>
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot2.png" alt=""></div>
            </el-col>
          </el-row>
          <el-row class="marginTop30">
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot1.png" alt=""></div>
            </el-col>
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot2.png" alt=""></div>
            </el-col>
          </el-row>
          <el-row class="marginTop30">
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot1.png" alt=""></div>
            </el-col>
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot2.png" alt=""></div>
            </el-col>
          </el-row>
          <el-row class="marginTop30">
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot1.png" alt=""></div>
            </el-col>
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot2.png" alt=""></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="face2">
      <div class="marginTop30 marginleft10 marginright10">
        <div class="rightBtn">
          <el-button :type="importantType" size="small" @click="showImportant">重点</el-button>
          <el-button :type="alltype" size="small" @click="showAll">全部</el-button>
        </div>
        <div class="faceScoll">
          <el-row class="marginTop30">
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot1.png" alt=""></div>
            </el-col>
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot2.png" alt=""></div>
            </el-col>
          </el-row>
          <el-row class="marginTop30">
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot1.png" alt=""></div>
            </el-col>
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot2.png" alt=""></div>
            </el-col>
          </el-row>
          <el-row class="marginTop30">
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot1.png" alt=""></div>
            </el-col>
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot2.png" alt=""></div>
            </el-col>
          </el-row>
          <el-row class="marginTop30">
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot1.png" alt=""></div>
            </el-col>
            <el-col :span="12">
              <div class="picterDiv">
                <img src="@/assets/images/timg.jpeg" alt="">
              </div>
              <div class="passageway">北门出入口</div>
              <div class="passageTime">2017-02-29 13:23:21</div>
              <div class="textCenter cursor"><img src="@/assets/images/foot2.png" alt=""></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <background-village></background-village>
  </div>
</template>

<script>
import $ from 'jquery'
import backgroundVillage from '@/components/facebg'
import personModal from '@/components/person'
import hosersCode from '@/components/hosersCode'
import personListModal from '@/components/personList'
export default {
  name: 'person',
  components: {
    personModal,
    backgroundVillage,
    personListModal,
    hosersCode
  },
  data() {
    return {
      alltype: '',
      importantType: 'text',
      personList: false,
      className: ['', '', '', '', 'active', ''],
      value: '全部抓拍',
      options: [
        {
          value: '1',
          label: '全部抓拍'
        },
        {
          value: '2',
          label: '人脸卡口'
        },
        {
          value: '3',
          label: '摄像机'
        },
        {
          value: '4',
          label: '门禁'
        },
        {
          value: '5',
          label: '车辆卡口'
        }
      ]
    }
  },
  methods: {
    showAll() {
      this.alltype = ''
      this.importantType = 'text'
    },
    showImportant() {
      this.alltype = 'text'
      this.importantType = ''
    },
    hiddenDetailsInfo() {
      this.personList = false
    },
    showDetailsInfo() {
      this.personList = true
    },
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
  .rightBtn .el-button--small {
    float: right;
  }
  .faceScoll {
    clear: both;
    height: 45rem;
    overflow-y: scroll;
  }
  .picterDiv {
    width:112px;
    height:112px;
    border:1px solid #ccc;
    margin-left: 20px;
  }
  .picterDiv img {
    width: 100%;
    height: 100%;
  }
  .cursor {
    cursor: pointer;
  }
  .textCenter {
    text-align: center;
  }
  .passageTime {
    font-size: 12px;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
  }
  .passageway {
    font-size: 16px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .faceDiv {
    position: relative;
  }
  .faceTree{
    height: 45rem;
    width: 16rem;
    background: rgba(14, 19, 34, 0.85);
    /* float: left; */
    position: absolute;
    z-index: 999;
    margin-top: 6rem;
    margin-left: 2rem;
  }
  .face1 {
    height: 50rem;
    width: 20rem;
    background: rgba(14, 19, 34, 0.85);
    color: #fff;
    position: absolute;
    z-index: 999;
    margin-top: 4.1rem;
    margin-left: 2rem;
    left: 60%;
  }
  .face2 {
    height: 50rem;
    width: 20rem;
    color: #fff;
    background: rgba(14, 19, 34, 0.85);
    position: absolute;
    z-index: 999;
    margin-top: 3.6rem;
    margin-left: 2rem;
    left: 80%;
  }
  .faceTree:before, .face1:before, .face2:before {
    height: 3px;
    width:100%;
    position: absolute;
    left:0;
    top:0;
    content: '';
    background: linear-gradient(to right, #00a2ff, #03fffc);
  }
  .marginTop30 {
    margin-top: 30px;
  }
  .marginleft10 {
    margin-left: 10px;
  }
  .marginright10 {
    margin-right: 10px;
  }
</style>

<style scoped>
  .rightPersonList {
    width: 66%;
    background-color: rgba(14, 20, 30, 0.9);;
    position: fixed;
    right: 0px;
    top: 93px;
    bottom: 23px;
    z-index: 999;
    color: #fff;
    font-size: 16px;
  }
  .hiddenDetails {
    width: 27px;
    height: 65px;
    background-color: #040f27;
    position: fixed;
    right: 66%;
    top: 48%;
    z-index: 999;
    color: #fff;
    font-size: 16px;
    line-height: 65px;
    text-align: center;
    cursor: pointer;
  }
  .showDetails {
    width: 27px;
    height: 65px;
    background-color: #040f27;
    position: fixed;
    right: 0px;
    top: 48%;
    z-index: 999;
    color: #fff;
    font-size: 16px;
    line-height: 65px;
    text-align: center;
    cursor: pointer;
  }
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

