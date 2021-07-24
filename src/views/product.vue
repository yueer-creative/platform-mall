<template>
  <el-container direction="vertical">
    <nav-header></nav-header>
    <!-- <product-param :product="product"></product-param> -->
    <product-param></product-param>
  </el-container>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import ProductParam from '../components/ProductParam.vue'

export default {
  name: 'home',
  components: {
    NavHeader,
    ProductParam
  },
  data () {
    return {
      product: {}
    }
  },
  created () {
    this.product = this.$route.query.product
    // console.log(this.product)
  },
  methods: {
  }
}
</script>

<style>
</style>
