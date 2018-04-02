<template>
  <div :style="{height: height + 'px'}" class="box">
    <div class="wrap" ref="wrap" :style="{left: this.left + 'px', top: this.top + 'px'}">
      <img :src="imgUrl" :style="{width:imgWidth + 'px'}">
      <img src="../assets/img/circle.png" class="circleImg">
      <img class="imgHouse" @click="jumpToHouse">
      <img src="../assets/img/title.png" class="imgTitle">
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
        canWheel: true
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
</style>