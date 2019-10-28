import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Splash from '@/views/Splash'
import About from '@/views/About'
import Store from '@/views/Store'

Vue.use(Router)

export default new Router({
  mode: 'history',

  scrollBehavior () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 300)
    })
  },

  routes: [
    {
      path: '*',
      redirect: { path: '/' }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/welcome',
      name: 'splash',
      component: Splash
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/store/:id',
      name: 'store',
      component: Store
    }
  ]
})
