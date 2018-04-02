<template>
  <div :style="{height: height + 'px'}" class="box">
    <div class="wrap" ref="wrap" :style="{left: this.left + 'px', top: this.top + 'px'}">
      <img :src="imgUrl" :style="{width:imgWidth + 'px'}">
      <img src="../assets/img/circle.png" class="circleImg">
      <img class="imgHouse" @click="jumpToHouse">
      <img src="../assets/img/title.png" class="imgTitle">
    </div>
    <div class="equipments">
        <!-- 摄像头 -->
      <div v-show="cameraStatus">  
        <div class="img">
          <el-popover ref="popover1-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>摄像头</div>
            <div>1001</div>
            <div>状态：
              <span class="success">●</span>
              正常
            </div>
          </el-popover>
          <el-popover ref="popover1-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>摄像头</div>
            <div>1001</div>
            <div>状态：
              <span class="red">●</span>
              损坏
            </div>
          </el-popover>
          <div class="camera1" v-if="camera[0]" v-popover:popover1-success>
            <img src="@/assets/images/equipment/2.png" alt="">
          </div>
          <div class="camera1" v-else v-popover:popover1-error>
            <img src="@/assets/images/equipment/6.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover2-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>摄像头</div>
            <div>1002</div>
            <div>状态：<span class="success">●</span>正常</div>
          </el-popover>
          <el-popover ref="popover2-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>摄像头</div>
            <div>1002</div>
            <div>状态：<span class="red">●</span>损坏</div>
          </el-popover>
          <div class="camera2"  v-if="camera[1]" v-popover:popover2-success>
            <img src="@/assets/images/equipment/2.png" alt="">
          </div>
          <div class="camera2" v-else v-popover:popover2-error>
            <img src="@/assets/images/equipment/6.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover3-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>摄像头</div>
            <div>1003</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover3-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>摄像头</div>
            <div>1003</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="camera3"  v-if="camera[2]" v-popover:popover3-success>
            <img src="@/assets/images/equipment/2.png" alt="">
          </div>
          <div class="camera3" v-else v-popover:popover3-error>
            <img src="@/assets/images/equipment/6.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover4-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>摄像头</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover4-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>摄像头</div>
            <div>1004</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="camera4"  v-if="camera[3]" v-popover:popover4-success>
            <img src="@/assets/images/equipment/2.png" alt="">
          </div>
          <div class="camera4" v-else v-popover:popover4-error>
            <img src="@/assets/images/equipment/6.png" alt="">
          </div>
        </div>
      </div>
      <!-- 人脸卡口 -->
      <div v-show="faceStatus">
        <div class="img">
          <el-popover ref="popover-face1-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-face1-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="face1"  v-if="face[0]" v-popover:popover-face1-success>
            <img src="@/assets/images/equipment/4.png" alt="">
          </div>
          <div class="face1" v-else v-popover:popover-face1-error>
            <img src="@/assets/images/equipment/8.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover-face2-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-face2-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="face2"  v-if="face[1]" v-popover:popover-face2-success>
            <img src="@/assets/images/equipment/4.png" alt="">
          </div>
          <div class="face2" v-else v-popover:popover-face2-error>
            <img src="@/assets/images/equipment/8.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover-face3-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-face3-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="face3"  v-if="face[2]" v-popover:popover-face3-success>
            <img src="@/assets/images/equipment/4.png" alt="">
          </div>
          <div class="face3" v-else v-popover:popover-face3-error>
            <img src="@/assets/images/equipment/8.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover-face4-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-face4-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="face4"  v-if="face[3]" v-popover:popover-face4-success>
            <img src="@/assets/images/equipment/4.png" alt="">
          </div>
          <div class="face4" v-else v-popover:popover-face4-error>
            <img src="@/assets/images/equipment/8.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover-face5-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-face5-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="face5"  v-if="face[4]" v-popover:popover-face5-success>
            <img src="@/assets/images/equipment/4.png" alt="">
          </div>
          <div class="face5" v-else v-popover:popover-face5-error>
            <img src="@/assets/images/equipment/8.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover-face6-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-face6-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="face6"  v-if="face[5]" v-popover:popover-face6-success>
            <img src="@/assets/images/equipment/4.png" alt="">
          </div>
          <div class="face6" v-else v-popover:popover-face6-error>
            <img src="@/assets/images/equipment/8.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover-face7-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-face7-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="face7"  v-if="face[6]" v-popover:popover-face7-success>
            <img src="@/assets/images/equipment/4.png" alt="">
          </div>
          <div class="face7" v-else v-popover:popover-face7-error>
            <img src="@/assets/images/equipment/8.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover-face8-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-face8-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="face8"  v-if="face[7]" v-popover:popover-face8-success>
            <img src="@/assets/images/equipment/4.png" alt="">
          </div>
          <div class="face8" v-else v-popover:popover-face8-error>
            <img src="@/assets/images/equipment/8.png" alt="">
          </div>
        </div>
      </div>
      <!-- wifi采集 -->
      <div v-show="wifiStatus">
        <div class="img">
          <el-popover ref="popover-wifi1-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-wifi1-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="wifi1"  v-if="wifi[0]" v-popover:popover-wifi1-success>
            <img src="@/assets/images/equipment/1.png" alt="">
          </div>
          <div class="wifi1" v-else v-popover:popover-wifi1-error>
            <img src="@/assets/images/equipment/5.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover-wifi2-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-wifi2-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>人脸卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="wifi2"  v-if="wifi[1]" v-popover:popover-wifi2-success>
            <img src="@/assets/images/equipment/1.png" alt="">
          </div>
          <div class="wifi2" v-else v-popover:popover-wifi2-error>
            <img src="@/assets/images/equipment/5.png" alt="">
          </div>
        </div>
      </div>
      <!-- 车辆卡口 -->
      <div v-show="carStatus">
        <div class="img">
          <el-popover ref="popover-car1-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>车辆卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-car1-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>车辆卡口</div>
            <div>1001</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="car1"  v-if="car[0]" v-popover:popover-car1-success>
            <img src="@/assets/images/equipment/3.png" alt="">
          </div>
          <div class="car1" v-else v-popover:popover-car1-error>
            <img src="@/assets/images/equipment/7.png" alt="">
          </div>
        </div>
        <div class="img">
          <el-popover ref="popover-car2-success" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>车辆卡口</div>
            <div>1004</div>
            <div>状态： <span class="success">●</span> 正常 </div>
          </el-popover>
          <el-popover ref="popover-car2-error" placement="right" width="100" trigger="hover" :visible-arrow="false">
            <div>车辆卡口</div>
            <div>1002</div>
            <div>状态： <span class="red">●</span> 损坏 </div>
          </el-popover>
          <div class="car2"  v-if="car[1]" v-popover:popover-car2-success>
            <img src="@/assets/images/equipment/3.png" alt="">
          </div>
          <div class="car2" v-else v-popover:popover-car2-error>
            <img src="@/assets/images/equipment/7.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="ctrl-equipments">
      <ul class="indexBottom">
        <li v-for="(item, index) in list" :key="index" :class="{ active: item.name == typeNow }" @click="changeType(item.name)">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import img1 from '@/assets/img/v1.jpg';
  import img2 from '@/assets/img/v2.jpg';
  import imgHouse from '@/assets/img/house.png'

  export default {
    name: "village",
    data () {
      return {
        img1,
        img2,
        imgHouse,
        scale: 1,
        left: 0,
        top: 0,
        imgWidth: 0,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        rate: document.documentElement.clientHeight / document.documentElement.clientWidth,
        canWheel: true,
        camera: [true, false, true, false],
        face: [true, false, true, false, true, false, true, false],
        car: [true, false],
        wifi: [true, false],
        list: [
          { name: '全部设备' },
          { name: '人脸卡口' },
          { name: '摄像机' },
          { name: '车辆卡口' },
          { name: 'wifi采集器' }
          // { name: '感知设备' }
        ],
        typeNow: '全部设备',
        cameraStatus: true,
        faceStatus: true,
        wifiStatus: true,
        carStatus: true
      }
    },
    computed: {
      imgUrl () {
        if (this.scale > 1.7) {
          return this.img2;
        } else {
          return this.img1;
        }
      }
    },
    methods: {
      jumpToHouse() {
        window.location.href = '/houseDetails'
      },
      changeType (item) {
        if (item === '全部设备') {
          this.cameraStatus = true
          this.faceStatus = true
          this.wifiStatus = true
          this.carStatus = true
        }
        if (item === '人脸卡口') {
          this.faceStatus = true
          this.cameraStatus = false
          this.wifiStatus = false
          this.carStatus = false
        }
        if (item === '摄像机') {
          this.cameraStatus = true
          this.faceStatus = false
          this.wifiStatus = false
          this.carStatus = false
        }
        if (item === 'wifi采集器') {
          this.wifiStatus = true
          this.faceStatus = false
          this.cameraStatus = false
          this.carStatus = false
        }
        if (item === '车辆卡口') {
          this.carStatus = true
          this.faceStatus = false
          this.cameraStatus = false
          this.wifiStatus = false
        }
        this.typeNow = item;
      }
    },
    mounted () {
      // 图片预加载
      let img = document.createElement('img');
      img.src = this.img1;

      let img2 = document.createElement('img');
      img2.src = this.img2;

      this.imgWidth = document.documentElement.clientWidth;

      let dom = this.$refs.wrap;
      // 鼠标滚轮缩小放大事件
      (function (callBack) {
        if (document.mozFullScreen === undefined) {
          dom.onmousewheel = (ev) => {
            if (!this.canWheel) {
              return;
            }
            callBack(ev.wheelDelta > 0)
          }
        } else {
          dom.addEventListener("DOMMouseScroll", (ev) => {
            if (!this.canWheel) {
              return;
            }
            callBack(ev.detail < 0)
          });
        }
      }).call(this, ((isEnlarge) => {
        let changeX,changeY,newWidth;
        if (isEnlarge) {
          if (this.scale >= 3) {
            this.scale = 3
          } else {
            this.scale += 0.1;
            changeX = -this.width * 0.05;
            changeY = -this.width * this.rate * 0.05;

            newWidth = this.width * this.scale;
            this.imgWidth = newWidth;
            this.left += changeX;
            this.top += changeY;
          }
        } else {
          if (this.scale <= 1) {
            this.scale = 1;
          } else {
            //寻找多余部分比例
            let v = this.left / (this.width * (this.scale - 1));
            let v2 = this.top / (this.width * this.rate * (this.scale - 1));
            v = v ? -v : 0;
            v2 = v2 ? -v2 : 0;

            this.scale -= 0.1;

            changeX = this.width * v * 0.1;
            changeY = this.width * this.rate * v2 * 0.1;

            newWidth = this.width * this.scale;
            this.imgWidth = newWidth;

            this.left += changeX;
            this.top += changeY;
          }
        }
      }));

      // 鼠标拖动事件
      (() => {
        // initX,initY点击时wrap初始位置，pageX,pageY点击时鼠标位置,
        let initX, initY, difWidth, difHeight, pageX, pageY;
        dom.addEventListener('mousedown', (ev) => {
          this.canWheel = false;

          difWidth = this.width * (this.scale - 1) ;
          difHeight = this.width * (this.scale - 1) * this.rate;

          initX = this.left;
          initY = this.top;

          pageX = ev.x;
          pageY = ev.y;

          dom.onmousemove = (event) => {
            let l = initX + (event.x - pageX);
            let t = initY + (event.y - pageY);

            // 范围限定
            if (l > 0) {
              this.left = 0
            } else if (l < -difWidth) {
              this.left = -difWidth
            } else {
              this.left = l;
            }

            if (t > 0) {
              this.top = 0
            } else if (t < -difHeight) {
              this.top = -difHeight
            } else {
              this.top = t;
            }

            return false;
          }
          return false;
        })

        dom.addEventListener('mouseup', () => {
          this.canWheel = true;
          dom.onmousemove = null;
        })

      }).call(this);
    }
  }
