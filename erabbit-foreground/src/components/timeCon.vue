<template>
  <!-- <div class="viewallItem_top_l_b_time">
    {{ dataTime.day }}天
    <span class="viewallItem_top_l_b_timesty">{{ dataTime.hour }}</span>
    :
    <span class="viewallItem_top_l_b_timesty">{{ dataTime.min }}</span>
    :
    <span class="viewallItem_top_l_b_timesty">{{ dataTime.second }}</span>
  </div> -->
  <div class="index">
    <div class="sectime" style="height: 70px">
        <div v-for="(item,index) in dataTime" :key="item.timeStr" class="item-time" v-bind:class="{'active': currentSort == index}" @click="show(item.timeStr,index)">
          <div class="time-clock">{{item.startTime}}</div>
          <div v-if="currentSort == index" class="time-state-on">
            <div v-if="item.type === 2">
              <span class="on-text">活动已结束</span>
              <span class="on-over">距离开始：{{item.reTime}}</span>
            </div>
            <div v-if="item.type === 1">
              <span class="on-text">快抢中</span>
              <span class="on-over">距离结束：{{item.reTime}}</span>
            </div>
            <div v-if="item.type === 0">
              <span class="on-text">即将开始</span>
              <span class="on-over">距离开始：{{item.reTime}}</span>
            </div>
          </div>
          <div v-else>
            <div class="time-state-will">
              <span v-if="item.type === 0">即将开始</span>
              <span v-if="item.type === 1">进行中</span>
              <span v-if="item.type === 2">已结束</span>
            </div>
          </div>
        </div>
    </div>
      <!-- 默认插槽，面板内容 -->
    <slot />
  </div>
</template>
<script>
import { ref } from 'vue'
import countTimeFun from './library/showTime'
export default {
  props: {
    itemTime: {
      type: Array,
      default: () => []
    }
  },
  // data () {
  //   return {
  //     dataTime: [],
  //     currentSort: 0
  //   }
  // },

  // mounted () {
  //   // console.log(this.itemTime)
  //   countTimeFun(this.TimeNum, this.itemTime)
  // },
  // methods: {
  //   // show (key, index) {
  //   //   console.log(key)
  //   //   this.currentSort = index
  //   // },
  //   // 时间计算
  //   // TimeNum (val) {
  //   //   this.dataTime = val
  //   //   // console.log(val,"倒计时组件时间计算");
  //   //   return val
  //   // }
  // },
  setup (props, { emit }) {
    const currentSort = ref(0)
    const dataTime = ref([])
    // console.log(props.itemTime)
    const TimeNum = (val) => {
      dataTime.value = val
      // console.log(val,"倒计时组件时间计算");
      return val
    }
    countTimeFun(TimeNum, props.itemTime)
    const show = (key, index) => {
      // console.log(key)
      currentSort.value = index
      emit('get-time', key)
    }
    return { currentSort, show, dataTime }
  }
}
</script>
<style scoped lang='less'>
.row-405 {
  width: 405px;
}
.row-225 {
  width: 225px;
}
.row-165 {
  width: 165px;
}
.row-330 {
  width: 330px;
}
.row-220 {
  width: 220px;
}
.row-218 {
  width: 218px;
}
a {
  color: #666;
}
.index .sectime .item-time {
  float: left;
  vertical-align: middle;
  margin-left: 2.5px;
  padding: 10px 0;
  width: 245px;
  height: 65px;
  line-height: 40px;
  *line-height: 42px;
  _line-height: 42px;
  color: #fff;
  background-color: #4e4e4e;
}
.index .sectime .item-time.active {
  line-height: 21px;
  background: @xtxColor;
}
.index .sectime .item-time:first-child {
  margin-left: 0;
}
.index .sectime .item-time div {
  overflow: hidden;
  *float: left;
  vertical-align: middle;
}
.index .sectime .item-time.active .time-clock {
  *padding-top: 10px;
  _padding-top: 10px;
  *line-height: 20px;
  _line-height: 20px;
}
.index .sectime .item-time .time-clock {
  float: left;
  padding-left: 25px;
  padding-right: 10px;
  line-height: 40px;
  font-size: 18px;
  font-weight: 700;
}
.index .sectime .item-time .time-state-on span {
  display: block;
}
.index .sectime .item-time .time-state-on .on-text {
  font-size: 14px;
}
.index .sectime .item-time .time-state-on .on-over {
  font-size: 12px;
}
.index .sectime .item-time .time-state-will span {
  padding: 4px 10px;
  *padding-top: 0;
  _padding-top: 0;
  border: 1px solid #9e9e9e;
  border-radius: 10px;
  color: #9e9e9e;
}
.goods-list {
  margin-bottom: 30px;
}
.goods-list ul.seckill {
  margin-left: -10px;
}
.goods-list ul li {
  display: inline-block;
  margin-left: 10px;
  margin-top: 10px;
  width: 287px;
  line-height: 26px;
  list-style-type: none;
  cursor: pointer;
  border: 1px solid transparent;
}
.border {
  border-color: #555;
}
.goods-list ul li.border {
  border: 1px solid #b1191a;
}
.goods-list .seckill-item .intro {
  padding: 0 10px;
  font-size: 14px;
  color: #666;
}
.goods-list .seckill-item .price {
  padding: 0 10px;
}
.goods-list .seckill-item .price .sec-price {
  font-size: 22px;
  color: #e60012;
}
.goods-list .seckill-item .price .ever-price {
  font-size: 14px;
  color: #a4a4a4;
  text-decoration: line-through;
}
.goods-list .seckill-item .num {
  padding: 0 10px;
}
.goods-list .seckill-item .num div {
  display: inline-block;
}
.goods-list .seckill-item .num .progress {
  width: 55%;
  margin: 0 5px;
}
.goods-list .seckill-item .num .sui-progress {
  margin-bottom: 0;
  width: 100%;
  height: 12px;
}
.progress-danger .bar {
  background-color: #ed282e;
}
.goods-list .seckill-item .num .owned {
  font-size: 16px;
  color: #e12228;
}
.goods-list li.seckill-item .btn-buy {
  padding: 15px 0;
  margin-top: 10px;
  font-size: 20px;
  border: 0;
  border-radius: 0;
  background-color: #ff713f;
  color: #fff;
}
.cd-top {
  position: fixed;
  right: 13%;
  bottom: 25%;
  z-index: 100;
  text-align: center;
  color: #fff;
  background-color: #ff713f;
}
.cd-top .top {
  padding: 5px;
  background-color: #ff713f;
  cursor: pointer;
}
.top b {
  display: block;
  margin-top: -5px;
  color: #fff;
  font-size: 16px;
  line-height: 26px;
}
.cd-top .code {
  border-top: 1px solid #fff;
  padding: 10px 20px;
  cursor: pointer;
}
.cd-top .erweima {
  display: none;
  position: fixed;
  right: 17.5%;
  z-index: 200;
  bottom: 19%;
  border: 2px solid #b1191a;
}
.cd-top .erweima s {
  position: absolute;
  right: -15px;
  top: 39%;
  border-width: 7px;
  border-style: solid;
  border-color: transparent transparent transparent #b1191a;
  z-index: 4;
}

</style>
