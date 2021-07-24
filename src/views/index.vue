<template>
  <div class="container">
    <el-backtop></el-backtop>
    <hr style="background-color:#50cf96">
    <!-- 轮播图 -->
    <template>
      <el-carousel indicator-position="outside"
                   height="500px"
                   style="margin-top:70px"
                   type="card">
        <el-carousel-item v-for="item in imgs"
                          :key="item.url">
          <img :src="item.url"
               alt="暂无图片">
        </el-carousel-item>
      </el-carousel>
    </template>

    <div class="header-shop">
      <h2 class="title">
        - 全部商品
      </h2>
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               text-color="#8D8D8D"
               active-text-color="#50cf96">
        <el-menu-item index="1">全部</el-menu-item>
        <el-menu-item index="2">图书教材</el-menu-item>
        <el-menu-item index="3">数码产品</el-menu-item>
        <el-menu-item index="4">美妆衣物</el-menu-item>
        <el-menu-item index="5">运动棋牌</el-menu-item>
        <el-menu-item index="6">票劵小物</el-menu-item>
        <el-menu-item index="7">文具办公</el-menu-item>
        <el-menu-item index="8">校园代步</el-menu-item>
        <!-- <el-menu-item index="全部">全部</el-menu-item>
        <el-menu-item index="图书教材">图书教材</el-menu-item>
        <el-menu-item index="数码产品">数码产品</el-menu-item>
        <el-menu-item index="美妆衣物">美妆衣物</el-menu-item>
        <el-menu-item index="运动棋牌">运动棋牌</el-menu-item>
        <el-menu-item index="票劵小物">票劵小物</el-menu-item>
        <el-menu-item index="文具办公">文具办公</el-menu-item>
        <el-menu-item index="校园代步">校园代步</el-menu-item> -->
      </el-menu>
    </div>
    <div class="content">
      <el-row type="flex"
              :gutter="15">
        <el-col :span="7"
                v-for="(item, index) in goodsList"
                :key="index">
          <el-card :body-style="{ padding: '0px' }"
                   shadow="hover">
            <div @click="goodsDetail(item)">
              <el-image class="pro-img"
                        :src="url + item.goodsImg"
                        fit="contain" />
              <div class="pro-name">{{item.goodsName}}</div>
              <div class="pro-realPrice">原价：{{item.goodsOriginalprice}}元</div>
              <div class="pro-price">现价：{{item.goodsPrice}}元</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="header-notice">
      <h2 class="title">
        - 平台公告
      </h2>
    </div>
    <el-row type="flex"
            :gutter="15">
      <el-col :span="14">
        <el-card shadow="always"
                 class="card-notice">
          <h3>二手商场上线啦！</h3>
          校园二手商城上线啦：环保公益两不误，与你相约在校园二手商城。
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card shadow="always"
                 class="card-notice">
          <h3>管理员还未发布公告！</h3>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Utils from '@/utils/util.js'

export default {
  data () {
    return {
      activeIndex: '1',
      url: 'http://localhost:8010/',

      imgs: [{ url: require('@/assets/imgs/1.png') },
        { url: require('@/assets/imgs/2.jpg') },
        { url: require('@/assets/imgs/3.jpg') },
        { url: require('@/assets/imgs/4.jpg') }
      ],

      user: {},

      queryInfo: {
        queryType: 0,
        query: '',
        current: 1,
        limit: 9
      },
      goodsList: []
    }
  },
  created () {
    this.getGoods()
    this.initSetTimeout()
  },

  mounted () {
    var that = this
    Utils.$on('query', function (queryInfo) {
      console.log(queryInfo)
      that.queryInfo = queryInfo
      console.log(that.queryInfo)
      that.getGoods()
    })
  },

  methods: {
    initSetTimeout () {
      setInterval(() => {
        this.getGoods()
      }, 5000)
    },
    handleSelect (key, keyPath) {
      console.log('key:' + key)
      if (parseInt(key) === 1) {
        this.queryInfo.query = ''
        this.getGoods()
      } else {
        this.queryInfo.query = key
        this.queryInfo.queryType = 1
        this.getGoods()
      }
    },

    async getGoods () {
      const res = await this.$http.get('goods', { params: this.queryInfo })

      if (res.data.code === 200) {
        // 1.给表格数据复制
        this.goodsList = res.data.data.records

        // 判断是否被上架
        this.isPublish()
        console.log(this.goodsList)
        // 2.给total赋值
        this.total = res.data.data.total
        //
      } else {
        this.$message.warning(res.data.message)
      }
    },

    isPublish () {
      for (let i = 0; i < this.goodsList.length; i++) {
        if (this.goodsList[i].goodsStatus === 1) {
          this.goodsList.splice(i, 1)
          i--
        }
      }
    },

    goodsDetail (product) {
      localStorage.removeItem('product')
      localStorage.setItem('product', JSON.stringify(product))
      this.$router.push({
        path: '/product'
        // query: { product: res }
      })
    }

  }
}
</script>

<style lang="scss">
.el-carousel__item img {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  height: 500px;
  width: 759.6px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
h3 {
  font-size: 22px;
}
.header-shop {
  margin-bottom: 50px;
}
.header-notice {
  margin-top: 70px;
}
.title {
  font-size: 30px;
  margin-left: 20px;
}
.content {
  padding: 0 50px;
  .pro-img {
    margin-top: 10px;
    width: 100%;
    height: 260px;
  }
  .pro-name {
    font-weight: bold;
    font-size: 20px;
    margin-top: 50px;
    margin-bottom: 20px;
    color: black;
    text-align: center;
  }
  .pro-realPrice {
    margin: 30px 0 10px 0;
    color: black;
    font-size: 20px;
    text-align: center;
  }
  .pro-price {
    margin: 10px 0 15px 0;
    font-size: 20px;
    color: red;
    text-align: center;
  }
}
.card-notice {
  margin: 10px 100px 20px 100px;
  height: 300px;
}
// .content {
//   top: 100px;
//   left: 0;
//   width: 1226px;
//   height: 0;
//   position: relative;
//   // overflow: hidden;
//   .children {
//     left: 150px;
//     float: left;
//     width: 25%;
//     height: 400px;
//     font-size: 30px;
//     line-height: 12px;
//     text-align: center;
//     transition: width 0.6s ease 0s, height 0.3s ease-in 1s;
//     a {
//       // a是行内标签，要设置成块级，这样a包括的内容会撑开a，易于检查
//       display: inline-block;
//     }
//     img {
//       width: 230px;
//       margin-top: 26px;
//     }
//     .pro-a {
//       width: 250px;
//     }
//
//   }
//   // .children:hover {
//   //   width: 300px;
//   //   height: 300px;
//   // }

//   // 会使a标签无法点击
//   // .children:hover::before {
//   //   content: '';
//   //   width: 100%;
//   //   height: 100%;
//   //   border: 5px solid rgba(0, 0, 0, 0.3);
//   //   display: block; /* 伪元素属于行内元素，需要转换 */
//   //   position: absolute;
//   //   top: 0;
//   //   left: 0;
//   //   box-sizing: border-box;
//   // }
// }
</style>