</script>

<style scoped>
  .box{
    background: #1f273b;
    overflow: hidden;
    position: relative;
    cursor: crosshair;
  }
  .wrap{
    position: absolute;
  }
  .imgHouse{
    cursor: pointer;
    position: absolute;
    top:42.4%;
    left:59.8%;
    width: 7%;
    padding-bottom: 9.3%;
    background: url(../assets/img/house.png) no-repeat;
    background-size: 100%;
  }
  .imgHouse:hover{
    background: url(../assets/img/house_active.png) no-repeat;
    background-size: 100%;
  }
  .circleImg{
    position: absolute;
    top:5%;
    left:19%;
    width:78%;
  }
  .imgTitle{
    position: absolute;
    top:13%;
    left: 43%;
    width:25%;
  }
  .indexBottom{
    position: absolute;
    bottom: 33px;
    left: 650px;
    display: flex;
    font-size: 16px;
  }
  .indexBottom li{
    width:112px;
    height:44px;
    margin-right: 22px;
    border-radius: 22px;
    text-align: center;
    line-height: 40px;
    background: rgba(255,255,255,0.1);
    border: 2px solid transparent;
    color:#fff;
    cursor: pointer;
    /* box-sizing: border-box; */
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
    /* position: relative; */
    transition: .5s;
  }
  .indexBottom li.active{
    border: 2px solid #01cdfe;
    /* width:170px; */
    background: rgba(3,223,255,0.05);
    box-shadow: 0 0 3px 0 rgba(45,213,255,0.3);
  }
  .indexBottom li:hover{
    /* width:170px; */
    border: 2px solid #01cdfe;
    background: rgba(3,223,255,0.05);
    box-shadow: 0 0 3px 0 rgba(45,213,255,0.3);
  }
