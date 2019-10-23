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
export default router
