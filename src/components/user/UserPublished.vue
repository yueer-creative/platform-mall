<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>已发布的</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <!-- <el-row class="search-row">
      <el-col> -->
    <!-- clearable为清除键 -->
    <!-- <el-input placeholder="请输入内容"
                  v-model="queryInfo.query"
                  clearable
                  @clear="loadGoodsList()"
                  class="input-search">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="searchGoods()"></el-button>
        </el-input>
        <el-button type="primary"
                   class="search-btn">发布商品</el-button>
      </el-col>
    </el-row> -->
    <el-button type="primary"
               class="publish-btn"
               @click="dialog = true">发布商品</el-button>
    <el-divider class="divider"></el-divider>
    <!-- 表格 -->
    <el-table :data="goodslist"
              style="width: 100%">

      <el-table-column type="index"
                       label="#"
                       width="60">
      </el-table-column>

      <el-table-column prop="goodsName"
                       label="商品名称">
      </el-table-column>

      <el-table-column prop="goodsCategoryId"
                       label="商品类别"
                       :formatter="stateFormat">
      </el-table-column>

      <el-table-column prop="goodsOriginalprice"
                       label="真实价格(元)">
      </el-table-column>

      <el-table-column prop="goodsPrice"
                       label="价格(元)">
      </el-table-column>

      <el-table-column prop="goodsDate"
                       label="创建时间">
        <template slot-scope='scope'>
          {{scope.row.goodsDate | fmtdate}}
        </template>
      </el-table-column>

      <el-table-column label="商品状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.goodsStatus"
                     disabled
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     :active-value="0"
                     :inactive-value="1">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop=""
                       label="操作">
        <template slot-scope='scope'>
          <el-row>
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="small"
                       circle
                       plain
                       @click="showEditCompileDia(scope.row)"></el-button>
            <el-button size="small"
                       plain
                       type="danger"
                       icon="el-icon-delete"
                       circle
                       @click="showDeleCompileMsgBox(scope.row.goodsId)"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="queryInfo.current"
                   :page-sizes="[3, 5, 7, 9]"
                   :page-size="queryInfo.limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑商品"
               :visible.sync="dialogFormVisibleEdit"
               width="40%">
      <el-form :model="form">
        <el-form-item label="商品名"
                      label-width="100px">
          <el-input v-model="form.goodsName"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="原始价格"
                      label-width="100px">
          <el-input v-model="form.goodsOriginalprice"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格"
                      label-width="100px">
          <el-input v-model="form.goodsPrice"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary"
                   @click="editCompile()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 抽屉 -->
    <el-drawer title="发布商品"
               :before-close="handleClose"
               :visible.sync="dialog"
               direction="rtl"
               custom-class="demo-drawer"
               ref="drawer"
               @close="resetForm">
      <div class="demo-drawer__content">
        <el-form :model="drawer">
          <el-form-item label="商品名称"
                        :label-width="formLabelWidth">
            <el-input v-model="drawer.goodsName"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <label class="img-lable">商品图片</label>
            <el-upload class="avatar-uploader"
                       action="http://127.0.0.1:8005/api/admin/imgUpload"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl"
                   :src="imageUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品类别"
                        :label-width="formLabelWidth">
            <el-select v-model="drawer.goodsCategoryId"
                       placeholder="请选择类别">
              <el-option label="图书教材"
                         value="1"></el-option>
              <el-option label="数码产品"
                         value="2"></el-option>
              <el-option label="美妆衣物"
                         value="3"></el-option>
              <el-option label="运动棋牌"
                         value="4"></el-option>
              <el-option label="票劵小物"
                         value="5"></el-option>
              <el-option label="文具办公"
                         value="6"></el-option>
              <el-option label="校园代步"
                         value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品原价"
                        :label-width="formLabelWidth">
            <el-input v-model="drawer.goodsOriginalprice"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格"
                        :label-width="formLabelWidth">
            <el-input v-model="drawer.goodsPrice"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        :label-width="formLabelWidth">
            <el-input v-model="drawer.goodsDesc"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary"
                     @click="submitForm"
                     :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      queryInfo: {
        queryType: 2,
        query: '',
        current: 1,
        limit: 5
      },

      dialogFormVisibleEdit: false,
      total: 0,
      // 商品表单数据
      form: {
        goodsName: '',
        goodsOriginalprice: '',
        goddsPrice: ''
      },

      dialog: false,
      loading: false,
      drawer: {
      },
      imageUrl: '',
      formLabelWidth: '100px',
      goodslist: []

    }
  },

  created () {
    // flag判断是否是第一次进入页面
    this.user = JSON.parse(localStorage.getItem('user'))
    this.queryInfo.query = this.user.userId.toString()
    this.getGoodsList()
    this.initSetTimeout() // 调用每隔10秒刷新数据
  },
  methods: {
    resetForm () {
      this.drawer = {}
    },
    // 根据商品类别id显示对应名称
    stateFormat (row, colmun) {
      if (row.goodsCategoryId === 1) {
        return '图书教材'
      } else if (row.goodsCategoryId === 2) {
        return '数码产品'
      } else if (row.goodsCategoryId === 3) {
        return '美妆衣物'
      } else if (row.goodsCategoryId === 4) {
        return '运动棋牌'
      } else if (row.goodsCategoryId === 5) {
        return '票劵小物'
      } else if (row.goodsCategoryId === 6) {
        return '文具办公'
      } else {
        return '校园代步'
      }
    },

    // 每隔5秒刷新表格
    initSetTimeout () {
      setInterval(() => {
        this.getGoodsList()
      }, 5000)
    },
    // 删除商品->发送请求
    showDeleCompileMsgBox (compileId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除的请求 :id
        const res = await this.$http.post(`goodsDelete/${compileId}`)
        console.log(res)
        if (res.data.code === 200) {
          this.queryInfo.current = 1
          this.getGoodsList()
          this.$message.success(res.data.message)
        } else {
          // 提示
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑商品->发送请求
    async editCompile () {
      const res = await this.$http.post('goodsUpdate', this.form)
      console.log(res)
      // 关闭对哈框
      this.dialogFormVisibleEdit = false
      if (res.data.code === 200) {
        // 更新视图
        this.getGoodsList()
        // 提示
        this.$message.success(res.data.message)
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 编辑商品
    showEditCompileDia (compile) {
      this.form = compile
      this.dialogFormVisibleEdit = true
    },

    // 搜索
    searchGoods () {
      this.getGoodsList()
    },
    // 清空搜索框 重新获取数据
    loadGoodsList () {
      this.getGoodsList()
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.queryInfo.limit = val
      this.queryInfo.current = 1
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.current = val
      this.getGoodsList()
    },

    // 上传图片
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // this.imageUrl = this.imageUrl.substring(5, this.imageUrl.length)
      this.drawer.goodsImg = 'images/' + res.data.imgName
      console.log(this.drawer.goodsImg)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 抽屉
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialog = false
          done()
          clearTimeout(this.timer)
        })
        .catch(_ => { })
    },
    submit () {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            // done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.submitForm()
              this.loading = false
              this.dialog = false
            }, 400)
          }, 1000)
        })
        .catch(_ => { })
    },
    async submitForm () {
      this.drawer.goodsUserId = this.user.userId

      const res = await this.$http.post('goodsAdd', this.drawer)
      if (res.data.code === 200) {
        // 更新视图
        this.getGoodsList()
        // 提示
        this.$message.success(res.data.message)
      } else {
        this.$message.error(res.data.message)
      }
    },

    async getGoodsList () {
      const res = await this.$http.get('goods', { params: this.queryInfo })

      if (res.data.code === 200) {
        // 1.给表格数据复制
        this.goodslist = res.data.data.records
        // 2.给total赋值
        this.total = res.data.data.total
        // 3.提示
        // if (this.flag) {
        //   this.$message.success(res.data.message)
        //   // flag判断是否是第一次进入页面
        //   this.flag = false
        // }
      } else {
        this.$message.warning(res.data.message)
      }
    }
  }
}
</script>

<style>
.search-row {
  margin-top: 20px;
}
.input-search {
  width: 30%;
  float: left;
}
.publish-btn {
  margin-left: 5px;
  margin-top: 20px;
  float: left;
}
.divider {
  height: 2px;
  margin-top: 77px;
}

.img-lable {
  display: inline-block;
  float: left;
  padding: 0 0 0 0;
  margin-top: 30px;
  margin-left: 32px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
