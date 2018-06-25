import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Splash from '@/views/Splash'
import Store from '@/views/Store'
import user from '@/user'

Vue.use(Router)

const requireUser = (to, from, next) => {
  if (!user.checkUserData()) {
    next({
      path: '/'
    })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'splash',
      component: Splash
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: requireUser
    },
    {
      path: '/store/:id',
      name: 'store',
      component: Store
    }
  ]
})
