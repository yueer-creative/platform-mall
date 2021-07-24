<template>
  <el-container class="container"
                direction="vertical">
    <nav-header></nav-header>

    <router-view></router-view>

  </el-container>

</template>

<script>
import NavHeader from '@/components/NavHeader.vue'

export default {
  name: 'home',
  components: {
    NavHeader
  }
}
</script>

<style>
.container {
  height: 100%;
}
</style>
