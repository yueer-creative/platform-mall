<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-button style="float: right"
                 type="text">更改个人信息</el-button>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div>
      <div class="user-info">
        <img src="http://localhost:8080/images/icon.png"
             alt="暂无头像"
             class="user-info-img">
        <div class="user-info-name">
          {{this.user.userName}}
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

  </el-card>

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

  }
}
</script>

<style>
.user-info {
  display: inline-block;
  margin-left: -800px;
}
.user-info-img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
}
.user-info-name {
  margin-top: 30px;
  font-size: 30px;
}
</style>
