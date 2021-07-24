<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>已购买的</el-breadcrumb-item>
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
      </el-col>
    </el-row> -->
    <el-divider></el-divider>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      queryInfo: {
        queryType: 3,
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
      formLabelWidth: '100px',
      goodslist: []
    }
  },
  created () {
    // flag判断是否是第一次进入页面
    this.user = JSON.parse(localStorage.getItem('user'))
    this.queryInfo.query = this.user.userId.toString()
    const flag = true
    this.getGoodsList(flag)
  },
  methods: {
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
    searchGoods () {
      this.getGoodsList()
    },
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
    async getGoodsList (flag) {
      console.log(this.queryInfo.query)
      const res = await this.$http.get('goods', { params: this.queryInfo })

      if (res.data.code === 200) {
        // 1.给表格数据复制
        this.goodslist = res.data.data.records
        console.log(this.goodslist)
        // 2.给total赋值
        this.total = res.data.data.total
        // 3.提示
        if (flag) {
          this.$message.success(res.data.message)
          // flag判断是否是第一次进入页面
          flag = false
        }
      } else {
        this.$message.warning(res.data.message)
      }
    }
  }
}
</script>

<style>
</style>
