<template>
  <div class="home-new">
    <HomePanel title="小兔鲜秒杀" sub-title="品质靠谱 假一赔十">
      <template #right><XtxMore path="/" /></template>
      <!--秒杀时间-->
      <TimeCon :itemTime="a" @get-time="getTime">
        <div ref="target" style="position: relative;height: 426px;">
          <!-- 面板内容 -->
          <Transition name="fade">
            <ul v-if="goods.length" class="goods-list">
              <li v-for="item in goods" :key="item.id">
                <RouterLink :to="`/productSeckill/${item.startTime}/${item.seckillId}`"> <!--${item.id}-->
                  <img :src="item.smallPic" alt="">
                  <p class="name ellipsis">{{item.name}}</p>
                  <p class="price">
                    <b class='sec-price'>￥{{item.price}}</b>
                    <b class='ever-price'>￥{{item.oldPrice}}</b>
                    <!-- &yen;{{item.price}} -->
                  </p>
                  <div class='num'>
                    <div style="display:flex;align-items:center;height:30px;width:100%">
                      <span>已售 {{item.salesPer}}%</span>
                      <el-progress style="width:60%;padding-left:10%" color="red" :percentage="item.salesPer" :show-text="false" :stroke-width="10"></el-progress>
                    </div>
                    <div>剩余<b class='owned'>{{item.inventory}}</b>件</div>
                  </div>
                  <a class='sui-btn btn-block btn-buy' href='seckill-item.html' target='_blank'>立即抢购</a>
                </RouterLink>
              </li>
            </ul>
            <HomeSkeleton bg="#f0f9f4" v-else />
          </Transition>
        </div>
      </TimeCon>
    </HomePanel>
  </div>
</template>
<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { getReTime, getTimeGoods } from '@/api/home'
// import { useLazyData } from '@/hooks'
import TimeCon from '@/components/timeCon.vue'
import { ElProgress } from 'element-plus'
import 'element-plus/dist/index.css'

export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton, TimeCon, ElProgress },
  setup () {
    // const { target, result } = useLazyData(findNew)
    // console.log(result)
    const goods = ref([])
    // const reTarget = ref(target)
    const reTarget = ref(null)
    const getTime = (newTime) => {
      getTimeGoods(newTime).then((v) => {
        goods.value = v
        // goods.value = v.result
      })
    }
    // console.log(reGoods)
    // const goods = getTime.result()
    // const target = getTime.target()
    // const goods = ref([])
    // findNew().then(data => {
    //   goods.value = data.result
    // })
    // 1. target 去绑定一个监听对象,最好的DOM
    // 2. 传入API函数，内部获取调用，返回就是响应式数据
    // const a = ['2022-01-30 23:00:59', '2022-01-31 12:59:59', '2022-02-05 16:59:59', '2022-02-05 18:59:59', '2022-02-05 20:59:59']
    var a = []
    getReTime().then((v) => {
      // console.log(v)
      for (let index = 0; index < v.length; index++) {
        a.push(v[index])
      }
      getTimeGoods(v[0]).then((v) => {
        goods.value = v
        // goods.value = v.result
      })
    })
    return { goods, target: reTarget, a, getTime }
  }
}
</script>
<style scoped lang="less">
.progress-danger .bar {
          background-color: #ed282e;
        }
.goods-list {
  // flex-wrap: wrap;
  display: flex;
  // justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 206px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 20px;
      text-align: left;
    }
    .price {
      color: @priceColor;
    }
    .price .sec-price {
      font-size: 22px;
      color: #e60012;
    }
    .price .ever-price {
      padding-left: 10px;
      font-size: 14px;
      color: #a4a4a4;
      text-decoration: line-through;
    }
    .num {
      padding: 0 10px;
      height: 60px;
      // div {
      //   display: inline-block;
      // }
      .progress {
        width: 55%;
        margin: 0 5px;
        .sui-progress {
          margin-bottom: 0;
          width: 100%;
          height: 12px;
        }
      }
      .owned {
        font-size: 16px;
        color: #e12228;
      }
    }
    .btn-buy {
      padding: 5px 112px;
      margin-top: 10px;
      font-size: 20px;
      border: 0;
      border-radius: 0;
      background-color: @xtxColor;
      color: #fff;
    }
  }
}
</style>
