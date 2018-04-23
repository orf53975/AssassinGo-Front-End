import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import recon from '@/pages/recon'
import attack from '@/pages/attack'
import seek from '@/pages/seek'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    }, {
      path: '/home',
      name: 'home',
      component: home
    }, {
      path: '/recon',
      name: 'recon',
      component: recon
    }, {
      path: '/attack',
      name: 'attack',
      component: attack
    }, {
      path: '/seek',
      name: 'seek',
      component: seek
    }]
})
