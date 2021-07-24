<template>
  <div class="login-wrap">
    <el-form class="login-form"
             label-position="top"
             label-width="80px"
             :model="formdata"
             :rules="loginRules">
      <h2>用户登录</h2>
      <el-form-item label="账号"
                    prop="userAccount">
        <el-input v-model="formdata.userAccount"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="userPwd">
        <el-input v-model="formdata.userPwd" show-password></el-input>
      </el-form-item>
      <el-button class="login-btn"
                 type="primary"
                 @click.prevent="handleLogin()">
        <font color="white">登录</font>
      </el-button>
      <el-button class="register-btn"
                 type="warning"
                 @click.prevent="handleRegister()">
        <font color="white">注册</font>
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginRules: {
        userAccount: [
          { required: true, message: '用户为必填项', trigger: 'blur' },
          { min: 5, max: 12, message: '长度为5~12', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 6, max: 10, message: '长度为6~10个字符', trigger: 'blur' }
        ]
      },
      formdata: {
        userAccount: '',
        userPwd: ''
      }
    }
  },
  beforeCreate () {
    localStorage.removeItem('user')
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('/userLogin', this.formdata)

      console.log(res.data.data.data)

      if (res.data.data.data.userStatus !== 0) {
        this.$message.warning('账号已被锁定，请联系管理员！')
      } else if (res.data.code === 200) {
        // 登录成功
        // 0. 保存token
        localStorage.setItem('user', JSON.stringify(res.data.data.data))
        // 1. 跳转home
        this.$router.push({
          name: 'home'
        })
        // 提示成功
        this.$message.success(res.data.message)
      } else {
        // 不成功
        this.$message.warning(res.data.message)
      }
      // this.$http.post('login', this.formdata).then((res) => {
      //   // console.log(res)
      //   const {
      //     // data,
      //     meta: { msg, status }
      //   } = res.data

      //   if (status === 200) {
      //     // 登录成功
      //     // 1. 跳转home
      //     this.$router.push({
      //       name: 'home'
      //     })
      //     // 提示成功
      //     this.$message.success(msg)
      //   } else {
      //     // 不成功
      //     this.$message.warning(msg)
      //   }
      // })
    },
    handleRegister () {
      this.$router.push('/register')
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

.login-wrap .login-btn {
  margin-top: 10%;
  height: 60px;
  width: 45%;
}
.login-wrap .register-btn {
  margin-top: 10%;
  margin-left: 40px;
  height: 60px;
  width: 45%;
}
</style>
