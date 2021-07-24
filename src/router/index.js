import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home', // 若这里取了name,则对应导入的component组件中也要定义相同的name: 'home'
  component: () => import('@/views/home.vue'),
  redirect: '/index', // 默认输入xxx:8080 跳转到 xxx:8080/index中
  children: [{
    path: '/index',
    name: 'index',
    component: () => import('@/views/index.vue')
  }]
},
{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login.vue')
},
{
  path: '/register',
  name: 'register',
  component: () => import('@/views/register.vue')
},
{
  path: '/product',
  name: 'product',
  component: () => import('@/views/product.vue')
},
{
  path: '/user',
  name: 'user',
  component: () => import('@/views/user.vue'),
  children: [{
    name: 'user-detail',
    path: '/user/detail',
    component: () => import('@/components/user/UserDetail.vue')
  }, {
    name: 'user-published',
    path: '/user/published',
    component: () => import('@/components/user/UserPublished.vue')
  }, {
    name: 'user-purchased',
    path: '/user/purchased',
    component: () => import('@/components/user/UserPurchased.vue')
  }, {
    name: 'user-star',
    path: '/user/star',
    component: () => import('@/components/user/UserStar.vue')
  }, {
    name: 'user-welcome',
    path: '/user/welcome',
    component: () => import('@/components/user/UserWelcome.vue')
  }]
}
]

const router = new VueRouter({
  routes
})

export default router
