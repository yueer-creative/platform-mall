<template>
  <el-header>
    <el-row>
      <el-col :span="4">
        <div class="nav_col left">
          <a class="a_logo"
             href="/index">
            S<font color="#50CF96">H</font>OP
          </a>
        </div>
      </el-col>

      <el-col :span="16">
        <div class="nav_col center">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable
                    @clear="reload()"
                    class="input-search">
          </el-input>
          <el-button slot="
                    append"
                     icon="el-icon-search"
                     @click="searchGoods()">
          </el-button>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="nav_col right">
          <a class="a_user"
             href="javascript:;"
             v-if="isLogin"
             @click="userDetail()">{{getUserName()}}</a>

          <el-button v-if="!isLogin"
                     type="text"
                     @click="login()">登录
            <font color="black">&
            </font>注册
          </el-button>

          <a class="a_loginout"
             href="javascript:;"
             v-if="isLogin"
             @click.prevent="handleLoginout()">退出</a>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import Utils from '@/utils/util.js'

export default {
  name: 'nav-header',
  data () {
    return {
      queryInfo: {
        query: '',
        current: 1,
        limit: 9
      },
      user: {}
    }
  },
  computed: {
    isLogin () {
      if (JSON.parse(localStorage.getItem('user'))) {
        console.log('in')
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    change (e) {
      this.$forceUpdate()
    },
    login () {
      this.$router.push('/login')
    },
    getUser () {
      this.user = JSON.parse(localStorage.getItem('user'))
    },

    getUserName () {
      this.getUser()
      return this.user.userName
    },

    handleLoginout () {
      // 1.清理token
      localStorage.clear()
      // 2.提示
      this.$message.success('退出成功')
      // 3.刷新页面
      this.reload()
    },

    reload () {
      this.searchGoods()
    },

    searchGoods () {
      Utils.$emit('query', this.queryInfo)
    },

    userDetail () {
      const { href } = this.$router.resolve({
        name: 'user'
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style>
.el-header {
  background-color: #f7f7f7;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-button {
  color: #50cf96;
}
.el-button:hover,
.el-button:focus {
  color: #50cf96;
}

.input-search {
  width: 500px;
}
.a_logo {
  display: block;
  color: black;
  font-size: 40px;
  font-weight: 600;
}
.a_user {
  color: #50cf96;
  font-size: 27px;
  font-weight: 600;
}
.a_loginout {
  margin-left: 15px;
  color: black;
  padding: 3px 10px 3px 10px;
  border-radius: 10px;
  border: 1px solid#50cf96;
  background-color: #ffffff;
}
</style>
