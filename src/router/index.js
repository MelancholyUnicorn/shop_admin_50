import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'
import Login from '../components/login'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: Index },
  { path: '/login', component: Login }

]
const router = new VueRouter({
  routes
})
// 导航守卫 所有的路由请求都会被拦截 并判断是否放行
// router.beforeEach((to, from, next) => {
// })
router.beforeEach((to, from, next) => {
// 获取token
  console.log(to)
  const token = localStorage.getItem('token')
  // 如果路由地址是去login(去登录)或者是存在token令牌 那么就放行
  // 否则就拦截到登录页
  if (to.path === '/login' || token) {
    next()
  } else {
    (
      next('/login')
    )
  }
})
export default router
