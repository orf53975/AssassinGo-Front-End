import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import recon from '@/pages/recon'
import attack from '@/pages/attack'
import seek from '@/pages/seek'

Vue.use(Router)

const route = new Router({
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
    }
  ],
});

//设置路由守卫 检测没有设置目标的时候 进入不被允许的路由会被跳转
route.beforeEach((to, from, next) => {
  //无需设置目标时允许的路由列表
  let allow = ['home', 'contact'];
  if( allow.indexOf(to.name) < 0) {
    //验证本地储存
    if(localStorage.getItem("target") == undefined) {
      //若无target信息则跳转到home
      route.push({path: '/home'});
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});

export default route;
