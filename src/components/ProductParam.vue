<template>
  <div class="nav-bar">
    <div class="container">
      <!-- <div class="pro-title">
        {{product.goodsName}}
      </div> -->
      <div class="border">
        <div class="pro-param">
          <div class="pro-img">
            <img :src="url + product.goodsImg">
          </div>
          <div class="pro-info">
            <h1 style="font-size:40px">{{product.goodsName}}</h1>
            <div style="padding-bottom:10px">
              <span style="font-size:25px;color:#E7503C">￥</span>
              <span style="font-size:25px;color:#E7503C">{{product.goodsPrice}}</span>
              <span style="margin-left:10px">
                <del>￥{{product.goodsOriginalprice}}</del>
              </span>
            </div>
            <h4>
              <el-button type="success"
                         class="info-button"
                         round>发布日期</el-button>{{product.goodsDate}}
            </h4>
            <h4>
              <el-button type="success"
                         class="info-button"
                         round>描述</el-button>{{product.goodsDesc}}
            </h4>
            <el-button type="success"
                       class="info-button"
                       style="font-size:25px;border-radius:40px"
                       @click="handleBuyClick">购买</el-button>
            <el-button type="success"
                       class="info-button"
                       style="font-size:25px;border-radius:40px"
                       @click="handleStarClick">收藏</el-button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件内传参 props中的参数会被绑定到data()里面
  // props: ['product'],
  data () {
    return {
      product: {},
      url: 'http://localhost:8010/'
    }
  },
  name: 'product_param',
  created () {
    this.product = JSON.parse(localStorage.getItem('product'))
    console.log('component', this.product)
  },
  methods: {
    handleBuyClick () {
      const res = JSON.parse(localStorage.getItem('user'))
      console.log(res)

      if (res !== null) {
        if (this.product.goodsUserId === res.userId.toString()) {
          this.$message.warning('您不能购买自己发布的商品!')
        } else {
          // this.offProduct()

          // 弹窗，会出现样式错误
          // this.$alert('购买成功', {
          //   callback: action => {
          //     this.$router.push('/user')
          //   }
          // })
          this.$router.push('/user')
        }
      } else {
        this.$message.warning('请先登录！')
        this.$router.push('/login')
      }
    },
    handleStarClick () {
      const res = JSON.parse(localStorage.getItem('user'))
      console.log(res)

      if (res !== null) {
        if (this.product.goodsUserId === res.userId.toString()) {
          this.$message.warning('您不能收藏自己发布的商品!')
        } else {
          this.$router.push('/user')
        }
      } else {
        this.$message.warning('请先登录！')
        this.$router.push('/login')
      }
    },
    async offProduct () {
      const res = await this.$http.post(`goodsDelete/${this.product.goodsUserId}`)
      console.log(res.data.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.border {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 25px;
  padding-bottom: 138px;
  border: 1px solid #50cf96;
}
.pro-param {
  margin-top: 100px;
  margin-left: 25%;
}
.pro-img {
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, 0.3);
  img {
    width: 310px;
    height: 310px;
    display: inline-block;
  }
}
.pro-info {
  padding-left: 100px;
  display: inline-block;
}
.info-button {
  display: inline-block;
  color: white;
  background: #50cf96;
  margin-right: 17px;
}

.confirm-btn {
  color: white !important;
}
</style>
