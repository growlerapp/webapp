import Vue from 'vue'
import Router from 'vue-router'
import Home from '~/src/components/Home'
import About from '~/src/components/About'
import Splash from '~/src/components/Splash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/splash',
      name: 'Splash',
      component: Splash,
    },
  ],
})
