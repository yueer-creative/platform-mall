<template>
  <el-container class="container">

    <el-aside class="aside"
              width="200px">
      <!-- 侧边栏  -->
      <div class="aside-span">
        <span class="span-title">
          <font color="#ffffff">个</font><font color="#3BEBCA">人</font>
          <font color="#ffffff">中心</font>
        </span>
      </div>

      <!-- 开启路由模式 -->
      <el-menu :unique-opened="true"
               :router="true"
               default-active="/user/published">
        <!-- 1 -->
        <!-- <el-submenu index="1">

          <template slot="title">
            <i class="el-icon-s-custom menu-icon"></i>
            <span>用户管理</span>
          </template>

          <el-menu-item index="/user/detail">
            <i class=""></i>
            <span>个人详情</span>
          </el-menu-item>

        </el-submenu> -->

        <!-- 2 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-shop menu-icon"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/user/published">
            <i class=""></i>
            <span>已发布的</span>
          </el-menu-item>
          <el-menu-item index="/user/purchased">
            <i class=""></i>
            <span>已购买的</span>
          </el-menu-item>
        </el-submenu>

        <!-- 3 -->
        <el-menu-item index="/user/star">
          <i class="el-icon-star-on menu-icon"></i>
          <span slot="title">收藏夹</span>
        </el-menu-item>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <span>
          {{this.user.userName}}
        </span>
        <el-dropdown>
          <i class="el-icon-setting"
             style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>编辑个人信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a class="back"
           @click.prevent="handleBack()"
           href="#">
          <span>返回</span></a>
        <a class="loginout"
           @click.prevent="handleLoginout()"
           href="#">退出</a>

      </el-header>
      <!-- 主题内容  -->
      <el-main class="main">
        <router-view>
        </router-view>
      </el-main>
    </el-container>

  </el-container>

</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
  },
  methods: {
    handleLoginout () {
      // 1.清理token
      localStorage.clear()
      // 2.提示
      this.$message.success('退出成功')
      // 3.返回登录页
      this.$router.push({ name: 'login' })
    },
    handleBack () {
      this.$router.push('/index')
    }
  }

}
</script>

<style lang="scss">
.container {
  height: 100%;
}
.el-header {
  //background-color: #b3c0d1;
  background-color: #dbe0ec;
  color: #333;
  text-align: right;
  line-height: 60px;
}
.el-aside {
  // background-color: #d3dce6;
  // background-color: #D4E6FD;
  background-color: #99BBE9;
  color: #333;
  text-align: center;
  line-height: 200px;
  .aside-span {
    line-height: 60px;
    height: 60px;
    .span-title {
      font-size: 25px;
      font-weight: 600;
    }
  }
}

.el-main {
  background-color: #eff1f7;
  color: #333;
  text-align: center;
  /* line-height 会影响其中表格表头的高度 */
  line-height: 20px;
}
.loginout {
  margin-left: 6px;
  padding: 3px 15px 3px 15px;
  text-decoration: none;
  border-radius: 10px;
  background-color: #ffffff;
  color: rgb(105, 105, 105);
}
.middle {
  line-height: 20px;
  text-align: center;
}
.menu-icon {
  margin-left: -60px;
}
.back {
  padding: 3px 15px 3px 15px;
  text-decoration: none;
  border-radius: 10px;
  background-color: #ffffff;
  color: rgb(105, 105, 105);
}
</style>
