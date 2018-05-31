import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import recon from '@/pages/recon'
import attack from '@/pages/attack'
import seek from '@/pages/seek'
import assassinate from '@/pages/assassinate'
import login from '@/pages/login'

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    }, {
      path: '/login',
      name: 'login',
      component: login,
    }, {
      path: '/home',
      name: 'home',
      component: home,
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
    }, {
      path: '/assassinate',
      name: 'assassinate',
      component: assassinate
    }
  ],
});

//设置路由守卫 检测没有设置目标的时候 进入不被允许的路由会被跳转
route.beforeEach((to, from, next) => {
  if (to.name != "login" && sessionStorage.getItem("SG_Token") == undefined) {
    alert(sessionStorage.getItem("SG_Token"));
    next({ path: '/login' });
  }
  else {
    //无需设置目标时允许的路由列表
    let allow = ['home', 'contact', 'seek', 'login'];
    if (allow.indexOf(to.name) < 0) {
      //验证本地储存
      if (sessionStorage.getItem("target") == undefined) {
        alert('Set Target First');
        //若无target信息则跳转到home
        route.push({ path: '/home' });
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  }
});

export default route;
