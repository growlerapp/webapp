import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Splash from '@/views/Splash'
import Onboarding from '@/views/Onboarding'
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
  scrollBehavior () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 300)
    })
  },

  routes: [
    {
      path: '/',
      name: 'splash',
      component: Splash
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding
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