</style>

<style>
  .ctrl-equipments {
    position: absolute;
    z-index: 999;
    color: #fff;
    bottom: 20px;
    font-size: 20px;
  }
  .el-popover {
    background: #000000;
    color: #fff;
    border: none;
  }
  .red {
    color: rgb(255,78,0);
  }
  .success {
    color: rgb(0,210,255);
  }
  .equipments {
    position: relative;
  }
  .equipments .img {
    height: 170px;
    width: 20px;
    z-index: 9999;
    float: left;
  }
  .equipments .img img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .equipments .img>div {
    position: relative;
    display: inline;
  }
  .car1 {
    margin-left: 7.9rem;
    top: 1.6rem;
  }
  .car2 {
    margin-left: 8.9rem;
    top: 6.2rem;
  }
  .wifi1 {
    margin-left: 7.7rem;
    top: 2.4rem;
  }
  .wifi2 {
    margin-left: 9.5rem;
    top: 5.4rem;
  }
  .camera1 {
    margin-left: 11.4rem;
    top: 1.6rem;
  }
  .camera2 {
    margin-left: 10.1rem;
    top: 2.6rem;
  }
  .camera3 {
    margin-left: 11.3rem;
    top: 5.4rem;
  }
  .camera4 {
    margin-left: 10.4rem;
    top: 6.4rem;
  }
  .face1 {
    margin-left: 9.6rem;
    top: 1.9rem;
  }
  .face2 {
    margin-left: 9.5rem;
    top: 2.4rem;
  }
  .face3 {
    margin-left: 9.8rem;
    top: 1.9rem;
  }
  .face4 {
    margin-left: 9.8rem;
    top: 2.5rem;
  }
  .face5 {
    margin-left: 9.4rem;
    top: 5.5rem;
  }
  .face6 {
    margin-left: 9.6rem;
    top: 5.6rem;
  }
  .face7 {
    margin-left: 9.6rem;
    top: 5.9rem;
  }
  .face8 {
    margin-left: 9rem;
    top: 6rem;
  }
</style>
