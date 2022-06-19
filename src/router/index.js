import Vue from 'vue'
import VueRouter from 'vue-router'
import kuesioner from '../views/kuesioner/kuesioner.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:"/kuesioner",
    component:kuesioner,
    name:"kuesioner",
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
