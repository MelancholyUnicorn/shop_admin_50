import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'
import Login from '../components/login'
import User from '../components/users'
import Rights from '../components/rights'
import Roles from '../components/roles'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    component: Index,
    // 此处如果写成user 那么访问的时候需要加上/index/user
    // 也可以直接写/user 那么在url可以直接通过user直接访问 并且没有改变user是index的子路由的关系
    children: [{ path: '/user', component: User },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles }
    ]
  },
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
  // console.log(to)
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
// 远程仓库提交步骤 git add . git commit -m "拦截功能" git checkout master git merge login git branch -d login  git push
export default router
