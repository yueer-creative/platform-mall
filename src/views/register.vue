<template>
  <div class="login-wrap">
    <el-form class="login-form"
             label-position="top"
             label-width="80px"
             :model="formdata"
             :rules="registerRules">
      <h2>用户注册</h2>
      <el-form-item label="用户名"
                    prop="userName">
        <el-input v-model="formdata.userName"
                  autocomplete="off"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="userPwd">
        <el-input v-model="formdata.userPwd"
                  autocomplete="off"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="电话"
                    prop="userAccount">
        <el-input v-model="formdata.userAccount"
                  autocomplete="off"
                  placeholder="请输入内容，您的电话将作为账号"></el-input>
      </el-form-item>
      <el-button class="register-btn"
                 type="warning"
                 @click.prevent="register()">
        <font color="white">完成注册</font>
      </el-button>
      <el-button class="back-btn"
                 type="primary"
                 @click.prevent="handleBack()">
        <font color="white">返回首页</font>
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      registerRules: {
        userName: [
          { required: true, message: '用户为必填项', trigger: 'blur' },
          { min: 5, max: 12, message: '长度为5~12', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 6, max: 10, message: '长度为6~10个字符', trigger: 'blur' }
        ],
        userAccount: [
          { required: true, message: '电话为必填项', trigger: 'blur' },
          { min: 11, max: 11, message: '长度11个字符', trigger: 'blur' }
        ]
      },
      formdata: {
        userAccount: '',
        userPwd: '',
        userName: ''
      }
    }
  },
  beforeCreate () {
    localStorage.clear()
  },
  methods: {
    async register () {
      const res = await this.$http.post('/register', this.formdata)
      // console.log(res.data)
      if (res.data.code === 200) {
        // 1. 跳转home
        this.$router.push({
          name: 'login'
        })
        // 提示成功
        this.$message.success(res.data.message)
      } else {
        // 不成功
        this.$message.warning(res.data.message)
      }
    },
    handleBack () {
      this.$router.push('index')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}

.login-wrap .register-btn {
  margin-top: 10%;
  height: 60px;
  width: 45%;
}
.login-wrap .back-btn {
  margin-top: 10%;
  margin-left: 40px;
  height: 60px;
  width: 45%;
}
</style>
